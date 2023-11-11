import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

import { AuthenticateDTO, TokenDTO } from '@dtos/auth'
import { AuthenticationRepository } from '../AuthenticationRepository'
import { PrismaService } from '@database/prisma'
import { AppException } from '@errors/AppException'

@Injectable()
export class AuthenticationRepositoryPrisma
  implements AuthenticationRepository
{
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async authenticate(data: AuthenticateDTO): Promise<TokenDTO> {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        password: true,
        role: {
          include: {
            permissions: true,
          },
        },
      },
    })

    if (!user) {
      throw new AppException('Email ou senha incorreta.', 400)
    }

    const isValid = await compare(data.password, user.password)

    if (!isValid) {
      throw new AppException('Email ou senha incorreta.', 400)
    }

    if (!user.status) {
      throw new AppException('Conta do usuário desativado.', 400)
    }

    delete user.password

    const payload = JSON.stringify({
      id: user.id,
    })

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.APP_AUTH_SECRET,
    })

    return {
      token,
      user,
    }
  }
}
