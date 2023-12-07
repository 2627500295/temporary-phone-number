import { Controller, Get } from '@nestjs/common';
import { HomeService } from '@app/Home/Home.Service';
import { type HomeVO } from '@domain/ValueObjects/Home.VO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class HomeController {
  public constructor(private readonly homeService: HomeService) {}

  @ApiOperation({ summary: 'Welcome' })
  @Get()
  public welcome(): HomeVO {
    return this.homeService.welcome();
  }
}
