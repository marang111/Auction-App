import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './colors';
import { RiskExposureItem } from './hubTypes';

const styles = StyleSheet.create({
    riskCard: {
        backgroundColor: COLORS.BG_WHITE,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 20,
    },

    riskTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.CHARCOAL_GRAY,
        marginBottom: 12,
    },

    riskBarContainer: {
        flexDirection: 'row',
        height: 12,
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 10,
    },

    riskBarSegment: {
        height: '100%',
    },

    riskLegend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },

    riskLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 5,
    },

    riskDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },

    riskLegendText: {
        fontSize: 12,
        color: COLORS.CHARCOAL_GRAY,
        fontWeight: '500',
    },
});

interface RiskExposureCardProps {
    data: RiskExposureItem[];
}

export const RiskExposureCard: React.FC<RiskExposureCardProps> = ({ data }) => (
    <View style={styles.riskCard}>
        <Text style={styles.riskTitle}>나의 관심 작품 작가 집중도</Text>
        
        {/* 집중도 바 */}
        <View style={styles.riskBarContainer}>
            {data.map((item, index) => (
                <View 
                    key={index} 
                    style={[
                        styles.riskBarSegment, 
                        { width: `${item.percentage}%`, backgroundColor: item.color }
                    ]} 
                />
            ))}
        </View>
        
        {/* 범례 */}
        <View style={styles.riskLegend}>
            {data.map((item, index) => (
                <View key={index} style={styles.riskLegendItem}>
                    <View style={[styles.riskDot, { backgroundColor: item.color }]} />
                    <Text style={styles.riskLegendText}>{item.artist} <Text style={{fontWeight: '700', color: COLORS.DEEP_NAVY}}>{item.percentage}%</Text></Text>
                </View>
            ))}
        </View>
    </View>
);