# สุกี้ผีน้อย — ระบบสั่งอาหารร้านบุฟเฟต์

โปรเจกต์ Next.js (App Router, **JavaScript ไม่ใช่ TypeScript**) deploy บน Vercel และใช้ Supabase เป็นฐานข้อมูล

## กติกาสำหรับ AI / ผู้พัฒนา

- ใช้ JavaScript (`.js`) เท่านั้น ห้ามสร้างไฟล์ `.ts` / `.tsx`
- ใช้ App Router (โฟลเดอร์ `app/`) ไม่ใช้ `pages/`
- สร้าง Supabase client ผ่าน `lib/supabaseClient.js` เท่านั้น: `import { supabase } from '@/lib/supabaseClient'` (หรือ path สัมพัทธ์)
- Environment variables ที่ใช้:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ห้าม commit `.env.local` (ดูตัวอย่างใน `.env.example`)

## ⚠️ Next.js เวอร์ชันล่าสุด: `params` ของ Dynamic Route เป็น Promise

โปรเจกต์นี้ใช้ Next.js เวอร์ชันล่าสุด ซึ่ง `params` (และ `searchParams`) ที่ส่งเข้า page/layout ของ Dynamic Route เช่น `app/order/[sessionId]/page.js` เป็น **Promise** ต้อง unwrap ด้วย `use()` จาก React เสมอ ห้ามอ่านค่าตรง ๆ

```js
'use client';

import { use } from 'react';

export default function OrderPage({ params }) {
  const { sessionId } = use(params); // ถูกต้อง
  // const { sessionId } = params;   // ผิด: params เป็น Promise
  // ...
}
```

> หมายเหตุ: `use()` ใช้ได้ทั้งใน Client Component และ Server Component
> ส่วนใน Server Component แบบ `async function` จะใช้ `await params` แทนก็ได้ผลเท่ากัน แต่กติกาของโปรเจกต์นี้คือใช้ `use()` เพื่อให้เหมือนกันทุกหน้า

## โครงสร้างฐานข้อมูล Supabase (มีอยู่แล้ว ไม่ต้องสร้างใหม่)

ให้อ้างอิงชื่อตารางและคอลัมน์ตามนี้ทั้งโปรเจกต์ ห้ามเดาชื่อคอลัมน์อื่น

### `sessions` — โต๊ะที่เปิดใช้งาน (1 รอบการนั่ง)
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | primary key |
| `table_number` | หมายเลขโต๊ะ |
| `adult_count` | จำนวนผู้ใหญ่ |
| `child_count` | จำนวนเด็ก |
| `status` | สถานะของ session |
| `created_at` | เวลาที่สร้าง |

### `menu_categories` — หมวดหมู่เมนู
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | primary key |
| `name` | ชื่อหมวด |
| `sort_order` | ลำดับการแสดงผล |

### `menu_items` — รายการอาหาร
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | primary key |
| `category_id` | อ้างถึง `menu_categories.id` |
| `name` | ชื่อเมนู |

### `orders` — ออเดอร์ที่ลูกค้าสั่ง
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | primary key |
| `session_id` | อ้างถึง `sessions.id` |
| `table_number` | หมายเลขโต๊ะ |
| `items` | **jsonb** — รายการอาหารที่สั่ง |
| `status` | สถานะออเดอร์ |
| `created_at` | เวลาที่สร้าง |

ความสัมพันธ์: `menu_categories` 1—N `menu_items`, `sessions` 1—N `orders`

## หน้าที่วางแผนไว้
- `/` — หน้าแรก (ใช้ทดสอบว่า deploy สำเร็จ)
- `/generate-qr` — สร้าง QR สำหรับโต๊ะ
- `/kitchen` — หน้าครัว
- หน้าสั่งอาหารของลูกค้า (Dynamic Route) — ขั้นตอนถัดไป

## คำสั่ง
```bash
npm install
cp .env.example .env.local   # แล้วใส่ค่าจริง
npm run dev                  # พัฒนา
npm run build && npm run start
```
