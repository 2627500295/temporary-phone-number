import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { VoiceService } from '../../App/Voice/Voice.Service';
import { VoiceMailParserInput } from '../../Domain/DTOs/VoiceMailParser.Input';

@ApiTags('Voice')
@Controller('voice')
export class VoiceController {
  public constructor(private readonly voiceService: VoiceService) {}

  @Get('mail/parser')
  @ApiOperation({ summary: 'Parse SMS content from Google Voice email' })
  public voiceMailParser(@Body() body: VoiceMailParserInput) {
    return this.voiceService.voiceMailParser(body);
  }
}
