# WHAT THE HOUSE — whatthehouse.net

คู่มือระบบเว็บไซต์ฉบับสมบูรณ์ สำหรับเจ้าของธุรกิจ ผู้ดูแล และนักพัฒนาที่รับช่วงต่อ

อัปเดตล่าสุด: กรกฎาคม 2026

---

## 1. ภาพรวม — ระบบทั้งหมดเชื่อมกันอย่างไร

```
                        ┌─────────────────────────┐
  เจ้าของแก้เนื้อหา ───► │  /admin (Decap CMS)     │
  (บทความ/ผลงาน/ตั้งค่า)  │  ล็อกอินผ่าน Netlify     │
                        └───────────┬─────────────┘
                                    │ บันทึก = commit
  นักพัฒนาแก้โค้ด ──── git push ──► ▼
                        ┌─────────────────────────┐
                        │  GitHub                 │  ◄── ที่เก็บโค้ด+เนื้อหาทั้งหมด
                        │  whatthehouse/          │      (ต้นฉบับจริงอยู่ที่นี่)
                        │  wth-website (main)     │
                        └───────────┬─────────────┘
                                    │ ทุก commit → build อัตโนมัติ (~15 credits)
                                    ▼
                        ┌─────────────────────────┐
                        │  Netlify                │  ◄── โฮสต์เว็บ + build + ฟอร์ม
                        │  - Build (Astro)        │      + ระบบล็อกอิน CMS (Identity)
                        │  - CDN เสิร์ฟหน้าเว็บ     │
                        │  - Forms (ข้อความลูกค้า) │──► อีเมลแจ้งเตือนถึงเจ้าของ
                        └───────────▲─────────────┘
                                    │ DNS ชี้โดเมนมาที่ Netlify
                        ┌───────────┴─────────────┐
  ผู้เข้าชม ──────────► │  Namecheap              │  ◄── จดทะเบียนโดเมน
  whatthehouse.net      │  (เจ้าของโดเมน .net)     │      (ค่าใช้จ่ายรายปีรายการเดียว)
                        └─────────────────────────┘
```

บริการภายนอกที่หน้าเว็บเรียกใช้ตอนแสดงผล (ฟรี ไม่มีบัญชี ไม่ต้องดูแล):

- **Google Fonts** — ฟอนต์ Prompt (ไทย) + Poppins (อังกฤษ)
- **CARTO / OpenStreetMap** — ภาพแผนที่ (tiles) ในหน้า /contact

---

## 2. บัญชีทั้งหมดที่ต้องดูแล

| บริการ | ทำหน้าที่ | แผน / ค่าใช้จ่าย | ถ้าหมดอายุ/หลุด จะเกิดอะไร |
|---|---|---|---|
| **Namecheap** | จดทะเบียนโดเมน whatthehouse.net + ตั้ง DNS | เสียเงินรายปี (รายการเดียวที่มีค่าใช้จ่าย) — เปิด auto-renew ไว้ | **เว็บหายทั้งเว็บ** ร้ายแรงที่สุด ห้ามขาดต่ออายุ |
| **GitHub** (บัญชี `whatthehouse`) | เก็บโค้ดและเนื้อหาทั้งหมด repo `wth-website` | ฟรี | แก้เว็บไม่ได้ แต่เว็บที่ deploy แล้วยังอยู่ |
| **Netlify** | โฮสต์เว็บ, build อัตโนมัติ, ฟอร์มลูกค้า, ระบบล็อกอิน /admin | ฟรี 300 credits/เดือน (รีเซ็ตราววันที่ 10) — deploy 1 ครั้ง ≈ 15 credits ≈ 20 ครั้ง/เดือน | credits หมด: **เว็บยังออนไลน์ปกติ** แค่อัปเดตใหม่ไม่ได้จนกว่าจะรีเซ็ต |
| **Gmail ธุรกิจ** (whatthehouse.official@gmail.com) | อีเมลติดต่อบนเว็บ + รับแจ้งเตือนฟอร์ม | ฟรี | ไม่รู้ว่ามีลูกค้าทักฟอร์มเข้ามา |
| **LINE Official** (lin.ee/NW1XLt1) | ช่องทางแชทหลักกับลูกค้า | ตามแผน LINE OA | ปุ่ม LINE และ QR บนเว็บใช้ไม่ได้ |
| **Facebook Page** (What the House Official) | ช่องทางโซเชียล | ฟรี | ปุ่ม Facebook บนเว็บใช้ไม่ได้ |

