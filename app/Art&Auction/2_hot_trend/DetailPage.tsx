import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { TrendItem } from './HotTrendData'; 

interface DetailPageProps {
    item: TrendItem; 
    onClose: (item: TrendItem) => void; // 💡 부모에게 '닫기'를 알리는 함수
}

const DetailPage: FC<DetailPageProps> = ({ item, onClose }) => {
    return (
        // 💡 1. 팝업이 아닌 SafeAreaView로 변경
        <SafeAreaView style={detailStyles.container}>
            <ScrollView contentContainerStyle={detailStyles.scrollContent}>
                
                {/* 💡 2. 닫기 버튼을 '뒤로가기' 버튼으로 변경 (onClose 함수 호출) */}
                <TouchableOpacity onPress={() => onClose(item)} style={detailStyles.backButton}>
                    <Text style={detailStyles.backButtonText}>{'<'} 뒤로가기</Text>
                </TouchableOpacity>

                {/* (이하 아이템 상세 내용... 변경 없음) */}
                {item.image && (
                    <Image source={item.image} style={detailStyles.itemImage} resizeMode="contain" />
                )}
                <Text style={detailStyles.title}>{item.title}</Text>
                <Text style={detailStyles.description}>{item.description}</Text>
                
                {item.subInfo && <Text style={detailStyles.subInfo}>{item.subInfo}</Text>}
                {item.auctionInfo && <Text style={detailStyles.auctionInfo}>{item.auctionInfo}</Text>}
                {item.estimatedPrice && <Text style={detailStyles.price}>예상가: {item.estimatedPrice}</Text>}

                <View style={detailStyles.additionalInfo}>
                    <Text style={detailStyles.sectionTitle}>더 많은 정보</Text>
                    <Text style={detailStyles.infoText}>이 작품은 블록체인 기반의 NFT로 발행되었으며, 소유권 이전 기록이 투명하게 공개됩니다.</Text>
                    <Text style={detailStyles.infoText}>최초 발행일: 2023년 10월 26일</Text>
                    <Text style={detailStyles.infoText}>작가: [작가명]</Text>
                    <Text style={detailStyles.infoText}>카테고리: [카테고리]</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailPage;

const detailStyles = StyleSheet.create({
    container: {
        // 💡 3. absoluteFillObject, zIndex 제거 -> 일반 페이지 스타일로 변경
        flex: 1, 
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: 20,
        paddingTop: 10, // 패딩 값 조정
    },
    // 💡 4. '뒤로가기' 버튼 스타일
    backButton: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
        marginBottom: 15,
    },
    backButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#007bff',
    },
    // (이하 스타일 ... 변경 없음)
    itemImage: {
        width: '100%',
        height: 250,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 18,
        color: '#666',
        marginBottom: 15,
        lineHeight: 25,
    },
    subInfo: {
        fontSize: 16,
        color: '#888',
        marginBottom: 5,
    },
    auctionInfo: {
        fontSize: 16,
        color: '#888',
        marginBottom: 15,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 30,
    },
    additionalInfo: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
        lineHeight: 22,
    },
});