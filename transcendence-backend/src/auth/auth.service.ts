import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

async register(dto: RegisterDto) {
  const hash = await bcrypt.hash(dto.password, 12);
  
  // Generate unique avatar URL based on username
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${dto.username}`;

  try {
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hash,
        profile: {
          create: {
            displayName: dto.username,
            avatarUrl, // ← UNIQUE PER USER
            status: 'online',
          },
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        roles: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            displayName: true,
            avatarUrl: true,
            status: true,
          },
        },
      },
    });

    const token = this.signToken(user.id, user.username);
    return { user, token };
  } catch (error) {
    if (error.code === 'P2002') {
      throw new ConflictException('Username or email already exists');
    }
    throw error;
  }
}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
      include: { profile: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update status to online
    await this.prisma.profile.update({
      where: { userId: user.id },
      data: { status: 'online' },
    });

    // Fetch user again with updated profile
    const updatedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    });

    const token = this.signToken(user.id, user.username);
    const { password, ...userWithoutPassword } = updatedUser!;

    return { user: userWithoutPassword, token };
  }

  private signToken(userId: string, username: string): string {
    return this.jwt.sign({ id: userId, username });
  }
}