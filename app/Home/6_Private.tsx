import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";


const privateSales = [
  {
    id: 201,
    theme: "에르메스",
    subtitle: "Gold Clemence Picotin Lock 18 with Palladium Hardware",
    items: "leather",
    size: "13x18x19(d)cm", 
    image: require('../../assets/images/hermes.jpg') // 실제 경로로 수정 필요
  },
  { 
    id: 202,
    theme: "불가리",
    subtitle: "Serpenti Scaglie Bracelet",
    items: "leather",
    size: "13x18x19(d)cm", 
    image: require('../../assets/images/bvlgari.jpg') // 실제 경로로 수정 필요
  },
  {
    id: 203, // ID 중복 방지 (202 -> 203)
    theme: "불가리",
    subtitle: "Serpenti Scaglie Bracelet",
    items: "leather",
    size: "13x18x19(d)cm", 
    image: require('../../assets/images/cartie.jpg') // 실제 경로로 수정 필요
  }
];

function Private() {
    return (
        // .subScrollContainer (ScrollView로 구현)
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {privateSales.map((collection, index) => (
                <View 
                    key={collection.id} 
                    style={[
                        styles.subScrollcardItem,
                        // 마지막 아이템이 아닐 때만 간격 적용
                        index < privateSales.length - 1 && styles.itemSeparator
                    ]}
                >
                    {/* .subScrollImage (Image로 구현) */}
                    <Image 
                        source={collection.image as any} 
                        style={styles.subScrollImage}
                        resizeMode="cover" 
                    />

                    {/* color: 'lightgray'가 적용될 영역 */}
                    <View style={styles.subcardInfo}>
                        <Text style={styles.themeText}>{collection.theme}</Text>
                        <Text style={styles.subtitleText}>{collection.subtitle}</Text>
                        <Text style={styles.detailText}>{collection.items}</Text>
                        <Text style={styles.detailText}>{collection.size}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

export default Private;

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom:0,
    },
    
    // gap: 16px 구현 
    itemSeparator: {
        marginRight: 16,
    },
    
    // ⭐️ .subScrollcardItem 스타일: width: 50% 구현
    subScrollcardItem: {
        width: 200,
        flexShrink: 0, 
    },

    subScrollImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 15,
    },

    subcardInfo: {
        color: 'lightgray', 
    },
    themeText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white', 
        marginBottom: 5,
    },
    subtitleText: {
        fontWeight: '600',
        fontSize: 13,
        color: 'lightgray',
        marginBottom: 8,

    },
    detailText: {
        fontSize: 12,
        color: 'lightgray',
        marginBottom: 4,
    }
});