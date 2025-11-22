import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TrendItem } from './HotTrendData';


const FocusArtworkCard: FC<TrendItem> = ({ title, description, image, auctionInfo, estimatedPrice, longCaption}) => (
    <TouchableOpacity style={[cardStyles.card, cardStyles.auctionFocusCard]} activeOpacity={0.8}>
        
        {/* ⭐️ 블러 처리할 이미지 (Z-index 0) */}
        {image && (
            <Image 
                source={image} 
                style={cardStyles.backgroundImage}
            />
        )}
        
        {/* ⭐️ BlurView 이미지 위에 블러 오버레이  (Z-index 1) */}
        <BlurView 
            intensity={50} 
            tint="light" 
            style={cardStyles.blurOverlay} 
        />

        {/* ⭐️ 까만색 오버레이 (Z-index 2) */}
        <View style={cardStyles.backgroundOverlay} /> 

        {/* ✨ 하얀색 그라데이션 오버레이 (Z-index 3) */}
        <LinearGradient
            colors={[
                'rgba(255, 255, 255, 0)', 
                'rgba(255, 255, 255, 0.6)', 
                '#FFFFFF']}
            locations={[0.4, 0.6, 1]}
            style={cardStyles.whiteGradientOverlay} 
        />

        {/* 전경 콘텐츠 래퍼 (Z-index 4로 수정) */}
        
        <View style={cardStyles.contentWrapper}>
            <View style={cardStyles.cardHeader}>
                {typeof description === 'string' 
                    ? <Text style={cardStyles.cardDescription}>{description}</Text>
                    : Array.isArray(description) && description.length > 0 && (
                        <Text style={cardStyles.cardDescription}>{description.join(' · ')}</Text>
                    )
                }
            </View>
            
            <View style={cardStyles.auctionContentArea}>
                <View style={cardStyles.imagePlaceholder}>
                    {image && <Image source={image} style={cardStyles.actualImage} />}
                </View>
                
                <View style={cardStyles.auctionInfoContainer}>
                    <View style={cardStyles.inforow}>
                        <Text style={cardStyles.infoHighlightText}>{estimatedPrice}</Text>
                        <Text style={cardStyles.subInfoText}>{auctionInfo}</Text>
                    </View>
                    
                    {/* ✨ 길게 작품에 대해 소개하는 캡션 영역 */}
                    {longCaption && (
                        <Text 
                            style={cardStyles.longCaptionText}
                            numberOfLines={3}       
                            ellipsizeMode={'tail'} 
                        >
                            {longCaption}
                        </Text>
                    )}
                    <TouchableOpacity style={cardStyles.ctaButton}>
                        <Text style={cardStyles.ctaButtonText}>자세히 보기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

export default FocusArtworkCard;

const cardStyles = StyleSheet.create({
    card: {
        width: '100%', 
        backgroundColor: 'transparent', 
        position: 'relative',
        paddingBottom: 30,
        paddingTop: 20,
    },
    
    // ⭐️ 배경 이미지 스타일 (Z-index 0)
    backgroundImage: {
        position: 'absolute',
        top: 0, 
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        zIndex: 0, 
    },
    
    // ⭐️ BlurView 스타일 (Z-index 1)
    blurOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1, 
    },

    // 색깔 필터스탈 (Z-index 2)
    backgroundOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "gray", 
        opacity: 0.6,
        zIndex: 2, 
    },

    // ✨ 추가: 하얀색 그라데이션 오버레이 스타일 (Z-index 3)
    whiteGradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3, 
    },
    contentWrapper: {
        flex: 1,
        zIndex: 4, // ✨ 수정: 가장 위에 위치하도록 Z-index를 4로 올립니다.
    },
    auctionFocusCard: {
    },

// 카드 제목
    cardHeader: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 20,
    },
    cardDescription: {
        fontSize: 25, 
        color: COLORS.DIVIDER_LIGHT,
        fontWeight: 500,
        textAlign: "center",
    },
    auctionContentArea: {
    },

    imagePlaceholder: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 20,
    },
    actualImage: { 
        width: '100%',
        height: 445,
        margin: "auto",
        resizeMode: 'cover',
    },
    auctionInfoContainer: {
        paddingHorizontal: 20,
    },
    inforow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    infoHighlightText: {
        textAlign: "center",
        fontSize: 17,
        fontWeight: '700',
        color: "black",
    },
    subInfoText: {
        fontSize: 13,
        color: COLORS.TEXT_MEDIUM,
    },
    longCaptionText: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.TEXT_DARK, 
        fontWeight: '500',
        marginBottom: 25,
    },
    ctaButton: {
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#686868ff"
    },
    ctaButtonText: {
        paddingVertical: 12.5, 
        color: "#686868ff",
        fontSize: 15,
        fontWeight: '600',
    }
});