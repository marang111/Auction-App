import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
    Animated, // ⭐️ Animated, Easing 임포트 추가
    Dimensions,
    Easing,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ⭐️ 디자인 가이드 Key Colors 정의
const COLORS = {
    DEEP_NAVY: '#1D2A3A',      
    CHARCOAL_GRAY: '#2C3E50',  
    ACCENT_GOLD: '#DAA520',    
    LIVE_RED: '#FF3B30',       
    LIGHT_GRAY: '#6A6A6A',     
    BG_WHITE: '#FFFFFF',       
    HIGHLIGHT_GREEN: '#27AE60',
    // 쉐도우 색상 제거 (사용 안함)
};

// ⭐️ 타입 정의 (Export)
export type LivebidResponse = { bidders: number; highestBid: number; currency?: string; };

export type AuctionItem = {
    id: number;
    time: string;
    title: string;
    date: string;
    place: string;
    artist: string;
    image: { uri: string } | number;
    liveStatus?: LivebidResponse; 
    preLiveStatus?: { wishCount: number; regCount: number; }; 
};

type Props = {
  data: AuctionItem[]; 
  onPressItem?: (item: AuctionItem) => void;
  // 활성화된 카드 데이터를 부모에게 전달할 콜백 함수
  onActiveCardChange: (item: AuctionItem) => void; 
};

// ⭐️ 모의 데이터 정의 (기존과 동일)
export const DEFAULT_DATA: AuctionItem[] = [
    { 
        id: 1, 
        time: 'LIVE', 
        title: '제187회 미술품 경매', 
        date: '10.28(화) 16:00 KST', 
        place: '부산점', 
        artist: '10/15(화) ~ 10/28(화)', 
        image: require('../../assets/images/home/kimcang.jpeg'),
        liveStatus: { bidders: 14, highestBid: 125000000 } 
    },
    { 
        id: 2, 
        time: 'D-3', 
        title: 'ZERO BASE x 전남문화재단', 
        date: '11.05(수) 14:00 KST', 
        place: '전남도청 갤러리', 
        artist: '10/14(화) ~ 11/19(수)', 
        image: require('../../assets/images/home/home_auction2.jpg'),
        preLiveStatus: { wishCount: 289, regCount: 85 } 
    },
    { 
        id: 3, 
        time: '온라인', 
        title: '온라인', 
        date: '11.15(토) 18:30 KST', 
        place: '강남센터 3F', 
        artist: '10/22(수) 14:00 KST', 
        image: require('../../assets/images/home/home_auction3.jpg'),
        preLiveStatus: { wishCount: 45, regCount: 15 } 
    },
];


const CARD_MARGIN = 16;
const SNAP_INTERVAL = SCREEN_WIDTH + CARD_MARGIN;

