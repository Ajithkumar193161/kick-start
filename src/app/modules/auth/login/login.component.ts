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

  ngOnInit() {}
  async onLogin() {
    const { username, password } = this.loginForm.value; 
    const user = this.supabaseService.loginUser(username, password );
    if (await user) {
      this.ROUTER.navigateByUrl('/layout');
        const toast = await this.toastCtrl.create({
          message: 'Login Successful!',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        toast.present();
    }
    else{
      const toast = await this.toastCtrl.create({
        message: 'Invalid User',
        duration: 2000,
        position: 'bottom',
        color: 'error'
      });
      toast.present();
    }
  }
}
