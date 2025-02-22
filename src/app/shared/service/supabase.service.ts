import { Injectable } from '@angular/core';
import { supabase } from 'src/app/shared/supabase/supabase';
import { HttpLoadingDialogService } from '../loading/loading-dialog/loading-dialog.service';
import { LockService } from './lock.service'

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  constructor(
    private loadingDialogService: HttpLoadingDialogService,
    private lockService: LockService
  ) {}

  // General method to handle API requests with a lock and loader
  private async handleRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      this.loadingDialogService.show();  // Show loader before request
      await this.lockService.acquireLockWithTimeout(5000);  // Acquire lock with a timeout

      // Perform the actual request
      return await requestFn();
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    } finally {
      this.lockService.releaseLock();  // Release lock after request is done
      this.loadingDialogService.hide();  // Hide loader after request
    }
  }

  // Get all users from the 'users' table
  getUsers() {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      return data;
    });
  }

  // Login a user
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

  // Insert a new user into the 'users' table
  addUser(user: { name: string; email: string }) {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.from('User').insert([user]);
      if (error) throw error;
      return data;
    });
  }
}
