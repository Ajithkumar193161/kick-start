// src/app/supabase.service.ts
import { Injectable } from '@angular/core';
import { supabase } from 'src/_service/supabase'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  // Get all users from 'users' table
  async getUsers() {
    const { data, error } = await supabase.from('users').select('*'); 
    if (error) throw error;
    return data;
  } 
  async loginUser(username: string, password: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('Name', username)
      .eq('password', password)
  
    if (error) throw error;
    return data; 
  }
  
          
  // Insert a new user into 'users' table
  async addUser(user: { name: string; email: string }) {
    const { data, error } = await supabase.from('User').insert([user]);
    if (error) throw error;
    return data;
  }
}
