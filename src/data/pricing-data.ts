// ─────────────────────────────────────────────────────────────────────────────
// Shared pricing data — the single source of truth for BOTH the public pricing
// page (/pricing) and the hidden partner page (/partner). Change a rate here and
// it updates on both pages. Keep this file free of page-specific markup/logic.
// ─────────────────────────────────────────────────────────────────────────────

// ── VAT statement ──────────────────────────────────────────────────────────
// Deliberately NOT stated anywhere yet — the owner is still registering the company.
// Planned policy once registered: the quoted prices are the base, and VAT is ADDED
// ON TOP for customers who want a tax invoice (the customer bears it).
// To switch it on later, just fill this in — it then shows on the page, in the
// calculator result and on the PDF quotation automatically:
//   export const VAT_NOTE = { th: 'ราคายังไม่รวมภาษีมูลค่าเพิ่ม 7% (กรณีต้องการใบกำกับภาษี)',
//                             en: 'Prices exclude 7% VAT (added if a tax invoice is required).' };
export const VAT_NOTE: { th: string; en: string } | null = null;
export const QUOTE_VALID_DAYS = 30;

// ── Packages ───────────────────────────────────────────────────────────────
// The rate-card tables are the 2-round price (the main package).
// A single-round package is 25% cheaper (75% of the 2-round price) for budget /
// second-hand / one-opinion customers. Buying the 2nd round LATER costs 30% of
// the 2-round price — so single round + a later 2nd round (75%+30% = 105%) is
// always dearer than taking the 2-round package up front. That's deliberate.
// All derived prices are rounded UP to a whole 500.
export const ROUND1_RATIO = 0.75;
export const ROUND2_LATER_RATIO = 0.30;
export const roundUp500 = (n: number) => Math.ceil(n / 500) * 500;
export const onePrice = (p: number | null) => (p === null ? null : roundUp500(p * ROUND1_RATIO));

