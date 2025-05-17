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
  async facebook() {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: 'https://ajithkumar193161.github.io/kick-start/#/auth-callback?next=layout'
        }
      });
      console.log(data)
      if (error) throw error;
    });
  }  
  async loginUser(email: string, password: string) {
    return this.handleRequest(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        console.error("Error during login:", error.message);
        return null;
      } else {
        if (data?.session?.access_token) {
          localStorage.setItem("supabase_jwt", data.session.access_token);
        }
  
        return data;
      }
    });
  }
  async SignInUser(email: string, password: string) {
    return this.handleRequest(async () => {
      const { data: existingUser, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
  
      if (existingUser?.user) {
        return { success: false, message: "This email already has access. Please log in." };
      }

      if (signInError && signInError.message !== "Invalid login credentials") {
        return { success: false, message: signInError.message };
      }

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
  
      if (error) {
        return { success: false, message: error.message };
      }
  
      return { success: true, message: "Signup successful! Please check your email to confirm." };
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
