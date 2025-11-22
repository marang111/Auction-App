import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../styles/COLORS'; 

export const cardStyles = StyleSheet.create({
    swipeWrapper: {
        marginBottom: 8,
        borderRadius: 8,
        overflow: 'hidden', 
    },
    animatedCard: {},
    swipeActionContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: COLORS.TEXT_ACCENT, 
        zIndex: -1, 
    },
    swipeActionText: {
        color: COLORS.SURFACE_CARD,
        fontWeight: '700',
        fontSize: 14, 
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.SURFACE_CARD,
        borderRadius: 8,
        paddingVertical: 10, 
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT, 
        alignItems: 'center',
    },
    leftTimeContainer: {
        width: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: COLORS.DIVIDER_LIGHT,
    },
    timeLeftText: {
        fontSize: 14, 
        fontWeight: '800', 
        color: COLORS.TEXT_DARK,
    },
    liveBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveText: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.TEXT_NEGATIVE,
    },
    alarmIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        marginRight: 5, 
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 10, 
    },
    rightInfoContainer: {
        width: 80, 
        alignItems: 'flex-end', 
        justifyContent: 'center',
        paddingLeft: 15, 
        borderLeftWidth: 1, 
        borderLeftColor: COLORS.DIVIDER_LIGHT,
    },
    auctionHouse: {
        fontSize: 14, 
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 2,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    locationText: {
        fontSize: 12,
        color: COLORS.TEXT_MEDIUM,
        marginLeft: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 4,
    },
    artist: {
        fontSize: 13,
        color: COLORS.TEXT_MEDIUM,
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 4, 
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    statIcon: {
        marginRight: 3,
    },
    statText: {
        fontSize: 13, 
        fontWeight: '600',
        color: COLORS.INFO_HIGHLIGHT, 
    },
});