// ── Property types & price tiers (from the company rate card) ───────────────
export const types = [
  {
    id: 'condo',
    th: 'คอนโดมิเนียม', en: 'Condominium',
    icon: `<svg viewBox="0 0 24 24" width="26" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v18M16 3v18M2 9h20M2 15h20"/></svg>`,
    tiers: [
      { max: 30,  price: 3000,  th: 'ไม่เกิน 30 ตร.ม.', en: 'Up to 30 sq.m.' },
      { max: 50,  price: 4000,  th: '31–50 ตร.ม.',      en: '31–50 sq.m.' },
      { max: 70,  price: 5000,  th: '51–70 ตร.ม.',      en: '51–70 sq.m.' },
      { max: 100, price: 6000,  th: '71–100 ตร.ม.',     en: '71–100 sq.m.' },
      { max: 150, price: 8000,  th: '101–150 ตร.ม.',    en: '101–150 sq.m.' },
      { max: 200, price: 10000, th: '151–200 ตร.ม.',    en: '151–200 sq.m.' },
      { max: null, price: null, th: 'มากกว่า 200 ตร.ม.', en: 'Over 200 sq.m.' },
    ],
  },
  {
    id: 'house1',
    th: 'บ้านชั้นเดียว', en: 'Single-storey house',
    icon: `<svg viewBox="0 0 24 24" width="26" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 21v-6h6v6"/></svg>`,
    tiers: [
      { max: 120, price: 5000,  th: 'ไม่เกิน 120 ตร.ม.', en: 'Up to 120 sq.m.' },
      { max: 150, price: 6000,  th: '121–150 ตร.ม.',     en: '121–150 sq.m.' },
      { max: 200, price: 7000,  th: '151–200 ตร.ม.',     en: '151–200 sq.m.' },
      { max: 250, price: 8000,  th: '201–250 ตร.ม.',     en: '201–250 sq.m.' },
      { max: 300, price: 9000,  th: '251–300 ตร.ม.',     en: '251–300 sq.m.' },
      { max: 350, price: 10000, th: '301–350 ตร.ม.',     en: '301–350 sq.m.' },
      { max: 400, price: 12000, th: '351–400 ตร.ม.',     en: '351–400 sq.m.' },
      { max: 500, price: 15000, th: '401–500 ตร.ม.',     en: '401–500 sq.m.' },
      { max: null, price: null, th: 'มากกว่า 500 ตร.ม.',  en: 'Over 500 sq.m.' },
    ],
    note: { th: 'ราคาเริ่มต้นใช้กับบ้านมาตรฐาน ไม่มีสระว่ายน้ำ อาคารแยก ลิฟต์ หรืองานระบบพิเศษ', en: 'Starting price applies to standard homes — no pool, separate building, lift or special systems.' },
  },
  {
    id: 'house2',
    th: 'บ้านสองชั้น / บ้านแฝด', en: 'Two-storey / semi-detached',
    icon: `<svg viewBox="0 0 24 24" width="26" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10l9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M5 15h14"/><path d="M10 21v-4h4v4"/></svg>`,
    tiers: [
      { max: 150, price: 6000,  th: 'ไม่เกิน 150 ตร.ม.', en: 'Up to 150 sq.m.' },
      { max: 200, price: 7000,  th: '151–200 ตร.ม.',     en: '151–200 sq.m.' },
      { max: 250, price: 8000,  th: '201–250 ตร.ม.',     en: '201–250 sq.m.' },
      { max: 300, price: 9000,  th: '251–300 ตร.ม.',     en: '251–300 sq.m.' },
      { max: 350, price: 10000, th: '301–350 ตร.ม.',     en: '301–350 sq.m.' },
      { max: 400, price: 12000, th: '351–400 ตร.ม.',     en: '351–400 sq.m.' },
      { max: 500, price: 15000, th: '401–500 ตร.ม.',     en: '401–500 sq.m.' },
      { max: null, price: null, th: 'มากกว่า 500 ตร.ม.',  en: 'Over 500 sq.m.' },
    ],
    note: { th: 'บ้านสองชั้นมีภาระงานมากกว่า ต้องตรวจบันได จุดต่อระหว่างชั้น ห้องน้ำชั้นบน และหลังคาที่เข้าถึงยากกว่า', en: 'Two-storey homes take more work — stairs, floor junctions, upper bathrooms and less accessible roof areas.' },
  },
  {
    id: 'townhome',
    th: 'ทาวน์โฮม / ทาวน์เฮาส์', en: 'Townhome / Townhouse',
    icon: `<svg viewBox="0 0 24 24" width="26" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 21V10l5-4 5 4v11"/><path d="M12 21V10l5-4 5 4v11"/><path d="M2 21h20"/></svg>`,
    tiers: [
      { max: 120, price: 5000,  th: 'ไม่เกิน 120 ตร.ม.', en: 'Up to 120 sq.m.' },
      { max: 150, price: 6000,  th: '121–150 ตร.ม.',     en: '121–150 sq.m.' },
      { max: 200, price: 7000,  th: '151–200 ตร.ม.',     en: '151–200 sq.m.' },
      { max: 250, price: 8000,  th: '201–250 ตร.ม.',     en: '201–250 sq.m.' },
      { max: 300, price: 9000,  th: '251–300 ตร.ม.',     en: '251–300 sq.m.' },
      { max: 350, price: 10000, th: '301–350 ตร.ม.',     en: '301–350 sq.m.' },
      { max: null, price: null, th: 'มากกว่า 350 ตร.ม.',  en: 'Over 350 sq.m.' },
    ],
  },
];

