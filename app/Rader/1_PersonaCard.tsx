import React, { FC } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// -------------------------------------------------------------------------
// Liquid Scope 테마 색상 정의
// -------------------------------------------------------------------------
const COLORS = {
    PRIMARY_TEXT: '#2a2a2aff',
    SECONDARY_TEXT: '#959595ff',
    ACCENT_GOLD: '#1a0367ff',
    ACCENT_DARK: '#dcdcdcff',
    CARD_BG_GLASS: 'rgba(206, 206, 206, 0.08)',
    DIVIDER: 'rgba(255, 255, 255, 0.15)',
};

interface PersonaSnapshotCardProps {
    /** 현재 필터랩에서 설정된 분석 포커스 (예: '활동성 중심') */
    analysisFocus: string; 
    /** 현재 필터랩에서 설정된 관측 기간 (예: '장기 관측 (5년)') */
    scopeDuration: string;  
    /** '필터 설정 변경' 버튼 클릭 시 호출될 함수 (Market Scope으로 이동) */
    onSettingsPress: () => void;
}

/**
 * Market Insight Scope에서 설정된 사용자의 현재 분석 페르소나를 요약하여 보여주는 카드 컴포넌트입니다.
 */
const PersonaSnapshotCard: FC<PersonaSnapshotCardProps> = ({ analysisFocus, scopeDuration, onSettingsPress }) => {
    return (
        <View style={personaSnapshotStyles.cardContainer}>
            <View style={personaSnapshotStyles.header}>
                <Text style={personaSnapshotStyles.headerTitle}>분석 페르소나 현황</Text>
                <TouchableOpacity style={personaSnapshotStyles.settingsButton} onPress={onSettingsPress}>
                    <Text style={personaSnapshotStyles.settingsButtonText}>필터 설정 변경</Text>
                </TouchableOpacity>
            </View>

            <View style={personaSnapshotStyles.divider} />
            
            <View style={personaSnapshotStyles.detailsRow}>
                <View style={personaSnapshotStyles.detailItem}>
                    <Text style={personaSnapshotStyles.detailLabel}>분석 포커스</Text>
                    <Text style={personaSnapshotStyles.detailValue}>{analysisFocus}</Text>
                </View>
                <View style={personaSnapshotStyles.detailItem}>
                    <Text style={personaSnapshotStyles.detailLabel}>관측 기간</Text>
                    <Text style={personaSnapshotStyles.detailValue}>{scopeDuration}</Text>
                </View>
            </View>
        </View>
    );
};

export default PersonaSnapshotCard;

const personaSnapshotStyles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.CARD_BG_GLASS, 
        borderRadius: 18,
        padding: 20,
        marginVertical: 15, 
        borderWidth: 1,
        borderColor: COLORS.DIVIDER, 
        // ⭐️ 그림자/글로우 속성 제거
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    headerTitle: { 
        fontSize: 18, 
        fontWeight: '700', 
        color: COLORS.PRIMARY_TEXT, 
    },
    settingsButton: {
        paddingVertical: 5, 
        paddingHorizontal: 9, 
        backgroundColor: COLORS.ACCENT_DARK, 
        borderRadius: 8, 
    },
    settingsButtonText: { 
        color: COLORS.ACCENT_GOLD, 
        fontSize: 13, 
        fontWeight: '500', 
    },
    divider: { 
        height: 1, 
        backgroundColor: COLORS.DIVIDER, 
        marginVertical: 10, 
    },
    detailsRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        gap: 15, 
    },
    detailItem: { 
        flex: 1, 
    },
    detailLabel: { 
        fontSize: 13, 
        color: COLORS.SECONDARY_TEXT, 
        marginBottom: 4, 
    },
    detailValue: { 
        fontSize: 15, 
        fontWeight: '700', 
        color: COLORS.PRIMARY_TEXT, 
    },
});