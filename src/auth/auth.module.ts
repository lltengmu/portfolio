import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UuidModule } from 'nestjs-uuid'
import { UserController } from './user.controller'
import { UserSubscriber } from './subscribers/user.subscriber'
import { StateService } from '../state/state.service'
import { SocialsService } from '../socials/socials.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Module({
  imports: [
    UuidModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            //文件存储位置
            destination: 'uploads',
            //文件名定制
            filename: (req, file, callback) => {
              console.log(decodeURIComponent(file.originalname));
              const path = Date.now() + '-' + Math.round(Math.random() * 1e10) + extname(file.originalname)
              callback(null, path)
            },
          }),
        }
      },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, StateService, SocialsService, UserSubscriber],
})
export class AuthModule {}
