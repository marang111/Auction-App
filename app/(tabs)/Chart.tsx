import React, { useState, FC } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

// ⭐️ 데이터 
import AuctionDashboard from "../Rader/2_AuctionDashboard"; 

// ⭐️ 컴포넌트
import MarketHealthPage from "../screens/chart/MarketHealthPage";
import PersonaSnapshotCard from "../Rader/1_PersonaCard"; 
import MarketScopeScreen from "../Rader/detail/MarketScopeScreen"; 


// -------------------------------------------------------------------------
// 1. 디자인 가이드 색상 정의
// -------------------------------------------------------------------------

const COLORS = {
    // 배경 및 기본
    BG_LIGHT: '#ffffffff', 
    SURFACE_CARD: '#FFFFFF', 
    DIVIDER_LIGHT: '#E2E8F0', 

    // 텍스트
    TEXT_DARK: '#2D3748', 
    TEXT_MEDIUM: '#4A5568', 
    TEXT_LIGHT: '#718096', 

    // 강조 및 액션
    PRIMARY_BRAND: '#4299E1', 
    ACCENT_CTA: '#320068ff', 

    // 그림자
    SHADOW_DEFAULT: 'rgba(0, 0, 0, 0.05)', 
    
    // 카테고리 색상
    MARKET: '#3B82F6',   
    DISCOVERY: '#EF4444', 
    STRATEGY: '#059669', 
};


// -------------------------------------------------------------------------
// 2. 타입 정의
// -------------------------------------------------------------------------

interface ChartHomeProps {
    onNavigate: (page: PageName) => void;
    onSettingsPress: () => void;
}

// -------------------------------------------------------------------------
// 3. 메인 컴포넌트: ChartHome (홈 화면)
// -------------------------------------------------------------------------

const ChartHome: FC<ChartHomeProps> = ({ onNavigate, onSettingsPress }) => {
    const insets = useSafeAreaInsets();
    const targetCardsData = TARGET_CARDS_DATA;

    const handleTargetCardClick = (id: number) => {
        console.log(`TargetCard clicked: ${id}`);
        // TargetCard 상세 페이지로 이동
    };

    return (
        <View style={styles.chartHomeContainer}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.contentContainer,
                    { paddingBottom: insets.bottom + 100 } 
                ]}
                showsVerticalScrollIndicator={false}
            >
                
                {/* 2. Persona Snapshot Card (필터 설정 요약) */}
                <PersonaSnapshotCard 
                    analysisFocus="활동성 중심"
                    scopeDuration="장기 관측 (5년)"
                    onSettingsPress={onSettingsPress} 
                />

                {/* 3. 경매 현황 대시보드 */}
                <AuctionDashboard />

                {/* 4. Core Trend Analysis (차트/그래프 공간 대체) */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        월별 시장 건전성 추이 (NEW)
                    </Text>
                    <TouchableOpacity onPress={() => onNavigate('market-health')}>
                        <Text style={styles.viewAllText}>상세 분석 보기</Text>
                    </TouchableOpacity>
                </View>

                {/* ⭐️ 여기에 실제 차트(Line Chart, Bar Chart 등) 컴포넌트가 들어갈 예정입니다. 현재는 시각화를 위한 플레이스홀더를 제공합니다. */}
                <View style={styles.chartPlaceholder}>
                    <Text style={styles.chartPlaceholderText}>
                        [월별 낙찰 총액 추이 Line Chart Placeholder]
                    </Text>
                </View>

            </ScrollView>

            {/* 6. Footer (Filter Setup CTA) */}
            <View style={[styles.chartHomeFooterFixed, { paddingBottom: insets.bottom + 10 }]}>
                <TouchableOpacity style={buttonStyles.filterSetupButton} onPress={onSettingsPress}>
                    <Text style={buttonStyles.filterSetupButtonText}>관측 필터 다시 설정하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// -------------------------------------------------------------------------
// 4. 메인 컴포넌트: Chart (화면 라우팅)
// -------------------------------------------------------------------------

const Chart: FC = () => {
    const [currentPage, setCurrentPage] = useState<PageName>('home');
    
    const handleNavigate = (page: PageName) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'market-health':
                return <MarketHealthPage onGoBack={() => handleNavigate('home')} />;
            case 'market-scope':
                return <MarketScopeScreen onGoBack={() => handleNavigate('home')} />;
            case 'home':
            default:
                return (
                    <ChartHome 
                        onNavigate={handleNavigate} 
                        onSettingsPress={() => handleNavigate('market-scope')}
                    />
                );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.BG_LIGHT} />
            {renderPage()}
        </View>
    );
};

export default Chart;


// -------------------------------------------------------------------------
// 5. 스타일 정의
// -------------------------------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG_LIGHT, 
    },
    chartHomeContainer: {
        flex: 1,
        backgroundColor: COLORS.BG_LIGHT,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20, 
        paddingTop: 65,
    },
    
    // 섹션 헤더
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.PRIMARY_BRAND, 
    },

    chartPlaceholder: {
        backgroundColor: COLORS.SURFACE_CARD,
        borderRadius: 12,
        padding: 40,
        height: 200, // 차트 영역 높이 확보
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, 
        borderColor: COLORS.DIVIDER_LIGHT,
    },
    chartPlaceholderText: {
        color: COLORS.TEXT_MEDIUM,
        fontSize: 16,
    },
    
    // Target Card List
    targetCardList: {
        marginTop: 10,
    },
    
    // Footer (CTA)
    chartHomeFooterFixed: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: COLORS.BG_LIGHT, 
        paddingHorizontal: 20, 
        paddingTop: 15, 
        borderTopWidth: 1, 
        borderTopColor: COLORS.DIVIDER_LIGHT,
        zIndex: 10, 
    },

    // Dummy Pages
    pageContainer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.BG_LIGHT,
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        color: COLORS.TEXT_DARK,
    },
    backButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.SURFACE_CARD,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.SHADOW_DEFAULT,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    backButtonText: {
        fontSize: 15,
        color: COLORS.TEXT_MEDIUM,
    },
});

const buttonStyles = StyleSheet.create({
    filterSetupButton: {
        backgroundColor: COLORS.ACCENT_CTA,
        paddingVertical: 14,
        borderRadius: 12, 
        marginBottom: Platform.OS === 'ios' ? 15 : 10,
        ...Platform.select({
            ios: { 
                shadowColor: COLORS.SHADOW_DEFAULT,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
            },
            android: { 
                elevation: 10,
            }
        })
    },
    filterSetupButtonText: { 
        color: COLORS.SURFACE_CARD, 
        fontSize: 16, 
        fontWeight: '700', 
        textAlign: 'center', 
    },
});