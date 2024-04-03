import { IsString } from 'class-validator';

export class VoiceMailParserInput {
  @IsString()
  content: string;
}
