import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { OnlineReportInput } from '@domain/DTOs/PhoneNumber/OnlineReport.Input';
import { CreateNumberInput } from '@domain/DTOs/PhoneNumber/CreateNumber.Input';
import { DeleteNumberDTO } from '@domain/DTOs/PhoneNumber/DeleteNumber.DTO';
import { PhoneNumberService } from '@app/PhoneNumber/PhoneNumber.Service';
import { ReportOnlineDTO } from '@domain/DTOs/PhoneNumber/ReportOnline.DTO';

@Controller('numbers')
export class PhoneNumberController {
  public constructor(private readonly phoneNumber: PhoneNumberService) {}

  /**
   * Phone number online report (报告手机号码在线)
   *
   * 每 20分钟 上报一次在线状态
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
  @Post(':phoneNumber/online')
  public async reportPhoneNumberOnline(
    @Param('phoneNumber') phoneNumber: string,
    @Body() body: OnlineReportInput,
  ) {
    const reportOnlineDTO: ReportOnlineDTO = {
      phoneNumber,
      reportedAt: body.reportedAt ?? new Date().toISOString(),
    };

    return this.phoneNumber.reportOnline(reportOnlineDTO);
  }

  /**
   * Add Number
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/post/api_resellers_addNumber
   *
   *
   */
  @Post()
  public async createPhoneNumber(@Body() body: CreateNumberInput) {
    return this.phoneNumber.createPhone(body);
  }

  @Delete(':phoneNumber')
  public async deletePhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    const deletePhoneNumberDTO: DeleteNumberDTO = { phoneNumber };
    return this.phoneNumber.deletePhone(deletePhoneNumberDTO);
  }
}
