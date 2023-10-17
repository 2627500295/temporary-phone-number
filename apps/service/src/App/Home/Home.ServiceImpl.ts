import { Injectable } from '@nestjs/common';
import { HomeService } from './Home.Service';
import { type HomeVO } from '@domain/ValueObjects/Home.VO';

@Injectable()
export class HomeServiceImpl implements HomeService {
  public welcome(): HomeVO {
    return { title: 'Hello World!' };
  }
}
