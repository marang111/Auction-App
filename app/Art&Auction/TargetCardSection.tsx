// TargetCardSection.tsx

import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TARGET_CARDS_DATA, TargetData } from './TargetData';
import TargetCard from './TargetCard';

interface TargetCardSectionProps {
    onViewAllTargets: () => void;
}

// -------------------------------------------------------------------------
// 1. 디자인 가이드 색상 정의 (Chart.tsx의 COLORS와 동기화)
// -------------------------------------------------------------------------

const COLORS = {
    TEXT_DARK: '#2D3748',    
    PRIMARY_BRAND: '#4299E1', 
    TEXT_MEDIUM: '#4A5568',
};

// -------------------------------------------------------------------------
// 2. 컴포넌트
// -------------------------------------------------------------------------

const TargetCardSection: FC<TargetCardSectionProps> = ({ onViewAllTargets }) => {
    // Top 2 Target Cards만 노출
    const topTargets = TARGET_CARDS_DATA.slice(0, 2); 
    const totalCount = TARGET_CARDS_DATA.length;

    return (
        <View style={targetSectionStyles.container}>
            
            {/* 노출할 타겟 카드 목록 */}
            {topTargets.map((data: TargetData) => (
                <TargetCard
                    key={data.id}
                    companyName={data.companyName}
                    companyLogoText={data.companyLogoText}
                    title={data.title}
                    payRange={data.payRange}
                    tags={data.tags}
                    postedDaysAgo={data.postedDaysAgo}
                    colorClass={data.colorClass}
                    onClick={() => console.log(`Navigating to target ${data.id}`)}
                />
            ))}
            
            {/* 전체 타겟 목록으로 이동하는 CTA */}
            {totalCount > 2 && (
                <TouchableOpacity style={targetSectionStyles.viewAllButton} onPress={onViewAllTargets}>
                    <Text style={targetSectionStyles.viewAllButtonText}>
                        전체 관측 타겟 보기 ({totalCount - 2}건 더 보기)
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TargetCardSection;

// -------------------------------------------------------------------------
// 3. 스타일 정의
// -------------------------------------------------------------------------

const targetSectionStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.TEXT_DARK, 
        marginBottom: 10,
    },
    viewAllButton: {
        backgroundColor: COLORS.PRIMARY_BRAND, 
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 15,
        // 기존 TargetCard와의 간격을 TargetCard 자체의 marginBottom으로 처리한다고 가정
    },
    viewAllButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
});