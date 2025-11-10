// AuctionData.ts

// -------------------------------------------------------------------------
// 1. 타입 정의
// -------------------------------------------------------------------------

export interface StatisticCardProps {
  label: string;
  value: string;
  iconName: 'search' | 'chart-line' | 'dollar-sign' | 'users' | 'wrench'; 
  change: string;
  changeColor: string;
}

export interface AuctionCategoryData {
  category: string;
  ratioText: string; 
  percentage: string; 
  progress: number; 
}

// -------------------------------------------------------------------------
// 2. 색상 정의
// -------------------------------------------------------------------------
const COLORS = {
  textLight: '#718096', 
  green: '#059669', 
  red: '#EF4444', 
};

// -------------------------------------------------------------------------
// 3. 데이터 정의
// -------------------------------------------------------------------------

export const AUCTION_DATA = {
  // 상단 통계 카드 데이터
  statisticCards: [
    {
      label: '총 경매',
      value: '1,247',
      iconName: 'wrench' as const, 
      change: '이번 달',
      changeColor: COLORS.textLight, 
    },
    {
      label: '낙찰 건수',
      value: '892',
      iconName: 'chart-line' as const, 
      change: '+12.3%',
      changeColor: COLORS.green, 
    },
    {
      label: '총 거래액',
      value: '₩12.4억',
      iconName: 'dollar-sign' as const, 
      change: '-3.2%',
      changeColor: COLORS.red, 
    },
    {
      label: '활성 사용자',
      value: '3,456',
      iconName: 'users' as const, 
      change: '이번 주',
      changeColor: COLORS.textLight, 
    },
  ],

  // 낙찰 성공률 데이터
  auctionSuccessRate: {
    rate: '71.5%',
    description: '전체 경매 대비 낙찰된 비율',
    totalText: '892 / 1247',
    totalLabel: '건수',
    progress: 0.715, 
    completedCount: '892건',
    completedLabel: '낙찰 완료',
    failedCount: '355건',
    failedLabel: '유찰',
  },

  // 평균 낙찰가 데이터
  averageAuctionPrice: {
    averagePrice: '₩1,395,000',
    averageLabel: '건당 평균',
    minPrice: '₩250,000',
    maxPrice: '₩15,800,000',
    medianPrice: '₩980,000',
    minLabel: '최저가',
    maxLabel: '최고가',
    medianLabel: '중앙값',
  },

  // 카테고리별 낙찰 현황 데이터
  categoryAuctionStatus: [
    { category: '부동산', ratioText: '268/342', percentage: '78.5%', progress: 0.785 },
    { category: '차량', ratioText: '311/456', percentage: '68.2%', progress: 0.682 },
    { category: '기계/설비', ratioText: '154/234', percentage: '65.8%', progress: 0.658 },
    { category: '기타 동산', ratioText: '155/215', percentage: '72.1%', progress: 0.721 },
  ],
};