import { useFocusEffect, useNavigation, useScrollToTop } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState, useMemo } from "react"; // ⭐️ useMemo Import 추가
import { 
    Dimensions, 
    NativeScrollEvent, 
    NativeSyntheticEvent, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View,
    Animated, 
    ViewStyle 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// ⭐️ GuideContext에서 activeAreaId를 가져오도록 수정
import { TargetAreaState, useGuideContext } from '../../context/GuideContext'; 

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

// TargetAreaState는 이미 상단에 정의되어 있으므로 제거
// interface TargetAreaState {
//     id: string; 
//     absoluteY: number;
//     height: number;
// }

const TARGET_AREA_IDS = {
    MAINSTATUS: 'mainstatus',
    PERSONAL_HUB: 'personalHub',
    MARKETINSIGHT: 'marketinsight'
};


// -------------------------------------------------------------------------
// ⭐️ [추가] 하이라이트 애니메이션 래퍼 컴포넌트
// -------------------------------------------------------------------------
interface HighlightWrapperProps {
    children: React.ReactNode;
    id: string;
    targetRef: React.RefObject<View>;
    onLayout: () => void;
    style?: ViewStyle; 
    key?: string; // key prop 추가
}

const HighlightWrapper: React.FC<HighlightWrapperProps> = ({ children, id, targetRef, onLayout, style }) => {
    // ⭐️ activeAreaId와 progressAnim을 가져와 애니메이션 제어
    const { activeAreaId, progressAnim } = useGuideContext(); 
    
    // ⭐️ 테두리 색상 Interpolation (비활성화 -> 활성화 시 #FF6347로 변경)
    const borderColor = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', '#FF6347'], 
        extrapolate: 'clamp',
    });
    
    // ⭐️ 그림자/광선 효과 Interpolation
    const shadowOpacity = progressAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.4, 0.7], 
        extrapolate: 'clamp',
    });

    const animatedStyle: Animated.AnimatedProps<ViewStyle> = useMemo(() => ({
    borderWidth: 2,
    borderRadius: 10,
    borderColor: borderColor, 
    shadowColor: '#FF6347', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: shadowOpacity, 
    shadowRadius: 10, 
    elevation: 10,
    // 현재 활성화된 영역일 때만 보이게 설정
    opacity: activeAreaId === id ? 1 : 0, 
    transform: [{ scale: activeAreaId === id ? 1 : 1.001 }]
}), [activeAreaId, id, borderColor, shadowOpacity]);
    

    // ⭐️ 오버레이 스타일 설정
    const containerStyle: ViewStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: activeAreaId === id ? 1 : -1, // 활성화된 오버레이가 위에 올라오도록 zIndex 설정
        pointerEvents: 'none', 
    };

    return (
        <View ref={targetRef} onLayout={onLayout} style={style}>
            {children}
            {/* 활성화된 영역일 때만 Animated.View로 오버레이를 렌더링 */}
            {activeAreaId === id && (
                <Animated.View style={[StyleSheet.absoluteFill, containerStyle, animatedStyle]} />
            )}
        </View>
    );
};


const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // isModalVisible이 필요 없으므로 setTargetAreas와 activeAreaId만 가져옵니다.
  const { setTargetAreas, activeAreaId } = useGuideContext(); // ⭐️ activeAreaId 추가

  const mainRef = useRef<View>(null); 
  const personalHubRef = useRef<View>(null); 
  const MarketinsightRef = useRef<View>(null);
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
      { ref: mainRef, id: TARGET_AREA_IDS.MAINSTATUS },
      { ref: personalHubRef, id: TARGET_AREA_IDS.PERSONAL_HUB },
      { ref: MarketinsightRef, id: TARGET_AREA_IDS.MARKETINSIGHT },
      // ⭐️ privateRef, latestRef 등 다른 영역은 가이드 타겟이 아니므로 제외
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
            // py: 화면 상단으로부터의 절대 Y 좌표
            areas.push({ id: id, absoluteY: py, height: height }); 
            checkAndSet();
        });
    });
    
    // 타겟이 아닌 Ref도 onLayout 처리를 위해 measure 호출 (선택 사항)
    privateRef.current?.measure(() => {}); 
    
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
      >
        {/* 검색창 */}
        <View key={`search-${refreshKey}`}>
          <SearchBar onFocusNavigate={navigateToSearchDetail} /> 
        </View>

        {/* 메인 카드 (HighlightWrapper 적용) */}
        <HighlightWrapper 
            id={TARGET_AREA_IDS.MAINSTATUS}
            targetRef={mainRef}
            onLayout={measureTargetArea}
            key={`maincard-${refreshKey}`}
        >
          <Homemaincard 
              data={allAuctionData} 
              onActiveCardChange={handleActiveCardChange} 
          />
        </HighlightWrapper>

        {/* 현재 최고 입찰가 */}
        {activeAuction ? (
            <View style={styles.maincardBackground} key={`status-${refreshKey}`}>
              <AuctionStatusDisplay
                  auction={activeAuction}
                  updateLiveStatus={updateLiveStatus}
              />
            </View>
        ) : null}

        {/* 개인화 허브 (MyPersonalHub) (HighlightWrapper 적용) */}
        <HighlightWrapper 
            id={TARGET_AREA_IDS.PERSONAL_HUB}
            targetRef={personalHubRef} 
            onLayout={measureTargetArea} 
        >
            <MyPersonalHub 
                userName="마랑님"
                onPressChip={(id, title) => console.log(`Chip clicked: ${title}`)}
                onPressWork={(workId) => console.log(`Work clicked: ${workId}`)}
            />
        </HighlightWrapper>

        {/* 큐레이션 */}
        <View style={styles.mainHeaderArea}>
          <Text style={styles.headerMain}>Curator's Picks</Text>
          <Curation/>
        </View>

        {/* 시장 동향 (Market Insight) 통합 섹션 (HighlightWrapper 적용) */}
        <HighlightWrapper
          id={TARGET_AREA_IDS.MARKETINSIGHT}
          targetRef={MarketinsightRef} 
          onLayout={measureTargetArea} 
        >
            <MarketInsight 
        />
        </HighlightWrapper>

        {/* Private Sale  */}
        <View style={styles.privateContainer} ref={privateRef}>   
          <Text style={styles.privateHeader}>Private Sale</Text>
          <Private />        
        </View>

        {/* 뉴스 칼럼*/}
        <View style={styles.newsContainer}>   
          <News />
        </View>

        {/* 마지막 관련 콘텐츠 카드들 (Latest) */}
        <View style={styles.cardcontainer}>
            <View>
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