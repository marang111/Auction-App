import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../../styles/COLORS';
import { cardStyles } from './AuctionItemCardStyles';

interface SwipeActionProps {
    pan: Animated.ValueXY;
    ACTION_WIDTH: number;
    SWIPE_THRESHOLD: number;
    // ⭐️ isSaved prop 제거: 아이콘 이름은 pan 값으로 결정되므로 더 이상 필요하지 않습니다.
    swipeIconScale: Animated.Value; 
}

// ⭐️ pan.x에 따라 0 또는 1을 출력하는 Animated Value 생성 (임계값 도달 시 1)
const iconToggle = (panX: Animated.Value, SWIPE_THRESHOLD: number): Animated.AnimatedInterpolation<number> => {
    return panX.interpolate({
        // 임계값 직전까지 0, 임계값부터 1로 급격히 전환 (숫자 값으로 보간)
        inputRange: [0, SWIPE_THRESHOLD - 1, SWIPE_THRESHOLD], 
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    });
};


export const SwipeActionView: FC<SwipeActionProps> = ({ pan, ACTION_WIDTH, SWIPE_THRESHOLD, swipeIconScale }) => {
    
    // X축 Animated.Value 추출
    const panX = pan.x as Animated.Value;
    
    // 스와이프 배경 (색상 블록)의 이동 계산
    const actionTranslateX = panX.interpolate({
        inputRange: [0, ACTION_WIDTH],
        outputRange: [-ACTION_WIDTH, 0], 
        extrapolate: 'clamp',
    });
    
    // 아이콘/텍스트의 전체 투명도 계산 (컨테이너 전체의 투명도)
    const containerOpacity = panX.interpolate({
        inputRange: [0, SWIPE_THRESHOLD * 0.5, ACTION_WIDTH],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp',
    });
    
    // ⭐️ 아이콘 전환을 위한 0 또는 1 값
    const iconState = iconToggle(panX, SWIPE_THRESHOLD);

    // ⭐️ 아웃라인 아이콘 투명도: iconState가 0 -> 1이 될 때 Opacity는 1 -> 0으로 사라짐
    const outlineIconOpacity = iconState.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    // ⭐️ 채워진 아이콘 투명도: iconState가 0 -> 1이 될 때 Opacity는 0 -> 1으로 나타남
    const fillIconOpacity = iconState.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    return (
        <View style={[cardStyles.swipeActionContainer, { width: ACTION_WIDTH }]}>
            {/* 스와이프 액션의 배경색 */}
            <Animated.View 
                style={[
                    StyleSheet.absoluteFillObject, 
                    { 
                        backgroundColor: COLORS.BOOKMARK, 
                        transform: [{ translateX: actionTranslateX }], 
                    }
                ]}
            />
            {/* 스와이프 액션의 아이콘 컨테이너 */}
            <Animated.View 
                style={{ 
                    opacity: containerOpacity, // 전체 투명도
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center', // 아이콘을 중앙에 배치
                    // ⭐️ 스케일 애니메이션 적용
                    transform: [{ scale: swipeIconScale }] 
                }}
            >
                {/* ⭐️ 아이콘 스택을 위한 래퍼 */}
                <View>
                    {/* ⭐️ 아웃라인 아이콘 (기본 상태) - Absolute로 겹치기, Opacity로 사라짐 */}
                    <Animated.View style={{ opacity: outlineIconOpacity, position: 'absolute' }}>
                        <Ionicons 
                            name={'bookmark-outline' as any} 
                            size={24} 
                            color={COLORS.SURFACE_CARD} 
                        />
                    </Animated.View>
                    
                    {/* ⭐️ 채워진 아이콘 (임계값 넘었을 때) - Relative로 크기 확보, Opacity로 나타남 */}
                    <Animated.View style={{ opacity: fillIconOpacity }}>
                        <Ionicons 
                            name={'bookmark' as any} 
                            size={24} 
                            color={COLORS.SURFACE_CARD} 
                        />
                    </Animated.View>
                </View>
            </Animated.View>
        </View>
    );
};

//정상 버전