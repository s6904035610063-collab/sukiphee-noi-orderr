import Link from 'next/link';

const links = [
  { href: '/generate-qr', title: 'สร้าง QR โต๊ะ', hint: 'เปิดโต๊ะและสร้าง QR ให้ลูกค้าสแกนสั่งอาหาร' },
  { href: '/kitchen', title: 'หน้าครัว', hint: 'ดูออเดอร์ที่เข้ามาและอัปเดตสถานะ' },
];

const envReady = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function HomePage() {
  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: '15vh 24px 48px' }}>
      <h1 style={{ fontSize: 'clamp(2.6rem, 9vw, 4rem)', lineHeight: 1.15, margin: 0 }}>
        สุกี้ผีน้อย
      </h1>
      <p style={{ color: 'var(--muted)', margin: '12px 0 40px' }}>
        ระบบสั่งอาหารร้านบุฟเฟต์
      </p>

      <nav aria-label="เมนูหลัก" style={{ display: 'grid', gap: 12 }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              display: 'block',
              padding: '16px 20px',
              borderLeft: '6px solid var(--chili)',
              background: 'color-mix(in srgb, var(--bg) 70%, var(--line))',
              textDecoration: 'none',
            }}
          >
            <strong style={{ fontSize: '1.15rem' }}>{l.title}</strong>
            <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.95rem' }}>
              {l.hint}
            </span>
          </Link>
        ))}
      </nav>

      <p style={{ marginTop: 40, fontSize: '0.9rem', color: 'var(--muted)' }}>
        {envReady
          ? 'เชื่อมต่อ Supabase: ตั้งค่า environment variables แล้ว'
          : 'เชื่อมต่อ Supabase: ยังไม่ได้ตั้งค่า NEXT_PUBLIC_SUPABASE_URL และ NEXT_PUBLIC_SUPABASE_ANON_KEY'}
      </p>
    </main>
  );
}
