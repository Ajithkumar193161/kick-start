import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    // protected translate: TranslateService,
    private readonly injector: Injector,
    private zone: NgZone,
  ) {
  }

  handleError(error: Error) {
    const errorLog = {};
    // errorLog['error'] = 'Error:' + error;
    // errorLog['name'] = 'Name:' + error.name;
    // errorLog['Message'] = 'Message:' + error.message;
    // errorLog['stocktrace'] = 'StackTrace:' + error.stack;

    // if (error['code'] !== undefined) {

    //   let errorLog: any = {
    //     status: error['code'],
    //     errorcode: error['status'],
    //     errordescription: error['message'],
    //     messagetype: "Error Message"
    //   };
    // }


   
  }




}
