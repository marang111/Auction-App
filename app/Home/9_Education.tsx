// Education.tsx

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// ⭐ 스타일 함수 제거
const infoCards = [
    {
        id: 1,
        type: "VIDEO",
        title: "Sell with Us | 위탁 안내",
        image: require('../../assets/images/education/sell.jpg') 
    },
    {
        id: 2,
        type: "VIDEO",
        title: "서울옥션 강남센터 대관 안내",
        image: require('../../assets/images/education/gang.jpg') 
    },
    {
        id: 3,
        type: "VIDEO",
        title: "How to Buy | 라이브경매 구매 안내",
        image: require('../../assets/images/education/buy.jpg') 
    },
    {
        id: 4,
        type: "BLOG",
        title: "ACADEMY | 옥셔니어 코스",
        image: require('../../assets/images/education/academy.png') 
    }
];

function Education(): React.JSX.Element {
    return (
        <View>
            <Text style={styles.subHeader}>교육</Text>
            <View style={styles.gridContainer}>
                {infoCards.map((card) => (
                // ⭐️ width: '50%'를 사용하여 각 아이템이 가로 2개씩 차지하도록 합니다.
                <View 
                    key={card.id} 
                    style={styles.infoCard}
                >
                    <Image 
                        source={card.image as any} 
                        style={styles.cardImage} 
                        resizeMode="cover" 
                    />
                    <Text style={styles.cardType}>{card.type}</Text>
                    {/* 2줄 생략 */}
                    <Text style={styles.cardTitle} numberOfLines={2}>
                        {card.title}
                    </Text>
                </View>
            ))}
            </View>
            
        </View>
    );
}

export default Education;

const styles = StyleSheet.create({
    subHeader:{
        fontSize: 19, 
        fontWeight: '800',
        color: '#34495e',
        paddingHorizontal: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
        padding:16,
        rowGap: 16, 
    },

    // .infoCard: 각 카드의 너비를 50%로 설정
    infoCard: {
        width: '48.5%',
    },

    cardImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        marginBottom: 8,
    },

    cardType: {
        fontSize: 11,
        color: '#888',
        fontWeight: '500',
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
        marginBottom: 10,
    }
});