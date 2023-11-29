import { Controller, Get } from '@nestjs/common';
import { HomeService } from '@app/Home/Home.Service';
import { type HomeVO } from '@domain/ValueObjects/Home.VO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class HomeController {
  public constructor(private readonly homeService: HomeService) {}

  @Get()
  public welcome(): HomeVO {
    return this.homeService.welcome();
  }
}
