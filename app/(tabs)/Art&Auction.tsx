import React, { useCallback, useRef, useState, useMemo } from "react"; // ⭐️ useMemo Import 추가
import { 
    Dimensions, 
    NativeScrollEvent, 
    NativeSyntheticEvent, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    Animated, // ⭐️ Animated Import 추가
    ViewStyle // ⭐️ ViewStyle Import 추가
} from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, useScrollToTop } from '@react-navigation/native';
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

// ⭐️ 타겟 영역 ID 정의 (GuideContentData.ts와 일치해야 함)
const TARGET_AREA_IDS = {
    RECOMMEND_CARD: 'recommendCard',
    HOT_TREND: 'hotTrend',
    AUCTION_CALENDAR: 'auctionCalendar',
    ALL_AUCTION_LIST: 'allAuctionList',
};

// -------------------------------------------------------------------------
// ⭐️ [추가] 하이라이트 애니메이션 래퍼 컴포넌트
// -------------------------------------------------------------------------
interface HighlightWrapperProps {
    children: React.ReactNode;
    id: string;
    targetRef: React.RefObject<View>;
    onLayout: () => void;
}

const HighlightWrapper: React.FC<HighlightWrapperProps> = ({ children, id, targetRef, onLayout }) => {
    const { activeAreaId, progressAnim } = useGuideContext();
    
    // ⭐️ Animated Value: 0 -> 1 로 변하는 가이드 버튼의 진척도 애니메이션 값

    // ⭐️ 테두리 색상 Interpolation
    const borderColor = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', '#FF6347'], // 비활성화 -> 활성화 색상
        extrapolate: 'clamp',
    });
    
    // ⭐️ 그림자/광선 효과 Interpolation
    const shadowOpacity = progressAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.4, 0.7], // 비활성화 -> 중간 -> 활성화 시 그림자 진해짐
        extrapolate: 'clamp',
    });

// ⭐️ animatedStyle의 타입 지정 방식 변경
    const animatedStyle: Animated.ViewStyle = useMemo(() => ({
        borderWidth: 2,
        borderRadius: 10,
        borderColor: borderColor, // Animated.Value
        shadowColor: '#FF6347', 
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: shadowOpacity, // Animated.Value
        shadowRadius: 10, 
        elevation: 10,
        opacity: activeAreaId === id ? 1 : 0, 
        transform: [{ scale: activeAreaId === id ? 1 : 1.001 }]
    }), [activeAreaId, id, borderColor, shadowOpacity]);
    

    // ⭐️ HighlightWrapper 자체의 스타일 (Animated.View에 적용)
    const containerStyle: ViewStyle = {
        position: 'absolute',
        margin: -20,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // 내부 컴포넌트의 테두리/그림자를 해치지 않도록 zIndex 조정
        zIndex: activeAreaId === id ? 1 : -1, 
        pointerEvents: 'none', // 터치 이벤트를 자식에게 전달
    };


    // ⭐️ View.measure를 사용하여 좌표를 계산해야 하므로 View를 직접 감싸는 Wrapper 필요
    // ⭐️ View.measure의 (fx, fy, width, height, px, py) 중 py(절대좌표)를 얻기 위해 targetRef에 연결합니다.
    return (
        <View ref={targetRef} onLayout={onLayout}>
            {children}
            {activeAreaId === id && (
                <Animated.View style={[StyleSheet.absoluteFill, containerStyle, animatedStyle]} />
            )}
        </View>
    );
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
    const { setTargetAreas, isModalVisible, activeAreaId } = useGuideContext(); // ⭐️ activeAreaId 추가
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
          // 캘린더는 가이드 대상이 아니므로 Ref 연결은 그대로 유지하되, Context에는 추가하지 않습니다.
          // { ref: calendarRef, id: TARGET_AREA_IDS.AUCTION_CALENDAR }, // 캘린더 제거
          { ref: listRef, id: TARGET_AREA_IDS.ALL_AUCTION_LIST },
        ];
        
        // 캘린더 영역도 Ref와 onLayout은 유지하되, Context에 등록하지 않는 경우:
        // const calendarOnlyRef = [{ ref: calendarRef, id: TARGET_AREA_IDS.AUCTION_CALENDAR }];

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
        
        // 캘린더 영역만 별도로 onLayout 처리
        calendarRef.current?.measure(() => {});

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


    // 💡 3. 렌더링 로직 수정 (HighlightWrapper 적용)
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
                        {/* 1. 추천 정보 (HighlightWrapper 적용) */}
                        <HighlightWrapper 
                            id={TARGET_AREA_IDS.RECOMMEND_CARD}
                            targetRef={recommendationRef}
                            onLayout={measureTargetArea}
                        >
                            <RecommendCardSection 
                                key={`recommend-${refreshKey}`}
                                onViewAllTargets={handleViewAllTargets} 
                            />
                        </HighlightWrapper>

                        {/* 2. Hot Trend Carousel (HighlightWrapper 적용) */}
                        <HighlightWrapper 
                            id={TARGET_AREA_IDS.HOT_TREND}
                            targetRef={hotTrendRef}
                            onLayout={measureTargetArea}
                        >
                            <HotTrendCarousel
                                key={`trend-${refreshKey}`}
                                onNavigateToDetail={handleNavigateToDetail}
                                showRecommendationForId={recommendationTriggerId}
                            />
                        </HighlightWrapper>

                        {/* 3. 캘린더 (HighlightWrapper 미적용, Ref와 onLayout만 유지) */}
                        <View ref={calendarRef} onLayout={measureTargetArea}> 
                            <AuctionCalendar />
                        </View>

                        {/* 4. Auction Navigator */}
                        <AuctionNavigator onFilterChange={handleFilterChange} />
                        
                        {/* 5. 작품 분류: MarketDiscoveryGrid */}
                        <View style={{ paddingHorizontal: -20 }}> 
                            <MarketDiscoveryGrid />
                        </View>

                        {/* 6. 전체 경매 작품 목록 (HighlightWrapper 적용) */}
                        <View style={{ paddingBottom: 0 }}>
                            <Text style={artAuctionStyles.listHeader}>전체 경매 목록</Text>
                            <HighlightWrapper 
                                id={TARGET_AREA_IDS.ALL_AUCTION_LIST}
                                targetRef={listRef}
                                onLayout={measureTargetArea}
                            > 
                                <AuctionList 
                                    key={`list-${refreshKey}`}
                                /> 
                            </HighlightWrapper>
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