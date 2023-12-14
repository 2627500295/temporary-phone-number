import { type HomeVO } from '../../Domain/ValueObjects/Home.VO';

export abstract class HomeService {
  abstract welcome(): HomeVO;
}
