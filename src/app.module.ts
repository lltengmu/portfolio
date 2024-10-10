import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { AuthModule } from './auth/auth.module'
import { JWTModule } from './jwt/jwt.module'
import { AuthMiddleware } from './jwt/jwt.strategy'
import { PrismaModule } from './prisma/prisma.module'
import { SocailsModule } from './socials/socials.module'
import { StateModule } from './state/state.module'
import { EducationModule } from './education/education.module';
import { SupplyModule } from './supply/supply.module';
import { ProjectModule } from './project/project.module';
import { ExperienceModule } from './expeirence/experience.module';
import { FrontendModule } from './frontend/frontend.module';
import config from './config'

@Module({
  imports: [
    ConfigModule.forRoot({ load: config, isGlobal: true }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    JWTModule,
    AuthModule,
    StateModule,
    SocailsModule,
    EducationModule,
    SupplyModule,
    ProjectModule,
    ExperienceModule,
    FrontendModule,
  ],
  controllers: [],
  providers: [AuthMiddleware],
})
export class AppModule {}
