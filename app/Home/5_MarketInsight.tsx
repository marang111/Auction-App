import React, { useState } from 'react'; // useState 추가
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // TouchableOpacity 추가
import Ionicons from 'react-native-vector-icons/Ionicons'; // 도형(아이콘) 사용

// ⭐️ 타입 정의 (재사용을 위해 유지)
type ArtistRank = {
  rank: number;
  name: string;
  changeMetric: string; // yoyChange 대신 범용적인 변화량 텍스트로 변경
  isPositive: boolean; 
};

type GenreShare = {
  genre: string;
  share: string;
};

// ⭐️ 통일된 COLORS 정의
const COLORS = {
  HEADER_COLOR: '#1D2A3A',    // 딥 네이비
  TEXT_PRIMARY: '#2C3E50',    // 차콜 그레이
  ACCENT_GOLD: '#DAA520',     // 골드 (포인트/중립)
  HIGHLIGHT_RED: '#FF3B30',   // 부정/경고
  HIGHLIGHT_GREEN: '#27AE60', // 긍정/성과
  LIGHT_GRAY: '#6A6A6A',      // 연한 회색
  BG_WHITE: '#FFFFFF',
  BORDER: '#eee',
  TAB_INACTIVE_BG: '#F8F8F8', // 탭 비활성화 배경
};

// ⭐️ 탭 메뉴 기획 데이터 정의
const RANKING_TABS = ['거래액', '인기', '상승', '하락'] as const;
type RankTab = typeof RANKING_TABS[number];

// ⭐️ 탭별 더미 데이터 정의
const RANKING_DATA: Record<RankTab, ArtistRank[]> = {
    // 1. 거래액 (기존 데이터 기반)
    '거래액': [
        { rank: 1, name: '김환기', changeMetric: '+20% YoY', isPositive: true },
        { rank: 2, name: '이우환', changeMetric: '+5% YoY', isPositive: true },
        { rank: 3, name: '박수근', changeMetric: '변동 없음', isPositive: false },
        { rank: 4, name: '천경자', changeMetric: '+10% YoY', isPositive: true },
        { rank: 5, name: '이중섭', changeMetric: '-2% YoY', isPositive: false },
    ],
    // 2. 인기 (찜, 조회수 기반)
    '인기': [
        { rank: 1, name: '쿠사마 야요이', changeMetric: '+150 찜', isPositive: true },
        { rank: 2, name: '앤디 워홀', changeMetric: '+100 찜', isPositive: true },
        { rank: 3, name: '이우환', changeMetric: '+50 찜', isPositive: true },
        { rank: 4, name: '박서보', changeMetric: '+20 찜', isPositive: true },
        { rank: 5, name: '김환기', changeMetric: '+10 찜', isPositive: true },
    ],
    // 3. 상승 (낙찰가/거래량 증가율 기반)
    '상승': [
        { rank: 1, name: '이중섭', changeMetric: '+35% 낙찰가', isPositive: true },
        { rank: 2, name: '김환기', changeMetric: '+20% 낙찰가', isPositive: true },
        { rank: 3, name: '천경자', changeMetric: '+15% 낙찰가', isPositive: true },
        { rank: 4, name: '장욱진', changeMetric: '+12% 거래량', isPositive: true },
        { rank: 5, name: '하종현', changeMetric: '+8% 거래량', isPositive: true },
    ],
    // 4. 하락 (낙찰가/거래량 감소율 기반)
    '하락': [
        { rank: 1, name: '장욱진', changeMetric: '-10% 낙찰가', isPositive: false },
        { rank: 2, name: '김창열', changeMetric: '-5% 낙찰가', isPositive: false },
        { rank: 3, name: '박서보', changeMetric: '-3% 낙찰가', isPositive: false },
        { rank: 4, name: '윤형근', changeMetric: '-2% 거래량', isPositive: false },
        { rank: 5, name: '최욱경', changeMetric: '-1% 거래량', isPositive: false },
    ],
};

const DEFAULT_GENRE_SHARES: GenreShare[] = [
    { genre: '현대 미술', share: '55%' },
    { genre: '고미술/도자', share: '25%' },
    { genre: '사진/판화', share: '20%' },
];

// 유틸리티 함수
const getChangeColor = (change: string) => {
    if (change.includes('+')) return COLORS.HIGHLIGHT_GREEN;
    if (change.includes('-')) return COLORS.HIGHLIGHT_RED;
    return COLORS.LIGHT_GRAY; // 중립적인 경우 연한 회색
};

