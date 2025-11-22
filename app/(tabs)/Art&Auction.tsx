import React, { useState, useRef, useCallback } from "react"; 
import { Dimensions, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// ⭐️ React Navigation Hooks 추가
import { useScrollToTop, useNavigation, useFocusEffect } from '@react-navigation/native';

import DetailPage from "../Art&Auction/2_hot_trend/DetailPage";
import { TrendItem } from "../Art&Auction/2_hot_trend/HotTrendData";
import HotTrendCarousel from "../Art&Auction/HotTrendCarousel";
import AuctionCalendar from "../Art&Auction/AuctionCalendar";

import AuctionNavigator from "../Art&Auction/auctionaround/AuctionNavigator";
import MarketDiscoveryGrid from "../Art&Auction/auctionaround/MarketDiscoveryGrid";
import RecommendCardSection from "../Art&Auction/RecommendCardSection";
import AuctionList from "../Art&Auction/AllAuctionList"; 

const screenWidth = Dimensions.get('window').width;

// =========================================================================
// 메인 ArtAuctionScreen 컴포넌트
// =========================================================================

function ArtAuctionScreen() {
    
    // 1. 상태 관리
    const [currentScreen, setCurrentScreen] = useState<'home' | 'detail'>('home');
    const [selectedItem, setSelectedItem] = useState<TrendItem | null>(null);
    const [recommendationTriggerId, setRecommendationTriggerId] = useState<number | null>(null);
    
    // ⭐️ 추가: ScrollView Ref 및 Refresh Key
    const scrollViewRef = useRef<ScrollView>(null);
    const [refreshKey, setRefreshKey] = useState(0); 
    const navigation = useNavigation(); // navigation 훅 사용

    // ⭐️ 스크롤을 맨 위로 올리는 React Navigation 훅 적용
    useScrollToTop(scrollViewRef); 

    // ⭐️ 탭 재선택 시 새로고침 및 홈 화면 복귀 로직
    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('tabPress', (e) => {
                // 1. 새로고침 키를 업데이트하여 주요 컴포넌트 강제 재마운트/리프레시
                setRefreshKey(prev => prev + 1);

                // 2. 혹시 detail 화면에 있을 경우 home 화면으로 복귀
                if (currentScreen !== 'home') {
                    setCurrentScreen('home');
                }
                
                // 3. (useScrollToTop이 처리하지만) 스크롤 위치를 맨 위로 올리는 코드를 여기에 추가할 수도 있음.
                // scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            });

            return unsubscribe;
        }, [navigation, currentScreen]) // currentScreen 상태를 사용하여 탭 재선택 시 로직을 최신 상태로 유지
    );

    // 2. 핸들러 함수
    const handleNavigateToDetail = (item: TrendItem) => {
        setSelectedItem(item);
        setCurrentScreen('detail');
        setRecommendationTriggerId(null); 
    };
    const handleDetailClose = (item: TrendItem) => {
        setCurrentScreen('home'); 
        setSelectedItem(null);
        setRecommendationTriggerId(item.id); 
    };
    const handleViewAllTargets = () => { console.log('Navigate to dedicated Targets Tab/Screen'); };
    const handleFilterChange = (filterId: string) => { console.log(`Auction Navigator Filter Selected: ${filterId}`); };


    // 💡 3. 렌더링 로직 수정
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, display: currentScreen === 'home' ? 'flex' : 'none' }}>
                <SafeAreaView style={safeAreaStyles.container}>
                    <ScrollView 
                        ref={scrollViewRef} // ⭐️ Ref 연결
                        contentContainerStyle={safeAreaStyles.scrollViewContent}
                        scrollIndicatorInsets={{ right: 1 }} 
                    >
                        {/* ⭐️ 1. 추천 정보 (key 변경 시 재마운트되어 데이터 리프레시 유도) ⭐️ */}
                        <RecommendCardSection 
                            key={`recommend-${refreshKey}`}
                            onViewAllTargets={handleViewAllTargets} 
                        />

                        {/* 2. 트렌드: Hot Trend Carousel (key 변경 시 재마운트) */}
                        <HotTrendCarousel
                            key={`trend-${refreshKey}`}
                            onNavigateToDetail={handleNavigateToDetail}
                            showRecommendationForId={recommendationTriggerId}
                        />

                        {/* 3. 기본 탐색 도구: 경매 일정 캘린더 */}
                        <AuctionCalendar />

                        {/* 4. 분류 도구: Auction Navigator */}
                        <AuctionNavigator onFilterChange={handleFilterChange} />
                        
                        {/* 5. 작품 분류: MarketDiscoveryGrid */}
                        <View style={{ paddingHorizontal: -20 }}> 
                            <MarketDiscoveryGrid />
                        </View>

                        {/* 6. 전체 경매 작품 목록 */}
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={artAuctionStyles.listHeader}>전체 경매 목록</Text>
                            <AuctionList 
                                key={`list-${refreshKey}`}
                            /> 
                        </View>
                        
                    </ScrollView>
                </SafeAreaView>
            </View>


            {currentScreen === 'detail' && selectedItem && (
                <View style={[StyleSheet.absoluteFillObject, { zIndex: 10 }]}>
                    <DetailPage
                        item={selectedItem}
                        onClose={handleDetailClose}
                    />
                </View>
            )}
        </View>
    );
}

export default ArtAuctionScreen;

const safeAreaStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white", 
    },
    scrollViewContent: {
        paddingHorizontal: 20, 
        paddingTop: 10,
    },
});

const artAuctionStyles = StyleSheet.create({
    listHeader: {
        fontSize: 19,
        fontWeight: '800',
        color: '#2D3748',
        marginBottom: 15,
    }
});