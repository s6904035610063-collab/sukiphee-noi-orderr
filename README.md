# สุกี้ผีน้อย

ระบบสั่งอาหารร้านบุฟเฟต์ — Next.js (App Router, JavaScript) + Supabase, deploy บน Vercel

## เริ่มใช้งาน
```bash
npm install
cp .env.example .env.local   # ใส่ค่า Supabase จริง
npm run dev
```
เปิด http://localhost:3000

## Deploy บน Vercel
1. Push โปรเจกต์ขึ้น GitHub แล้ว Import เข้า Vercel
2. ตั้ง Environment Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

กติกาของโปรเจกต์ (รวมถึงเรื่อง `params` เป็น Promise และโครงสร้างตารางฐานข้อมูล) อยู่ใน [CLAUDE.md](./CLAUDE.md)
