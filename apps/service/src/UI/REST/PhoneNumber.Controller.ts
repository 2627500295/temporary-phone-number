import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OnlineReportInput } from '@domain/DTOs/PhoneNumber/OnlineReport.Input';
import { CreateNumberInput } from '@domain/DTOs/PhoneNumber/CreateNumber.Input';
import { DeleteNumberDTO } from '@domain/DTOs/PhoneNumber/DeleteNumber.DTO';
import { PhoneNumberService } from '@app/PhoneNumber/PhoneNumber.Service';
import { ReportOnlineDTO } from '@domain/DTOs/PhoneNumber/ReportOnline.DTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Phone Number')
@Controller('numbers')
export class PhoneNumberController {
  public constructor(private readonly phoneNumber: PhoneNumberService) {}

  /**
   * Insert phone number (添加手机号码)
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/post/api_resellers_addNumber
   *
   *
   */
  @Post()
  public async createPhoneNumber(@Body() body: CreateNumberInput) {
    return this.phoneNumber.createPhone(body);
  }

  /**
   * Delete phone number (删除手机号码)
   *
   * https://onlinesim.io/openapi_docs/Reseller-API-UN/delete/api_resellers_removeNumber
   *
   *
   */
  @Delete(':phoneNumber')
  public async deletePhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    const deletePhoneNumberDTO: DeleteNumberDTO = { phoneNumber };
    return this.phoneNumber.deletePhone(deletePhoneNumberDTO);
  }

  /**
   * Phone number online report (报告手机号码在线)
   *
   * 每 30分钟 上报一次在线状态
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
  public async reportPhoneNumberOnline(@Param('phoneNumber') phoneNumber: string, @Body() body: OnlineReportInput) {
    const reportOnlineDTO: ReportOnlineDTO = {
      phoneNumber,
      reportedAt: body.reportedAt ?? new Date().toISOString(),
    };

    return this.phoneNumber.reportOnline(reportOnlineDTO);
  }

  /**
   * List Phone numbers (获取手机号码列表)
   */
  @Get()
  public async listPhoneNumber() {
    return this.phoneNumber.listPhones({});
  }

  @Get('online')
  public async listOnlinePhoneNumber() {
    return this.phoneNumber.listPhones({ isOnline: true });
  }
}
