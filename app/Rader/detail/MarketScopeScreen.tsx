import React, { FC, PropsWithChildren, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// -------------------------------------------------------------------------
// 1. 디자인 가이드 색상 정의 (모바일 앱 스타일의 라이트 모드)
// -------------------------------------------------------------------------
const COLORS = {
    BG_PRIMARY: '#F9F9F9',         // 메인 배경 (매우 밝은 회색)
    TEXT_PRIMARY: '#1F2937',       // 메인 텍스트 (다크 그레이)
    TEXT_SECONDARY: '#6B7280',     // 보조/힌트 텍스트 (중간 회색)
    ACCENT_BLUE: '#320068ff',        // 주 강조 색상 (iOS Native Blue)
    CARD_BG: '#FFFFFF',            // 카드 배경 (흰색)
    DIVIDER_LINE: '#E5E7EB',       // 구분선 (매우 옅은 회색)
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.08)', // 카드용 미세 그림자
    BUTTON_BG_INACTIVE: '#E5E7EB', // 탭/버튼 비활성화 배경
};

// -------------------------------------------------------------------------
// 2. 타입 정의
// -------------------------------------------------------------------------
type FilterTab = 'asset' | 'activity' | 'rarity'; 

interface NavigationProps {
    onGoBack: () => void;
}

// -------------------------------------------------------------------------
// 3. 내부 컴포넌트 정의 (FilterItem, TabButton)
// -------------------------------------------------------------------------

const FilterItem: FC<PropsWithChildren<{ title: string; hint: string }>> = ({ title, hint, children }) => (
    <View style={marketScopeStyles.filterItem}>
        <Text style={marketScopeStyles.filterItemTitle}>{title}</Text>
        <View style={marketScopeStyles.filterControlPlaceholder}>
            <Text style={marketScopeStyles.filterControlText}>{hint}</Text>
            {children}
        </View>
    </View>
);

