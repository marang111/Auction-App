import React, { FC } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

const LOCAL_IMAGE_1 = require('../../../../assets/images/art&auction/Whanki.png'); 
const LOCAL_IMAGE_2 = require('../../../../assets/images/art&auction/looking.png'); 
const LOCAL_IMAGE_3 = require('../../../../assets/images/art&auction/Bonilla.png'); 

interface RecommendationItem {
    id: number;
    thumbnailSource: ImageSourcePropType; // 로컬 이미지 소스 타입으로 변경
    artist: string;        
    title: string;         
    price: string;         
    location: string;      
}

const DUMMY_RECOMMENDATIONS: RecommendationItem[] = [
    {
        id: 1,
        thumbnailSource: LOCAL_IMAGE_1, // 로컬 이미지 경로 참조
        artist: '김작가',
        title: '고요한 아침',
        price: '2,000만원',
        location: '서울 코엑스',
    },
    {
        id: 2,
        thumbnailSource: LOCAL_IMAGE_2,
        artist: '이화가',
        title: '푸른 잔상',
        price: '3,500만원',
        location: '바라캇 컨템포러리',
    },
    {
        id: 3,
        thumbnailSource: LOCAL_IMAGE_3, // 로컬 이미지 경로 참조
        artist: 'Raymond Bonilla',
        title: 'Study for Pathfinder #1',
        price: '1,200만원',
        location: '현대 갤러리',
    },
];

interface RecommendedTargetProps {
    relatedContentTitle: string;
}

// 4. Recommendation Card 컴포넌트
const RecommendationCard: FC<RecommendationItem> = ({ 
    thumbnailSource, // thumbnailUrl -> thumbnailSource로 변경
    artist, 
    title, 
    price, 
    location 
}) => {
    return (
        <View style={styles.card}>
            {/* source 속성에 require()를 통해 얻은 로컬 이미지 소스를 바로 전달 */}
            <Image source={thumbnailSource} style={styles.thumbnail} />
            <View style={styles.infoContainer}>
                <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
                <Text style={styles.cardArtist} numberOfLines={1}>{artist}</Text>
                <Text style={styles.cardPrice}>{price}</Text>
                <Text style={styles.cardLocation} numberOfLines={1}>{location}</Text>
            </View>
        </View>
    );
};


const RecommendedTargetComponent: FC<RecommendedTargetProps> = ({ relatedContentTitle }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                AI 추천 작품
            </Text>

            {/* ⭐️ 추천 목록 컨테이너 */}
            <View style={styles.recommendationsList}>
                {DUMMY_RECOMMENDATIONS.map((item) => (
                    <RecommendationCard key={item.id} {...item} />
                ))}
            </View>
            {/* ---------------------------------- */}
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>추천 목록 전체 보기</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RecommendedTargetComponent;

const CARD_WIDTH = 110; // 카드 하나의 너비

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f1f1f1ca',
        marginTop: -20,
        marginBottom: 20,
    },
    header: {
        fontSize: 14, 
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 15, 
    },
    
    // --- 추천 목록 스타일 ---
    recommendationsList: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginBottom: 20,
    },
    card: {
        width: CARD_WIDTH,
    },
    thumbnail: {
        width: CARD_WIDTH,
        height: CARD_WIDTH, 
        resizeMode: "contain",
        marginBottom: 10,
    },
    infoContainer: {
        // 텍스트 정보 컨테이너
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1F2937',
        lineHeight: 13,
    },
    cardArtist: {
        fontSize: 12,
        color: '#6B7280',
        lineHeight: 18,
        marginBottom: 3,
    },
    cardPrice: {
        fontSize: 13,
        fontWeight: '700',
        color: '#000000',
        lineHeight: 18,
        // backgroundColor: "navy"
    },
    cardLocation: {
        fontSize: 11,
        color: '#9CA3AF',
        lineHeight: 18,
    },

    // ----------------------

    button: {
        margin: "auto",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },
});