// ⭐️ 깜빡이는 애니메이션 뱃지 컴포넌트
const LiveAnimatedBadge = memo(({ isLive, children, style, textStyle }: any) => {
    // ⭐️ 애니메이션 값 설정
    const fadeAnim = useRef(new Animated.Value(1)).current; // 초기 투명도 1
    
    // ⭐️ 깜빡임 애니메이션 함수
    const startBlink = useCallback(() => {
        // 투명도를 1 -> 0.5 -> 1 로 반복 (깜빡임)
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.5,
                    duration: 800, // 0.8초 동안 어두워짐
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800, // 0.8초 동안 다시 밝아짐
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [fadeAnim]);

    useEffect(() => {
        if (isLive) {
            startBlink();
        } else {
            fadeAnim.setValue(1); // LIVE가 아니면 애니메이션 중지 및 불투명도 1로 설정
        }
    }, [isLive, startBlink, fadeAnim]);

    if (!isLive) {
        return (
            <View style={style}>
                <Text style={textStyle}>{children}</Text>
            </View>
        );
    }

    return (
        <Animated.View style={[style, { opacity: fadeAnim }]}>
            <Text style={textStyle}>{children}</Text>
        </Animated.View>
    );
});


// ⭐️ Homemaincard 컴포넌트
const Homemaincard = memo(function Homemaincard({ data, onPressItem, onActiveCardChange }: Props) {
    
    // 스크롤 이벤트 핸들러: 현재 활성화된 카드를 식별하여 부모에게 전달
    const handleScroll = (event: any) => {
        const xOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(xOffset / SNAP_INTERVAL);
        const activeAuction = data[index];
        
        if (activeAuction) {
            onActiveCardChange(activeAuction);
        }
    };
    
    // 컴포넌트 마운트 시 초기 활성화 카드 설정 (data, onActiveCardChange가 변경될 때만 실행)
    useEffect(() => {
        if (data.length > 0) {
            onActiveCardChange(data[0]);
        }
    }, [data, onActiveCardChange]);


    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                snapToInterval={SNAP_INTERVAL} 
                decelerationRate="fast" 
                onScroll={handleScroll}
                scrollEventThrottle={16} // 성능 최적화를 위한 횟수 제한
            >
                {data.map((auction, index) => {
                    const isLive = auction.time === 'LIVE';
                    const timeBadgeStyle = isLive ? styles.liveBadge : styles.ddayBadge;
                    const timeTextStyle = isLive ? styles.liveBadgeText : styles.ddayBadgeText;

                    const isFirstCard = index === 0;
                    const titleStyle = isFirstCard ? styles.centeredText : styles.leftAlignedText;
                    const containerStyle = isFirstCard ? styles.centeredContainer : styles.leftAlignedContainer;

                    return (
                        <TouchableOpacity
                            key={auction.id}
                            style={styles.cardItem} // ⭐️ 동적 쉐도우 스타일 제거
                            activeOpacity={0.85}
                            onPress={() => onPressItem?.(auction)}
                        >
                            <Image source={auction.image as any} style={styles.cardImage} />
                            
                            <View style={styles.auctionInfo}>
                                <View style={[styles.timeBadgeInfoArea, containerStyle]}>
                                    {/* ⭐️ 애니메이션 뱃지 컴포넌트 사용 */}
                                    <LiveAnimatedBadge 
                                        isLive={isLive}
                                        style={[styles.timeBadge, timeBadgeStyle]}
                                        textStyle={timeTextStyle}
                                    >
                                        {auction.time}
                                    </LiveAnimatedBadge>
                                </View>
                                
                                <Text style={[styles.titleText, titleStyle]} numberOfLines={2}>
                                    {auction.title}
                                </Text>
                                
                                <View style={[styles.datePlaceContainer, containerStyle]}>
                                    <Text style={styles.detailText}>{auction.date}</Text>
                                    <Text style={styles.detailText}>|</Text>
                                    <Text style={styles.detailText}>{auction.place}</Text>
                                </View>
                                
                                <Text style={[styles.previewText, titleStyle]}>
                                    프리뷰: {auction.artist}
                                </Text>

                                <View style={styles.statusDivider} />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
});

export default Homemaincard;

// ⭐️ Homemaincard Styles
const styles = StyleSheet.create({
    scrollContainer: { 
        paddingHorizontal: 0, 
    },
    cardItem: {
        width: SCREEN_WIDTH, 
        marginRight: 16, 
        backgroundColor: COLORS.BG_WHITE,
        borderRadius: 0, // 둥근 모서리 제거 (선택 사항)
        overflow: 'hidden', // overflow 다시 hidden으로 설정
        // 기본 쉐도우 (이전 파일에서 복사)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8, 
        elevation: 8, 
    },
    // ⭐️ liveGlowEffect 및 defaultShadowEffect 스타일 제거됨
    
    cardImage: {
        width: '100%',
        height: 280,
        resizeMode: 'cover',
        paddingHorizontal: 20,
    },
    timeBadgeInfoArea: {
        flexDirection: 'row',
        marginBottom: 8, 
    },
    // ⭐️ timeBadge: Animated.View의 기본 스타일
    timeBadge: {
        paddingHorizontal: 7,
        paddingVertical: 3.5,
        borderRadius: 4,
    },
    liveBadge: {
        backgroundColor: COLORS.LIVE_RED,
    },
    ddayBadge: {
        backgroundColor: COLORS.ACCENT_GOLD,
    },
    liveBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.BG_WHITE,
    },
    ddayBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.BG_WHITE,
    },
    auctionInfo: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingBottom: 0,
    },
    titleText: {
        fontSize: 25,
        fontWeight: '700',
        color: COLORS.DEEP_NAVY, 
        marginBottom: 12,
    },
    datePlaceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'flex-start',
    },
    detailText: {
        fontSize: 13,
        color: COLORS.CHARCOAL_GRAY, 
        marginRight: 5,
    },
    previewText: {
        fontSize: 12,
        color: COLORS.LIGHT_GRAY, 
    },
    centeredText: {
        textAlign: 'center',
    },
    leftAlignedText: {
        textAlign: 'left',
    },
    centeredContainer: {
        justifyContent: 'center', 
    },
    leftAlignedContainer: {
        justifyContent: 'flex-start', 
    },
    statusDivider: {
        marginVertical: 16,
    }
});