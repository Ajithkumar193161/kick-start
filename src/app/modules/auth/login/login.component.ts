import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent  implements OnInit {

  constructor(private ROUTER: Router,) { }

  ngOnInit() {}
  login(){
        this.ROUTER.navigateByUrl('/layout');
  }
}
