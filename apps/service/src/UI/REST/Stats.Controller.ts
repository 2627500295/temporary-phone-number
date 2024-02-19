import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { HomeService } from '../../App/Home/Home.Service';

@ApiTags('Statistics')
@Controller('stats')
export class StatsController {
  public constructor(private readonly homeService: HomeService) {}

  @Get()
  @ApiOperation({ summary: '' })
  public stats() {
    return {
      phoneNumbers: 3,
      onlinePhoneNumbers: 2,
      messages: 100,
      lastReceivedAt: '2023-12-11T00:00:00.000Z+0800',
    };
  }
}
