import { currentUser } from '@/decorators/currentUser.decrator'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateSupplyDto } from './dto/create-supply.dto'
import { SupplyService } from './supply.service'

@Controller('supply')
@UseInterceptors(ClassSerializerInterceptor)
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Post()
  upsert(@currentUser() user: User, @Body() createSupplyDto: CreateSupplyDto) {
    return this.supplyService.upsert(user, createSupplyDto)
  }

  @Get()
  findAll(@currentUser() user: User) {
    return this.supplyService.findAll(user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplyService.remove(+id)
  }
}
