// AllAuctionGuideContent.tsx

import React, { useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// ⭐️ Reanimated 관련 기능만 임포트
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { GuideContent } from '../GuideContentData'; 
import { Ionicons } from '@expo/vector-icons'; 

// -------------------------------------------------------------------------
// ⭐️ ExampleAutoSwipeItemCard: 자동으로 오른쪽으로 스와이프되는 카드
// -------------------------------------------------------------------------
interface ExampleAutoSwipeItemCardProps {
    item: { id: string; title: string; artist: string; timeLeft: string; };
}

const ExampleAutoSwipeItemCard: React.FC<ExampleAutoSwipeItemCardProps> = ({ item }) => {
    const isLive = item.timeLeft === 'LIVE';
    const translateX = useSharedValue(0); 
    const isSaved = useSharedValue(false);
    const animationLoopRef = useRef<NodeJS.Timeout | null>(null); 

    const SWIPE_OFFSET = 70; // 카드를 오른쪽으로 70px 이동

    const toggleSave = useCallback(() => {
        isSaved.value = !isSaved.value;
    }, []);

    // ⭐️ 자동 스와이프 애니메이션
    const startAutoSwipe = useCallback(() => {
        animationLoopRef.current = setTimeout(() => {
            // 오른쪽으로 스와이프 (액션 버튼 노출)
            translateX.value = withTiming(SWIPE_OFFSET, { duration: 800 });
            
            // 잠시 후 다시 원위치
            setTimeout(() => {
                // 저장 상태 토글 (애니메이션 효과 시뮬레이션)
                runOnJS(toggleSave)(); 
                translateX.value = withTiming(0, { duration: 800 });
                // 애니메이션이 완료된 후 다음 루프 시작
                animationLoopRef.current = setTimeout(startAutoSwipe, 3000); // 3초 대기 후 다음 루프
            }, 1500); // 1.5초 노출
        }, 1000); // 초기 1초 대기
    }, [translateX, SWIPE_OFFSET, toggleSave]);

    useEffect(() => {
        startAutoSwipe(); 
        return () => {
            if (animationLoopRef.current) {
                clearTimeout(animationLoopRef.current); 
            }
        };
    }, [startAutoSwipe]);

    const animatedCardStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });
    
    const animatedActionBgStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: isSaved.value ? '#007AFF' : '#1D2A3A',
        };
    });

    return (
        <View style={styles.autoSwipeCardOuterContainer}>
            {/* ⭐️ 스와이프 액션 배경 (왼쪽에 위치) */}
            <Animated.View style={[styles.swipeActionBackground, animatedActionBgStyle, styles.swipeActionLeft]}>
                <TouchableOpacity 
                    onPress={() => runOnJS(toggleSave)()} 
                    style={styles.actionButton}
                    disabled={true} // 데모이므로 터치 비활성화
                >
                    <Ionicons 
                        name={isSaved.value ? 'bookmark' : 'bookmark-outline'} 
                        size={24} 
                        color="white" 
                    />
                    <Text style={styles.actionText}>{isSaved.value ? '저장됨' : '보관'}</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* ⭐️ 실제 카드 내용 (애니메이션 적용) */}
            <Animated.View style={[styles.cardContainerInner, animatedCardStyle]}>
                {/* 왼쪽: 이미지 영역 시뮬레이션 */}
                <View style={styles.thumbnailPlaceholder} />
                
                {/* 오른쪽: 작품 정보 (간소화) */}
                <View style={styles.content}>
                    <View style={[styles.badge, isLive ? styles.liveBadge : styles.ddayBadge]}>
                        <Text style={styles.badgeText}>{item.timeLeft}</Text>
                    </View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.artist}</Text>
                    <Text style={styles.priceText}>
                        {isLive ? '현재가 ₩15,000만' : '추정가 ₩10,000만'}
                    </Text>
                </View>
            </Animated.View>
        </View>
    );
};

// ⭐️ 더미 데이터
const DUMMY_AUCTION_DATA = [
    { id: '1', title: '청색의 변주', artist: '작가 A', timeLeft: 'LIVE' },
];


// -------------------------------------------------------------------------
// ⭐️ AllAuctionGuideContent 메인 컴포넌트 (Swipe Demo만 렌더링)
// -------------------------------------------------------------------------
const AllAuctionGuideContent: React.FC<{ content: GuideContent }> = () => {
    return (
        <View style={styles.listContainer}> 
             <ExampleAutoSwipeItemCard item={DUMMY_AUCTION_DATA[0]} />
        </View>
    );
};

export default AllAuctionGuideContent;


const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    autoSwipeCardOuterContainer: {
        width: '95%', // 모달 너비에 맞게 조정
        height: 80, 
        marginVertical: 5,
        borderRadius: 5,
        overflow: 'hidden', 
        backgroundColor: 'white',
        position: 'relative', 
        borderWidth: 1,
        borderColor: '#eee',
    },
    swipeActionBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 70, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeActionLeft: { 
        left: 0,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    actionText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
        marginTop: 2,
    },
    cardContainerInner: { 
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white', 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    thumbnailPlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: '#ccc',
        borderRadius: 3,
        marginRight: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    badge: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3,
        alignSelf: 'flex-start',
        marginBottom: 3,
    },
    liveBadge: {
        backgroundColor: '#FF3B30',
    },
    ddayBadge: {
        backgroundColor: '#DAA520',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1D2A3A',
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#6A6A6A',
    },
    priceText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#007AFF',
        marginTop: 4,
    },
   
});
//정상