import { Ionicons } from '@expo/vector-icons';
import React, { FC, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useToast } from "../../../components/SwipeCardToast";
import { COLORS } from '../../../styles/COLORS';
import { AuctionItem } from "./compo/AuctionListData";
import { SwipeActionView } from './compo/SwipeActionView';

// 감도 설정
const ACTION_WIDTH = 70; 
const SWIPE_THRESHOLD = ACTION_WIDTH * 0.99; 

// 스와이프 감도 증폭 계수 정의
// 1.0 = 100% (손가락 움직임과 동일), 1.5 = 150% (50% 증폭)
const SWIPE_SENSITIVITY_MULTIPLIER = 1.9; // ⭐️ 추천 값: 1.6 (60% 증폭)

// 스프링 효과 설정: 저장 성공 여부에 따라 적용
const SPRING_TENSION_BOUNCY = 50;    // 저장 실패/취소 시 복귀 (통통 튐)
const SPRING_FRICTION_BOUNCY = 7;    
const SPRING_TENSION_SAVED = 140;   // 저장 성공 후 복귀 (안정적)
const SPRING_FRICTION_SAVED = 14; 

interface Props {
    item: AuctionItem;
}

export const AuctionItemCard: FC<Props> = ({ item }) => {
    const { addToast } = useToast(); 
    
    const isLive = item.timeLeft === 'LIVE';
    const isClosed = item.timeLeft === 'CLOSED'; // ⭐️ 마감 상태 확인

    const pan = useRef(new Animated.ValueXY()).current;
    const [isSaved, setIsSaved] = useState(false); 
    const swipeIconScale = useRef(new Animated.Value(1)).current; 
    // ⭐️ [수정 핵심] onPanGestureEvent 함수 수정
    const onPanGestureEvent = Animated.event(
        [
            {
                nativeEvent: ({ translationX }: { translationX: number }) => {
                    // 손가락의 translationX에 증폭 계수를 곱하여 pan.x에 반영
                    pan.x.setValue(translationX * SWIPE_SENSITIVITY_MULTIPLIER); 
                },
            },
        ],
        { useNativeDriver: false }
    );
    // ⭐️ [수정 핵심] onHandlerStateChange 함수 수정
    const onPanHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            const { velocityX } = event.nativeEvent;
            
            // ⭐️ 주의: pan.x._value는 이미 증폭된 값이므로 그대로 사용
            const currentPanX = pan.x._value; 
            
            // 기존 로직 유지: 증폭된 값이 SWIPE_THRESHOLD를 넘으면 성공
            if (currentPanX > SWIPE_THRESHOLD) { 
                handleSaveToCollection();
            } else { 
                resetCardPosition(velocityX);
            }
        }
    };
    const saveAnimationTrigger = useRef(new Animated.Value(0)).current; 

    const panStyle = {
        transform: [{ translateX: pan.x }],
    };

    const handleAlarmPress = () => { /* ... */ };
    // ⭐️ 마감된 경매는 클릭 불가 (선택적)
    const handleCardPress = () => { 
        if (!isClosed) {
            // 경매 상세 페이지로 이동 로직
        }
    }; 

    // resetCardPosition 함수 수정: wasSaved 인자 추가 및 isSaved 관련 콜백 제거
    const resetCardPosition = (
        velocity?: number, 
        callbackOnComplete?: () => void, 
        wasSaved: boolean = false 
    ) => { 
        // wasSaved에 따라 텐션/마찰력 결정 (저장 성공 시 튕김 방지)
        const tensionValue = wasSaved ? SPRING_TENSION_SAVED : SPRING_TENSION_BOUNCY;
        const frictionValue = wasSaved ? SPRING_FRICTION_SAVED : SPRING_FRICTION_BOUNCY;

        Animated.spring(pan, { 
            toValue: { x: 0, y: 0 }, 
            useNativeDriver: true,
            tension: tensionValue, 
            friction: frictionValue,
            velocity: velocity || 0,
        }).start(() => {
            saveAnimationTrigger.setValue(0);
            
            // 리셋 애니메이션 완료 후 콜백 실행
            if (callbackOnComplete) {
                callbackOnComplete();
            }
        });
    };

    const handleSaveToCollection = () => { 
        addToast(`'${item.title}'이(가) 보관함에 저장되었습니다.`);
        
        Animated.timing(saveAnimationTrigger, {
            toValue: 1, 
            duration: 0, 
            useNativeDriver: false, 
        }).start(() => {
            
            Animated.sequence([
                Animated.timing(swipeIconScale, {
                    toValue: 1.25, 
                    duration: 150,
                    useNativeDriver: true, 
                }),
                Animated.spring(swipeIconScale, {
                    toValue: 1, 
                    useNativeDriver: true, 
                    tension: 100,
                    friction: 20,
                })
            ]).start(() => {
                 setIsSaved(true);
                 resetCardPosition(undefined, undefined, true); 
            });
        });
    };

    const onGestureEvent = (event: any) => {
        const translationX = event.nativeEvent.translationX;

        if (translationX > ACTION_WIDTH) {
            pan.x.setValue(ACTION_WIDTH);
        } else if (translationX > 0) {
            pan.x.setValue(translationX);
        } else {
            pan.x.setValue(0);
        }
    };
    
    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            const { translationX, velocityX } = event.nativeEvent;
            
            // ⭐️ 마감된 경매는 스와이프 저장 액션 불가능
            if (isClosed) {
                 resetCardPosition(velocityX);
                 return; 
            }

            if (translationX > SWIPE_THRESHOLD) {
                // 저장 성공
                handleSaveToCollection(); 
            } else {
                // 저장 실패/취소 (튕기는 애니메이션 적용)
                resetCardPosition(velocityX); 
            }
        }
        if (event.nativeEvent.state === State.CANCELLED || event.nativeEvent.state === State.FAILED) {
            resetCardPosition();
        }
    };


    return (
        <View style={Styles.swipeWrapper}>
            <SwipeActionView 
                pan={pan} 
                ACTION_WIDTH={ACTION_WIDTH} 
                SWIPE_THRESHOLD={SWIPE_THRESHOLD} 
                swipeIconScale={swipeIconScale}
            />
            
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}

                 // 가로로 20px 이상 움직여야 스와이프 시작
                activeOffsetX={[-1, 1]}
                // 세로로 100px 움직여도 스와이프 시작 안함 
                activeOffsetY={[-100, 100]} 
                // 세로로 5px 이내 움직이면 스와이프 실패
                failOffsetY={[-5, 5]} 
                // 터치 영역 확대
                hitSlop={{ top: -10, bottom: -10, left: 0, right: 0 }} 
            >
                <Animated.View 
                    style={[Styles.animatedCard, panStyle]}
                >
                    {/* 카드 내용 렌더링 (View 내부) */}
                    <View style={Styles.card} onTouchEnd={handleCardPress}>
                        
                        <View style={Styles.leftTimeContainer}>
                            {isLive ? (
                                <View style={Styles.liveBox}>
                                    <Text style={Styles.liveText}>{item.timeLeft}</Text>
                                </View>
                            ) : isClosed ? ( 
                                // ⭐️ 마감된 경매는 '마감' 텍스트 표시
                                <View style={Styles.closedBox}>
                                    <Text style={Styles.closedText}>마감</Text>
                                </View>
                            ) : (
                                <Text style={Styles.timeLeftText}>{item.timeLeft}</Text>
                            )}
                        </View>

                        <View style={Styles.content}>
                            <View style={Styles.titleRow}>

                                <Text style={[Styles.title, isClosed && Styles.mutedText]} numberOfLines={1}> 
                                    {item.title}
                                </Text>
                                {/* ⭐️ 북마크 아이콘 */}
                                {isSaved && (
                                    <View style={Styles.titleBookmarkCircle}>
                                        <Ionicons 
                                            name="bookmark" 
                                            size={12.5} 
                                            color={COLORS.SURFACE_CARD}
                                        />
                                    </View>
                                )}
                                
                            </View>
                            <Text style={[Styles.artist, isClosed && Styles.mutedText]}>{item.artist}</Text> 
                            <View style={Styles.statsRow}>
                                <View style={Styles.statItem}>
                                    <Ionicons 
                                        name="layers-outline" 
                                        size={14} 
                                        color={isClosed ? COLORS.DIVIDER_LIGHT : COLORS.INFO_HIGHLIGHT} 
                                        style={Styles.statIcon} 
                                    />
                                    <Text style={[Styles.statText, isClosed && Styles.mutedText]}>{item.pieces}점</Text> 
                                </View>
                                <View style={Styles.statItem}>
                                    <Ionicons 
                                        name="trending-up-outline" 
                                        size={14} 
                                        color={isClosed ? COLORS.DIVIDER_LIGHT : COLORS.INFO_HIGHLIGHT} 
                                        style={Styles.statIcon} 
                                    />
                                    <Text style={[Styles.statText, isClosed && Styles.mutedText]}> {item.totalEstimate}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={Styles.rightInfoContainer}>
                            {/* ⭐️ 조건부 스타일 isClosed (?,&&)적용 */}
                            <Text style={[Styles.auctionHouse, isClosed && Styles.mutedText]}> 
                                {item.auctionHouse}
                            </Text>
                            <View style={Styles.locationRow}>
                                <Ionicons 
                                    name="location-outline" 
                                    size={12} 
                                    color={isClosed ? COLORS.DIVIDER_LIGHT : "gray"} 
                                />
                                <Text style={[Styles.locationText, isClosed && Styles.mutedText]}>{item.location}</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

