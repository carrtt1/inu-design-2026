import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "GET 만 가능해요" });
  }

  const q = String(req.query.q ?? "").trim();
  const major = String(req.query.major ?? "").trim();

  try {
    const rows = await sql`
      select id, name, email, title, major
      from designers
      where (${q} = '' or name ilike ${"%" + q + "%"})
        and (${major} = '' or major = ${major})
      order by name
    `;
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}