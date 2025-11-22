import { useRouter } from 'expo-router'; // ⭐️ useRouter 임포트
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchBar from '../Home/1_SearchBar';
import Homemaincard, { AuctionItem, DEFAULT_DATA, LivebidResponse } from '../Home/2_MainScrollCard';
import AuctionStatusDisplay from "../Home/2_mainscrollcard/AuctionStatusDisplay";
import MyPersonalHub from "../Home/3_MyPersonalHub";
import Curation from '../Home/4_Curation';
import MarketInsight from '../Home/5_MarketInsight';
import Private from '../Home/6_Private';
import News from "../Home/7_News";
import Latest from "../Home/8_Latest";
import Education from "../Home/9_Education";
import NewsletterForm from "../Home/10_NewsletterForm";
import Footer from "../Home/10_Footer";

const Topperfo = () => <View style={styles.dataCardContent}><Text style={styles.secondaryText}>Top Performance (Dummy)</Text></View>;

interface HomeProps {
  setActiveTab: (tab: 'home' | 'auction' | 'chart' | 'search' | 'alerts') => void;}

const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // ⭐️ useRouter 훅 사용
  
  // ⭐️ Homemaincard에서 임포트한 데이터를 상태의 초기값으로 사용
  const [allAuctionData, setAllAuctionData] = useState<AuctionItem[]>(DEFAULT_DATA);
  const [activeAuction, setActiveAuction] = useState<AuctionItem>(DEFAULT_DATA[0]);


  // '차트' 탭으로 이동하는 핸들러 (기존 코드 유지)
  const navigateToChart = useCallback(() => {
    if (setActiveTab) {
      setActiveTab('chart'); 
      console.log("Navigating to Chart Tab for detailed market info.");
    }
  }, [setActiveTab]);
  
  // ⭐️ SearchDetail 스크린으로 이동하는 핸들러 수정
  const navigateToSearchDetail = useCallback(() => {
    router.push('../Home/1_searchdetail/SearchDetail'); 
    console.log("Navigating to Search Detail Page: '../Home/1_searchdetail/SearchDetail'");
  }, [router]);


  // ⭐️ Homemaincard의 스크롤에 따라 활성화된 카드 정보를 업데이트합니다.
  const handleActiveCardChange = useCallback((auction: AuctionItem) => {
    const latestData = allAuctionData.find(item => item.id === auction.id) || auction;
    setActiveAuction(latestData);
  }, [allAuctionData]); 

  // ⭐️ AuctionStatusDisplay에서 호출되어 Live Status를 업데이트합니다.
  const updateLiveStatus = useCallback((id: number, newStatus: LivebidResponse) => {
      setAllAuctionData(prevData => {
          const newData = prevData.map(item =>
              item.id === id ? { ...item, liveStatus: newStatus } : item
          );
          
          setActiveAuction(prev => {
              if (prev.id === id) {
                  return { ...prev, liveStatus: newStatus };
              }
              return prev;
          });

          return newData;
      });
  }, []); 

  // 큐레이션 클릭 핸들러 
  const handleCurationClick = useCallback(() => {
    console.log("Curation Clicked - Placeholder.");
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={{ paddingBottom: insets.bottom + 0 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 검색창 */}
        <View>
          {/* ⭐️ SearchBar에 페이지 이동 함수 전달 */}
          <SearchBar onFocusNavigate={navigateToSearchDetail} /> 
        </View>

        {/* 홈 메인 카드 (Live Auction) */}
        <View>
          <Homemaincard 
              data={allAuctionData} 
              onActiveCardChange={handleActiveCardChange} 
          />
        </View>

        {/* 현재 최고 입찰가 */}
        {activeAuction ? (
            <View style={styles.maincardBackground}>
              <AuctionStatusDisplay
                  auction={activeAuction}
                  updateLiveStatus={updateLiveStatus}
              />
            </View>
        ) : null}

        {/* 개인화 허브 */}
        <MyPersonalHub 
            userName="마랑님"
            onPressChip={(id, title) => console.log(`Chip clicked: ${title}`)}
            onPressWork={(workId) => console.log(`Work clicked: ${workId}`)}
        />

        {/* 큐레이션 */}
        <View style={styles.mainHeaderArea}>
          <Text style={styles.headerMain}>Curator's Picks</Text>
          <Curation/>
        </View>

        {/* 시장 동향 (Market Insight) 통합 섹션 */}
        <View>
            <MarketInsight />
        </View>

        {/* Private Sale */}
        <View style={styles.privateContainer}>
          <Text style={styles.privateHeader}>Private Sale</Text>
          <Private />
        </View>

        {/* 뉴스 칼럼*/}
        <View style={styles.newsContainer}>   
          <News />
        </View>

        {/* 마지막 관련 콘텐츠 카드들 */}
        <View style={styles.cardcontainer}>
            <Latest />
        </View>
        
        {/* 교육 콘텐츠 */}
        <View style={styles.cardcontainer}>
          <Education />
        </View>

        <View>
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardcontainer: {
    marginBottom: 24,
  },
  mainHeaderArea: {
      marginBottom: 16,
  },
  maincardBackground: {
    // backgroundColor:"#232344",
  },
  headerMain: {
    fontSize: 22, 
    fontWeight: '700', 
    color: '#1D2A3A', 
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  secondaryText: {
    color: '#6A6A6A', 
  },

  newsContainer: {
    paddingTop: 36,
    backgroundColor: "",
    marginBottom: 24,
  },

  privateContainer: {
    backgroundColor: '#2C3E50', 
    paddingVertical: 30, 
    paddingHorizontal: 16,
  },
  privateHeader: {
    paddingTop: 0,
    color: '#A9A9A9', 
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },

  headerWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pillButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, 
    backgroundColor: '#F0F0F0', 
  },
  pillButtonText: {
    color: '#2C3E50', 
    fontSize: 14,
    fontWeight: '500',
  },
});