const Styles = StyleSheet.create({
    swipeWrapper: {
        marginBottom: 0,
        overflow: 'hidden', 
    },
    animatedCard: {},
    swipeActionContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: COLORS.TEXT_ACCENT, 
        zIndex: -1, 
    },
    swipeActionText: {
        color: COLORS.SURFACE_CARD,
        fontWeight: '700',
        fontSize: 14, 
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.SURFACE_CARD,
        paddingVertical: 10, 
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT, 
        alignItems: 'center',
        position: 'relative', 
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // ⭐️ 북마크 원 
    titleBookmarkCircle: {
        width: 20,  
        height: 20,
        borderRadius: 100,
        backgroundColor: COLORS.BOOKMARK,
        justifyContent: 'center', 
        alignItems: 'center',    
        marginLeft: 5,      
        top: -2,
    },
    leftTimeContainer: {
        width: 50, 
        justifyContent: 'center',
    },
    timeLeftText: {
        fontSize: 13, 
        fontWeight: '700', 
        color: COLORS.TEXT_DARK,
    },
    liveBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveText: {
        fontSize: 13,
        fontWeight: '800',
        color: COLORS.TEXT_NEGATIVE,
    },
    // ⭐️ 마감된 경매 시간 표시 스타일
    closedBox: {
        alignItems: 'center',
        right: 9.5,
    },
    closedText: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 4,
        backgroundColor: COLORS.DIVIDER_LIGHT, 
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.TEXT_MEDIUM, // 중간 회색 글자
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 10, 
    },
    rightInfoContainer: {
        width: 80, 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        borderLeftWidth: 1, 
        borderLeftColor: COLORS.DIVIDER_LIGHT,
    },
    auctionHouse: {
        fontSize: 14, 
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 2,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    locationText: {
        fontSize: 12,
        color: COLORS.TEXT_MEDIUM,
        marginLeft: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 4,
    },
    artist: {
        fontSize: 13,
        fontWeight: 600,
        color: COLORS.TEXT_LIGHT,
        marginBottom: 10,
    },
    statsRow: {
        // backgroundColor: "black",
        flexDirection: 'row',
        marginBottom: 4, 
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    statIcon: {
        marginRight: 3,
    },
    statText: {
        fontSize: 13, 
        fontWeight: '600',
        color: "black", 
    },
    // ⭐️ 마감된 경매의 텍스트를 연한 회색으로 만드는 스타일
    mutedText: {
        color: COLORS.TEXT_LIGHT, 
    },
});
//정상