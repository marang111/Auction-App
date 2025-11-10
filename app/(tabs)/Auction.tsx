import React from "react";
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // ⭐️ 안전 영역 처리를 위한 훅 임포트

// 1. 타입 정의
interface AuctionItem {
    id: number;
    time: string;
    title: string;
    date: string;
    place: string;
    artist: string;
    // React Native의 Image 컴포넌트는 require()를 사용하므로 number로 지정
    imageUrl: number; 
}

// 2. 데이터 정의 (경로 수정: React Native require 문법 사용)
const liveAuctions: AuctionItem[] = [
    {
        id: 1,
        time: "LIVE",
        title: "제187회 미술품 경매",
        date: "10.28(화) 16:00 KST",
        place: "부산점",
        artist: "10/15(화) ~ 10/28(화)",
        // 실제 프로젝트의 이미지 경로에 맞게 수정 필요
        imageUrl: require('../../assets/images/auction/kimcang.jpeg') 
    },
    {
        id: 2,
        time: "D-3",
        title: "ZERO BASE x 전남문화재단",
        date: "11.05(수) 14:00 KST",
        place: "전남도청 갤러리",
        artist: "10/14(화) ~ 11/19(수)",
        imageUrl: require('../../assets/images/auction/home_auction2.jpg') 
    },
    {
        id: 3,
        time: "D-17",
        title: "온라인",
        date: "11.15(토) 18:30 KST",
        place: "강남센터 3F",
        artist: "10/22(수) 14:00 KST",
        imageUrl: require('../../assets/images/auction/home_auction3.jpg') 
    }
];

const screenWidth = Dimensions.get('window').width;

const Auction: React.FC = () => {
  // ⭐️ useSafeAreaInsets 훅을 사용하여 안전 영역 여백 값을 가져옵니다.
  const insets = useSafeAreaInsets();
  
  return (
    // ⭐️ 최상단에 ScrollView를 사용하고, 인라인 스타일로 상단 여백을 적용합니다.
    // (상위 컴포넌트에서 SafeAreaView가 전체를 감싸고 있다면, 
    // 여기서는 insets.top을 사용해 명시적으로 padding을 조정합니다.)
    <ScrollView 
        style={[
            styles.container, 
            { paddingTop: insets.top } // 👈 상단 노치/상태 표시줄 여백 추가
        ]}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} // 하단 여백 추가 (Bottom Nav가 있다면 조정 필요)
    >
      
      {/* 1. LIVE 경매 정보 카드 (가로 스크롤) */}
      <View> 
        <Text style={styles.headerMain}>Upcoming auction</Text>
        
        <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent} // ⭐️ contentContainerStyle에 gap 및 padding 적용
        >
            {liveAuctions.map((auction, index) => {
                
                const isLive = index === 0;
                
                return (
                    // ⭐️ className 대신 style prop 사용
                    <View 
                        key={auction.id} 
                        style={[
                            styles.auctionCardItem, 
                            isLive && styles.liveCard // 조건부 스타일 적용
                        ]}
                    >
                        {/* ⭐️ Image 컴포넌트 사용 */}
                        <Image source={auction.imageUrl} style={styles.cardImage}/>
                        <View style={styles.auctionInfo}>
                            {/* 첫 번째 p 태그 스타일을 위한 조건부 처리 */}
                            <Text style={isLive ? styles.timeTextLive : styles.timeText}>{auction.time}</Text> 
                            <Text style={styles.titleText}>{auction.title}</Text>
                            <Text style={styles.dateText}>{auction.date}</Text>
                            <Text style={styles.placeText}>{auction.place}</Text>
                            <Text style={styles.artistText}>프리뷰: {auction.artist}</Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
      </View>

      {/* 2. 프리뷰 카드 */}
      <View style={styles.card}>
        <Text style={styles.header}>프리뷰</Text>
        <Text>주요 작품 이미지 & 상세정보 미리보기</Text>
      </View>

      {/* 3. 끝난 옥션 카드 */}
      <View style={styles.card}>
        <Text style={styles.header}>끝난 옥션</Text>
        <Text>낙찰 결과 & 가격 확인</Text>
      </View>

    </ScrollView>
  );
}

export default Auction;

// 3. StyleSheet 정의 (CSS 모듈을 RN 스타일로 변환)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        margin: 16,
        padding: 16,
        backgroundColor: "#fff",
        // 웹의 box-shadow 대신 elevation (Android) 또는 shadow* (iOS) 사용
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    headerMain: {
        fontSize: 24, // 1.5rem -> 24px 가정
        fontWeight: '500', // 500
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 15,
    },
    header: {
        fontSize: 20.8, // 1.3rem -> 20.8px 가정
        fontWeight: 'bold',
        marginBottom: 10,
    },
    // 웹의 scrollContainer 역할을 RN의 ScrollView와 contentContainerStyle이 분담
    scrollContainer: {
        flexDirection: 'row',
        // overflow-x: auto와 scrollbar-width는 RN에서 자동으로 처리되거나 'showsHorizontalScrollIndicator'로 제어됨
    },
    scrollContent: {
        gap: 16, // RN은 gap을 지원하지만, 일부 버전에서는 margin으로 대체될 수 있습니다.
        paddingHorizontal: 16, // 좌우 패딩을 줘서 카드가 끝까지 붙지 않도록
        paddingBottom: 10, // 아래쪽 패딩 (스크롤뷰 끝과 경계)
    },
    auctionCardItem: {
        flexShrink: 0,
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        // margin: 16px 0 0 0; 는 ScrollView의 contentContainerStyle에서 gap과 padding으로 처리됨
        borderRadius: 8,
        
        // 카드 내부에 그림자 적용 (View 컴포넌트이므로 필요)
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    liveCard: {
        backgroundColor: '#262626',
        // liveCard의 너비를 60%로 지정했으나, 가로 스크롤 카드에서는 고정 너비(300px)를 유지하는 것이 일반적이므로 일단 배경색만 적용
    },
    cardImage: {
        width: '100%',
        height: 150,
        marginBottom: 16,
        resizeMode: 'cover', // object-fit: cover 대체
        borderRadius: 4,
    },
    auctionInfo: {
        // auctionInfo에 직접적인 스타일 없음
    },
    // 웹의 p 태그 스타일을 위한 Text 스타일 정의
    timeText: {
        fontSize: 16, // 1rem
        color: '#2c3e50',
        lineHeight: 22, // 1.7
    },
    // 웹의 p:nth-child(1)을 위한 조건부 스타일
    timeTextLive: { 
        fontSize: 16,
        color: '#c0392b', // 빨간색
        fontWeight: 'bold',
        lineHeight: 22,
    },
    titleText: {
        fontSize: 16,
        color: '#2c3e50',
        lineHeight: 22,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 16,
        color: '#2c3e50',
        lineHeight: 22,
        fontWeight: 'bold',
    },
    placeText: {
        fontSize: 16,
        color: '#2c3e50',
        lineHeight: 22,
    },
    artistText: {
        fontSize: 16,
        color: '#2c3e50',
        lineHeight: 22,
    }
});