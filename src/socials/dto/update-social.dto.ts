import { Socials } from '@prisma/client'
import { IsOptional, IsUrl } from 'class-validator'

export class UpdateSocialDto implements Partial<Socials> {
  @IsOptional()
  @IsUrl()
  github: string

  @IsOptional()
  @IsUrl()
  document: string

  @IsOptional()
  @IsUrl()
  bilibili: string

  @IsOptional()
  @IsUrl()
  tiktok: string
}
