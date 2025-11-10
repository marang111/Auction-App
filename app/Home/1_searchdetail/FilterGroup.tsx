import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// =========================================================================
// 1. FilterButton 컴포넌트 정의 (FilterGroup에 통합)
// =========================================================================

interface FilterButtonProps {
    text: string;
    // Ionicons의 이름을 사용하도록 변경 (웹 SVG 아이콘 대체)
    iconName: 'calendar-outline' | 'compass-outline' | 'pricetag-outline';
    isActive: boolean;
    onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ text, iconName, isActive, onClick }) => {
    return (
        <TouchableOpacity 
            style={[
                filterGroupStyles.filterButton,
                isActive ? filterGroupStyles.filterButtonActive : filterGroupStyles.filterButtonInactive,
            ]}
            onPress={onClick}
        >
            {/* 아이콘 렌더링 */}
            <Ionicons 
                name={iconName} 
                size={18} 
                // 활성화/비활성화 상태에 따라 색상 결정
                color={isActive ? 'white' : '#333'} 
                style={filterGroupStyles.filterButtonIcon}
            />
            {/* 텍스트 렌더링 */}
            <Text 
                style={[
                    filterGroupStyles.filterButtonText,
                    isActive && filterGroupStyles.filterButtonTextActive // 활성화 시 흰색 텍스트
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};


function FilterGroup() {
    const [activeFilter, setActiveFilter] = useState('auctions');

    // 아이콘 이름을 Ionicons 이름으로 매핑
    const iconMap = {
        'auctions': 'calendar-outline' as const, // calendar 아이콘
        'explore': 'compass-outline' as const,   // explore 아이콘
        'private': 'pricetag-outline' as const,  // tag 아이콘
    };

    return (
        <View style={filterGroupStyles.filterGroupContainer}>
            <FilterButton 
                text="Auctions"
                iconName={iconMap['auctions']}
                isActive={activeFilter === 'auctions'}
                onClick={() => setActiveFilter('auctions')}
            />
            <FilterButton 
                text="Explore"
                iconName={iconMap['explore']}
                isActive={activeFilter === 'explore'}
                onClick={() => setActiveFilter('explore')}
            />
            <FilterButton 
                text="Private sales"
                iconName={iconMap['private']}
                isActive={activeFilter === 'private'}
                onClick={() => setActiveFilter('private')}
            />
        </View>
    );
}

export default FilterGroup;


// =========================================================================
// 3. 스타일 정의 (StyleSheet)
// =========================================================================

const filterGroupStyles = StyleSheet.create({
    filterGroupContainer: {
        padding:8,
        flexDirection: 'row', // display: flex, 주축 가로
        justifyContent: 'flex-start',
    },

    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 9999, 
        marginRight: 10, // gap: 10px 대체
        
        // transition은 RN에서 레이아웃 애니메이션으로 처리됨
    },
    
    filterButtonInactive: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e0e0e0', // 연한 테두리
        // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3, 
    },

    filterButtonActive: {
        backgroundColor: '#000', // 검은색 배경
        borderWidth: 1,
        borderColor: '#000',
        // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },

    filterButtonIcon: {
        marginRight: 8,
        flexShrink: 0,
        // 색상은 FilterButton 컴포넌트 내부에서 isActive 상태에 따라 동적으로 설정
    },

    // 텍스트 스타일
    filterButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333', // 비활성화 시 검은색 텍스트
    },
    // 활성화 시 텍스트 색상
    filterButtonTextActive: {
        color: 'white',
    },
});