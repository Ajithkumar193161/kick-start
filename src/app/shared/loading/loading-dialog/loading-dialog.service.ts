import { Injectable, ChangeDetectorRef } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderState } from "./loader.modal";


@Injectable()
export class HttpLoadingDialogService {
  
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {}
  
  show(){
    this.loaderSubject.next({show: true} as LoaderState);
    // this.cdr.detectChanges();
  }

  hide(){
    this.loaderSubject.next({show: false} as LoaderState);
    // this.cdr.detectChanges();
  }
  
}
