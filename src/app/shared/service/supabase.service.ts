import { Injectable } from '@angular/core';
import { supabase } from 'src/app/shared/supabase/supabase';
import { HttpLoadingDialogService } from '../loading/loading-dialog/loading-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  constructor(
    private loadingDialogService: HttpLoadingDialogService,
  ) {}

  private async handleRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      this.loadingDialogService.show();
      return await requestFn();
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    } finally {
      this.loadingDialogService.hide();
    }
  }

  getUsers() {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      return data;
    });
  }

  loginUser(username: string, password: string) {
    return this.handleRequest(async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('Name', username)
        .eq('password', password);
      if (error) throw error;
      return data;
    });
  }

  addUser(user: { name: string; email: string }) {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.from('User').insert([user]);
      if (error) throw error;
      return data;
    });
  }
}
