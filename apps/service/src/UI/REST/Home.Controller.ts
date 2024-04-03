import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { HomeService } from '../../App/Home/Home.Service';
import type { HomeVO } from '../../Domain/ValueObjects/Home.VO';
import { Public } from '../../Infra/Decorators/Public.Decorator';

@ApiTags('Home')
@Controller()
@Public()
export class HomeController {
  public constructor(private readonly homeService: HomeService) {}

  @ApiOperation({ summary: 'Welcome' })
  @Get()
  public welcome(): HomeVO {
    return this.homeService.welcome();
  }
}
