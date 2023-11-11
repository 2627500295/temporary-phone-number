import { Controller, Delete, Post } from '@nestjs/common';

import { ReceiveService } from '@app/Receives/Receive.Service';
import { OnlineReportInput } from '@domain/DTOs/PhoneNumber/OnlineReport.Input';
import { AddNumberInput } from '@domain/DTOs/PhoneNumber/AddNumber.Input';
import { RemoveNumberInput } from '@domain/DTOs/PhoneNumber/RemoveNumber.Input';

@Controller('numbers')
export class NumberController {
  public constructor(private readonly phoneService: ReceiveService) {}

  /**
   * Number online report
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/post/api_resellers_sendNumbersOnline
   *
   * @remarks
   *
   * > **IMPORTANT NOTE!**
   * >
   * > 1
   * >
   * > 2
   *
   * insdsddfs
   *
   * 23442342
   *
   * > **IMPORTANT NOTE!**
   * >
   * > 1
   * >
   * > 2
   *
   * > **IMPORTANT NOTE!**
   * >
   * > 1
   * >
   * > 2
   */
  @Post('online')
  public async online(body: OnlineReportInput) {
    return body;
  }

  /**
   * Add Number
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/post/api_resellers_addNumber
   *
   *
   */
  @Post('add')
  public async add(body: AddNumberInput) {
    return body;
  }

  @Delete('remove')
  public async remove(query: RemoveNumberInput) {
    return query;
  }
}
