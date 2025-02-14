import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-begginer',
  templateUrl: './begginer.component.html',
  styleUrls: ['./begginer.component.scss'],
  standalone: false
})
export class BegginerComponent implements OnInit {

  constructor(private ROUTE: Router,
    private cdr: ChangeDetectorRef,) { }
  appPages: any[] = [];
  mainMenu: boolean = true;
  ngOnInit() {
 
  }
  ionViewWillEnter(){
    this.appPages = [
      { title: 'Pushup', url: '/layout/begginer/pushup', icon: 'mail' },
      { title: 'Squad', url: '/layout/begginer/squad', icon: 'paper-plane' },
    ];
    this.cdr.detectChanges()
  }
  workoutpage(url: any) {
    this.ROUTE.navigate([url]);
    this.cdr.detectChanges();
  }
}


