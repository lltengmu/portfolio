import { SkipAuth } from '@/decorators/SkipAuth.decorator'
import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { UserEntity } from '@/auth/entities/user.entity'
import { StateEntity } from '@/state/entities/state.entity'
import { SocialEntity } from '@/socials/entities/social.entity'
import { SupplyEntity } from '@/supply/entities/supply.entity'
import { ExperienceEntity } from '@/expeirence/entities/expeirence.entity'
import { EducationEntity } from '@/education/entities/education.entity'
import { ProjectEntity } from '@/project/entities/project.entity'
import { ResumeEntity } from '@/auth/entities/resume.entity'

@Controller('frontend')
@SkipAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class FrontendController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('user/:uuid')
  async user(@Param('uuid') uuid: string) {
    return new UserEntity(
      await this.prisma.user.findUnique({
        where: { uuid },
      }),
    )
  }
  @Get('user-resume/:uuid')
  async userResume(@Param('uuid') uuid: string) {
    const { id } = await this.prisma.user.findUnique({ where: { uuid } })
    return new ResumeEntity(
      await this.prisma.resume.findUnique({
        where: { userId: id },
      }),
    )
  }

  @Get('user-state/:uuid')
  async userState(@Param('uuid') uuid: string) {
    const { id } = await this.prisma.user.findUnique({ where: { uuid } })
    return new StateEntity(await this.prisma.state.findUnique({ where: { userId: id } }))
  }

  @Get('user-social/:uuid')
  async userSocials(@Param('uuid') uuid: string) {
    const { id } = await this.prisma.user.findUnique({ where: { uuid } })
    return new SocialEntity(
      await this.prisma.socials.findUnique({
        where: {
          userId: id,
        },
      }),
    )
  }

  @Get('user-service/:uuid')
  async userService(@Param('uuid') uuid: string) {
    const { id } = await this.prisma.user.findUnique({ where: { uuid } })
    return await this.prisma.supply
      .findMany({
        where: { userId: id },
      })
      .then((data) => data.map((i) => new SupplyEntity(i)))
  }

  @Get('user-experience/:uuid')
  async userExpirence(@Param('uuid') uuid: string) {
    const { id } = await this.prisma.user.findUnique({ where: { uuid } })
    return await this.prisma.experience
      .findMany({ where: { userId: id } })
      .then((data) => data.map((i) => new ExperienceEntity(i)))
  }

  @Get('user-education/:uuid')
  async userEducation(@Param('uuid') uuid: string) {
    const { id } = await this.prisma.user.findUnique({ where: { uuid } })
    return await this.prisma.educations
      .findMany({ where: { userId: id } })
      .then((data) => data.map((i) => new EducationEntity(i)))
  }

  @Get('user-project/:uuid')
  async userProject(@Param('uuid') uuid: string) {
    const { id } = await this.prisma.user.findUnique({ where: { uuid } })
    return await this.prisma.project
      .findMany({ where: { userId: id } })
      .then((data) => data.map((i) => new ProjectEntity(i)))
  }
}