const TabButton: FC<{ tab: FilterTab, label: string, currentTab: FilterTab, setCurrentTab: (tab: FilterTab) => void }> = ({ tab, label, currentTab, setCurrentTab }) => {
    const isActive = currentTab === tab;
    const activeStyle = isActive ? marketScopeStyles.activeTabButton : {};
    const activeTextStyle = isActive ? marketScopeStyles.activeTabText : {};

    return (
        <TouchableOpacity 
            style={[marketScopeStyles.tabButton, activeStyle]} 
            onPress={() => setCurrentTab(tab)}
        >
            <Text style={[marketScopeStyles.tabButtonText, activeTextStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};


// -------------------------------------------------------------------------
// 4. MarketScopeScreen 메인 컴포넌트
// -------------------------------------------------------------------------

const MarketScopeScreen: FC<NavigationProps> = ({ onGoBack }) => {
    const [currentTab, setCurrentTab] = useState<FilterTab>('asset');
    const insets = useSafeAreaInsets();

    const renderTabContent = (tab: FilterTab) => {
        switch (tab) {
            case 'asset':
                return (
                    <>
                        <Text style={marketScopeStyles.sectionSubtitle}>A. 분석 대상 및 범위 설정</Text>
                        <FilterItem 
                            title="1. 자산/매체 분류 (Multi-Select)"
                            hint="회화, 조각, 사진, 미디어 아트 등 분석 대상 매체 선택"
                        />
                        <FilterItem 
                            title="2. 주요 거래 시장 (Toggle/Select)"
                            hint="국내 시장, 글로벌 주요 시장(NY, HK, LDN) 등 탐색 범위 설정"
                        />
                        <FilterItem 
                            title="3. 데이터 관측 기간 (Slider/Select)"
                            hint="활동성 측정을 위한 기준 기간 설정 (1개월, 1년, 5년, 전체)"
                        />
                    </>
                );
            case 'activity':
                return (
                    <>
                        <Text style={marketScopeStyles.sectionSubtitle}>B. 활동성 및 규모 측정</Text>
                        <FilterItem 
                            title="4. 최소 거래 건수 (Input Field)"
                            hint="지정 기간 내 최소 거래 건수 설정 (활동성이 낮은 시장 제외)"
                        />
                        <FilterItem 
                            title="5. 시장 규모 (Slider)"
                            hint="거래액 규모에 따른 필터 (소규모 시장, Top Tier 시장 등)"
                        />
                        <FilterItem 
                            title="6. 가격 변동성 (Slider)"
                            hint="가격 변화 폭(%) 설정으로 시장의 안정성 또는 역동성 분석"
                        />
                    </>
                );
            case 'rarity':
                return (
                    <>
                        <Text style={marketScopeStyles.sectionSubtitle}>C. 희소성 및 데이터 품질</Text>
                        <FilterItem 
                            title="7. 작가 정량 등급 (Multi-Select)"
                            hint="객관적 지표(경매 참여 횟수, 보유 기관 수) 기반 작가 등급 분류"
                        />
                        <FilterItem 
                            title="8. 미공개 데이터 포함 여부 (Toggle)"
                            hint="일반에 공개되지 않은 비공개 거래 데이터 분석 포함 설정"
                        />
                        <FilterItem 
                            title="9. 데이터 소스 신뢰도 (Weight)"
                            hint="데이터 출처(경매사, 갤러리 등)의 신뢰도에 따른 가중치 설정"
                        />
                    </>
                );
            default: return null;
        }
    };

    const MarketApplyButton: FC<{ onPress: () => void }> = ({ onPress }) => (
        <TouchableOpacity style={buttonStyles.applyButton} onPress={onPress}>
            <Text style={buttonStyles.applyButtonText}>필터 적용</Text>
        </TouchableOpacity>
    );


    return (
        <View style={marketScopeStyles.container}>
            <View style={[marketScopeStyles.header, { paddingTop: insets.top + 10 }]}>
                <Text style={marketScopeStyles.title}>필터 적용하깅</Text>
                <TouchableOpacity onPress={onGoBack} style={marketScopeStyles.closeButton}>
                    <Text style={marketScopeStyles.closeButtonText}>X</Text>
                </TouchableOpacity>
            </View>

            {/* 탭 네비게이션 */}
            <View style={marketScopeStyles.tabBar}>
                <TabButton tab="asset" label="대상/범위" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabButton tab="activity" label="활동성/규모" currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabButton tab="rarity" label="희소성/품질" currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </View>

            {/* 필터 콘텐츠 영역 */}
            <ScrollView 
                style={marketScopeStyles.contentScrollView}
                contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} 
                showsVerticalScrollIndicator={false}
            >
                <View style={marketScopeStyles.contentWrapper}>
                    {/* 필터 페르소나 관리 영역 */}
                    <View style={marketScopeStyles.personaBox}>
                         <Text style={marketScopeStyles.personaText}>👤 페르소나: 장기 시장 규모 연구</Text>
                         <TouchableOpacity style={marketScopeStyles.personaSaveButton}>
                             <Text style={marketScopeStyles.personaSaveButtonText}>저장/불러오기</Text>
                         </TouchableOpacity>
                    </View>

                    {renderTabContent(currentTab)}
                    
                    {/* 실시간 미리보기 */}
                    <View style={marketScopeStyles.livePreviewBox}>
                        <Text style={marketScopeStyles.livePreviewTitle}>⚡️ 실시간 미리보기</Text>
                        <Text style={marketScopeStyles.livePreviewText}>[건전성] 낙찰률 78.5% (필터 적용 전 65%)</Text>
                        <Text style={marketScopeStyles.livePreviewText}>[투자 대상] 평균 거래가: ₩4,500만</Text>
                    </View>
                </View>
            </ScrollView>

            {/* 하단 CTA 버튼 */}
            <View style={[marketScopeStyles.footerFixed, { paddingBottom: insets.bottom }]}>
                <MarketApplyButton onPress={() => onGoBack()} />
            </View>
        </View>
    );
};

export default MarketScopeScreen;


// ----------------------------------------------------
// MarketScopeScreen Styles (모바일 앱 스타일)
// ----------------------------------------------------
const marketScopeStyles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: COLORS.BG_PRIMARY, 
    },
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        paddingBottom: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: COLORS.DIVIDER_LINE, 
        backgroundColor: COLORS.CARD_BG, 
    },
    title: { 
        fontSize: 18, // 모바일 타이틀 사이즈 조정
        fontWeight: '700', 
        color: COLORS.TEXT_PRIMARY, 
    }, 
    closeButton: { 
        padding: 5, 
    },
    closeButtonText: { 
        color: COLORS.TEXT_SECONDARY, 
        fontSize: 20, 
        fontWeight: '300', 
    },
    tabBar: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        backgroundColor: COLORS.BG_PRIMARY, 
        paddingHorizontal: 15, 
        paddingVertical: 10, 
    },
    tabButton: {
        flex: 1, 
        paddingVertical: 8, // 탭 패딩 조정
        marginHorizontal: 5, 
        borderRadius: 8, 
        borderWidth: 1, 
        borderColor: COLORS.DIVIDER_LINE, 
        backgroundColor: COLORS.BUTTON_BG_INACTIVE, // 비활성화 배경
    },
    tabButtonText: { 
        color: COLORS.TEXT_SECONDARY, 
        fontWeight: '600', 
        textAlign: 'center', 
        fontSize: 13,
    },
    activeTabButton: { 
        borderColor: COLORS.ACCENT_BLUE, 
        backgroundColor: COLORS.ACCENT_BLUE, // 활성화 시 솔리드 배경
    },
    activeTabText: { 
        color: COLORS.CARD_BG, // 활성화 시 흰색 텍스트
    },
    contentScrollView: { 
        flex: 1, 
    },
    contentWrapper: { 
        padding: 20, 
    },
    sectionSubtitle: { 
        fontSize: 15, // 사이즈 조정
        fontWeight: '700', 
        color: COLORS.TEXT_SECONDARY, 
        marginBottom: 15, 
        marginTop: 10, 
    },

    // Persona Box
    personaBox: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: COLORS.CARD_BG, 
        borderRadius: 12, // 모서리 둥글게
        padding: 16, 
        marginBottom: 20, 
        ...Platform.select({
            ios: {
                shadowColor: COLORS.SHADOW_COLOR,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 5,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    personaText: { 
        color: COLORS.TEXT_PRIMARY, 
        fontWeight: '600', 
    },
    personaSaveButton: { 
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        backgroundColor: COLORS.BUTTON_BG_INACTIVE, 
        borderRadius: 8, 
    },
    personaSaveButtonText: { 
        color: COLORS.TEXT_SECONDARY, 
        fontSize: 12, 
        fontWeight: '600',
    },

    // Filter Items
    filterItem: {
        marginBottom: 15, 
        padding: 16, 
        borderRadius: 12, 
        backgroundColor: COLORS.CARD_BG,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.SHADOW_COLOR,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 5,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    filterItemTitle: { 
        fontSize: 16, 
        fontWeight: '600', 
        color: COLORS.TEXT_PRIMARY, 
        marginBottom: 10, 
    },
    filterControlPlaceholder: {
        backgroundColor: COLORS.BUTTON_BG_INACTIVE, 
        padding: 12, 
        borderRadius: 8, 
        borderLeftWidth: 4, // 왼쪽 강조선 유지
        borderLeftColor: COLORS.ACCENT_BLUE, 
    },
    filterControlText: { 
        color: COLORS.TEXT_SECONDARY, 
        fontSize: 14, 
    },
    
    // Live Preview
    livePreviewBox: {
        marginTop: 25, 
        padding: 20, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: COLORS.ACCENT_BLUE, 
        backgroundColor: COLORS.CARD_BG,
    },
    livePreviewTitle: { 
        fontSize: 16, 
        fontWeight: '700', 
        color: COLORS.ACCENT_BLUE, 
        marginBottom: 10, 
    },
    livePreviewText: { 
        color: COLORS.TEXT_SECONDARY, 
        fontSize: 14, 
        lineHeight: 20, 
    },
    
    // Footer (Apply Button)
    footerFixed: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0, 
        paddingHorizontal: 20, 
        paddingTop: 15, 
        borderTopWidth: 1, 
        borderTopColor: COLORS.DIVIDER_LINE,
        backgroundColor: COLORS.CARD_BG, 
        zIndex: 10,
    },
});

// ----------------------------------------------------
// 버튼 스타일
// ----------------------------------------------------
const buttonStyles = StyleSheet.create({
    applyButton: {
        backgroundColor: COLORS.ACCENT_BLUE,
        paddingVertical: 14,
        borderRadius: 100,
    },
    applyButtonText: { 
        color: COLORS.CARD_BG, 
        fontSize: 17, 
        fontWeight: '700', 
        textAlign: 'center', 
    }
});