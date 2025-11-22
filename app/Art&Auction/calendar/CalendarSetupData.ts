import { LocaleConfig } from 'react-native-calendars';

// --- 1. Locale 설정 (한국어) ---
LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
  ],
  monthNamesShort: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';


// --- 2. 경매 일정 데이터 타입 정의 ---
export interface AuctionSchedule {
    dots: { 
        color: string; 
        selectedDotColor: string; 
        key: 'main' | 'online'; 
    }[];
    selected?: boolean;
    selectedColor?: string;
}


// --- 3. 경매 일정 더미 데이터 (Export) ---
export const AUCTION_SCHEDULES: { [key: string]: AuctionSchedule } = {
    // 11월 일정
    '2025-11-20': { 
        dots: [{ 
            color: '#f04e38', 
            selectedDotColor: 'white', 
            key: 'main' 
        }], 
        selected: true, 
        selectedColor: '#f04e38' 
    },
    '2025-11-24': { 
        dots: [{ 
            color: '#5C90D2', 
            selectedDotColor: 'white', 
            key: 'online' 
        }], 
        selected: true, 
        selectedColor: '#5C90D2' 
    },
    '2025-11-29': { 
        dots: [{ 
            color: '#f04e38', 
            selectedDotColor: 'white', 
            key: 'main' 
        }],
        selected: true, 
        selectedColor: '#f04e38' 
    },

    '2025-12-25': { 
        dots: [{ 
            color: '#5C90D2', 
            selectedDotColor: 'white', 
            key: 'online' 
        }],
        selected: true, 
        selectedColor: '#5C90D2' 
    },
};