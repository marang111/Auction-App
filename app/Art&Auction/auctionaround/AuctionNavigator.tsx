import { Ionicons } from '@expo/vector-icons';
import React, { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// -------------------------------------------------------------------------
// 1. 데이터 정의 (임시) - 아이콘 추가됨
// -------------------------------------------------------------------------

interface NavFilter {
    id: string;
    label: string;
    iconName: keyof typeof Ionicons.glyphMap; // 아이콘 타입 정의
}

const NAV_FILTERS: NavFilter[] = [
    { id: 'all', label: '전체 목록', iconName: 'list' },
    { id: 'ending_soon', label: '마감 임박', iconName: 'time-outline' },
    { id: 'newly_added', label: '신규 등록', iconName: 'sparkles' },
    { id: 'high_value', label: '고가 작품', iconName: 'diamond-outline' },
    { id: 'private', label: 'Private Sale', iconName: 'add'},
    { id: 'value_buy', label: '가성비 작품', iconName: 'trending-down-outline' },
    { id: 'featured', label: '주요 경매사', iconName: 'business-outline' },
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

    const scrollContentStyle = { paddingHorizontal: 20 };

    return (
        <View style={navStyles.container}>
            <Text style={navStyles.header}>작품/경매 둘러보기</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={scrollContentStyle} // 콘텐츠에 패딩 적용
            >
                <View style={navStyles.chipContainer}>
                    {NAV_FILTERS.map((filter) => {
                        const isActive = activeFilter === filter.id;
                        const iconColor = isActive ? COLORS.SURFACE_CARD : COLORS.TEXT_DARK;

                        return (
                            <TouchableOpacity
                                key={filter.id}
                                style={[
                                    navStyles.chip,
                                    isActive && navStyles.activeChip,
                                ]}
                                onPress={() => handlePress(filter.id)}
                            >
                                {/* ⭐️ 아이콘 렌더링 */}
                                <Ionicons 
                                    name={filter.iconName} 
                                    size={15} 
                                    color={iconColor} 
                                    style={navStyles.chipIcon}
                                />
                                
                                <Text
                                    style={[
                                        navStyles.chipText,
                                        isActive && navStyles.activeChipText,
                                    ]}
                                >
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
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
    header: {
        fontSize: 19,
        fontWeight: '800',
        color: COLORS.TEXT_DARK,
        marginBottom: 15,
        paddingHorizontal: 20
    },
    container: {
        marginBottom: 10,
        // 이 음수 마진은 상단 헤더 텍스트와 스크롤 뷰가 부모의 패딩을 무시하게 합니다.
        // 스크롤 뷰는 contentContainerStyle에서 패딩을 다시 받아야 합니다.
        marginHorizontal: -20 
    },

    chipContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        // chipContainer 자체에는 이제 패딩이 필요 없습니다. (ScrollView contentContainerStyle로 이동)
        // marginHorizontal: 20
    },
    chip: {
        flexDirection: 'row', // 아이콘과 텍스트를 가로로 배열
        alignItems: 'center', // 세로 중앙 정렬
        paddingVertical: 10,
        paddingHorizontal: 18,
        backgroundColor: COLORS.SURFACE_CARD,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT,
        
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 3, 
    },
    activeChip: {
        backgroundColor: "black",
        borderColor: "black"
        
    },
    chipIcon: {
        marginRight: 6, // 아이콘과 텍스트 사이 간격
    },
    chipText: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.TEXT_DARK,
    },
    activeChipText: {
        color: COLORS.SURFACE_CARD,
        fontWeight: '600',
    },
});