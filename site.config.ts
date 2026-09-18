/**
 * ============================================================
 *  고객사별 교체 지점 #1 — 사이트 전역 설정
 * ============================================================
 *  새 고객사에 납품할 때 이 파일과 src/styles/tokens.css 두 개만
 *  바꾸면 브랜드 교체가 끝나도록 설계되어 있습니다.
 *  코드(컴포넌트/페이지)는 원칙적으로 건드리지 않습니다.
 * ============================================================
 */

import type {
  NavItem,
  Category,
  LayoutPreset,
  SiteConfig,
} from './src/lib/site-config.types';

// 기존 import 경로(`site.config` 에서 타입을 가져오던 곳)를 위해 다시 내보냅니다
export type { NavItem, Category, LayoutPreset, SiteConfig };

export const siteConfig: SiteConfig = {
  site: 'https://example.com',
  company: '하루담',
  tagline: '매일 쓰는 것에 더 신경 씁니다',
  description:
    '하루담은 순한 성분과 단순한 구성을 원칙으로 스킨케어와 생활용품을 만듭니다. 제품 라인업을 살펴보세요.',
  logo: null,
  ogImage: '/og-default.png',
  lang: 'ko',

  layout: {
    // 국내 쇼핑몰에서 흔한 슬라이드 배너 — src/content/slides 사용
    hero: 'carousel',
    // 사진이 주인공인 카탈로그 — 이미지 위에 텍스트를 얹는 overlay 카드
    productCard: 'overlay',
    // 제품을 하나씩 설명하는 브랜드라 rows
    featured: 'rows',
    // 배너 → 기획전 → 대표 제품 → 브랜드 한마디 → 문의
    homeSections: ['promo', 'featured', 'message', 'cta'],
  },

  brandMessage: {
    title: '적게 넣는 쪽을 택했습니다',
    body: `매일 쓰는 물건은 한 번의 사용감보다 반복했을 때가 중요합니다.
그래서 효과가 분명하지 않은 성분은 넣지 않고, 향은 약하게 두었습니다.
제품 수를 늘리는 대신 하나를 오래 쓰도록 만들었습니다.`,
  },

  nav: [
    { label: '제품', href: '/products' },
    { label: '스킨케어', href: '/products/category/skincare' },
    { label: '바디·헤어', href: '/products/category/body' },
    { label: '생활용품', href: '/products/category/living' },
    { label: '회사소개', href: '/about' },
    { label: '문의', href: '/contact' },
  ],

  utilityNav: {
    left: [{ label: '브랜드 소개', href: '/about/' }],
    right: [
      { label: '제품 문의', href: '/contact/' },
      { label: '개인정보처리방침', href: '/privacy/' },
    ],
  },

  quickLinks: [
    { label: '제품 문의', href: '/contact/' },
    { label: '전화 상담', href: 'tel:02-0000-0000' },
  ],

  promo: {
    title: '첫 구매 안내',
    description: '처음 쓰시는 분을 위해 스킨케어 4종을 묶어 안내해 드립니다.',
    href: '/contact/',
    cta: '문의하고 안내받기',
    image: '/promo-first.jpg',
    keywords: ['토너', '세럼', '선크림', '핸드워시', '디퓨저'],
  },

  categories: [
    {
      id: 'skincare',
      label: '스킨케어',
      description: '피부에 직접 닿는 만큼 성분 수를 줄였습니다.',
    },
    {
      id: 'body',
      label: '바디·헤어',
      description: '매일 쓰는 세정·보습 제품입니다.',
    },
    {
      id: 'living',
      label: '생활용품',
      description: '집 안에서 반복해 쓰는 물건들입니다.',
    },
  ],

  contact: {
    email: 'contact@example.com',
    phone: '02-0000-0000',
    address: '서울특별시 성동구 성수이로 000, 2층',
    businessNumber: '000-00-00000',
    ceo: '홍길동',
  },

  inquiry: {
    mode: 'external',
    // Google Forms → 보내기 → <> 탭의 iframe src 주소를 그대로 붙여넣습니다.
    embedUrl: 'https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true',
  },

  productsPerPage: 12,
  featuredCount: 4,
  enableSearch: true,

  verification: {
    // naver: 'abc123...',
    // google: 'xyz789...',
  },

  analytics: {
    // cloudflareToken: '0123456789abcdef...',
  },

  // 영업용 데모 공개 시 true. 실제 납품 시에는 반드시 false.
  demoBanner: {
    enabled: true,
  },
};

export default siteConfig;
