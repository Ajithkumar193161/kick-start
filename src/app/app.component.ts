import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Begginner', url: '/folder/begginer', icon: 'mail' },
    { title: 'Intermetiate', url: '/folder/intermetiate', icon: 'paper-plane' },
  ];
  constructor( private ROUTE: Router,) {}

  route(url:any){
    this.ROUTE.navigateByUrl(url);  
  }
}
