// Latest.tsx

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function Latest(): React.JSX.Element {
    const latestContentText = "미술품, 그 가치는 어떻게 세금으로 이어질까요? 미술품 시가감정 마지막 시리즈에서는 미술품에 세금이 매겨지는 기준에 대해서 알아보려 합니다. 내가 소장하고 있는 작품이 언젠가 상속이나 증여를 고려해야 하는 시점이 왔을 때, 그 기준이 되는 것은 바로 ‘시가’입니다.";

    return (
        <View style={{padding: 16}}>
            <Text style={styles.subHeader}>최근 콘텐츠</Text>
            
            {/* img 대신 Image 사용 */}
            <Image 
                source={require('../../assets/images/home/latest.jpg')} 
                style={styles.cardImage}
                resizeMode="cover"
            />
            
            {/* .latestTitle */}
            <Text style={styles.latestTitle}>미술품 시가감정 들여다보기 4</Text>
            
            <Text 
                style={styles.latestParagraph} 
                numberOfLines={3} // 3줄 이상은 ...으로 생략되도록 설정 (ellipsis_multiline 역할)
            >
                {latestContentText}
            </Text>
        </View>
    );
}

export default Latest;

const styles = StyleSheet.create({
    // subHeader: News.tsx 등 다른 컴포넌트의 헤더 스타일과 일치시키거나 기본 스타일 적용
    subHeader: {
        fontSize: 19, 
        fontWeight: '800',
        marginBottom: 10,
        color: '#34495e',
    },
    // .cardImage (웹 스타일 시트의 .cardImage를 따름)
    cardImage: {
        width: '100%',
        height: 180, 
        resizeMode: 'cover',
        marginBottom: 16, 
    },
    
    // .latestTitle 스타일
    latestTitle: {
        fontWeight: '700',
        fontSize: 16, // 적절한 픽셀 값으로 변환
        marginBottom: 8,
        color: '#333',
    },
    
    // .latest_p 스타일 (font-size: 0.85rem; color: rgb(98, 98, 98); line-height: 1.6;)
    latestParagraph: {
        fontSize: 14, // 0.85rem -> 약 14px로 변환
        color: 'rgb(98, 98, 98)',
        lineHeight: 22, // 1.6 line-height (14px * 1.6 ≈ 22.4)
    },
});