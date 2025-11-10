// Art&Auction.tsx (최종 수정)

import React, { FC } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FilterGroup from "../screens/wish/FilterGroup";
import HotTrendCarousel from "../Art&Auction/HotTrendCarousel";
import AuctionNavigator from "../Art&Auction/AuctionNavigator"; 
import MarketDiscoveryGrid from "../Art&Auction/MarketDiscoveryGrid";
import TargetCardSection from "../Art&Auction/TargetCardSection";

const screenWidth = Dimensions.get('window').width;

// =========================================================================
// 추후 변환될 예정인 하위 컴포넌트들의 더미(Dummy) 정의
// =========================================================================

// Calendar 더미 컴포넌트
const Calendar = () => (
    <View style={artAuctionStyles.calendarContainer}>
        <Text style={artAuctionStyles.calendarHeader}>🗓️ 주요 경매 일정</Text>
        <Text style={artAuctionStyles.calendarDummyText}>[실제 캘린더 컴포넌트가 들어갈 위치]</Text>
    </View>
);

// 일반 경매 작품 목록 더미
const AuctionItemCard = () => (
    <View style={artAuctionStyles.card}>
        <Text style={artAuctionStyles.cardTitle}>일반 경매 작품</Text>
        <Text style={artAuctionStyles.cardText}>작품명: 모나리자</Text>
        <Text style={artAuctionStyles.cardText}>경매사: 소더비</Text>
        <Text style={artAuctionStyles.cardText}>D-7</Text>
    </View>
);


// =========================================================================
// 메인 ArtAuctionScreen 컴포넌트
// =========================================================================

function ArtAuctionScreen() {
    
    // 이 메뉴의 필터는 AuctionNavigator에만 있다고 가정하고, TargetCardSection의 이동 함수만 정의합니다.
    const handleViewAllTargets = () => {
        console.log('Navigate to dedicated Targets Tab/Screen');
        // router.push('/targets') 와 같이 전용 페이지로 이동하는 로직 추가
    };
    
    // AuctionNavigator에서 필터가 변경되었을 때 목록을 갱신하는 함수 (더미)
    const handleFilterChange = (filterId: string) => {
        console.log(`Auction Navigator Filter Selected: ${filterId}`);
    };

    return (
        <SafeAreaView style={safeAreaStyles.container}>
            <ScrollView contentContainerStyle={safeAreaStyles.scrollViewContent}>

                {/* ⭐️ 1. 개인화 정보:  ⭐️ */}
                <TargetCardSection onViewAllTargets={handleViewAllTargets} />

        {/* --- 이하부터는 전체 시장 정보 탐색 영역 --- */}
                
                {/* 2. 트렌드: Hot Trend Carousel */}
                <HotTrendCarousel />

                {/* 3. 기본 탐색 도구: 경매 일정 캘린더 */}
                <Calendar />

                {/* 4. 분류 도구: Auction Navigator (메인 필터링 버튼 그룹) */}
                <AuctionNavigator onFilterChange={handleFilterChange} />
                
                {/* 5. 작품 분류: Market Discovery Grid */}
                <MarketDiscoveryGrid />

                {/* 6. 상세 필터/정렬 기준 (AuctionNavigator 선택 기준을 상세 조정) */}
                <View style={{ marginBottom: 10 }}>
                    <FilterGroup />
                </View>

                {/* 7. 일반 경매 작품 목록 */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={artAuctionStyles.listHeader}>전체 경매 목록</Text>
                    <AuctionItemCard />
                    <AuctionItemCard />
                    {/* ... */}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default ArtAuctionScreen;


// =========================================================================
// 스타일 정의 (기존 스타일 유지)
// =========================================================================

const safeAreaStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', 
    },
    scrollViewContent: {
        paddingHorizontal: 16, 
        paddingTop: 10,
        paddingBottom: 40,
    },
});

const artAuctionStyles = StyleSheet.create({
    listHeader: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
    },
    
    // --- Calendar Styles --- 
    calendarContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
            },
            android: {
                elevation: 3,
            }
        })
    },
    calendarHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    calendarDummyText: {
        color: '#999',
        textAlign: 'center',
        paddingVertical: 40,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: 8,
        backgroundColor: '#fafafa',
    },

    // --- 더미카드 --- 
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        color: '#222',
    },
    cardText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
});