import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

import { AuthenticateDTO, TokenDTO } from '@dtos/auth'
import { AuthenticationRepository } from '../AuthenticationRepository'
import { PrismaService } from '@database/prisma'
import { AppException } from '@errors/AppException'

// interface TokenDTO {
//   token: string
//   user: Users
// }

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
        id_role: true,
        role: {
          include: {
            permissions: {
              select: {
                permission: true,
              },
            },
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

    const permissions = user.role.permissions.map(
      (permission) => permission.permission,
    )

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        role: {
          id: user.role.id,
          name: user.role.name,
          description: user.role.description,
          permissions,
        },
      },
    }
  }
}
