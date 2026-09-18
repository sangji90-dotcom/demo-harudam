/**
 * 데모용 제품 이미지 생성기.
 *
 * 실제 납품 시에는 고객사 제품 사진으로 전부 교체합니다(README 체크리스트).
 *
 *   node scripts/gen-sample-images.mjs
 *
 * 주의: 제품마다 그림이 달라야 합니다.
 * 카테고리별로만 다르게 만들었더니 같은 카테고리 제품이 픽셀까지 동일해져
 * Astro 가 하나로 합쳐버렸고, 목록에서 제품이 전부 같아 보였습니다.
 * 화장품은 유형마다 용기가 다르므로 그것을 형태로 구분합니다.
 *
 * overlay 카드(3:4)로 잘려도 형태가 남도록 중앙보다 위에 배치합니다.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const out = new URL('../src/assets/products/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });

const W = 1200;
const H = 900;
const CX = W / 2;
const CY = H / 2 - 40;

const LINE = 'rgba(60,45,38,0.55)';
const FILL = 'rgba(255,255,255,0.74)';

/** 용기 형태 — 제품 유형에 맞춰 고릅니다 */
const SHAPES = {
  // 긴 펌프 병 (토너)
  'bottle-tall': `
    <rect x="${CX - 78}" y="${CY - 130}" width="156" height="320" rx="22"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 26}" y="${CY - 192}" width="52" height="64" rx="10"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 48}" y="${CY - 40}" width="96" height="92" rx="8"
          fill="none" stroke="${LINE}" stroke-width="5" opacity="0.45"/>`,

  // 스포이드 병 (세럼)
  dropper: `
    <rect x="${CX - 66}" y="${CY - 70}" width="132" height="230" rx="18"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 34}" y="${CY - 118}" width="68" height="52" rx="8"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <line x1="${CX}" y1="${CY - 118}" x2="${CX}" y2="${CY - 196}"
          stroke="${LINE}" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="${CX}" cy="${CY - 212}" rx="22" ry="28"
             fill="${FILL}" stroke="${LINE}" stroke-width="7"/>`,

  // 넓고 낮은 자 (크림)
  jar: `
    <rect x="${CX - 120}" y="${CY - 20}" width="240" height="150" rx="20"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 134}" y="${CY - 74}" width="268" height="62" rx="16"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <line x1="${CX - 100}" y1="${CY + 60}" x2="${CX + 100}" y2="${CY + 60}"
          stroke="${LINE}" stroke-width="5" opacity="0.4"/>`,

  // 튜브 (클렌저)
  tube: `
    <path d="M ${CX - 74} ${CY - 118} L ${CX + 74} ${CY - 118}
             L ${CX + 58} ${CY + 172} L ${CX - 58} ${CY + 172} Z"
          fill="${FILL}" stroke="${LINE}" stroke-width="7" stroke-linejoin="round"/>
    <rect x="${CX - 36}" y="${CY - 168}" width="72" height="52" rx="9"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <line x1="${CX - 92}" y1="${CY + 172}" x2="${CX + 92}" y2="${CY + 172}"
          stroke="${LINE}" stroke-width="9" stroke-linecap="round"/>`,

  // 작고 납작한 튜브 (선크림)
  'tube-small': `
    <path d="M ${CX - 58} ${CY - 60} L ${CX + 58} ${CY - 60}
             L ${CX + 46} ${CY + 150} L ${CX - 46} ${CY + 150} Z"
          fill="${FILL}" stroke="${LINE}" stroke-width="7" stroke-linejoin="round"/>
    <rect x="${CX - 30}" y="${CY - 108}" width="60" height="46" rx="8"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <line x1="${CX - 76}" y1="${CY + 150}" x2="${CX + 76}" y2="${CY + 150}"
          stroke="${LINE}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="${CX}" cy="${CY + 40}" r="26" fill="none"
            stroke="${LINE}" stroke-width="5" opacity="0.4"/>`,

  // 큰 펌프 병 (바디워시·샴푸)
  pump: `
    <rect x="${CX - 96}" y="${CY - 96}" width="192" height="290" rx="20"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 28}" y="${CY - 150}" width="56" height="56" rx="9"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <path d="M ${CX + 28} ${CY - 134} h 46 a 13 13 0 0 1 13 13 v 20"
          fill="none" stroke="${LINE}" stroke-width="7" stroke-linecap="round"/>
    <rect x="${CX - 62}" y="${CY - 10}" width="124" height="104" rx="8"
          fill="none" stroke="${LINE}" stroke-width="5" opacity="0.45"/>`,

  // 넓은 통 (바디로션)
  'bottle-wide': `
    <rect x="${CX - 108}" y="${CY - 70}" width="216" height="250" rx="26"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 40}" y="${CY - 122}" width="80" height="54" rx="10"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <line x1="${CX - 70}" y1="${CY + 70}" x2="${CX + 70}" y2="${CY + 70}"
          stroke="${LINE}" stroke-width="5" opacity="0.4"/>`,

  // 거품 펌프 (핸드워시)
  foam: `
    <rect x="${CX - 68}" y="${CY - 40}" width="136" height="216" rx="16"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 40}" y="${CY - 96}" width="80" height="58" rx="10"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 62}" y="${CY - 134}" width="124" height="40" rx="12"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <circle cx="${CX - 24}" cy="${CY - 170}" r="16" fill="none" stroke="${LINE}" stroke-width="5" opacity="0.5"/>
    <circle cx="${CX + 18}" cy="${CY - 186}" r="11" fill="none" stroke="${LINE}" stroke-width="5" opacity="0.4"/>`,

  // 손잡이 달린 대용량 (세탁 세제)
  jug: `
    <rect x="${CX - 100}" y="${CY - 80}" width="200" height="260" rx="20"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <path d="M ${CX + 100} ${CY - 40} h 44 a 16 16 0 0 1 16 16 v 56
             a 16 16 0 0 1 -16 16 h -44"
          fill="none" stroke="${LINE}" stroke-width="7"/>
    <rect x="${CX - 36}" y="${CY - 132}" width="72" height="54" rx="10"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <line x1="${CX - 64}" y1="${CY + 80}" x2="${CX + 64}" y2="${CY + 80}"
          stroke="${LINE}" stroke-width="5" opacity="0.4"/>`,

  // 좁고 긴 병 (주방 세제)
  slim: `
    <rect x="${CX - 56}" y="${CY - 110}" width="112" height="290" rx="18"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>
    <path d="M ${CX - 22} ${CY - 110} v -46 h 44 v 46"
          fill="${FILL}" stroke="${LINE}" stroke-width="7" stroke-linejoin="round"/>
    <rect x="${CX - 26}" y="${CY - 186}" width="52" height="32" rx="8"
          fill="${FILL}" stroke="${LINE}" stroke-width="7"/>`,

  // 리드 디퓨저
  diffuser: `
    <path d="M ${CX - 62} ${CY + 172} L ${CX - 52} ${CY + 30}
             Q ${CX - 48} ${CY - 10} ${CX - 24} ${CY - 30}
             L ${CX + 24} ${CY - 30}
             Q ${CX + 48} ${CY - 10} ${CX + 52} ${CY + 30}
             L ${CX + 62} ${CY + 172} Z"
          fill="${FILL}" stroke="${LINE}" stroke-width="7" stroke-linejoin="round"/>
    <line x1="${CX - 34}" y1="${CY - 34}" x2="${CX - 62}" y2="${CY - 190}" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>
    <line x1="${CX - 10}" y1="${CY - 34}" x2="${CX - 18}" y2="${CY - 214}" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>
    <line x1="${CX + 14}" y1="${CY - 34}" x2="${CX + 30}" y2="${CY - 200}" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>
    <line x1="${CX + 34}" y1="${CY - 34}" x2="${CX + 66}" y2="${CY - 176}" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>`,

  // 리필 파우치 (예비)
  pouch: `
    <path d="M ${CX - 90} ${CY - 120} h 180 l -14 300 h -152 Z"
          fill="${FILL}" stroke="${LINE}" stroke-width="7" stroke-linejoin="round"/>
    <line x1="${CX - 90}" y1="${CY - 88}" x2="${CX + 90}" y2="${CY - 88}"
          stroke="${LINE}" stroke-width="5" opacity="0.5"/>`,
};

