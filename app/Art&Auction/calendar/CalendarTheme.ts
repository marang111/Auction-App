import { Theme } from 'react-native-calendars';

export const AuctionCalendarTheme: Theme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    
    // 선택된 날짜 스타일
    selectedDayBackgroundColor: 'gray',
    selectedDayTextColor: '#ffffff',
    
    // 오늘 날짜 스타일
todayTextColor: '#38A169', // 예: 오늘의 날짜를 녹색으로 변경
todayBackgroundColor: '#EBF4FF',    // 💡 배경색상 추가 (예: 밝은 파란색)
    
    // 일반 텍스트 및 마킹 스타일
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#ffc7c0ff',
    selectedDotColor: '#ffffff',
    
    // 네비게이션 및 헤더 스타일
    arrowColor: '#333',
    monthTextColor: '#222',
    
    // 폰트 속성
    textMonthFontWeight: '800',
    textDayHeaderFontWeight: '600',
    textDayFontSize: 14,
    textMonthFontSize: 17,
    
    // 기타 필요한 속성 (이 예시에서는 사용되지 않음)
    // 'stylesheet.calendar.header': { ... },
};