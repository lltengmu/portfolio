import { Module } from '@nestjs/common'
import { SocialsService } from './socials.service'
import { SocailsController } from './socials.controller'

@Module({
  controllers: [SocailsController],
  providers: [SocialsService],
  exports: [SocialsService],
})
export class SocailsModule {}
