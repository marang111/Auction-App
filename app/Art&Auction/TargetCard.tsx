import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { CardColorClass, TargetData } from './TargetData'; 

// -------------------------------------------------------------------------
// 1. 디자인 가이드 색상 정의 (이미지 기반 라이트 카드 색상)
// -------------------------------------------------------------------------

const COLORS = {
    // 배경 및 기본
    CARD_BACKGROUND: '#e5e5e5ff', // 카드 배경색 (순백색)
    
    // 텍스트
    TEXT_PRIMARY: '#212529', // 주요 텍스트 
    TEXT_SECONDARY: '#495057', // 보조 텍스트 
    TEXT_TERTIARY: '#ADB5BD', // 아주 옅은 텍스트 
    
    // 그림자
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.08)', 
    
    // 태그 배경색 (이미지 기반의 파스텔톤)
    TAG_BG_LIGHT_BLUE: '#E0F2FF', 
    TAG_BG_LIGHT_PURPLE: '#EBE0FF', 
    TAG_BG_LIGHT_PINK: '#FFE0E6', 
    TAG_BG_LIGHT_YELLOW: '#FFFBE0', 

    // 회사 로고/아이콘 색상 (임시)
    LOGO_COLOR_HOPIN: '#4C6EF5', 
};


// -------------------------------------------------------------------------
// 2. 타입 정의 (TargetCard 구조를 Chart.tsx의 데이터 구조에 맞게 변경)
// -------------------------------------------------------------------------

// ⭐️ 변경: TargetCardProps가 TargetData의 속성들을 모두 포함하도록 확장
interface TargetCardProps extends TargetData {
    onClick: () => void;
}

interface FilterTagProps {
    label: string;
    backgroundColor: string;
}

// -------------------------------------------------------------------------
// 3. 내부 컴포넌트: FilterTag
// -------------------------------------------------------------------------

const FilterTag: FC<FilterTagProps> = ({ label, backgroundColor }) => (
    <View style={[TargetCardStyles.filterTag, { backgroundColor }]}>
        <Text style={TargetCardStyles.filterTagText}>{label}</Text>
    </View>
);


// -------------------------------------------------------------------------
// 4. TargetCard 컴포넌트
// -------------------------------------------------------------------------

const TargetCard: FC<TargetCardProps> = ({ 
    companyName,        // HopIn
    companyLogoText,    // H
    title,              // Lead Product Designer (직책)
    payRange,           // $4,500 – 5,500 NET (급여)
    tags,               // ['FULL-TIME', 'REMOTE', 'HIGH DEMAND']
    postedDaysAgo,      // POSTED 3 DAYS AGO
    colorClass,         
    onClick 
}) => {
    
    // ⚠️ 제거: 하드코딩된 더미 데이터 (DUMMY_COMPANY_NAME, DUMMY_TAGS 등) 모두 제거됨.

    // 태그 배경색 순환 로직
    const getTagBackgroundColor = (index: number) => {
        const colors = [
            COLORS.TAG_BG_LIGHT_BLUE, 
            COLORS.TAG_BG_LIGHT_PURPLE, 
            COLORS.TAG_BG_LIGHT_PINK, 
            COLORS.TAG_BG_LIGHT_YELLOW
        ];
        return colors[index % colors.length];
    };

    return (
        <TouchableOpacity 
            style={TargetCardStyles.cardContainer} 
            onPress={onClick}
            activeOpacity={0.8}
        >
            {/* 1. 회사 로고 및 이름 (props 사용) */}
            <View style={TargetCardStyles.companyHeader}>
                <Text style={[TargetCardStyles.companyLogo, { color: COLORS.LOGO_COLOR_HOPIN }]}>
                    {companyLogoText}
                </Text>
                <Text style={TargetCardStyles.companyName}>{companyName}</Text>
            </View>

            {/* 2. 직책 (props.title 사용) */}
            <Text style={TargetCardStyles.jobTitle}>{title}</Text>

            {/* 3. 급여 범위 (props.payRange 사용) */}
            <Text style={TargetCardStyles.payRange}>{payRange}</Text>

            {/* 4. 태그 그룹 (props.tags 사용) */}
            <View style={TargetCardStyles.tagsContainer}>
                {tags.map((tag, index) => (
                    <FilterTag 
                        key={index} 
                        label={tag} 
                        backgroundColor={getTagBackgroundColor(index)} 
                    />
                ))}
            </View>

            {/* 5. 게시일 (props.postedDaysAgo 사용) */}
            <Text style={TargetCardStyles.postedDate}>{postedDaysAgo}</Text>

        </TouchableOpacity>
    );
};

export default TargetCard;

// -------------------------------------------------------------------------
// 5. 스타일 정의 (이미지 기반 카드 디자인)
// -------------------------------------------------------------------------

const TargetCardStyles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderRadius: 16, 
        padding: 20,
        marginBottom: 20, 
        width: '100%', 
        alignSelf: 'center', 
        
        // 이미지 레퍼런스의 그림자 효과
        ...Platform.select({
            ios: {
                shadowColor: COLORS.SHADOW_COLOR,
                shadowOffset: { width: 0, height: 6 }, 
                shadowOpacity: 0.2, 
                shadowRadius: 12, 
            },
            android: {
                elevation: 8, 
            },
        }),
    },
    companyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    companyLogo: {
        fontSize: 16,
        fontWeight: '700',
        marginRight: 6,
    },
    companyName: {
        fontSize: 14,
        color: COLORS.TEXT_SECONDARY,
        fontWeight: '600',
    },
    jobTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.TEXT_PRIMARY,
        marginBottom: 6,
        lineHeight: 28, 
    },
    payRange: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.TEXT_PRIMARY,
        marginBottom: 16,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    filterTag: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    filterTagText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.TEXT_SECONDARY, 
    },
    postedDate: {
        fontSize: 12,
        color: COLORS.TEXT_TERTIARY,
        textAlign: 'right', 
        marginTop: 10,
    },
});