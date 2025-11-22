import React, { FC } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TargetData } from './RecommendData';

interface TargetCardProps extends TargetData {
    onClick: () => void;
}

interface FilterTagProps {
    label: string;
    backgroundColor: string;
}

const FilterTag: FC<FilterTagProps> = ({ label, backgroundColor }) => (
    <View style={[TargetCardStyles.filterTag, { backgroundColor }]}>
        <Text style={TargetCardStyles.filterTagText}>{label}</Text>
    </View>
);

// -------------------------------------------------------------------------
// TargetCard 컴포넌트
// -------------------------------------------------------------------------

const TargetCard: FC<TargetCardProps> = ({ 
    companyName,        // 작가명
    companyLogoText,    // 작가 이니셜
    title,              // 작품 제목
    payRange,           // 추정 시장가 범위
    tags,               // 관측 태그/특징
    postedDaysAgo,      // 관측 업데이트 일자
    imageSource,        // : 이미지 URL
    onClick 
}) => {
    
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
            {/* 1. 상단 영역: 작품 정보 (텍스트)와 이미지 (가로 배치) */}
            <View style={TargetCardStyles.topContentWrapper}> 
                
                {/* 1-1. 작품 정보 텍스트 (왼쪽) */}
                <View style={TargetCardStyles.textWrapper}> 
                    {/* 회사 로고 및 이름 */}
                    <View style={TargetCardStyles.companyHeader}>
                        <Text style={[TargetCardStyles.companyLogo, { color: COLORS.LOGO_COLOR_HOPIN }]}>
                            {companyLogoText}
                        </Text>
                        <Text style={TargetCardStyles.companyName}>{companyName}</Text>
                    </View>

                    {/* 직책/작품 제목 */}
                    <Text style={TargetCardStyles.jobTitle}>{title}</Text>

                    {/* 급여/시장가 범위 */}
                    <Text style={TargetCardStyles.payRange}>{payRange}</Text>
                </View>

                {/* 1-2. 이미지 썸네일 (오른쪽) */}
                {imageSource && (
                    <Image 
                        source={imageSource} 
                        style={TargetCardStyles.thumbnail} // TargetCardStyles.thumbnail을 사용하도록 수정
                    />
                )}
            </View>

            {/* 2. 하단 영역: 태그 그룹과 게시일 */}
            <View style={TargetCardStyles.bottomDetailWrapper}>
                
                {/* 태그 그룹 (먼저 렌더링) */}
                <View style={TargetCardStyles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <FilterTag 
                            key={index} 
                            label={tag} 
                            backgroundColor={getTagBackgroundColor(index)}
                        />
                    ))}
                </View>
                {/* 게시일/관측일 (태그 아래에 쌓임) */}
                <Text style={TargetCardStyles.postedDate}>{postedDaysAgo}</Text>

            </View>

        </TouchableOpacity>
    );
};

export default TargetCard;

const TargetCardStyles = StyleSheet.create({

    cardContainer: {
    },
    topContentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'flex-start',

    },
    bottomDetailWrapper: {
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
    },

    
    thumbnail: {
        width: 100, 
        height: 100, 
        resizeMode: 'contain', 
        marginLeft: 10, 
        marginBottom: 10,
    },
    textWrapper: {
        flex: 1, // 남은 공간을 모두 차지
    },
    companyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    companyLogo: {
        fontSize: 14,
        fontWeight: '700',
        marginRight: 5,
    },
    companyName: {
        fontSize: 13,
        color: COLORS.TEXT_SECONDARY,
        fontWeight: '600',
    },
    jobTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.TEXT_PRIMARY,
        marginBottom: 6,
        lineHeight: 28, 
    },
    payRange: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.TEXT_PRIMARY,
        marginBottom: 16,
    },


    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8, // 게시일과 태그 사이 간격
    },
    filterTag: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 30,
        marginRight: 8,
        marginBottom: 5,
        borderColor: COLORS.DIVIDER_LIGHT,
        borderWidth: 1,
    },
    filterTagText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.TEXT_SECONDARY, 
    },
    postedDate: {
        width: '100%', 
        fontSize: 11,
        color: COLORS.TEXT_TERTIARY,
    },
    
});