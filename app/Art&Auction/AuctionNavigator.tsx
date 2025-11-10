// AuctionNavigator.tsx

import React, { FC, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// -------------------------------------------------------------------------
// 1. 데이터 정의 (임시)
// -------------------------------------------------------------------------

const NAV_FILTERS = [
    { id: 'all', label: '전체 목록' },
    { id: 'ending_soon', label: '마감 임박' },
    { id: 'newly_added', label: '신규 등록' },
    { id: 'high_value', label: '고가 작품' },
    { id: 'value_buy', label: '가성비 작품' },
    { id: 'featured', label: '주요 경매사' },
];

const COLORS = {
    TEXT_DARK: '#2D3748',
    PRIMARY_BRAND: '#4299E1',
    SURFACE_CARD: '#FFFFFF',
    DIVIDER_LIGHT: '#E2E8F0',
};


// -------------------------------------------------------------------------
// 2. 컴포넌트
// -------------------------------------------------------------------------

interface AuctionNavigatorProps {
    onFilterChange: (filterId: string) => void;
}

const AuctionNavigator: FC<AuctionNavigatorProps> = ({ onFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const handlePress = (id: string) => {
        setActiveFilter(id);
        onFilterChange(id);
    };

    return (
        <View style={navStyles.container}>
            <Text style={navStyles.header}>작품/경매 둘러보기</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={navStyles.chipContainer}>
                    {NAV_FILTERS.map((filter) => (
                        <TouchableOpacity
                            key={filter.id}
                            style={[
                                navStyles.chip,
                                activeFilter === filter.id && navStyles.activeChip,
                            ]}
                            onPress={() => handlePress(filter.id)}
                        >
                            <Text
                                style={[
                                    navStyles.chipText,
                                    activeFilter === filter.id && navStyles.activeChipText,
                                ]}
                            >
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default AuctionNavigator;

// -------------------------------------------------------------------------
// 3. 스타일 정의
// -------------------------------------------------------------------------

const navStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 10,
    },
    chipContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: COLORS.SURFACE_CARD,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT,
    },
    activeChip: {
        backgroundColor: COLORS.PRIMARY_BRAND,
        borderColor: COLORS.PRIMARY_BRAND,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.TEXT_DARK,
    },
    activeChipText: {
        color: COLORS.SURFACE_CARD,
        fontWeight: '600',
    },
});