/**
 * 제품별 배경색.
 * 같은 카테고리 안에서도 조금씩 달라야 목록이 단조롭지 않습니다.
 */
const ITEMS = [
  ['toner-01', 'bottle-tall', '#efdccd', '#d3ab8e'],
  ['serum-02', 'dropper', '#e9d6cc', '#c99f89'],
  ['cream-03', 'jar', '#f0e0d0', '#cfa68c'],
  ['cleanser-04', 'tube', '#ecdcd2', '#c6a795'],
  ['sunscreen-05', 'tube-small', '#f2e2cc', '#d7b183'],
  ['bodywash-06', 'pump', '#dbe3d6', '#a6b79f'],
  ['bodylotion-07', 'bottle-wide', '#e0e6da', '#b0bea8'],
  ['shampoo-08', 'pump', '#d6dfda', '#9db4ab'],
  ['handwash-09', 'foam', '#e2e7dd', '#aebfa6'],
  ['detergent-10', 'jug', '#e4ded4', '#bbae9c'],
  ['dishsoap-11', 'slim', '#e8e2d7', '#c2b5a1'],
  ['diffuser-12', 'diffuser', '#e0d9cf', '#b3a695'],
];

for (const [slug, shape, from, to] of ITEMS) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <circle cx="${CX}" cy="${CY + 10}" r="250" fill="rgba(255,255,255,0.18)"/>
    ${SHAPES[shape]}
  </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(`${out}${slug}.jpg`);
}

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#e8d3c4"/><stop offset="100%" stop-color="#b4674a"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="330" font-family="Arial, Helvetica, sans-serif" font-size="76"
        font-weight="700" fill="#2b1f19">하루담</text>
  <text x="80" y="404" font-family="Arial, Helvetica, sans-serif" font-size="34"
        fill="rgba(43,31,25,0.78)">매일 쓰는 것에 더 신경 씁니다</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(new URL('../public/og-default.png', import.meta.url).pathname);

