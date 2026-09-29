import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'ยังไม่ได้ตั้งค่า NEXT_PUBLIC_SUPABASE_URL หรือ NEXT_PUBLIC_SUPABASE_ANON_KEY ' +
      '(ตั้งใน .env.local สำหรับเครื่องตัวเอง และใน Vercel Environment Variables สำหรับ deploy)'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
