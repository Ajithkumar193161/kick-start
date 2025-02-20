import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;
  showToast:boolean= false;
  constructor(private ROUTER: Router,private fb: FormBuilder,
    private supabaseService: SupabaseService,
     private toastCtrl: ToastController) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
    window.sessionStorage.clear();
  }
  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const user = await this.supabaseService.loginUser(username, password);
      if (user && user.length > 0) {
        localStorage.setItem('user', JSON.stringify(user));
        const toast = await this.toastCtrl.create({
          message: 'Login Successful!',
          duration: 2000,
          position: 'top',
          color: 'success',
        });
        await toast.present();
        this.ROUTER.navigateByUrl('/layout');
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Invalid User or Credential',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
      }
    }
  }
  
}