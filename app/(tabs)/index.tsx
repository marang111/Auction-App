import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from "react";
import { useFocusEffect, useNavigation, useScrollToTop } from '@react-navigation/native';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGuideContext } from '../../context/GuideContext';
// ⭐️ [제거] GuideModal 컴포넌트 임포트 제거
// import GuideModal from '../../components/guidemodal/GuideModal'; 

import Footer from "../Home/10_Footer";
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

const Topperfo = () => <View style={styles.dataCardContent}><Text style={styles.secondaryText}>Top Performance (Dummy)</Text></View>;

const { height: windowHeight } = Dimensions.get('window');

interface HomeProps {
  setActiveTab: (tab: 'home' | 'auction' | 'chart' | 'search' | 'alerts') => void;
}

interface TargetAreaState {
    id: string; 
    absoluteY: number;
    height: number;
}

const TARGET_AREA_IDS = {
    PERSONAL_HUB: 'personalHub',
    LATEST: 'latest',
};

const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // isModalVisible이 필요 없으므로 setTargetAreas만 가져옵니다.
  const { setTargetAreas } = useGuideContext(); 

  const personalHubRef = useRef<View>(null); 
  const latestRef = useRef<View>(null); 
  const privateRef = useRef<View>(null); 
  
  const scrollY = useRef(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const [refreshKey, setRefreshKey] = useState(0); 
  const navigation = useNavigation();
  
  const [allAuctionData, setAllAuctionData] = useState<AuctionItem[]>(DEFAULT_DATA);
  const [activeAuction, setActiveAuction] = useState<AuctionItem>(DEFAULT_DATA[0]);

  useScrollToTop(scrollViewRef); 

  const measureTargetArea = useCallback(() => {
    const areas: TargetAreaState[] = [];
    const targetRefs: { ref: React.RefObject<View>; id: string }[] = [
      { ref: personalHubRef, id: TARGET_AREA_IDS.PERSONAL_HUB },
      { ref: latestRef, id: TARGET_AREA_IDS.LATEST },
    ];
    
    let measuredCount = 0;
    
    const activeRefs = targetRefs.filter(item => item.ref.current);
    const totalRefs = activeRefs.length;

    if (totalRefs === 0) {
        setTargetAreas(null);
        return;
    }

    const checkAndSet = () => {
        measuredCount++;
        if (measuredCount === totalRefs) {
            setTargetAreas(areas.length > 0 ? areas : null);
        }
    };

    activeRefs.forEach(({ ref, id }) => { 
        ref.current?.measure((fx, fy, width, height, px, py) => {
            areas.push({ id: id, absoluteY: py, height: height }); 
            checkAndSet();
        });
    });
  }, [setTargetAreas]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = event.nativeEvent.contentOffset.y; 
    measureTargetArea(); 
  }, [measureTargetArea]);


  useFocusEffect(
      useCallback(() => {
          const unsubscribe = navigation.addListener('tabPress', (e) => {
              setRefreshKey(prev => prev + 1);
              scrollViewRef.current?.scrollTo({ y: 0, animated: true });
          });

          measureTargetArea(); 

          return () => {
             unsubscribe();
             setTargetAreas(null);      
          };
      }, [navigation, setTargetAreas, measureTargetArea]) 
  );


  const navigateToChart = useCallback(() => {
    if (setActiveTab) {
      setActiveTab('chart'); 
    }
  }, [setActiveTab]);
  
  const navigateToSearchDetail = useCallback(() => {
    router.push('../Home/1_searchdetail/SearchDetail'); 
  }, [router]);

  const handleActiveCardChange = useCallback((auction: AuctionItem) => {
    const latestData = allAuctionData.find(item => item.id === auction.id) || auction;
    setActiveAuction(latestData);
  }, [allAuctionData]); 

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

  const handleCurationClick = useCallback(() => {
    console.log("Curation Clicked - Placeholder.");
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      <ScrollView
        ref={scrollViewRef} 
        style={styles.scrollViewStyle}
        contentContainerStyle={{ paddingBottom: insets.bottom + 0 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} 
        onLayout={measureTargetArea} 
        onMomentumScrollEnd={measureTargetArea} 
        // ⭐️ scrollEnabled={!isModalVisible} 속성 제거됨
      >
        {/* 검색창 */}
        <View key={`search-${refreshKey}`}>
          <SearchBar onFocusNavigate={navigateToSearchDetail} /> 
        </View>

        {/* 메인 카드 */}
        <View key={`maincard-${refreshKey}`}>
          <Homemaincard 
              data={allAuctionData} 
              onActiveCardChange={handleActiveCardChange} 
          />
        </View>

        {/* 현재 최고 입찰가 */}
        {activeAuction ? (
            <View style={styles.maincardBackground} key={`status-${refreshKey}`}>
              <AuctionStatusDisplay
                  auction={activeAuction}
                  updateLiveStatus={updateLiveStatus}
              />
            </View>
        ) : null}

        {/* 개인화 허브 (MyPersonalHub) - ⭐️ 타겟 영역 1: personalHubRef */}
        <View 
            ref={personalHubRef} 
            onLayout={measureTargetArea} 
        >
            <MyPersonalHub 
                userName="마랑님"
                onPressChip={(id, title) => console.log(`Chip clicked: ${title}`)}
                onPressWork={(workId) => console.log(`Work clicked: ${workId}`)}
            />
        </View>

        {/* 큐레이션 */}
        <View style={styles.mainHeaderArea}>
          <Text style={styles.headerMain}>Curator's Picks</Text>
          <Curation/>
        </View>

        {/* 시장 동향 (Market Insight) 통합 섹션 */}
        <View>
            <MarketInsight />
        </View>

        {/* Private Sale  */}
        <View style={styles.privateContainer}>   
          <Text style={styles.privateHeader}>Private Sale</Text>
          <Private />        
        </View>

        {/* 뉴스 칼럼*/}
        <View style={styles.newsContainer}>   
          <News />
        </View>

        {/* 마지막 관련 콘텐츠 카드들 (Latest) - ⭐️ 타겟 영역 2: latestRef */}
        <View style={styles.cardcontainer}>
            <View ref={latestRef} onLayout={measureTargetArea}>
                <Latest />
            </View>
        </View>
        
        {/* 교육 콘텐츠 */}
        <View style={styles.cardcontainer}>
          <Education />
        </View>

        <View>
          <Footer />
        </View>
      </ScrollView>

      {/* ⭐️ [제거] GuideModal 렌더링 제거됨 */}
      {/* <GuideModal /> */}

    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewStyle: {
    // 필요한 스타일
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
    backgroundColor: "transparent",
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
  dataCardContent: {
    padding: 20,
  }
});
//정상