> **Google Analytics:** เตรียมโค้ดรองรับไว้แล้วแต่**ยังไม่เปิดใช้** — ถ้าต้องการ ให้สร้าง GA4 property แล้วเอา Measurement ID (G-XXXX) ไปใส่ในช่อง gaId ที่ /admin → ตั้งค่าเว็บไซต์

---

## 3. การไหลของข้อมูล

### 3.1 การแก้ไขเว็บ (เจ้าของ ผ่าน /admin)

1. เข้า **whatthehouse.net/admin** → ล็อกอิน (ระบบ Netlify Identity)
2. แก้ **บทความ / ผลงาน / ตั้งค่าเว็บไซต์** แล้วกดบันทึก
3. การบันทึกจะสร้าง commit ลง GitHub อัตโนมัติ → Netlify build → ขึ้นเว็บจริงใน ~2 นาที
4. **ทุกการกดบันทึก = 1 deploy ≈ 15 credits** — แก้หลายอย่างให้เสร็จแล้วบันทึกรวบเดียวจะประหยัดกว่า

สิ่งที่แก้ผ่าน /admin ได้: บทความ, ผลงาน, ตั้งค่า (เบอร์โทร, LINE, Facebook, อีเมล, GA ID)
สิ่งที่ต้องแก้ผ่านโค้ด: ทุกอย่างที่เหลือ (ราคา, บริการ, โครงหน้า, รูปประกอบหน้า, ฟอร์ม)

### 3.2 การแก้ไขเว็บ (นักพัฒนา ผ่านโค้ด)

```
git clone https://github.com/whatthehouse/wth-website
npm install          # ต้องใช้ Node.js >= 22.12
npm run dev          # เปิดดูที่ localhost:4321
npm run build        # ตรวจก่อน push เสมอ
git push origin main # push แล้ว = deploy จริงทันที ไม่มีขั้น approve
```

### 3.3 ข้อความลูกค้า (ฟอร์มหน้า /contact)

1. ลูกค้ากรอกฟอร์ม "ขอใบเสนอราคา / จองคิวตรวจบ้าน" → ข้อมูลวิ่งไป **Netlify Forms** (ฟอร์มชื่อ `contact`)
2. ดูย้อนหลังทั้งหมด: app.netlify.com → เลือกเว็บ → **Forms** → `contact`
3. อีเมลแจ้งเตือนอัตโนมัติ: ตั้งไว้แล้ว (เปิดเมื่อ ก.ค. 2026) — ตั้งค่าอยู่ที่ Configuration → Notifications → Form submission notifications
4. มีระบบกันบอท (honeypot) ในตัว ฟอร์มปลอมจากบอทจะถูกคัดทิ้ง
5. ข้อมูลลูกค้า (ชื่อ เบอร์ ที่อยู่โครงการ) เก็บบนเซิร์ฟเวอร์ Netlify — อย่าให้สิทธิ์เข้า Netlify กับคนที่ไม่เกี่ยวข้อง

---

## 4. งานดูแลประจำ

