// TargetData.ts (미술 시장 데이터 관측 서비스 버전)

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
}

export const TARGET_CARDS_DATA: TargetData[] = [
    {
        id: 1,
        companyName: '김환기 (Kim Whanki)',
        companyLogoText: 'K',
        title: '전면 점화 (Full Dot Painting)',
        payRange: '₩ 150억 – 200억',
        tags: ['한국 추상', '역대 최고가', '기관 매입 증가'],
        postedDaysAgo: '관측 업데이트 3일 전',
        colorClass: 'market', // 시장 집중 관측
    },
    {
        id: 2,
        companyName: 'Banksy',
        companyLogoText: 'B',
        title: 'Girl with Balloon (Signed Print)',
        payRange: '₩ 8천만 – 1억 2천만',
        tags: ['스트리트 아트', '최근 소더비 낙찰', '희소성 높음'],
        postedDaysAgo: '관측 업데이트 7일 전',
        colorClass: 'discovery', // 신규/발굴 관심
    },
    {
        id: 3,
        companyName: 'Yayoi Kusama',
        companyLogoText: 'Y',
        title: 'Infinity Nets Series',
        payRange: '₩ 40억 – 60억',
        tags: ['일본 현대 미술', '전시회 활발', '포트폴리오 전략'],
        postedDaysAgo: '관측 업데이트 1일 전',
        colorClass: 'strategy', // 전략적 투자 대상
    },
    {
        id: 4,
        companyName: 'Amedeo Modigliani',
        companyLogoText: 'M',
        title: 'Nude Couché (Study)',
        payRange: '₩ 800억 – 1,000억',
        tags: ['서양 근대', '대형 컬렉터 관심', '장기 보유 추천'],
        postedDaysAgo: '관측 업데이트 10일 전',
        colorClass: 'market',
    },
];