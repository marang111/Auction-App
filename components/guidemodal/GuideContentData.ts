export interface GuideContent {
  title: string;
  description: string;
  buttonText: string;
}

export const GUIDE_CONTENTS: { [key: string]: GuideContent } = {
  personalHub: {
    title: '가이트 버튼을 활용하세요.',
    description: '가이드가 필요한 영역에서 버튼이 활성화됩니다. \n클릭하여 팝업창에서 디자인 설명을 확인해주세요.',
    buttonText: 'persnal'
  },
  latest: {
    title: '최근 콘텐츠',
    description: '현재 가장 인기 있는 작가들의 실시간 랭킹 변동을 확인하고, 급상승하는 아티스트를 빠르게 찾아보세요.',
    buttonText: '최근 콘텐츠'
  },
  privateSale: { 
    title: '프라이빗 세일 가이드',
    description: '비공개로 진행되는 엄선된 작품들의 프라이빗 세일 정보를 놓치지 마세요. 특별한 기회를 얻을 수 있습니다.',
    buttonText: '프라이빗'
  },
  default: {
    title: '가이트 버튼을 활용하세요.',
    description: '가이드가 필요한 영역에서 버튼이 활성화됩니다. \n클릭하여 팝업창에서 디자인 설명을 확인해주세요.',
    buttonText: '가이드'
  },

  // ----------------------------------------------------
  // 🎨 Art&Auction 화면 콘텐츠 (버튼 텍스트 추가)
  // ----------------------------------------------------
  recommendCard: {
    title: "추천 작품 섹션 가이드",
    description: "나의 관심사와 최근 활동을 기반으로 맞춤형 추천 작품과 경매 정보를 제공합니다. 나만을 위한 큐레이션을 확인해 보세요.",
    buttonText: "추천 작품", 
  },
  hotTrend: {
    title: "Hot Trend 작품",
    description: "현재 시장에서 가장 주목받고 있는 트렌디한 작품들을 모았습니다. 인기 상승 중인 작품들을 탐색해 보세요.",
    buttonText: "가이드", 
  },
  auctionCalendar: {
    title: "주요 경매 일정",
    description: "국내외 주요 경매사들의 다가오는 경매 일정을 달력으로 쉽게 확인하고 알림을 설정할 수 있습니다.",
    buttonText: "경매 일정 가이드", 
  },
  allAuctionList: {
    title: "전체 경매 작품 목록",
    description: "현재 진행 중이거나 예정된 모든 경매 작품 리스트를 제공합니다. 다양한 필터링 옵션을 사용하여 원하는 작품을 찾아보세요.",
    buttonText: "스와이프", 
  },
};
//정상