// ── Optional surcharges. `add` = flat baht, `pct` = % of base, `quote` = forces a custom quote ──
export const options = [
  { id: 'duplex',   for: ['condo'],    add: 2000, th: 'ห้อง Duplex / ห้องสองชั้น',        en: 'Duplex / two-level unit' },
  { id: 'bed3',     for: ['condo'],    add: 1000, th: 'ตั้งแต่ 3 ห้องนอนขึ้นไป',           en: '3 or more bedrooms' },
  { id: 'penthouse',for: ['condo'],    quote: true, th: 'Penthouse / พื้นที่ภายนอกขนาดใหญ่', en: 'Penthouse / large outdoor area' },
  { id: 'floor3',   for: ['townhome'], add: 2000, th: 'ทาวน์โฮม 3 ชั้น',                  en: '3-storey townhome' },
  { id: 'floor4',   for: ['townhome'], add: 3000, th: 'ทาวน์โฮม 4 ชั้น / โฮมออฟฟิศ',       en: '4-storey / home office' },
  { id: 'bath4',    for: ['townhome'], add: 1000, th: 'ห้องน้ำมากกว่า 4 ห้อง',             en: 'More than 4 bathrooms' },
  { id: 'lift',     for: ['house2'], add: 2000, th: 'มีลิฟต์',                            en: 'Has a lift' },
  { id: 'pool',     for: ['house1','house2'], add: 3000, th: 'ตรวจสระว่ายน้ำ',            en: 'Swimming pool inspection' },
  { id: 'solar',    for: ['house1','house2'], add: 3000, th: 'ตรวจระบบโซลาร์เซลล์',       en: 'Solar panel system inspection' },
  { id: 'builtin',  for: ['condo','house1','house2','townhome'], pct: 0.20, th: 'งานบิวต์อินจำนวนมาก', en: 'Extensive built-in furniture' },
  { id: 'used',     for: ['condo','house1','house2','townhome'], pct: 0.25, minCondo: 2000, th: 'ทรัพย์มือสอง', en: 'Second-hand property' },
];

// ── Included scope / extras / custom-quote conditions / terms ───────────────
export const included = {
  th: [
    'ตรวจรับทรัพย์สินใหม่ก่อนโอนกรรมสิทธิ์',
    'ตรวจงานสถาปัตยกรรม ระบบไฟฟ้า ระบบประปา และระบบสุขาภิบาล',
    'ตรวจหลังคาและพื้นที่เหนือฝ้าในจุดที่เข้าถึงได้ (บ้านและทาวน์โฮม)',
    'ตรวจครั้งแรกพร้อมรายงาน PDF และภาพประกอบ',
    'กลับไปตรวจติดตามรายการแก้ไขอีก 1 ครั้ง (เฉพาะแพ็กเกจ 2 รอบ)',
    'ค่าเดินทางภายในเขตบริการปกติของบริษัท',
  ],
  en: [
    'Pre-transfer inspection of new property',
    'Architectural, electrical, plumbing and sanitary systems',
    'Roof and accessible ceiling voids (houses and townhomes)',
    'First inspection with a photo PDF report',
    'One follow-up re-inspection of the listed defects (2-round package only)',
    'Travel within our normal service area',
  ],
};

export const extras = [
  { th: 'ซื้อตรวจรอบที่ 2 ภายหลัง', subTh: '(หลังเลือกแพ็กเกจรอบเดียว)', en: 'Adding round 2 later', subEn: '(after a single-round package)', price: { th: 'คิดค่าบริการเพิ่ม', en: 'Additional charge applies' } },
  { th: 'ตรวจรอบที่ 3 เป็นต้นไป — คอนโด',        en: '3rd round onwards — condo',          price: { th: '1,000 บาท/ครั้ง', en: '1,000 THB/visit' } },
  { th: 'ตรวจรอบที่ 3 เป็นต้นไป — บ้าน/ทาวน์โฮม', en: '3rd round onwards — house/townhome', price: { th: '2,000 บาท/ครั้ง', en: '2,000 THB/visit' } },
  { th: 'บ้านหรือคอนโดมือสอง',                    en: 'Second-hand property',                price: { th: 'เพิ่ม 25%', en: '+25%' } },
  { th: 'ตรวจสระว่ายน้ำ',                         en: 'Swimming pool inspection',            price: { th: '3,000 บาท', en: '3,000 THB' } },
  { th: 'ตรวจระบบโซลาร์เซลล์',                    en: 'Solar panel system inspection',       price: { th: '3,000 บาท', en: '3,000 THB' } },
  { th: 'งานบิวต์อินจำนวนมาก',                    en: 'Extensive built-ins',                 price: { th: 'เพิ่ม 20%', en: '+20%' } },
  { th: 'เดินทางนอกเขตบริการ',                    en: 'Travel outside the service area',     price: { th: 'คิดตามระยะทาง', en: 'By distance' } },
];

