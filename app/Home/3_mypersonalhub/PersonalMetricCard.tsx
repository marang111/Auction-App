import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from './colors';

// Metric Card 전용 스타일
export const metricStyles = StyleSheet.create({
    card: {
        width: '32%', 
        padding: 12, 
        backgroundColor: COLORS.BG_WHITE,
        borderWidth: 1,
        borderColor: COLORS.BORDER,
        minHeight: 170,
        borderRadius: 6,
        marginBottom: 20,
    },
    iconWrapper: {
        marginBottom: 8,
    },
    label: {
        fontSize: 13,
        color: COLORS.LIGHT_GRAY,
        fontWeight: '500',
        lineHeight: 17, 
        marginBottom: 10, 
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 'auto', 
    },
    value: {
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 22,
    },
    unit: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.DEEP_NAVY,
        marginLeft: 2,
    },
    separator: {
        fontSize: 15,
        fontWeight: '300',
        color: COLORS.LIGHT_GRAY,
        marginHorizontal: 4,
    }
});


interface PersonalMetricCardProps {
    iconName: string;
    label: string;
    value: string | React.ReactNode;
    valueColor: string;
}

export const PersonalMetricCard: React.FC<PersonalMetricCardProps> = ({ 
    iconName, label, value, valueColor 
}) => (
    <View style={metricStyles.card}> 
        
        <View>
            <View style={metricStyles.iconWrapper}>
                <Ionicons name={iconName} size={20} color={COLORS.DEEP_NAVY} />
            </View>
            <Text style={metricStyles.label}>{label}</Text>
        </View>

        <View style={metricStyles.valueContainer}>
            {typeof value === 'string' ? (
                <Text style={[metricStyles.value, { 
                    color: valueColor, 
                    lineHeight: metricStyles.value.lineHeight 
                }]}>
                    {value}
                </Text>
            ) : (
                value 
            )}
        </View>
    </View>
);