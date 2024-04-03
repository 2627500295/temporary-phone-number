import { VoiceMailParserInput } from '../../Domain/DTOs/VoiceMailParser.Input';

export abstract class VoiceService {
  abstract voiceMailParser(input: VoiceMailParserInput): string;
}