// MetricCard 컴포넌트 (유지)
const MetricCard: React.FC<{
    iconName: string;
    label: string;
    value: string;
    valueColor: string;
}> = ({ iconName, label, value, valueColor }) => (
    <View style={metricStyles.card}>
        <View style={metricStyles.iconWrapper}>
            <Ionicons name={iconName} size={20} color={COLORS.HEADER_COLOR} />
        </View>
        <Text style={metricStyles.label}>{label}</Text>
        <Text style={[metricStyles.value, { color: valueColor }]}>{value}</Text>
    </View>
);

// ⭐️ RankingTabs 컴포넌트: 탭 바 UI
const RankingTabs: React.FC<{
    activeTab: RankTab;
    onSelectTab: (tab: RankTab) => void;
}> = ({ activeTab, onSelectTab }) => (
    <View style={tabStyles.container}>
        {RANKING_TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
                <TouchableOpacity
                    key={tab}
                    style={[
                        tabStyles.tabButton,
                        // ⭐️ 활성화된 탭 배경 및 테두리 스타일 적용
                        isActive ? tabStyles.activeTab : tabStyles.inactiveTab
                    ]}
                    onPress={() => onSelectTab(tab)}
                    activeOpacity={0.8}
                >
                    <Text style={isActive ? tabStyles.activeText : tabStyles.inactiveText}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </View>
);


// RankItem 컴포넌트 (changeText 대신 changeMetric 사용하도록 수정)
const RankItem: React.FC<{
    rank: number;
    name: string;
    changeMetric: string;
    isPositive: boolean;
}> = ({ rank, name, changeMetric, isPositive }) => {
    // isPositive에 따른 색상 및 아이콘 결정
    const changeColor = getChangeColor(changeMetric);
    const arrowIcon = changeMetric.includes('+') ? 'arrow-up' : changeMetric.includes('-') ? 'arrow-down' : 'remove';
    
    // '변동 없음'이나 찜/거래량 표시는 화살표 없이 처리
    const showIcon = changeMetric.includes('+') || changeMetric.includes('-');

    return (
        <View style={rankStyles.itemRow}>
            {/* 랭크 번호 강조 */}
            <Text style={rankStyles.rankNumber}>{rank}</Text>
            
            {/* 이름 */}
            <Text style={rankStyles.nameText} numberOfLines={1}>{name}</Text>

            {/* 변화량/지표 */}
            <View style={rankStyles.changeContainer}>
                {showIcon && (
                    <Ionicons 
                        name={arrowIcon} 
                        size={12} 
                        color={changeColor} 
                        style={{ marginRight: 4 }}
                    />
                )}
                <Text style={[rankStyles.changeText, { color: changeColor }]}>
                    {changeMetric}
                </Text>
            </View>
        </View>
    );
};


// ⭐️ Main Component: MarketInsight
const MarketInsight: React.FC = ({
  totalToday = '18/100',
  avgThisWeek = '1,450만원',
  monthChange = '+12% 증가',
  genreShares = DEFAULT_GENRE_SHARES,
}) => {
    // ⭐️ 탭 상태 관리 (기본값: 거래액)
    const [selectedTab, setSelectedTab] = useState<RankTab>('거래액');

    // ⭐️ 현재 탭에 맞는 데이터 선택
    const currentTopArtists = RANKING_DATA[selectedTab];
    
    // 월별 변화량 색상 결정
    const monthChangeColor = getChangeColor(monthChange);

    return (
        <View style={styles.container}>
            {/* 1. 시장 대시보드 헤더 */}
            <Text style={styles.header}>실시간 시장 지표</Text>

            {/* 2. 대시보드 메트릭 섹션 */}
            <View style={styles.dashboardGrid}>
                <MetricCard
                    iconName="trending-up-outline"
                    label="오늘의 낙찰 수"
                    value={totalToday}
                    valueColor={COLORS.HIGHLIGHT_RED} 
                />
                <MetricCard
                    iconName="stats-chart-outline"
                    label="주간 평균 낙찰가"
                    value={avgThisWeek}
                    valueColor={COLORS.HIGHLIGHT_GREEN} 
                />
                <MetricCard
                    iconName="swap-horizontal-outline"
                    label="전월 대비 거래량"
                    value={monthChange}
                    valueColor={monthChangeColor}
                />
            </View>

            <View style={styles.sectionDivider} />

            {/* 3. 랭킹 탭 바 및 목록 섹션 */}
            <View style={styles.section}>
                {/* 탭 바 상단 헤더 */}
                <Text style={styles.subHeader}>
                    작가별 실시간 랭킹
                </Text>
                
                {/* ⭐️ 탭 바 컴포넌트 삽입 */}
                <RankingTabs activeTab={selectedTab} onSelectTab={setSelectedTab} />

                {/* 랭킹 목록 (선택된 탭에 따라 내용이 바뀜) */}
                <View style={styles.rankingListContainer}>
                    {currentTopArtists.map((artist) => (
                        <RankItem
                            key={artist.rank}
                            rank={artist.rank}
                            name={artist.name}
                            changeMetric={artist.changeMetric}
                            isPositive={artist.isPositive}
                        />
                    ))}
                    <TouchableOpacity style={styles.viewAllButton} onPress={() => console.log('View All Ranking')}>
                        <Text style={styles.viewAllText}>
                            랭킹 전체 보기 
                        </Text>
                        <Ionicons name="chevron-forward" size={14} color={COLORS.TEXT_PRIMARY} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.sectionDivider} />

            {/* 4. 장르별 시장 점유율 섹션 (유지) */}
            <View style={styles.section}>
                <Text style={styles.subHeader}>
                    장르별 시장 점유율
                </Text>
                {genreShares.map((item) => (
                    <View key={item.genre} style={styles.shareItem}>
                        <View style={styles.shareDot} />
                        <Text style={styles.shareText}>{item.genre}</Text>
                        <Text style={[styles.shareValue]}>{item.share}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default MarketInsight;

// ⭐️ 탭 스타일 정의
const tabStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingBottom: 5,
        // 가로 스크롤을 원할 경우 ScrollView로 감싸고 아래 주석 해제
        // marginHorizontal: -16, 
        // paddingHorizontal: 16,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        // 둥근 모양 제거
        marginRight: 8,
        // 최소한의 구분선
        borderWidth: 1, 
        borderColor: COLORS.BORDER,
    },
    activeTab: {
        backgroundColor: COLORS.ACCENT_GOLD,
        borderColor: COLORS.ACCENT_GOLD,
    },
    inactiveTab: {
        backgroundColor: COLORS.TAB_INACTIVE_BG,
        borderColor: COLORS.BORDER,
    },
    activeText: {
        color: COLORS.HEADER_COLOR, // 활성화된 탭의 텍스트 색상
        fontWeight: '700',
        fontSize: 13,
    },
    inactiveText: {
        color: COLORS.TEXT_PRIMARY,
        fontWeight: '500',
        fontSize: 13,
    },
});


// ⭐️ 대시보드 스타일 (유지)
const metricStyles = StyleSheet.create({
    card: {
        width: '32%', 
        padding: 10,
        backgroundColor: COLORS.BG_WHITE,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.BORDER,
        
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2, 
        elevation: 2, 
        
        justifyContent: 'space-between',
        minHeight: 90,
    },
    iconWrapper: {
        marginBottom: 5,
    },
    label: {
        fontSize: 11,
        color: COLORS.LIGHT_GRAY,
        fontWeight: '500',
    },
    value: {
        fontSize: 18,
        fontWeight: '900',
        marginTop: 2,
    },
});

// ⭐️ 랭킹 스타일 (유지)
const rankStyles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f7f7f7',
    },
    rankNumber: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.ACCENT_GOLD, 
        width: 30, 
        textAlign: 'center',
    },
    nameText: {
        flex: 1, 
        fontSize: 15,
        color: COLORS.TEXT_PRIMARY,
        marginLeft: 10,
        fontWeight: '600',
    },
    changeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    changeText: {
        fontSize: 13,
        fontWeight: '600',
    },
});


// ⭐️ MarketInsight Main Styles (유지)
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.BG_WHITE,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.HEADER_COLOR,
    marginBottom: 20,
  },
  
  dashboardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    marginVertical: 15,
  },

  section: {
    paddingVertical: 5,
  },
  
  subHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.HEADER_COLOR,
    marginBottom: 12,
  },

  rankingListContainer: {
    marginTop: 10,
  },
  
  // 랭킹 전체 보기 버튼
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: COLORS.TAB_INACTIVE_BG,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginRight: 5,
  },

  shareItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
  },
  shareDot: { 
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.ACCENT_GOLD,
    marginRight: 10,
  },
  shareText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  shareValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  }
});