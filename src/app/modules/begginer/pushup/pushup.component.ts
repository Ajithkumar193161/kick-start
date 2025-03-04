import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/shared/service/supabase.service';

@Component({
  selector: 'app-pushup',
  templateUrl: './pushup.component.html',
  styleUrls: ['./pushup.component.scss'],
  standalone:false
})
export class PushupComponent  implements OnInit {

  constructor(private supabaseService: SupabaseService,) { }

  ngOnInit() {
    this.onLogin()
  }
  async onLogin() {
    try {
      const userData = await this.supabaseService.getUsers();
    
      if (userData) {
        console.log('User added successfully:', userData);
      } else {
        console.log('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  } 
}
