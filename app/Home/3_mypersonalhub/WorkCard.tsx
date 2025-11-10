import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WorkItem } from './hubTypes';
import { COLORS } from './colors';
import { insertZeroWidthSpace } from './format';
import { AuctionPerformanceDisplay } from './AuctionPerformanceDisplay';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
    workCard: {
        width: SCREEN_WIDTH * 0.5, 
        marginRight: 13,
        overflow: 'hidden',
        borderRadius: 3,
        backgroundColor: '#f7f7f7ff',
    },
    imageWrapper: {
        position: 'relative',
    },
    workImage: {
        width: '100%',
        height: 180, 
        resizeMode: 'cover',
    },
    workInfo: {
        paddingHorizontal: 12, 
        paddingVertical: 12,
        flex: 1, 
        justifyContent: 'space-between',
    },
    artistNameText: {
        fontSize: 12,
        color: COLORS.ACCENT_GOLD,
        fontWeight: '600',
        marginBottom: 4,
    },
    workTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.CHARCOAL_GRAY,
        marginBottom: 4,
        lineHeight: 18, 
    },
    lastActivityText: {
        fontSize: 10,
        color: COLORS.LIGHT_GRAY,
        fontWeight: '400',
        marginTop: 8, 
    },
});

interface WorkCardProps {
    work: WorkItem;
    onPress: (workId: number) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({ work, onPress }) => (
    <TouchableOpacity
        style={styles.workCard}
        onPress={() => onPress(work.id)}
        activeOpacity={0.9}
    >
        <View style={styles.imageWrapper}>
            <Image 
                source={work.image as any} 
                style={styles.workImage} 
            />
        </View>
        
        <View style={styles.workInfo}>
            <View> 
                <Text style={styles.artistNameText}>{work.artist}</Text>
                <Text 
                    style={styles.workTitle} 
                    numberOfLines={2}
                >
                    {insertZeroWidthSpace(work.title)}
                </Text>
                
                <AuctionPerformanceDisplay 
                    price={work.currentPrice} 
                    performance={work.performanceVsEstimate}
                    watchers={work.totalWatchers}
                />
            </View>

            <Text style={styles.lastActivityText}>
                최근 활동: {work.lastActivity}
            </Text> 
        </View>
    </TouchableOpacity>
);