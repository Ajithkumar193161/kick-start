import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SupabaseService } from 'src/app/shared/service/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;
  showToast:boolean= false;
  signupForm: FormGroup;
  login: boolean = true;
  constructor(private ROUTER: Router,private fb: FormBuilder,
    private supabaseService: SupabaseService,
     private toastCtrl: ToastController) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
   }

  ngOnInit() {
    this.clear()
    window.sessionStorage.clear();
  }
  clear(){
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    
    this.signupForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
    
  }
  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      try {
        const userData = await this.supabaseService.loginUser(username, password);
  
        if (userData && userData.user && userData.session) {
          localStorage.setItem('user', JSON.stringify(userData.user));
          localStorage.setItem('Token', userData.session.access_token);
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
            message: 'Invalid User or Credentials',
            duration: 2000,
            position: 'top',
            color: 'danger',
          });
          await toast.present();
        }
      } catch (error) {
        const toast = await this.toastCtrl.create({
          message: 'Something went wrong, please try again later.',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
      }
    }
  } 

  async loginWithFacebook() {
    try {
      const userData = await this.supabaseService.facebook();
      console.log('Logged in user data:', userData);
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  }
 passwordMatchValidator(formGroup: FormGroup) {
   const password = formGroup.get('password')?.value;
   const confirmPassword = formGroup.get('confirmPassword')?.value;
   return password === confirmPassword ? null : { passwordMismatch: true };
 }
 async onSignup() {
  if (this.signupForm.valid) {
    const { email, password } = this.signupForm.value;
    try {
      const userData = await this.supabaseService.SignInUser(email, password);

      const toast = await this.toastCtrl.create({
        message: userData.message,
        duration: 2000,
        position: 'top',
        color: userData.success ? 'success' : 'danger',
      });
      await toast.present();
      if (userData.success) {
        this.login = true; 
      }
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Something went wrong, please try again later.',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
  }
}

 loginpage(event: any){
  this.clear()
  this.login = event == 'login' ? true : false
 }
}