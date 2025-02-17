import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;
  showToast:boolean= false;
  constructor(private ROUTER: Router,private fb: FormBuilder, private toastCtrl: ToastController) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {}
  async onLogin() {
    if (this.loginForm.valid) {
      this.ROUTER.navigateByUrl('/layout');
        const toast = await this.toastCtrl.create({
          message: 'Login Successful!',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        toast.present();
    }
  }
}
