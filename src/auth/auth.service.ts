import { ValidationException } from '@/exceptions/validationException'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { Random } from 'mockjs'
import { UuidService } from 'nestjs-uuid'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { UserCreateEvent } from './events/user-created'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    @Inject() private readonly uuidService: UuidService,
  ) {}

  /**
   * user login
   * @param LoginDto
   * @returns reponse json
   */
  async signIn({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!(await argon2.verify(user.password, password))) {
      throw new ValidationException({
        account: ['Email or password error'],
        password: ['Email or password error'],
      })
    }
    return {
      ...this.token(user.id),
    }
  }

  /**
   * handle register
   * @param registerDto
   * @returns reponse json
   */
  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        uuid: this.uuidService.generate(),
        name: Random.name(),
        password: await argon2.hash(dto.password),
        email: dto.email,
      },
    })

    //emit user created event
    this.eventEmitter.emit('user:created', new UserCreateEvent(user))

    return {
      ...this.token(user.id),
    }
  }

  token(id: number) {
    return {
      access_token: this.jwtService.sign({ userId: id }),
    }
  }
}
