import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ataplogngqnfyscksino.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YXBsb2duZ3FuZnlzY2tzaW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzE4MjYsImV4cCI6MjA1NTYwNzgyNn0.QNPhpd4-H4XUJCUkXZoLM1rYwsCRZWFGeAe_8VDkLYY';

export const supabase = createClient(supabaseUrl, supabaseKey);

