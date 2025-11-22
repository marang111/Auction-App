import React, { FC } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from "../../../styles/COLORS"
// ⭐️ LinearGradient import 추가
import { LinearGradient } from 'expo-linear-gradient'; 

const { width } = Dimensions.get('window');

const image_1 = require('../../../assets/images/art&auction/kusama.png');
const image_2 = require('../../../assets/images/art&auction/Whanki.png');
const image_3 = require('../../../assets/images/art&auction/chch.png');
const image_4 = require('../../../assets/images/art&auction/Egg.png');
const image_5 = require('../../../assets/images/art&auction/Whanki.png');
const image_6 = require('../../../assets/images/art&auction/FLEMISH.png');

interface DiscoveryItem {
    id: number;
    title: string;
    image: number; 
}

const DISCOVERY_DATA: DiscoveryItem[] = [
    { id: 1, title: '동양화 컬렉션', image: image_1 },
    { id: 2, title: 'Pop Art 거장들', image: image_2 },
    { id: 3, title: 'NFT 미술 실험', image: image_3 },
    { id: 4, title: '현대 사진 예술', image: image_4 }, 
    { id: 5, title: '추상 표현주의', image: image_5 }, 
    { id: 6, title: '초현실주의 마스터피스', image: image_6 }, 
];

const DiscoveryCard: FC<DiscoveryItem> = ({ title, image }) => (
    <View style={gridStyles.cardWrapper}>
        <TouchableOpacity style={gridStyles.cardContainer} activeOpacity={0.8}>
            <ImageBackground 
                source={image} 
                style={gridStyles.card} 
                resizeMode="cover" 
                imageStyle={gridStyles.imageStyle}
            >
                {/* ⭐️ LinearGradient 컴포넌트로 대체 */}
                <LinearGradient
                    colors={['rgba(44, 25, 100, 1)', 'rgba(44, 25, 100, 0)']} 
                    // 위(불투명)->아래(투명)

                    start={{ x: 0.5, y: 0.6 }} 
                    // 상단 중앙 시작

                    end={{ x: 0.5, y: 1 }}   
                    // 하단 중앙 끝
                    style={gridStyles.textOverlay}
                >
                    <Text style={gridStyles.cardTitleImage}>{title}</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    </View>
);

const MarketDiscoveryGrid: FC = () => {
    return (
        <View style={gridStyles.container}>
            <View style={gridStyles.grid}>
                {DISCOVERY_DATA.map((item) => (
                    <DiscoveryCard key={item.id} {...item} />
                ))}
            </View>
        </View>
    );
};

export default MarketDiscoveryGrid;

const gridStyles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8, 
    },
    cardWrapper: {
        flexBasis: '48%',
        flexGrow: 1, 
    },
    card: {
        width: '100%', 
        aspectRatio: 1.4, 
        justifyContent: 'flex-start',
    },
    imageStyle: {
    },
    cardContainer: {
        flex: 1,
    },
    
    textOverlay: {
        paddingHorizontal: 13,
        paddingVertical: 10,
        justifyContent: 'flex-start',
        flex: 0.3, // 그라데이션이 카드의 전체 높이를 차지하도록
        width: '100%', // 그라데이션이 카드의 전체 너비를 차지하도록
    },
    cardTitleImage: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.TEXT_LIGHT,
        marginBottom: 4,
    },
});