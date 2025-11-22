// app/Art&Auction/AuctionCalendar.tsx

import React, { FC, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

import { AuctionCalendarTheme } from './calendar/CalendarTheme'; 
import { AUCTION_SCHEDULES } from './calendar/CalendarSetupData'; 
import './calendar/CalendarSetupData'; 

import MonthlyAuctionList, { AuctionEvent } from './calendar/MonthlyAuctionList'; 

const AuctionCalendar: FC = () => {
  const today = new Date().toISOString().split('T')[0];
  // 현재 선택된 날짜 (달력의 포커스된 월을 결정하는 데 사용)
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const markedDates = {
    ...AUCTION_SCHEDULES,
    [today]: { 
        ...AUCTION_SCHEDULES[today],
        selected: true, 
        selectedColor: AUCTION_SCHEDULES[today]?.dots?.[0]?.color || '#f04e38',
        selectedTextColor: 'white',
        marked: true,
    }
  };

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    console.log('Selected date:', day.dateString);
  };
  
  /**
   * 💡 수정된 부분: 월 변경 시 호출되어 selectedDate를 업데이트합니다.
   * 이렇게 해야 getMonthlyEvents가 새로운 월 기준으로 이벤트를 계산합니다.
   */
  const onMonthChange = (month: DateData) => {
    // 월이 변경되면 해당 월의 1일로 selectedDate를 업데이트하여
    // 하단 목록이 재계산되도록 강제합니다.
    setSelectedDate(`${month.year}-${String(month.month).padStart(2, '0')}-01`);
    console.log('Month changed to:', month.dateString);
  };
  
  const getMonthlyEvents = (dateString: string) => {
    const [year, month] = dateString.split('-').slice(0, 2);
    const prefix = `${year}-${month}`;
    const monthName = LocaleConfig.locales['ko'].monthNames[parseInt(month) - 1];

    const events: AuctionEvent[] = Object.entries(AUCTION_SCHEDULES)
        .filter(([date]) => date.startsWith(prefix))
        .map(([date, event]) => ({
            date: date,
            type: event.dots[0].key as 'main' | 'online',
            color: event.dots[0].color,
            location: event.dots[0].key === 'main' ? '갤러리 A (서울)' : '온라인/모바일',
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

    return { events, monthName };
  };

  const { events: currentMonthEvents, monthName } = getMonthlyEvents(selectedDate);


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>주요 경매 일정</Text>
      </View>
      <Calendar
        current={today}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange} // 💡 추가된 속성
        markingType={'dot'}
        markedDates={markedDates}
        hideExtraDays={true}

        style={styles.calendar}
        theme={AuctionCalendarTheme}
      />
      
      {/* 범례 (Legend) */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#f04e38' }]} />
            <Text style={styles.legendText}>주요 경매</Text>
        </View>
        <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#5C90D2' }]} />
            <Text style={styles.legendText}>온라인 경매</Text>
        </View>
        <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>일정 전체 보기 →</Text>
        </TouchableOpacity>
      </View>

      {/* 월별 경매 목록 */}
      <MonthlyAuctionList 
          monthName={monthName}
          events={currentMonthEvents}
      />
    </View>
  );
};

export default AuctionCalendar;

const styles = StyleSheet.create({
    container: {
        marginTop: -30,
        marginBottom: 40,
    },
    header: {
        fontSize: 15, 
        fontWeight: '700',
        color: '#333',
        paddingTop: 20,
        marginBottom: 15,
    },
    calendar: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 13,
        paddingVertical: 10,
    },
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
        paddingHorizontal: 15,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 5,
    },
    legendText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    viewMoreButton: {
        marginLeft: 'auto',
    },
    viewMoreText: {
        fontSize: 12,
        fontWeight: '600',
    }
});