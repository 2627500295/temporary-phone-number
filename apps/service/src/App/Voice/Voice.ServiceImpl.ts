import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { VoiceMailParserInput } from '../../Domain/DTOs/VoiceMailParser.Input';
import { VoiceService } from './Voice.Service';

@Injectable()
export class VoiceServiceImpl implements VoiceService {
  public voiceMailParser(input: VoiceMailParserInput): string {
    const $ = cheerio.load(input.content);
    const $element = $('.content-table:nth-child(2) tr:first-child td');
    const htmlContent = $element.html();
    const content = htmlContent.replace(/(\n?\s{2})+/gi, '').replace('<br>', '\\n');
    return content ?? '';
  }
}
