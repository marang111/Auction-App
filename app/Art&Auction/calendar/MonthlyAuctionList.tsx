import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../styles/COLORS';
// -------------------------------------------------------------
// 타입 정의
// -------------------------------------------------------------
export interface AuctionEvent {
    date: string; // YYYY-MM-DD
    type: 'main' | 'online';
    location: string;
    color: string;
}

interface MonthlyAuctionListProps {
    monthName: string;
    events: AuctionEvent[];
}

// -------------------------------------------------------------
// 개별 목록 항목 컴포넌트
// -------------------------------------------------------------
const AuctionListItem: FC<AuctionEvent> = ({ date, type, location, color }) => {
    const day = date.split('-')[2];
    const isMain = type === 'main';

    return (
        <View style={listStyles.itemContainer}>
            <View style={[listStyles.dot, { backgroundColor: color }]} />
            <Text style={listStyles.dateText}>{day}일</Text>
            <Text style={listStyles.titleText}>{isMain ? '주요 정기 경매' : '온라인 위클리 경매'}</Text>
            <Text style={[listStyles.locationText, { color: color }]}>{location}</Text>
        </View>
    );
};


// -------------------------------------------------------------
// 메인 월별 목록 컴포넌트 (Default Export)
// -------------------------------------------------------------
const MonthlyAuctionList: FC<MonthlyAuctionListProps> = ({ monthName, events }) => {
    return (
        <View style={listStyles.listContainer}>
            <View style={listStyles.listTextContainer}>
                {events.length > 0 ? (
                    events.map(item => (
                        <AuctionListItem key={item.date} {...item} />
                    ))
                ) : (
                    <Text style={listStyles.noEventText}>
                        {monthName}에는 예정된 경매 일정이 없습니다.
                    </Text>
                )}
            </View>
        </View>
    );
};

export default MonthlyAuctionList;

// -------------------------------------------------------------
// 스타일 정의
// -------------------------------------------------------------
const listStyles = StyleSheet.create({
    listContainer: {
        marginTop: 20,
    },
    listTextContainer:{

    },
    listHeader: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 15,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    dateText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        width: 30,
        marginRight: 10,
    },
    titleText: {
        fontSize: 14,
        color: COLORS.TEXT_DARK,
        fontWeight: 500,
        flex: 1,
    },
    locationText: {
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 10,
    },
    noEventText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        paddingVertical: 20,
    }
});