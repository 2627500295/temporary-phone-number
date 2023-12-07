import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Providers')
@Controller('providers')
export class HomeController {
  public constructor() {}

  @Get(':phoneNumber/mark')
  public mark() {
    return {};
  }
}
