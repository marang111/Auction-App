// Curation.tsx
import React from "react";
// 💡 Platform을 추가하여 환경 분리 로직에 사용합니다.
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

// 💡 필수 상수: SCREEN_WIDTH 기반 계산이 필요하므로 외부에 정의해야 합니다.
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_CARD_WIDTH = SCREEN_WIDTH * 0.75; // .subScrollcardItem max-width: 75% 구현

const curatedCollections = [
  // ... (데이터 생략)
  {
    id: 101,
    theme: "케이옥션",
    subtitle: "September Auction 2025",
    items: "25.11.24(수),16:00",
    image: require('../../assets/images/home/kauction.jpg')
  },
  {
    id: 102,
    theme: "Aldo Chaparro",
    subtitle: "158,2023",
    items: "193",
    image: require('../../assets/images/home/aldo.jpg')
  },
  {
    id: 103,
    theme: "Frieze London 2025",
    subtitle: "The Regent’s Park",
    items: "25.10.15-19",
    image: require('../../assets/images/home/frieze.jpg')
  }
];


function Curation (){
    const totalItems = curatedCollections.length;

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {curatedCollections.map((collection, index) => {
                const isLastItem = index === totalItems - 1;
                
                let calculatedWidth = 150; // 오류 시 기본값 (웹에서도 기본값으로 사용)
                const fixedImageHeight = styles.cardImage.height; // StyleSheet에서 높이 값 가져오기
                
                // ----------------------------------------------------
                // 💡 핵심 수정: Platform.OS !== 'web' 일 때만 네이티브 함수 실행
                // ----------------------------------------------------
                if (Platform.OS !== 'web') {
                    // 1. 이미지의 실제 해상도 가져오기 (웹에서는 실행되지 않음)
                    const imageSource = Image.resolveAssetSource(collection.image as number);
                    
                    if (imageSource && typeof fixedImageHeight === 'number') {
                        // 2. 고정 높이에 맞춘 새로운 넓이 계산 (Aspect Ratio 유지)
                        const aspectRatioWidth = (imageSource.width / imageSource.height) * fixedImageHeight;
                        
                        // 3. max-width: 75% 적용
                        calculatedWidth = Math.min(aspectRatioWidth, MAX_CARD_WIDTH);
                    }
                }
                // 웹 환경에서는 calculatedWidth가 초기값인 150으로 유지됩니다.
                // ----------------------------------------------------
                
                // 4. 스타일 배열 생성
                const itemStyle = [
                    styles.subScrollcardItem, 
                    { width: calculatedWidth }, // 계산된 넓이 적용
                    // 스크롤 문제 해결을 위해 마지막 아이템이 아닐 때만 marginRight 적용
                    !isLastItem && styles.itemMarginRight 
                ];

                return (
                    <View key={collection.id} style={itemStyle}>
                        <Image
                            source={ collection.image }
                            style={styles.cardImage}
                        />
                        <View style={styles.subcardInfo}>
                            <Text style={styles.themeText}>{collection.theme}</Text>
                            <Text style={styles.subtitleText}>{collection.subtitle}</Text>
                            <Text style={styles.itemsText}>{collection.items}</Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}

export default Curation;

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 20,
    },

    itemMarginRight: {
        marginRight: 16, 
    },
    
    subScrollcardItem: {
        // width는 인라인으로 계산된 값이 적용됩니다.
    },

    subcardInfo: {},

    cardImage: {
        width: '100%',
        height: 200, 
        resizeMode: 'cover',        
        marginBottom: 16,   
    },
    
    // 텍스트 스타일
    themeText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    subtitleText: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    itemsText: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
});