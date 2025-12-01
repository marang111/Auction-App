// 1. 텍스트 세그먼트 인터페이스 정의: 텍스트 내용과 하이라이트 여부를 포함
export interface StyledTextSegment {
  text: string;
  isHighlight?: boolean; // 이 값이 true일 경우 스타일 적용 (TSX 컴포넌트에서 처리)
}

// 2. PortfolioDetail 인터페이스: 2차원 배열 타입으로 변경
export interface PortfolioDetail {
  planning: StyledTextSegment[][]; 
  design: StyledTextSegment[][];   
  technical: StyledTextSegment[][]; 
}

export interface GuideContent {
  title: string;
  description?: string; // 일반 설명 (Optional)
  buttonText: string; 
  portfolioDetails?: PortfolioDetail;
}

export interface GuideContentsMap {
  [key: string]: GuideContent;
}

// technical은 애니메이션, 인터렉션 기능을 포함함 어디로 가는 기능..그런거
// 디자인은 걍 눈으로 보이는거
export const GUIDE_CONTENTS: { [key: string]: GuideContent } = {
  mainstatus:{
    buttonText: "ON",
    title: "메인 전광판",
    portfolioDetails: {
      planning: [
        [
          { text: "홈 화면의 최상단을 메인 전광판으로 정의하고, 사용자가 가장 먼저 확인해야 할 정보(현재 진행중인 경매, 다가올 경매)를 한눈에 파악할 수 있도록 기획했습니다.", isHighlight: false }
        ]
      ],
      design: [
        [
          { text: "LIVE, Dday의 점멸 애니메이션 배지가 있어 상태를 직관적으로 인지할 수 있습니다. 전광판 영역은 카드 하단의 독립된 정보 박스로 설계했습니다.", isHighlight: false }
        ]
      ],
      technical: [
        [
          { text: "사용자의 스크롤 이동에 따라 자연스럽게 핵심지표 컨텐츠가 전환되며 스크롤된 경매의 상태를 즉각적으로 보여줍니다. 카드를 넘기는 동작으로 상태 정보도 함께 전환할 수 있는 인터렉션이 되도록 설계하였습니다.", isHighlight: false }
        ],
        [
          { text: "현재 진행중인 경매에는 실시간으로 데이터를 반환하여 현재 입찰가, 입찰자, 업데이트 시각등을 업로드합니다.", isHighlight: false }
        ],
      ],
    },
  },
  personalHub: {
    title: "안녕하세요 마랑님!",
    buttonText: "ON",
    portfolioDetails: {
      planning: [
        [
          { text: "사용자의 미술 시장 활동을 즉각적인 수치로 시각화하여 보여주는 대시보드입니다. 데이터 기반 개인화를 목표로 기획되었습니다. 프로젝트가 사용자 행동을 유도하고 가치를 측정하는 메커니즘을 갖추고 있음을 강조합니다. 또한 사용자가 관심을 가지는 작품을 선별하여 경매 성과를 보여줍니다.", isHighlight: false }
        ]
      ],
      design: [
        [
          { text: "경매 현황 및 핵심 알림을 최상단에 배치하여 정보 집중도를 높였습니다. 카드형 디자인으로 사용자가 자신의 활동을 직관적으로 관리하도록 유도했습니다. 나의 관심 작가 집중도의 상태바를 도입하여 대략적인 정보를 시각화했습니다.", isHighlight: false }
        ]
      ],
      technical: [
        [
          { text: "", isHighlight: false }
        ]
      ],
    },
  },
  marketinsight:{
    buttonText: 'MARKET',
    title: 'MARKET',
    portfolioDetails: {
      planning: [
        [
          { text: "오늘의 지표·작가 랭킹·장르 점유율을 하나의 요약 보드 형태로 제공하는 ‘시장 스냅샷 섹션’ 입니다. 사용자가 홈 화면에서 바로 시장 흐름을 파악할 수 있도록 기획하였습니다." , isHighlight: false }
        ]
      ],
      design: [
        [
          { text: "숫자·증감·순위가 빠르게 읽히도록 카드·탭·리스트 기반의 미니멀 UI를 적용하고, 변화량은 색상·아이콘으로 직관성을 높였습니다.", isHighlight: false }
        ]
      ],
      technical: [
        [
          { text: "테스트", isHighlight: false }
        ]
      ],
    },
  },
  // ⭐️ guide 필드: 1., 2., 3. 형태로 분리 및 스타일 지정
  guide:{
    buttonText: '가이드',
    title: '가이드 버튼',
    description:'',
    portfolioDetails: {
      planning: [
        [
          { text: "가이드 버튼은 화면 내에서 프로젝트를 직접적으로 설명하기 위해 만들어졌습니다." , isHighlight: false }
        ]
      ],
      design: [
        [
          { text: "", isHighlight: false }
        ]
      ],
      technical: [
        // 1. 활성화 항목
        [
          { text: "가이드가 필요한 요소로 스크롤되면 버튼의 색이 변하며 활성화 됩니다.", isHighlight: true }, 
        ],
        // 2. 위치 이동 항목
        [
          { text: "버튼은 끌어당겨서 화면에서 위치를 옮길 수 있습니다.", isHighlight: false },
        ],
        // 3. 튕겨나옴 항목
        [
          { text: "화면 밖으로 과하게 끌리지 않고 ", isHighlight: false },
          { text: "튕겨나옵니다.", isHighlight: true }, // ⭐️ 스타일 적용
        ],
        // 4. 애니메이션 항목
        [
          { text: "스크롤하거나, 버튼을 직접 옮기는 동안에도 ", isHighlight: false },
          { text: "위치값을 추정하여 애니메이션이 활성화됩니다.", isHighlight: true }
        ]
      ],
    },
  },
  default: {
    title: '가이드 버튼을 활용하세요.',
    description: '가이드가 필요한 영역에서 버튼이 활성화됩니다. \n클릭하여 팝업창에서 디자인 설명을 확인해주세요.',
    buttonText: '가이드'
  },
  // ----------------------------------------------------
  // 🎨 Art&Auction 화면 콘텐츠
  // ----------------------------------------------------
  recommendCard: {
    buttonText: 'RECO',
    title: '추천하는 작품',
    portfolioDetails: {
      planning: [
        [
          { text: "개인화된 핵심 추천 작품을 탭 최상단에 단일 카드로 노출하여 사용자의 즉각적인 관심을 유도합니다.", isHighlight: false }
        ]
      ],
      design: [
        [
          { text: "미니멀한 카드형 UI를 사용하여 작품 이미지와 텍스트 정보를 명확하게 분리했습니다. 작품 특징을 태그로 시각적 흥미와 정보 구분력을 높였습니다.", isHighlight: false }
        ]
      ],
        technical: [
        [
          { text: "테스트", isHighlight: false }
        ]
      ],
    },
  },
  hotTrend: {
    buttonText: 'AI',
    title: 'AI 추천 작품',
    portfolioDetails: {
      planning: [
        [
          { text: "콘텐츠 탐색 완료 즉시, 하단에 AI 추천 작품 섹션을 활성화합니다. 이를 통해 사용자의 연속적인 탐색을 유도하며 몰입도를 높입니다.", isHighlight: false }
        ]
      ],
      design: [
        [
          { text: "", isHighlight: false }
        ]
      ],
      technical: [
        [
          { text: "테스트", isHighlight: false }
        ]
      ],
    },
  },
  allAuctionList: {
    buttonText: 'LIST',
    title: '전체 경매 목록',
    description:"전체 경매 목록을 볼 수 있습니다.",
    portfolioDetails: {
      planning: [
        [
          { text: "현재 진행 중이거나 예정된 모든 경매 작품을 리스트 형태로 제공하여 사용자가 전체 경매 상황을 한눈에 파악할 수 있도록 기획했습니다. 목록 내에서 이탈 없이 관심 등록과 같은 액션을 빠르게 처리할 수 있는 기능을 제공합니다.", isHighlight: false }
        ]
      ],
      design: [
        [
          { text: "개별 작품 카드는 필수 정보를 간결하게 배치하여 정보 밀도를 높였습니다. 좌우 스와이프 모션을 통해 숨겨진 관심 등록 옵션을 명확히 표시하여, 사용자가 리스트 인터랙션을 직관적으로 인지하도록 유도합니다.", isHighlight: false }
        ]
      ],
      // ⭐️ technical: 리스트 항목별로 분리 및 하이라이트 추가
      technical: [
        // 1. 스와이프 및 담기
        [{ text: "오른쪽으로 스와이프하며 보관함에 담습니다.", isHighlight: false }],
        // 2. 애니메이션
        [{ text: "담을때 북마크 아이콘의 크기와 커지며 fill속성으로 변하는 애니메이션을 줬습니다.", isHighlight: false }],
        // 3. 알림
        [{ text: "담기 완료 하면 alerts 창으로 성공했음을 알립니다.", isHighlight: false }],
        // 4. 라벨 표시
        [{ text: "보관함에 담긴 목록은 북마크 라벨로 표시됩니다.", isHighlight: false }],
        // 5. 마감 목록 처리 (튕겨나감 하이라이트)
        [
          { text: "마감된 목록은 담기지 않으며 ", isHighlight: false },
          { text: "튕겨나갑니다.", isHighlight: true } // ⭐️ 스타일 적용
        ],
      ],
    },
  },
};