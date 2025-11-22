import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TrendItem } from './HotTrendData'; 

interface HotTrendMaincardProps extends TrendItem {
    onCardClick: () => void; // 부모로부터 받은 클릭 이벤트 핸들러
}

const AuctionFocusCard: FC<HotTrendMaincardProps> = ({ 
    title, 
    description, 
    image, 
    auctionInfo, 
    estimatedPrice, 
    onCardClick // 👈 추가
}) => (
    <TouchableOpacity 
        style={cardStyles.card} 
        activeOpacity={0.8} 
        onPress={onCardClick} // 
    >
            <View style={cardStyles.auctionInfoContainer}>
                <Text style={[cardStyles.cardTitle]}>{title}</Text>
                <Text style={cardStyles.subInfoText}>{auctionInfo}</Text>
            </View>
            <View style={cardStyles.auctionContentArea}>
                <View style={cardStyles.imagePlaceholder}>
                    {image && <Image source={image} style={cardStyles.actualImage} />}
                </View>
            </View>

            
            <View style={cardStyles.priceinfocontainer}>
                <Text style={[cardStyles.infoHighlightText]}>
                    {estimatedPrice}
                </Text>
                <View style={cardStyles.tagcontainer}>
                    {Array.isArray(description) && description.length > 0 && (
                        <View style={cardStyles.tagrow}>
                            {description.map((descItem, index) => {
                                const isHighlight = index === 0;
                                const itemStyle = isHighlight 
                                    ? [cardStyles.cardDescriptionItem, cardStyles.hightlightTag] 
                                    : cardStyles.cardDescriptionItem;

                                return (
                                    <Text key={index} style={itemStyle}>
                                        {descItem} 
                                    </Text>
                                );
                            })}
                        </View>
                    )}
                </View>
            </View>
    </TouchableOpacity>
);

export default AuctionFocusCard;

const cardStyles = StyleSheet.create({
    card: {
        width: '100%', 
        paddingHorizontal: 20,
        backgroundColor: COLORS.SURFACE_CARD, 
        borderWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT,
        marginBottom: 20, 
    },
    auctionContentArea: {
        overflow: "hidden",
    },
    imagePlaceholder: {
        width: "100%",
        height: 150,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        marginBottom: 15,
    },
    actualImage: { 
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    
    auctionInfoContainer: {
        backgroundColor: "white",
        paddingVertical: 18,

        // borderBottomWidth: 1,
        // borderColor: COLORS.DIVIDER_LIGHT,
        // borderTopRightRadius: 25,
        // borderTopLeftRadius: 25,

    },
    priceinfocontainer:{
        backgroundColor: "white",
        paddingBottom: 10,
    },

// 제목
    cardTitle: {
        fontSize: 17, 
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 4,
    },
    subInfoText: {
        fontSize: 13,
    },
    
    infoHighlightText: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.TEXT_DARK,
        // textAlign: "center",
        paddingTop: 15,
        borderTopWidth:1,
        borderColor: COLORS.DIVIDER_LIGHT,
        marginBottom: 15,
    },
    tagcontainer: {
    },
    tagrow: {
       flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    hightlightTag: {
        fontWeight: 500,
        backgroundColor: "#fbe4ffff",
    },
// fillter
    cardDescriptionItem: {
        fontSize: 12, 
        fontWeight: '400',
        marginBottom: 5,
        marginRight: 5,
        color: "#575757ff", 
        borderWidth: 1,
        borderColor: "#d1d1d1ff",
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    
});