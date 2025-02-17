import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone:false
})
export class LayoutComponent  implements OnInit {
  public appPages = [
    { title: 'Beginner', url: '/layout/begginer', icon: 'mail' },
    { title: 'Intermetiate', url: '/layout/intermetiate', icon: 'mail' },
    { title: 'Expert', url: '/layout/expert', icon: 'mail' },
  ];
  constructor(private ROUTE: Router,
    private cdr: ChangeDetectorRef,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController) { }


  ngOnInit() {}
  navigateto(url : any){
    this.ROUTE.navigateByUrl(url);
    this.menuCtrl.close();
    this.cdr.detectChanges();
  }
  async logout() {
    localStorage.removeItem('userToken');
    const toast = await this.toastCtrl.create({
      message: 'You have been logged out!',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
    this.ROUTE.navigate(['/login']);
  }
}