export const customQuote = {
  th: [
    'พื้นที่เกินช่วงราคาที่กำหนดในตาราง',
    'อาคารตั้งแต่ 3 ชั้นขึ้นไปที่ไม่ได้ระบุในตาราง',
    'บ้านหรู คฤหาสน์ Penthouse หรืออาคารที่มีงานระบบซับซ้อน',
    'บ้านที่มีสระว่ายน้ำ ลิฟต์ โซลาร์เซลล์ หรือระบบบ้านอัจฉริยะจำนวนมาก',
    'บ้านตัวอย่างหรือทรัพย์ที่มีเฟอร์นิเจอร์บิวต์อินเต็มพื้นที่',
    'บ้านมือสองที่มีอายุ สภาพ หรือประวัติการต่อเติมซับซ้อน',
    'หน้างานต่างจังหวัดหรือพื้นที่ที่มีข้อจำกัดในการเดินทาง',
  ],
  en: [
    'Areas beyond the tiers listed in the tables',
    'Buildings of 3 storeys or more not covered above',
    'Luxury homes, mansions, penthouses or complex building systems',
    'Homes with a pool, lift, solar or extensive smart-home systems',
    'Show homes or properties fully fitted with built-in furniture',
    'Older second-hand homes or complex renovation history',
    'Sites in other provinces or with access limitations',
  ],
};

export const terms = {
  th: [
    `ใบเสนอราคานี้มีอายุ ${QUOTE_VALID_DAYS} วันนับจากวันที่ออกเอกสาร`,
    'ราคาคำนวณจากพื้นที่ใช้สอยตามแบบบ้าน สัญญาซื้อขาย หรือข้อมูลจากโครงการ',
    'ลูกค้าแจ้งประเภททรัพย์ พื้นที่ใช้สอย จำนวนชั้น จำนวนห้องน้ำ และระบบพิเศษก่อนเสนอราคา',
    'หากข้อมูลหน้างานไม่ตรงกับที่แจ้ง บริษัทขอสงวนสิทธิ์ปรับราคาให้เหมาะสมก่อนเริ่มงาน',
    'การตรวจรอบที่ 2 ต้องนัดภายใน 60 วันหลังการตรวจครั้งแรก',
    'การตรวจรอบที่ 2 ครอบคลุมเฉพาะรายการแก้ไขจากรายงานครั้งแรก',
    'การทดสอบเป็นแบบไม่ทำลาย ตรวจเฉพาะพื้นที่หรืออุปกรณ์ที่เข้าถึงได้อย่างปลอดภัย',
    'ราคาไม่รวมการรื้อ เปิดฝ้า เจาะผนัง ทดสอบโครงสร้างเชิงลึก หรือออกใบรับรองทางวิศวกรรม',
    'การเลื่อนนัดกรุณาแจ้งล่วงหน้าไม่น้อยกว่า 24–48 ชั่วโมง',
  ],
  en: [
    `This quotation is valid for ${QUOTE_VALID_DAYS} days from the date of issue`,
    'Pricing is based on usable area from the drawings, sale contract or project data',
    'Please tell us the property type, area, storeys, bathrooms and special systems before we quote',
    'If the site differs from the information given, we may adjust the price before starting',
    'The re-inspection must be booked within 60 days of the first inspection',
    'The re-inspection covers only the defects listed in the first report',
    'Testing is non-destructive and limited to safely accessible areas and equipment',
    'Excludes demolition, opening ceilings, drilling walls, deep structural testing or engineering certification',
    'Please reschedule at least 24–48 hours in advance',
  ],
};
