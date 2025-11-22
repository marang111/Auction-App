import { ImageSourcePropType } from 'react-native';

// -------------------------------------------------------------------------
// 1. 디자인 가이드 및 타입 정의 (공통 사용)
// -------------------------------------------------------------------------

export const COLORS = {
    TEXT_DARK: '#2D3748',
    TEXT_MEDIUM: '#4A5568',
    TEXT_ACCENT: '#38A169', 
    TEXT_NEGATIVE: '#E53E3E', 
    SURFACE_CARD: '#FFFFFF',
    DIVIDER_LIGHT: '#E2E8F0',
    INFO_HIGHLIGHT: '#4299E1',
};

export type CardType = 'auction_focus' | 'data_insight';

export interface TrendItem {
    id: number;
    type: CardType;          
    title: string;           
    description: string;     
    
    // require()의 결과는 ImageSourcePropType로 처리할 수 있습니다.
    image?: ImageSourcePropType; 
    auctionInfo?: string[];     
    estimatedPrice?: string;  
    subInfo?: string;         
    changeValue?: string;     
    artistList?: { name: string; tag: string }[]; 
    longCaption?: string;
}

// -------------------------------------------------------------------------
// 2. 데이터 정의 (로컬 이미지 경로 주의)
// -------------------------------------------------------------------------

/**
 * ⭐️ 분리된 작품: 주목받는 작품이에요 (Focus Artwork)
 */
export const FOCUS_ARTWORK_DATA: TrendItem[] = [
    { 
        id: 1, 
        type: 'auction_focus', 
        title: '주목받는 작품이에요', 
        description: ['Quattro, 1987'],
        image: require('../../../assets/images/art&auction/mona.png'),
        auctionInfo: ['최고가'],
        estimatedPrice: '추정가 1,200,000,000 ₩',
        // ✨ 길게 작품을 소개하는 캡션
        longCaption: 
            "이 작품은 한국 추상미술의 거장 김환기 화백이 뉴욕 시기에 완성한 '전면 점화' 중 하나로, 우주의 본질과 예술적 고독을 담아내며 한국 단색화의 정점으로 평가받습니다. 그의 작품 중에서도 가장 높은 경매가를 기록하며 시대를 초월하는 영향력과 미술사적 가치를 입증했습니다. 순수함과 무한한 깊이를 동시에 표현하는 그의 스타일은 현재 글로벌 컬렉터들에게도 뜨거운 관심을 받고 있습니다.",
    },
];

/**
 * ⭐️ 나머지 트렌드 데이터 (id: 1 제외)
 */
export const TREND_DATA: TrendItem[] = [
    { 
        id: 2, 
        type: 'data_insight', 
        title: 'NFT 핫 트렌드', 
        description: ['CryptoPunks #1111, 바닥가 갱신 시도'],
        // image: require('../../../assets/images/art&auction/CryptoPunks.png'),
        estimatedPrice: '52.3 ETH',
        subInfo: 'CryptoPunks | 거래코드: 0x932a7e',
        changeValue: '-2.1% ↓', 
    },
    { 
        id: 3, 
        type: 'auction_focus', 
        title: '떠오르는 투자 키워드: 포스트-아웃사이더 아트', 
        description: [
            "이수민 'City Dawn' 낙찰가 주목",
            '신진 작가 부상',
            '대안적 회화',
            '낙찰가 상승'
        ],
        image: require('../../../assets/images/art&auction/pithon.png'),
        auctionInfo: '온라인 경매 C사 | 마감 1일 전',
        estimatedPrice: '₩ 1,200만 ~ 1,800만',
    },
    // { 
    //     id: 4, 
    //     type: 'auction_focus', 
    //     title: '홍콩 크리스티, 20세기 거장 컬렉션', 
    //     description: [
    //         '130여점 대규모 컬렉션', 
    //         '거장 회귀',
    //         '국제 컬렉션',
    //     ],
    //     image: require('../../../assets/images/art&auction/Jeffrey.png'),
    //     auctionInfo: 'Christie\'s | 11.20 | 18:00 (HKT)',
    //     estimatedPrice: '총 25억 달러 규모',
    // },
    {
        id: 5,
        type: 'data_insight', 
        title: '라이징 아티스트 포트폴리오',
        description: ['최근 3개월 간 주요 갤러리 계약 및 전시 횟수 기준'],
        artistList: [
            { name: '김환기 (회화)', tag: '시장가 블루칩 유지' },
            { name: 'Yayoi Kusama (조각/설치)', tag: '글로벌 수요 견조' },
            { name: 'Gerhard Richter (회화)', tag: '주요 경매가 고공행진' },
            { name: '박서보 (추상회화)', tag: '전속·회고전 지속 확대' },
            { name: 'David Hockney (회화/디지털)', tag: '프라이머리·세컨더리 강세' },
            { name: '이우환 (회화/조각)', tag: '기관 소장 증가세' },
        ],
        estimatedPrice: '',
        subInfo: '평균 작품가 3천만원 이하',
        changeValue: '↑', 
    },
    {
        id: 6,
        type: 'auction_focus',
        title: '동남아시아 현대미술 트렌드',
        description: [
            "Indra Dodi (인도네시아), 'Village Life' 최고가 갱신",
            '아시아 신흥시장',
            '현지 컬렉터 부상',
            '낙찰가 갱신'],
            image: require('../../../assets/images/art&auction/dongnam.png'),
        auctionInfo: '소더비 아시아 | Lot. 201',
        estimatedPrice: '₩ 8천만 ~ 1억 2천만',
    }
];