| งาน | ความถี่ | วิธี |
|---|---|---|
| ต่ออายุโดเมน | ปีละครั้ง | Namecheap (เปิด auto-renew + ผูกบัตรที่ไม่หมดอายุ) |
| เช็ค credits คงเหลือ | เดือนละครั้ง | app.netlify.com → Billing/Usage (รีเซ็ตราววันที่ 10) |
| ดูข้อความลูกค้าตกหล่น | สัปดาห์ละครั้ง | Netlify → Forms (กันกรณีอีเมลแจ้งเตือนหลุด spam) |
| เพิ่มบทความ/ผลงาน | ตามต้องการ | /admin — รูปที่อัปโหลดผ่าน CMS เก็บใน `public/assets/img/uploads/` |
| อัปเดตแพ็กเกจโค้ด | ปีละ 1–2 ครั้ง (นักพัฒนา) | `npm outdated` → อัปเดต → `npm run build` ตรวจ → push |

---

## 5. เมื่อมีปัญหา (Troubleshooting)

**เว็บเข้าไม่ได้ทั้งเว็บ**
→ เช็คสถานะ Netlify (netlifystatus.com) ก่อน แล้วเช็คว่าโดเมนหมดอายุหรือยัง (Namecheap) — สองสาเหตุนี้ครอบคลุมเกือบทุกกรณี

**แก้เว็บแล้วไม่ขึ้น / deploy ล้มเหลว**
→ app.netlify.com → Deploys → ดู log ตัวล่าสุด ถ้าขึ้นเรื่อง credits แปลว่าโควตาหมด รอรีเซ็ตวันที่ ~10 หรืออัปเกรดแผน

**รูปขึ้นตอนทดสอบในเครื่อง แต่บนเว็บจริงรูปหาย**
→ 90% เกิดจากตัวพิมพ์ใหญ่-เล็กในชื่อไฟล์/โฟลเดอร์ไม่ตรงกัน Windows ไม่แยกแต่เซิร์ฟเวอร์แยก — **ตั้งชื่อไฟล์และโฟลเดอร์รูปเป็นตัวพิมพ์เล็กทั้งหมดเสมอ**

**ล็อกอิน /admin ไม่ได้**
→ ระบบล็อกอินคือ Netlify Identity: app.netlify.com → เลือกเว็บ → Identity → ดูรายชื่อผู้ใช้ / ส่งคำเชิญใหม่ / รีเซ็ตรหัสได้จากตรงนั้น

**ฟอร์มลูกค้าส่งแล้วอีเมลไม่เด้ง**
→ เช็ค spam ก่อน แล้วดูว่าข้อความเข้า Netlify → Forms ไหม ถ้าเข้า Forms แต่เมลไม่มา ให้ตั้ง notification ใหม่ที่ Configuration → Notifications

---

## 6. สำหรับนักพัฒนาที่รับช่วงต่อ

### เทคโนโลยี

- **Astro 6** (static site) + **Tailwind CSS v4** (ผ่าน `@tailwindcss/vite`) — สไตล์หลักส่วนใหญ่เป็น CSS ตรง ๆ ใน `src/styles/global.css`
- **Decap CMS** (`public/admin/config.yml`) backend แบบ `git-gateway` — ผูกกับ Netlify Identity
- **Leaflet** (bundle ในโปรเจกต์ ~147KB โหลดเฉพาะหน้า contact) — แผนที่รัศมีบริการ 15 กม. จากแยกศาลเด็ก (18.8037866, 99.0182146)
- **sharp** มีใน node_modules — ใช้ย่อรูปผู้ใช้เป็น WebP (คุณภาพ ~80–82) ก่อนเอาเข้าเว็บเสมอ ต้นฉบับมักมาเป็น PNG/JPG 2–18MB
- Node.js >= 22.12 (กำหนดใน `package.json` engines และ `netlify.toml`)

### โครงสร้างที่ต้องรู้

