import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from './colors';
import { NextActionPromptType } from './hubTypes';

const styles = StyleSheet.create({
    alertBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.GRAY_BG,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 14,
        marginHorizontal: 20,
        borderRadius: 8,
        borderLeftWidth: 4,
    },
    alertText: {
        flex: 1,
        fontSize: 14,
        color: COLORS.DEEP_NAVY,
        fontWeight: '500',
        marginLeft: 10,
        lineHeight: 20,
    },
});

interface NextActionPromptProps {
    data: NextActionPromptType;
}

export const NextActionPrompt: React.FC<NextActionPromptProps> = ({ data }) => {
    if (!data.needsInsight) return null;
    
    let alertTextContent;
    let highlightColor = COLORS.ACCENT_GOLD; 
    let iconName = 'bulb-outline';

    if (data.type === 'VALUE_UPDATE') {
        highlightColor = COLORS.HIGHLIGHT_GREEN;
        iconName = 'trending-up-outline';
        alertTextContent = (
            <Text>
                <Text style={{fontWeight: '900'}}>{data.subject}</Text> 작가의{' '}
                <Text style={{color: highlightColor, fontWeight: '700'}}>{data.detail}</Text> 소식이 {"\n"}있습니다.
                <Text> 시장 가치를 확인하세요.</Text>
            </Text>
        );
    } 

    return (
        <TouchableOpacity 
            style={[styles.alertBanner, { borderLeftColor: highlightColor }]}
            activeOpacity={0.8}
        >
            <Ionicons name={iconName} size={20} color={highlightColor} />
            <Text style={styles.alertText}>
                {alertTextContent}
            </Text>
        </TouchableOpacity>
    );
};