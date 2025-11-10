import { COLORS } from './colors';
import { ActionChip, NextActionPromptType, PersonalMetricsType, RiskExposureItem, WorkItem } from './hubTypes';

// ⭐️ 데이터 기반 안내 목적의 개인 지표
export const PERSONAL_METRICS: PersonalMetricsType = {
    portfolio: { 
        totalWorks: 124, 
        estimatedValue: '5.4억원', 
        icon: 'folder-outline', 
        label: '나의 시장 관심 포트폴리오' 
    },
    marketTrend: { 
        upArtists: 7, 
        downArtists: 2, 
        icon: 'trending-up-outline', 
        label: '주요 관심 작가 시장 동향 (30일)' 
    },
    genrePerformance: { 
        genre: '단색화', 
        rate: '72%', 
        icon: 'stats-chart-outline', 
        label: '내 관심 장르 낙찰 경향 (90일)' 
    },
};

// ⭐️ 개인화된 유용한 인사이트 알람
export const NEXT_ACTION_PROMPT: NextActionPromptType = {
    needsInsight: true,
    type: 'VALUE_UPDATE', 
    subject: '김환기',
    detail: '최고가 작품 추정가 상향',
};

// ⭐️ 작가 집중도
export const RISK_EXPOSURE: RiskExposureItem[] = [
    { artist: '김환기', percentage: 45, color: COLORS.DEEP_NAVY },
    { artist: '이우환', percentage: 15, color: COLORS.ACCENT_GOLD },
    { artist: '앤디 워홀', percentage: 10, color: COLORS.CHARCOAL_GRAY },
    { artist: '기타', percentage: 30, color: COLORS.LIGHT_GRAY },
];

// 액션 칩
export const ACTION_CHIPS: ActionChip[] = [
    { id: 1, title: '내 찜 목록', icon: "heart-outline" },
    { id: 2, title: '최근 본 작품', icon: 'eye-outline' },
    { id: 3, title: '시장 뉴스', icon: 'newspaper-outline' },
    { id: 4, title: '작가 팔로우', icon: 'person-add-outline' },
];

// 관심작품경매성과
export const RECOMMENDED_WORKS: WorkItem[] = [
    { 
        id: 101, 
        title: 'Maurizio Cattelan, Comedian, LongTitleTestWithNoSpaces', 
        currentPrice: 7500000, 
        artist: '관심 작가 유사 작품',
        image: require('../../../assets/images/home/Mypersonalhub/banana.png'),
        status: 'BIDDING',
        performanceVsEstimate: 1.25, 
        totalWatchers: 145,
        lastActivity: '10분 전 입찰', 
    },
    { 
        id: 104, 
        title: 'Picasso - Femme Assise Près d\'une Fenêtre (Marie-Thérèse)', 
        currentPrice: 0, 
        artist: '내가 찜한 작품',
        image: require('../../../assets/images/home/Mypersonalhub/butda.jpg'),
        status: 'WISHED',
        performanceVsEstimate: 0, 
        totalWatchers: 320, 
        lastActivity: '2일 전 등록',
    },
    { 
        id: 102, 
        title: 'Christies - Indian, Himalayan And Southeast Asian Art', 
        currentPrice: 1950000,
        artist: '최근 관심 경매 유사',
        image: require('../../../assets/images/home/Mypersonalhub/blue_sensational.jpg'),
        status: 'WISHED',
        performanceVsEstimate: 0.9, 
        totalWatchers: 289,
        lastActivity: '어제 14:30 찜',
    },
];