console.log(`제품 이미지 ${ITEMS.length}개와 OG 이미지를 생성했습니다.`);

/**
 * ------------------------------------------------------------
 *  홈 슬라이드 배너 + 기획전 배너
 * ------------------------------------------------------------
 *  배너는 넓게 잘리므로(풀블리드) 가로로 길게 만듭니다.
 *  문구는 컴포넌트가 이미지 위에 얹으므로, 글자가 놓일 쪽은
 *  일부러 비워 두고 형태는 반대쪽에 배치했습니다.
 */
const SW = 1920;
const SH = 760;

const BANNERS = [
  // [파일명, 배경 시작색, 끝색, 형태를 놓을 쪽, 원 색]
  ['slide-01', '#f4e5d8', '#d9b195', 'left', 'rgba(255,255,255,0.32)'],
  ['slide-02', '#8c4b33', '#4a2419', 'right', 'rgba(255,255,255,0.14)'],
  ['slide-03', '#e3e8dd', '#a9bba1', 'left', 'rgba(255,255,255,0.3)'],
];

const slidesOut = new URL('../src/assets/slides/', import.meta.url).pathname;
mkdirSync(slidesOut, { recursive: true });

for (const [slug, from, to, side, circle] of BANNERS) {
  const x = side === 'left' ? SW * 0.26 : SW * 0.74;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="${SW}" height="${SH}" fill="url(#bg)"/>
    <circle cx="${x}" cy="${SH * 0.52}" r="240" fill="${circle}"/>
    <circle cx="${x + 190}" cy="${SH * 0.72}" r="120" fill="${circle}" opacity="0.7"/>
    <circle cx="${x - 210}" cy="${SH * 0.3}" r="80" fill="${circle}" opacity="0.6"/>
  </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(`${slidesOut}${slug}.jpg`);
}

/**
 * 기획전 배너는 public/ 에 둡니다 — 고객사가 파일만 덮어쓰면 되도록.
 * 그래서 빌드 최적화를 거치지 않으니 여기서 적당한 크기로 줄여 둡니다.
 */
const promo = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="500">
  <defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="0.6">
    <stop offset="0%" stop-color="#7d4330"/><stop offset="100%" stop-color="#c08a63"/>
  </linearGradient></defs>
  <rect width="1600" height="500" fill="url(#p)"/>
  <circle cx="1240" cy="250" r="210" fill="rgba(255,255,255,0.16)"/>
  <circle cx="1450" cy="380" r="110" fill="rgba(255,255,255,0.12)"/>
</svg>`;
await sharp(Buffer.from(promo))
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(new URL('../public/promo-first.jpg', import.meta.url).pathname);

console.log(`슬라이드 배너 ${BANNERS.length}개와 기획전 배너를 생성했습니다.`);

