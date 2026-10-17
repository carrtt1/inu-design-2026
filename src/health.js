import { neon } from "@neondatabase/serverless";

// DB 연결 확인용: /api/health 로 접속하면 DB 의 현재 시각을 돌려준다
export default async function handler(req, res) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const [row] = await sql`select now() as now`;
    res.status(200).json({ ok: true, now: row.now });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}