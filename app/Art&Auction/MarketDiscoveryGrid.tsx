// MarketDiscoveryGrid.tsx

import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 32 - 10) / 2; // 전체 패딩(32)과 간격(10)을 고려

// -------------------------------------------------------------------------
// 1. 데이터 정의 (임시)
// -------------------------------------------------------------------------

interface DiscoveryItem {
    id: number;
    title: string;
    description: string;
    color: string;
}

const DISCOVERY_DATA: DiscoveryItem[] = [
    { id: 1, title: '동양화 컬렉션', description: '화제작 150점', color: '#F0F9FF' },
    { id: 2, title: 'Pop Art 거장들', description: '워홀, 리히텐슈타인', color: '#FFF7E6' },
    { id: 3, title: 'NFT 미술 실험', description: '디지털 아트의 미래', color: '#F0FFF4' },
    { id: 4, title: '조각/설치 미술', description: '공간의 재해석', color: '#FAF0FF' },
];

const COLORS = {
    TEXT_DARK: '#2D3748',
    TEXT_MEDIUM: '#4A5568',
};

// -------------------------------------------------------------------------
// 2. 컴포넌트
// -------------------------------------------------------------------------

const DiscoveryCard: FC<DiscoveryItem> = ({ title, description, color }) => (
    <TouchableOpacity style={[gridStyles.card, { backgroundColor: color }]} activeOpacity={0.8}>
        <Text style={gridStyles.cardTitle}>{title}</Text>
        <Text style={gridStyles.cardDescription}>{description}</Text>
    </TouchableOpacity>
);

const MarketDiscoveryGrid: FC = () => {
    return (
        <View style={gridStyles.container}>
            <Text style={gridStyles.header}>테마별/카테고리별 컬렉션</Text>
            <View style={gridStyles.grid}>
                {DISCOVERY_DATA.map((item) => (
                    <DiscoveryCard key={item.id} {...item} />
                ))}
            </View>
        </View>
    );
};

export default MarketDiscoveryGrid;

// -------------------------------------------------------------------------
// 3. 스타일 정의
// -------------------------------------------------------------------------

const gridStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH, 
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        justifyContent: 'flex-end',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 12,
        color: COLORS.TEXT_MEDIUM,
    },
});