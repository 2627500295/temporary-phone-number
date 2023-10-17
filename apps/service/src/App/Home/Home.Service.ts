import { type HomeVO } from '@domain/ValueObjects/Home.VO';

export abstract class HomeService {
  abstract welcome(): HomeVO;
}
