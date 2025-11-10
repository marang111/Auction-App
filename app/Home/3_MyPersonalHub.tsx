import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import { COLORS } from './3_mypersonalhub/colors';
import {
    ACTION_CHIPS,
    NEXT_ACTION_PROMPT,
    PERSONAL_METRICS,
    RECOMMENDED_WORKS,
    RISK_EXPOSURE
} from './3_mypersonalhub/hubData';

import { ActionChip } from './3_mypersonalhub/hubTypes';
import { NextActionPrompt } from './3_mypersonalhub/NextActionPrompt';
import { PersonalMetricCard, metricStyles } from './3_mypersonalhub/PersonalMetricCard';
import { RiskExposureCard } from './3_mypersonalhub/RiskExposureCard';
import { WorkCard } from './3_mypersonalhub/WorkCard';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

// =================================================================
// ⭐️ 1. 메인 컴포넌트
// =================================================================
interface MyPersonalHubProps {
    userName?: string; 
    onPressChip: (id: number, title: string) => void;
    onPressWork: (workId: number) => void;
}

const MyPersonalHub: React.FC<MyPersonalHubProps> = ({ 
    userName = '사용자님', 
    onPressChip,
    onPressWork 
}) => {
    
    // 1. Portfolio Value calculation
    const portfolioValue = `${PERSONAL_METRICS.portfolio.totalWorks}작품 / ${PERSONAL_METRICS.portfolio.estimatedValue}`;

    // 2. Market Trend Value calculation (React.ReactNode 반환)
    const marketTrendValue = (
        <Text>
            <Text style={[metricStyles.value, {color: COLORS.HIGHLIGHT_GREEN}]}>
                {PERSONAL_METRICS.marketTrend.upArtists}명
            </Text>
            <Text style={metricStyles.unit}> 상승</Text>
            <Text style={metricStyles.separator}> / </Text>
            <Text style={[metricStyles.value, {color: COLORS.LIVE_RED}]}>
                {PERSONAL_METRICS.marketTrend.downArtists}명
            </Text>
            <Text style={metricStyles.unit}> 하락</Text>
        </Text>
    );

    // 3. Genre Performance Value calculation (React.ReactNode 반환)
    const genrePerformanceValue = (
        <Text>
            <Text style={[metricStyles.value, {color: COLORS.DEEP_NAVY}]}>
                {PERSONAL_METRICS.genrePerformance.genre}
            </Text>
            <Text style={metricStyles.separator}> - </Text>
            <Text style={[metricStyles.value, {color: COLORS.ACCENT_GOLD}]}>
                {PERSONAL_METRICS.genrePerformance.rate}
            </Text>
        </Text>
    );

    // Action Chip을 인라인 컴포넌트로 정의
    const ActionChipComponent: React.FC<ActionChip> = ({ id, title, icon }) => (
        <TouchableOpacity
            key={id}
            style={styles.chipButton}
            onPress={() => onPressChip(id, title)}
            activeOpacity={0.8}
        >
            <Ionicons 
                name={icon as any} 
                size={18} 
                color={COLORS.CHARCOAL_GRAY} 
                style={styles.chipIcon}
            />
            <Text style={styles.chipText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <View style={styles.header}>
            {/* 1. 핵심 액션 칩 */}
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipScrollContainer}
                >
                    {ACTION_CHIPS.map(chip => (
                        <ActionChipComponent key={chip.id} {...chip} />
                    ))}
                </ScrollView>

            {/* 2. 개인화 인사 */}
                <Text style={styles.greetingText}>
                    안녕하세요, <Text style={styles.userNameText}>{userName}!</Text>
                </Text>
                {/* <Text style={styles.greetingTextSmall}>
                    미술 시장의 <Text style={styles.accentText}>핵심 지표</Text>를 {"\n"}논리적으로 확인하세요.
                </Text> */}
            
            
            {/* 3. Next Action Prompt (알람) */}
                <NextActionPrompt data={NEXT_ACTION_PROMPT} />
            </View>

            {/* 4. 3개 카드 그룹 */}
            <View style={styles.metricGrid}>
                <PersonalMetricCard
                    iconName={PERSONAL_METRICS.portfolio.icon}
                    label={PERSONAL_METRICS.portfolio.label}
                    value={portfolioValue}
                    valueColor={COLORS.DEEP_NAVY}
                />
                <PersonalMetricCard
                    iconName={PERSONAL_METRICS.marketTrend.icon}
                    label={PERSONAL_METRICS.marketTrend.label}
                    value={marketTrendValue}
                    valueColor={COLORS.DEEP_NAVY} 
                />
                <PersonalMetricCard
                    iconName={PERSONAL_METRICS.genrePerformance.icon}
                    label={PERSONAL_METRICS.genrePerformance.label}
                    value={genrePerformanceValue}
                    valueColor={COLORS.DEEP_NAVY}
                />
            </View>

            {/* 5. 작가 집중도 */}
            <RiskExposureCard data={RISK_EXPOSURE} />
            
            {/* 6. 관심 작품 경매 성과 */}
            <View style={styles.recommendationArea}>
                <Text style={styles.recommendationTitle}>
                    관심 작품 경매 성과
                </Text>
                
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.workScrollContainer}
                >
                    {RECOMMENDED_WORKS.map(work => (
                        <WorkCard
                            key={work.id}
                            work={work}
                            onPress={onPressWork}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default MyPersonalHub;

// =================================================================
// ⭐️ 2. 메인 컴포넌트 스타일 정의 (레이아웃 관련 스타일)
// =================================================================

const styles = StyleSheet.create({
    // 전체 컨테이너
    container: {
        backgroundColor: COLORS.BG_WHITE,
        paddingBottom: 24,
        marginBottom: 0, 
    },

    // 필터 버튼 
    chipScrollContainer: {
        paddingHorizontal: 20,
        marginBottom: 32, 
    },
    chipButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.GRAY_BG, 
        paddingVertical: 11,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 8,
    },
    chipIcon: {
        fontSize: 14, 
        color: COLORS.CHARCOAL_GRAY, 
        marginRight: 6,
    },
    chipText: {
        fontSize: 13,
        fontWeight: '400',
        color: COLORS.CHARCOAL_GRAY,
    },
    
    // 인사하는 컨테이너
    header: {
        paddingTop: 10,
        marginBottom: 10,
        // backgroundColor:"#6c1573ff" 이미지로 배경 넣을 것
    },
    greetingText: {
        fontSize: 25,
        fontWeight: '300',
        color: COLORS.DEEP_NAVY,
        paddingHorizontal: 20,
        lineHeight: 36,
        marginBottom: 20,
    },
    greetingTextSmall: {
        fontSize: 25,
        fontWeight: '800',
        lineHeight: 36,
        color: COLORS.CHARCOAL_GRAY,
        marginBottom: 8,
    },
    userNameText: {
        fontWeight: '900', 
    },
    accentText: {
        color: COLORS.ACCENT_GOLD,
    },
    
    // 카드 그리드
    metricGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20, 
    },

    // 4. 관심 작품 경매 성과
    recommendationArea: {
        marginBottom: 0,
        // backgroundColor: "navy",
    },
    recommendationTitle: {
        fontSize: 19, 
        fontWeight: '800',
        color: COLORS.DEEP_NAVY,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    workScrollContainer: {
        paddingLeft: 20,
    },
});