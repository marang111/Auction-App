/**
 * 모든 스크린에 공통으로 적용될 기본 네비게이션 옵션입니다.
 * 모든 화면에서 기본 헤더를 숨기는 설정이 포함되어 있습니다.
 */
export const HIDDEN_HEADER_OPTIONS = {
  // 기본 헤더(뒤로가기 버튼, 제목, 배경)를 완전히 숨깁니다.
  headerShown: false,
};

/**
 * 기본 헤더는 유지하되, 배경을 투명하게 만들어
 * 콘텐츠가 상단 노치 영역까지 확장되도록 하는 옵션입니다.
 * (iOS 스와이프 제스처를 유지하고 싶을 때 유용합니다.)
 */
export const TRANSPARENT_HEADER_OPTIONS = {
  // 헤더 배경을 투명하게 만듭니다.
  headerTransparent: true,
  // 제목을 표시하지 않습니다.
  headerTitle: '',
  // 뒤로가기 버튼 아이콘 색상 설정 (예: 흰색)
  // headerTintColor: 'white', 
};


// 이 외에도 공통으로 적용할 다른 스타일을 여기에 정의할 수 있습니다.
export const COMMON_HEADER_STYLE = {
  headerStyle: {
    backgroundColor: 'lightblue', // 모든 헤더의 배경색
  },
  headerTintColor: 'black', // 모든 헤더 아이콘 및 텍스트 색상
};