// HotTrendCarousel.tsx

import React, { FC } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// -------------------------------------------------------------------------
// 1. 데이터 정의 (임시)
// -------------------------------------------------------------------------

interface TrendItem {
    id: number;
    title: string;
    description: string;
    icon: string; // 이모지 사용
    color: string;
}

const TREND_DATA: TrendItem[] = [
    { id: 1, title: 'Hot Artist', description: 'Yayoi Kusama의 펌프킨 시리즈', icon: '🎨', color: '#ffb3ba' },
    { id: 2, title: 'Top Auction', description: '홍콩 크리스티, 이번 주 5억 달러', icon: '💎', color: '#ffdfba' },
    { id: 3, title: 'Rising Sector', description: '동남아시아 현대미술 급부상', icon: '📈', color: '#ffffba' },
    { id: 4, title: 'High Interest', description: '김환기 작품 조회수 30% 증가', icon: '👀', color: '#bae1ff' },
];

const COLORS = {
    TEXT_DARK: '#2D3748',
    TEXT_MEDIUM: '#4A5568',
};


// -------------------------------------------------------------------------
// 2. 컴포넌트
// -------------------------------------------------------------------------

const HotTrendCard: FC<TrendItem> = ({ title, description, icon, color }) => (
    <TouchableOpacity style={[hotStyles.card, { backgroundColor: color }]} activeOpacity={0.8}>
        <Text style={hotStyles.cardIcon}>{icon}</Text>
        <Text style={hotStyles.cardTitle}>{title}</Text>
        <Text style={hotStyles.cardDescription}>{description}</Text>
    </TouchableOpacity>
);

const HotTrendCarousel: FC = () => {
    return (
        <View style={hotStyles.container}>
            <Text style={hotStyles.header}>🔥 지금 가장 뜨거운 작품/경매</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={hotStyles.carouselContent}
            >
                {TREND_DATA.map((item) => (
                    <HotTrendCard key={item.id} {...item} />
                ))}
            </ScrollView>
        </View>
    );
};

export default HotTrendCarousel;

// -------------------------------------------------------------------------
// 3. 스타일 정의
// -------------------------------------------------------------------------

const hotStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 10,
        paddingHorizontal: 0, // ScrollView의 패딩을 사용
    },
    carouselContent: {
        paddingHorizontal: 0,
    },
    card: {
        width: width * 0.7, // 화면 너비의 70%
        borderRadius: 12,
        padding: 15,
        marginRight: 10,
        justifyContent: 'space-between',
        height: 120,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cardIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
    },
    cardDescription: {
        fontSize: 12,
        color: COLORS.TEXT_MEDIUM,
        marginTop: 4,
    },
});