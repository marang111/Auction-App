import React, { FC, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { FOCUS_ARTWORK_DATA, TREND_DATA, TrendItem } from './2_hot_trend/HotTrendData';

import FocusArtworkCard from './2_hot_trend/1_HtMainCard';
import HotTrendMaincard from './2_hot_trend/HotTrendMaincard';
import HotTrendSubcard from './2_hot_trend/HotTrendSubcard';
import RecommendedTargetComponent from './2_hot_trend/recommendtarget/RecommendedTargetComponent';

const { width } = Dimensions.get('window');

// 1. 부모로부터 받을 Props 정의 (변경 없음)
interface HotTrendCarouselProps {
    onNavigateToDetail: (item: TrendItem) => void; 
    showRecommendationForId: number | null; 
}

const HotTrendCarousel: FC<HotTrendCarouselProps> = ({ 
    onNavigateToDetail, 
    showRecommendationForId 
}) => {
    
    // 2. 상태 관리 (변경 없음)
    const [activeRecommendationId, setActiveRecommendationId] = useState<number | null>(null);
    const [lastClickedItemTitle, setLastClickedItemTitle] = useState('');

    // 3. 부모 Prop 변경 감지 (변경 없음)
    useEffect(() => {
        if (showRecommendationForId) {
            if (showRecommendationForId !== activeRecommendationId) {
                setActiveRecommendationId(showRecommendationForId);
            } 
            else {
                setActiveRecommendationId(null);
            }
        }
        else {
             setActiveRecommendationId(null);
        }
    }, [showRecommendationForId]); 
    

    /**
     * 💡 4. 카드 클릭 핸들러 (MainCard 전용)
     */
    const handleCardClick = (item: TrendItem) => {
        console.log(`Requesting Navigation for MainCard: ${item.id}`);
        
        setLastClickedItemTitle(item.title); 

        if (onNavigateToDetail) {
            onNavigateToDetail(item);
        } else {
            console.warn("onNavigateToDetail prop is missing!");
        }
    };
    

    // 5. 카드 렌더링 함수 
    const renderTrendCard = (item: TrendItem) => {
        const isMainCard = item.type === 'auction_focus';
        const CardComponent = isMainCard ? HotTrendMaincard : HotTrendSubcard;

        // 💡 SubCard에만 { paddingHorizontal: 20 } 스타일을 적용합니다.
        const subCardPaddingStyle = !isMainCard ? { paddingHorizontal: 20 } : {}; 
        
        // 💡 MainCard일 때는 handleCardClick을, SubCard일 때는 빈 함수를 전달합니다.
        const clickHandler = isMainCard 
            ? () => handleCardClick(item) 
            : () => { console.log('SubCard clicked - no navigation.'); }; // SubCard 클릭 시 (아무것도 안 함)

        return (
            // View로 감싸고, SubCard일 때만 패딩 스타일을 적용
            <View style={subCardPaddingStyle} key={`card-wrapper-${item.id}`}> 
                <CardComponent 
                    {...item}
                    onCardClick={clickHandler} 
                />
            </View>
        );
    };


    // 6. 메인 렌더링 로직 
    const renderTrendListWithRecommendation = () => {
        const renderedItems = [];
        const trendData = TREND_DATA;

        for (let i = 0; i < trendData.length; i++) {
            const item = trendData[i];
            
            renderedItems.push(renderTrendCard(item));

            if (item.id === activeRecommendationId) {
                renderedItems.push(
                    <RecommendedTargetComponent 
                        key={`recommended-block-${item.id}`}
                        relatedContentTitle={lastClickedItemTitle} 
                    />
                );
            }
        }
        return renderedItems;
    };


    // 7. 렌더링 
    const focusArtworkItem = FOCUS_ARTWORK_DATA[0];

    return (
        <View style={hotStyles.container}>
        {/* ✨ 1. 타이틀 텍스트를 카드 위에 별도로 배치 */}
        {focusArtworkItem && (
            <Text style={hotStyles.maincardTitle}>{focusArtworkItem.title}</Text>
        )}

        {/* 2. FocusArtworkCard 컴포넌트 배치 */}
        {focusArtworkItem && (
            <FocusArtworkCard {...focusArtworkItem} />
        )}
        
        <View style={hotStyles.blockContent}> 
            {renderTrendListWithRecommendation()} 
        </View>
    </View>
    );
};

export default HotTrendCarousel;

const hotStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginHorizontal: -20,   
        // backgroundColor: COLORS.DIVIDER_LIGHT
    },
    blockContent: {
        // borderWidth: 2
        // 카드를 세로로 쌓는 컨테이너
    },
    maincardTitle: {
        fontSize: 19,
        fontWeight: 800,
        paddingHorizontal: 20,
        marginBottom: 13,
    }
});