import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from './colors';
import { formatCurrency } from './format';

// Auction Performance 전용 스타일
const performanceStyles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER, 
    },
    mainPriceRow: {
        flexDirection: 'row',
        alignItems: 'baseline', 
        justifyContent: 'flex-start',
        marginBottom: 8,
    },
    currentPriceValue: {
        fontSize: 18, 
        fontWeight: '900',
        color: COLORS.DEEP_NAVY,
    },
    currentPriceUnit: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.DEEP_NAVY,
        marginLeft: 2,
    },
    preSalePriceText: { 
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.ACCENT_GOLD, 
    },
    indicatorRow: {
        marginBottom: 8,
    },
    performanceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 6,
    },
    performanceLabel: {
        fontSize: 11.5,
        color: COLORS.CHARCOAL_GRAY,
        marginRight: 4,
    },
    performanceText: {
        fontSize: 11,
        fontWeight: '700',
    },
    preSalePerformanceHint: {
        paddingHorizontal: 6, 
        paddingVertical: 4,
        height: 25, 
        justifyContent: 'center',
        borderColor: 'transparent',
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 6,
    },
    preSaleHintText: {
        fontSize: 11.5,
        color: COLORS.LIGHT_GRAY,
        fontWeight: '500',
    },
    watcherRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    watcherText: {
        fontSize: 11,
        color: COLORS.CHARCOAL_GRAY,
        marginLeft: 4,
        fontWeight: '500',
    }
});


interface AuctionPerformanceDisplayProps {
    price: number; 
    performance: number;
    watchers: number;
}

export const AuctionPerformanceDisplay: React.FC<AuctionPerformanceDisplayProps> = ({ 
    price, performance, watchers 
}) => {

    const isPreSale = performance === 0;
    const isOverperforming = performance > 1.0;
    const isUnderperforming = performance < 1.0;
    const performanceColor = isOverperforming ? COLORS.HIGHLIGHT_GREEN : isUnderperforming ? COLORS.LIVE_RED : COLORS.CHARCOAL_GRAY;
    
    const performanceRateText = performance !== 1.0 
        ? `${isOverperforming ? '▲' : '▼'}${(Math.abs(performance - 1.0) * 100).toFixed(0)}%` 
        : '추정가 부합'; 

    return (
        <View style={performanceStyles.container}>
            {/* 1. 현재 입찰가 (Pre-Sale 분기 처리) */}
            <View style={performanceStyles.mainPriceRow}>
                {isPreSale ? (
                    <Text style={performanceStyles.preSalePriceText}>
                        경매 예정
                    </Text>
                ) : (
                    <Text style={performanceStyles.currentPriceValue}>
                        {formatCurrency(price)}
                        <Text style={performanceStyles.currentPriceUnit}> 원</Text>
                    </Text>
                )}
            </View>

            {/* 2. 성과 및 관심 지표 */}
            <View style={performanceStyles.indicatorRow}>
                {/* 2-1. 성과 배지 (Pre-Sale 분기 처리) */}
                {isPreSale ? (
                    <View style={performanceStyles.preSalePerformanceHint}>
                        <Text style={performanceStyles.preSaleHintText}>추정가 미정</Text>
                    </View>
                ) : (
                    <View style={[performanceStyles.performanceBox, { borderColor: performanceColor + '40', backgroundColor: performanceColor + '10' }]}>
                        <Text style={performanceStyles.performanceLabel}>추정가 대비</Text>
                        <Text style={[performanceStyles.performanceText, { color: performanceColor }]}>
                            {performanceRateText}
                        </Text>
                    </View>
                )}
                
                {/* 2-2. 관심 지표 (항상 렌더링) */}
                <View style={performanceStyles.watcherRow}>
                    <Ionicons name="eye-outline" size={14} color={COLORS.LIGHT_GRAY} />
                    <Text style={performanceStyles.watcherText}>
                        찜 {formatCurrency(watchers)} 명
                    </Text>
                </View>
            </View>
        </View>
    );
};