```
src/
  layouts/BaseLayout.astro   ← <head>, ฟอนต์, GA, JS กลาง (สลับภาษา, FAQ accordion, count-up)
  components/Header.astro    ← เมนู (พับเป็น burger ที่ <1100px)
  components/Footer.astro
  pages/                     ← 1 ไฟล์ = 1 หน้า (index, services, pricing, about, contact, careers, faq, portfolio, blog, tools/*)
  content/blog|portfolio|faq ← เนื้อหา markdown (ฝั่ง CMS แก้ตรงนี้)
  data/settings.json         ← เบอร์/LINE/FB/อีเมล/gaId (ฝั่ง CMS แก้ผ่าน "ตั้งค่าเว็บไซต์")
  styles/global.css          ← design system ทั้งหมด (โทนดำ-เทา เขียว accent)
public/assets/img/           ← รูปทั้งหมด แยกโฟลเดอร์ตามหน้า แต่ละโฟลเดอร์มี README.txt บอกชื่อไฟล์ที่ต้องใช้
```

### แบบแผนสำคัญ (ทำตามเสมอ)

1. **สองภาษาในทุกข้อความ:** `<span class="lang-th">ไทย</span><span class="lang-en">EN</span>` — JS ใน BaseLayout สลับด้วย class `en` บน `<body>` / ภาษาอังกฤษแบบขึ้นบรรทัดใหม่ใช้ `lang-en block`
2. **ห้ามตั้ง `display` บน span `.lang-th`/`.lang-en` ตรง ๆ** — จะทับกลไกซ่อน/แสดงภาษา ถ้าต้องจัด layout ให้ห่อด้วย span ชั้นนอกแล้วสไตล์ตัวห่อแทน
3. **Astro scoped style ไม่ครอบ DOM ที่ JS สร้างทีหลัง** — ต้องใช้ `:global()` และสไตล์ที่ใช้ข้ามหน้าให้ย้ายไป global.css
4. **คลาส `.hero` บังคับสูงเต็มจอ** (`min-height:calc(100svh - 72px)`) — หน้าที่ไม่ต้องการให้ override ด้วย `min-height:0` (ดูตัวอย่างใน contact.astro)
5. **Leaflet ต้อง `setView()` ก่อน `addTo()`** — ไม่งั้นพังเงียบไม่มี error
6. **ชื่อไฟล์รูปตัวพิมพ์เล็กเสมอ** (เหตุผลในข้อ Troubleshooting)
7. **รวมงานหลาย ๆ อย่างเป็น push เดียว** — ทุก push กิน ~15 credits
8. **บน Windows: ปิด dev server ก่อน git checkout/merge** — ไฟล์ล็อกทำ merge พังได้

### ฟอร์ม /contact

ฟอร์มชื่อ `contact` แบบ Netlify Forms — **ห้ามเปลี่ยนค่า `name="contact"` และ hidden field `form-name`** ไม่งั้นข้อมูลเก่าใน dashboard จะแยกเป็นคนละฟอร์มและ notification ต้องตั้งใหม่ ช่อง `company` คือ honeypot กันบอท ต้องคงไว้และห้ามแสดงผล

---

## 7. เช็คลิสต์ส่งต่องาน (เปลี่ยนผู้ดูแล/นักพัฒนา)

- [ ] GitHub: เพิ่ม collaborator ใน repo `whatthehouse/wth-website` (หรือโอน ownership)
- [ ] Netlify: เพิ่ม team member (ได้สิทธิ์ดู Forms + Deploys + Identity)
- [ ] Namecheap: **ห้ามให้รหัสบัญชีหลัก** — โดเมนคือทรัพย์สินของธุรกิจ ให้คงอยู่กับเจ้าของเสมอ
- [ ] /admin: เชิญอีเมลผู้ดูแลใหม่ผ่าน Netlify Identity → Invite users
- [ ] แจ้งกติกาสำคัญ: รวบ deploy (credits), ชื่อไฟล์ตัวพิมพ์เล็ก, ห้ามแตะชื่อฟอร์ม `contact`
- [ ] ถอนสิทธิ์คนเก่าออกจากทุกระบบเมื่อส่งต่อเสร็จ
