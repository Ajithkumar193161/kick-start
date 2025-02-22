import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { LoaderState } from "./loader.modal";
import { HttpLoadingDialogService } from "./loading-dialog.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss'],
  standalone: false
})
export class LoadingDialogComponent implements OnInit, OnDestroy {

  show = false;
  fea: boolean =  false;
  dev: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private _loaderService: HttpLoadingDialogService, private ref: ChangeDetectorRef) {}

  ngOnInit() {    
    this.subscription = this._loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
