export type PageName = 'home' | 'market-health' | 'market-scope';
export type CardColorClass = 'market' | 'discovery' | 'strategy'; // 관측 작품 카테고리 분류

export interface TargetData {
    id: number;
    companyName: string;      // 작가명
    companyLogoText: string;  // 작가 이니셜
    title: string;            // 작품 제목 또는 시리즈
    payRange: string;         // 추정 시장가 범위
    tags: string[];           // 관측 태그/특징
    postedDaysAgo: string;    // 관측 업데이트 일자
    colorClass: CardColorClass;
    imageSource: any;
}

export const COLORS = {
    // Theme Colors (RecommendCardSection.tsx에서 사용)
    TEXT_DARK: '#2D3748',    
    PRIMARY_BRAND: '#4299E1', 
    DIVIDER_LIGHT: '#E2E8F0',
    CARD_BG: '#fff', // RecommendCardSection.tsx 배경색

    // Card Specific Colors (RecommendCard.tsx에서 사용)
    CARD_BACKGROUND: '#e5e5e5ff', 
    CARD_SHADOW: '#00000020',
    
    // Text Colors
    TEXT_PRIMARY: '#212529', 
    TEXT_SECONDARY: '#495057', 
    TEXT_TERTIARY: '#ADB5BD', 
    
    // Tag Background Colors
    TAG_BG_LIGHT_BLUE: '#E0F2FF', 
    TAG_BG_LIGHT_PURPLE: '#EBE0FF', 
    TAG_BG_LIGHT_PINK: '#FFE0E6', 
    TAG_BG_LIGHT_YELLOW: '#FFFBE0', 

    // Utility Colors
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.08)', 
    LOGO_COLOR_HOPIN: '#4C6EF5',
};

export const TARGET_CARDS_DATA: TargetData[] = [
    {
        id: 1,
        companyName: '김환기 (Kim Whanki)',
        companyLogoText: 'K',
        title: '전면 점화 (Full Dot Painting)',
        payRange: '150억 – 200억',
        tags: ['한국 추상', '역대 최고가', '기관  매입 증가'],
        postedDaysAgo: '관측 업데이트 3일 전',
        colorClass: 'market', 
        imageSource: require('../../../assets/images/art&auction/dongnam.png'),
    },
];