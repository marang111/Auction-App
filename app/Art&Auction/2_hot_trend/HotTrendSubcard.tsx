import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TrendItem } from './HotTrendData'; 

// -------------------------------------------------------------------------\
// 1-1. 유틸리티 함수
// -------------------------------------------------------------------------\

const getChangeColor = (value: string | undefined): string => {
    if (!value) return COLORS.TEXT_MEDIUM;
    // 상승 지표(↑ 또는 +)에 ACCENT, 하락 지표에 NEGATIVE 색상을 적용
    return (value.includes('↑') || value.includes('+')) ? COLORS.TEXT_ACCENT : COLORS.TEXT_NEGATIVE;
};

// -------------------------------------------------------------------------\
// 1-2. Multi Artist List Renderer (라이징 아티스트 리스트)
// -------------------------------------------------------------------------\

const MultiArtistList: FC<{ artists: { name: string; tag: string }[] }> = ({ artists }) => (
    <View style={cardStyles.artistListContainer}>
        {artists.map((artist, index) => (
            <View key={index} style={cardStyles.artistItem}>
                <Text style={cardStyles.artistName} numberOfLines={1}>{artist.name}</Text>
                <View style={cardStyles.artistTag}>
                    <Text style={cardStyles.artistTagText} numberOfLines={1}>{artist.tag}</Text>
                </View>
            </View>
        ))}
    </View>
);

// -------------------------------------------------------------------------\
// 2. Data Insight Card 컴포넌트
// -------------------------------------------------------------------------\

interface HotTrendSubcardProps extends TrendItem {
    onCardClick: () => void; // 부모로부터 받은 클릭 이벤트 핸들러
    style?: StyleProp<ViewStyle>; // style prop을 받을 수 있어야 합니다!
}

const DataInsightCard: FC<HotTrendSubcardProps> = (props) => {
    // 💡 props에서 onCardClick을 추출합니다.
    const { title, description, estimatedPrice, subInfo, changeValue, artistList, image, onCardClick } = props;
    const isMultiArtist = !!artistList && artistList.length > 0;
    

    return (
        // 💡 onPress 핸들러에 onCardClick을 연결합니다.
        <TouchableOpacity 
            style={[cardStyles.card, cardStyles.dataInsightCard]} 
            activeOpacity={0.8}
            onPress={onCardClick} // 👈 클릭 이벤트 연결
        >
            <View style={cardStyles.dataContentArea}>
                <View style={[
                    cardStyles.dataImagePlaceholder, 
                    isMultiArtist ? cardStyles.dataArtistPlaceholder : {}
                ]}>
                    {image ? (
                        <Image source={image} style={cardStyles.dataActualImage} />
                    ) : (
                        <Text style={cardStyles.dataImagePlaceholderText}>
                            {isMultiArtist ? '⭐️' : 'NFT'}
                        </Text>
                    )}
                </View>

                <View style={cardStyles.dataTextContainer}>
                    <Text style={cardStyles.cardTitle}>{title}</Text>
                    <Text style={cardStyles.cardDescription} numberOfLines={1} ellipsizeMode="tail">
                        {description}
                    </Text>
                    {!isMultiArtist && subInfo && <Text style={cardStyles.subInfoDetail}>{subInfo}</Text>}
                </View>
            </View>

            {isMultiArtist ? (
                <View>
                    <MultiArtistList artists={artistList!} />
                    <View style={[cardStyles.metricValueContainer, cardStyles.artistMetricContainer]}>
                    </View>
                    <View style={cardStyles.plusartistcard}>
                        <Text style={[cardStyles.changeValueText, cardStyles.plusartist]}>
                            추가 작가 보기
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={cardStyles.metricValueContainer}>
                    <Text style={cardStyles.mainValueText}>{estimatedPrice}</Text>
                    <Text style={[cardStyles.changeValueText, { color: getChangeColor(changeValue) }]}>
                        {changeValue}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default DataInsightCard;

// -------------------------------------------------------------------------\
// 3. 스타일 정의 (DataInsightCard 전용)
// -------------------------------------------------------------------------\

const cardStyles = StyleSheet.create({
    // --- 공통 카드 스타일 (자체적으로 정의) ---
    card: {
        width: '100%', 
        backgroundColor: COLORS.SURFACE_CARD, 
        borderRadius: 12,
        padding: 20,
        marginBottom: 20, 

        borderWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT,
    },
    cardTitle: {
        fontSize: 16, 
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
    },
    cardDescription: {
        fontSize: 14, 
        color: COLORS.TEXT_MEDIUM,
    },

    // --- Data Insight Card Styles ---
    dataInsightCard: {
        minHeight: 140, 
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    dataContentArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dataImagePlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#E0F5E8', // NFT Placeholder Color
        borderRadius: 25,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    dataActualImage: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        resizeMode: 'cover',
    },
    dataArtistPlaceholder: {
        backgroundColor: '#F5E0FF', // Artist Placeholder Color
    },
    dataImagePlaceholderText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.TEXT_ACCENT,
    },
    dataTextContainer: {
        flex: 1,
    },
    subInfoDetail: {
        fontSize: 12,
        color: COLORS.TEXT_MEDIUM,
        marginTop: 4,
    },
    metricValueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingTop: 10, 
        borderTopWidth: 1,
        borderTopColor: COLORS.DIVIDER_LIGHT,
    },
    mainValueText: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.TEXT_DARK,
    },
    changeValueText: {
        fontSize: 18,
        fontWeight: '700',
    },
    plusartistcard: {
        borderTopWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT,
        paddingTop: 5,

    },
    plusartist: {
        fontSize: 16,
        paddingTop: 10,
        margin: "auto",
        fontWeight: 500,
    },
    // --- Multi Artist List Styles ---
    artistListContainer: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.DIVIDER_LIGHT,
    },
    artistItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    artistName: {
        fontSize: 14,
        color: COLORS.TEXT_DARK,
        fontWeight: '600',
        flex: 1,
    },
    artistTag: {
        marginLeft: 10,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        backgroundColor: '#E6FFFA',
    },
    artistTagText: {
        fontSize: 12,
        color: COLORS.TEXT_ACCENT,
        fontWeight: '500',
    },
    artistMetricContainer: {
        borderTopWidth: 0,
        paddingTop: 5,
        justifyContent: 'flex-start',
    },
});