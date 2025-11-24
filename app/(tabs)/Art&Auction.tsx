import React, { useCallback, useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native'; // ⭐️ Native*Event Import
import { SafeAreaView } from 'react-native-safe-area-context';
// ⭐️ React Navigation Hooks 추가
import { useFocusEffect, useNavigation, useScrollToTop } from '@react-navigation/native';
// ⭐️ [추가] GuideContext Imports
import { TargetAreaState, useGuideContext } from '../../context/GuideContext';

import DetailPage from "../Art&Auction/2_hot_trend/DetailPage";
import { TrendItem } from "../Art&Auction/2_hot_trend/HotTrendData";
import AuctionCalendar from "../Art&Auction/AuctionCalendar";
import HotTrendCarousel from "../Art&Auction/HotTrendCarousel";

import AuctionList from "../Art&Auction/AllAuctionList";
import AuctionNavigator from "../Art&Auction/auctionaround/AuctionNavigator";
import MarketDiscoveryGrid from "../Art&Auction/auctionaround/MarketDiscoveryGrid";
import RecommendCardSection from "../Art&Auction/RecommendCardSection";

const screenWidth = Dimensions.get('window').width;

// ⭐️ [추가] 타겟 영역 ID 정의 (GuideContentData.ts와 일치해야 함)
const TARGET_AREA_IDS = {
    RECOMMEND_CARD: 'recommendCard',
    HOT_TREND: 'hotTrend',
    AUCTION_CALENDAR: 'auctionCalendar',
    ALL_AUCTION_LIST: 'allAuctionList',
};


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

    // ⭐️ [추가] GuideContext 사용 및 Ref 추가
    const { setTargetAreas, isModalVisible } = useGuideContext(); 
    const recommendationRef = useRef<View>(null); // ⭐️ 타겟 Ref 1
    const hotTrendRef = useRef<View>(null); // ⭐️ 타겟 Ref 2
    const calendarRef = useRef<View>(null); // ⭐️ 타겟 Ref 3
    const listRef = useRef<View>(null); // ⭐️ 타겟 Ref 4

    // ⭐️ 스크롤을 맨 위로 올리는 React Navigation 훅 적용
    useScrollToTop(scrollViewRef); 
    
    // ⭐️ [추가] 타겟 영역 측정 함수
    const measureTargetArea = useCallback(() => {
        // detail 화면이거나 모달이 열려 있으면 측정하지 않음
        if (currentScreen !== 'home') {
            setTargetAreas(null);
            return;
        }

        const areas: TargetAreaState[] = [];
        const targetRefs: { ref: React.RefObject<View>; id: string }[] = [
          { ref: recommendationRef, id: TARGET_AREA_IDS.RECOMMEND_CARD },
          { ref: hotTrendRef, id: TARGET_AREA_IDS.HOT_TREND },
          { ref: calendarRef, id: TARGET_AREA_IDS.AUCTION_CALENDAR },
          { ref: listRef, id: TARGET_AREA_IDS.ALL_AUCTION_LIST },
        ];
        
        let measuredCount = 0;
        const activeRefs = targetRefs.filter(item => item.ref.current);
        const totalRefs = activeRefs.length;

        if (totalRefs === 0) {
            setTargetAreas(null);
            return;
        }

        const checkAndSet = () => {
            measuredCount++;
            if (measuredCount === totalRefs) {
                // 측정된 영역이 하나라도 있어야 context에 등록
                setTargetAreas(areas.length > 0 ? areas : null);
            }
        };

        activeRefs.forEach(({ ref, id }) => { 
            // measure((fx, fy, width, height, px, py)
            ref.current?.measure((fx, fy, width, height, px, py) => {
                // py: 화면 상단으로부터의 절대 Y 좌표
                if (height > 0) {
                    areas.push({ id: id, absoluteY: py, height: height }); 
                }
                checkAndSet();
            });
        });
    }, [setTargetAreas, currentScreen]);

    // ⭐️ [추가] 스크롤 이벤트 핸들러: 측정 함수 호출
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // 스크롤 시에도 영역을 다시 측정하여 버튼 위치 업데이트에 기여
        measureTargetArea(); 
    }, [measureTargetArea]);


    // ⭐️ 탭 재선택 및 포커스 시 로직 (measureTargetArea 추가)
    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('tabPress', (e) => {
                setRefreshKey(prev => prev + 1);
                if (currentScreen !== 'home') {
                    setCurrentScreen('home');
                }
                // ⭐️ 탭 포커스 시점 측정
                measureTargetArea(); 
            });

            // ⭐️ 화면 포커스 시점에 초기 타겟 영역 측정
            measureTargetArea(); 

            return () => {
                unsubscribe();
                // ⭐️ 화면을 벗어날 때 context 초기화
                setTargetAreas(null); 
            };
        }, [navigation, currentScreen, measureTargetArea, setTargetAreas]) 
    );

    // 2. 핸들러 함수
    const handleNavigateToDetail = (item: TrendItem) => {
        setSelectedItem(item);
        setCurrentScreen('detail');
        setRecommendationTriggerId(null); 
        setTargetAreas(null); // 디테일 화면 진입 시 가이드 비활성화
    };
    const handleDetailClose = (item: TrendItem) => {
        setCurrentScreen('home'); 
        setSelectedItem(null);
        setRecommendationTriggerId(item.id); 
    };
    const handleViewAllTargets = () => { console.log('Navigate to dedicated Targets Tab/Screen'); };
    const handleFilterChange = (filterId: string) => { console.log(`Auction Navigator Filter Selected: ${filterId}`); };


    // 💡 3. 렌더링 로직 수정 (Ref와 onLayout, Scroll 이벤트 추가)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, display: currentScreen === 'home' ? 'flex' : 'none' }}>
                <SafeAreaView style={safeAreaStyles.container}>
                    <ScrollView 
                        ref={scrollViewRef} // ⭐️ Ref 연결
                        contentContainerStyle={safeAreaStyles.scrollViewContent}
                        scrollIndicatorInsets={{ right: 1 }} 
                        
                        // ⭐️ 스크롤 이벤트 연결
                        onScroll={handleScroll}
                        scrollEventThrottle={150} 
                        onMomentumScrollEnd={measureTargetArea}
                        onLayout={measureTargetArea}
                        
                        scrollEnabled={!isModalVisible} // ⭐️ 모달이 열리면 스크롤 방지
                    >
                        {/* ⭐️ 1. 추천 정보 (Ref와 onLayout 추가) */}
                        <View ref={recommendationRef} onLayout={measureTargetArea}>
                            <RecommendCardSection 
                                key={`recommend-${refreshKey}`}
                                onViewAllTargets={handleViewAllTargets} 
                            />
                        </View>

                        {/* ⭐️ 2. 트렌드: Hot Trend Carousel (Ref와 onLayout 추가) */}
                        <View ref={hotTrendRef} onLayout={measureTargetArea}>
                            <HotTrendCarousel
                                key={`trend-${refreshKey}`}
                                onNavigateToDetail={handleNavigateToDetail}
                                showRecommendationForId={recommendationTriggerId}
                            />
                        </View>

                        {/* 3. 캘린더  */}
                        <View>
                            <AuctionCalendar />
                        </View>

                        {/* 4. Auction Navigator */}
                        <AuctionNavigator onFilterChange={handleFilterChange} />
                        
                        {/* 5. 작품 분류: MarketDiscoveryGrid */}
                        <View style={{ paddingHorizontal: -20 }}> 
                            <MarketDiscoveryGrid />
                        </View>

                        {/* 6. 전체 경매 작품 목록  */}
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={artAuctionStyles.listHeader}>전체 경매 목록</Text>
                            <View ref={listRef} onLayout={measureTargetArea}> 
                                <AuctionList 
                                    key={`list-${refreshKey}`}
                                /> 
                            </View>
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
//정상