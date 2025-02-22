import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpLoadingDialogService } from '../../loading/loading-dialog/loading-dialog.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private lazyUpdateflag = true;
  private noofid: number = 0;

  constructor(
    private loadingDialogService: HttpLoadingDialogService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   
    if (request.headers['lazyUpdate'] != null && request.headers['lazyUpdate'][1] != undefined && request.headers['lazyUpdate'][1]['value'] === 'ignore') {
      this.lazyUpdateflag = false;
    }
    else {
      this.noofid += 1;
      this.showLoader();
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.hideLoader();
        return throwError(error);
      }),
      finalize(() => {
        if(this.lazyUpdateflag){
          this.noofid -= 1;
          if(this.noofid < 1)
          {
            this.noofid = 0;
            this.hideLoader();
          }
        }
        else{
          this.lazyUpdateflag = true;
        }
      })
    ) as Observable<HttpEvent<any>>;
  }

  private showLoader(): void {
    this.loadingDialogService.show();
  }
  private hideLoader(): void {
    this.loadingDialogService.hide();
  }
}
