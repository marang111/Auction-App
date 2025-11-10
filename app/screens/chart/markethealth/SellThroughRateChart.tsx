import React, { FC, useMemo } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
// ⭐️ React Native 환경에서 차트를 그리려면 'react-native-chart-kit' 사용 (recharts 대체)
import { LineChart } from 'react-native-chart-kit';

// --- 1. 샘플 데이터 (RN용) ---
interface ChartDataPoint {
    name: string;
    rate: number;
    volume: number;
}

const data: ChartDataPoint[] = [
    { name: '10월', rate: 78.5, volume: 1200 },
    { name: '11월', rate: 75.0, volume: 1500 },
    { name: '12월', rate: 79.2, volume: 1350 },
    { name: '1월', rate: 81.3, volume: 1420 },
    { name: '2월', rate: 82.1, volume: 1550 },
    { name: '3월', rate: 80.5, volume: 1600 },
    { name: '4월', rate: 77.8, volume: 1480 },
    { name: '5월', rate: 76.2, volume: 1300 },
    { name: '6월', rate: 79.9, volume: 1520 },
    { name: '7월', rate: 81.0, volume: 1650 },
    { name: '8월', rate: 83.5, volume: 1720 },
    { name: '9월', rate: 82.8, volume: 1680 },
    { name: '10월', rate: 80.1, volume: 1750 },
];

const screenWidth = Dimensions.get('window').width;

const SellThroughRateChart: FC = () => {
    // 2. 현재 추세 계산 로직 (useMemo 유지)
    const { latestRate, trend, change, latestMonth } = useMemo(() => {
        if (data.length < 2) return { latestRate: 0, trend: '유지', change: 0, latestMonth: '' };

        const latest = data[data.length - 1];
        const previous = data[data.length - 2];
        const diff = latest.rate - previous.rate;

        let trendStatus = '유지';
        if (diff > 0.5) trendStatus = '상승';
        else if (diff < -0.5) trendStatus = '하락';

        return {
            latestRate: latest.rate,
            trend: trendStatus,
            change: diff,
            latestMonth: latest.name,
        };
    }, [data]);

    const trendInfo = {
        '상승': { icon: '⬆️', style: chartStyles.trendUp, text: '상승세' },
        '하락': { icon: '⬇️', style: chartStyles.trendDown, text: '하락세' },
        '유지': { icon: '↔️', style: chartStyles.trendNeutral, text: '유지' },
    }[trend];
    
    // 3. Chart Kit 데이터 포맷팅
    const chartData = {
        labels: data.map(item => item.name),
        datasets: [
            {
                data: data.map(item => item.rate),
                color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // #4f46e5 (인디고)
                strokeWidth: 3,
                name: '월별 낙찰률', // Legend에 사용됨
            },
        ],
    };

    // Chart Kit 설정
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 1, // 소수점 첫째자리까지 표시
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 기본 텍스트 색상
        labelColor: (opacity = 1) => `rgba(85, 85, 85, ${opacity})`,
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#4f46e5"
        },
        yAxisSuffix: "%",
        yAxisInterval: 1,
        style: {
            borderRadius: 16,
        }
    };

    return (
        <View style={chartStyles.chartPageContainer}>
            <Text style={chartStyles.chartTitle}>
                시장 낙찰률 (Sell-Through Rate) 추이가 궁금하다면?
            </Text>
            <Text style={chartStyles.chartDescription}>
                시장의 매수/매도 타이밍 및 규모를 진단합니다.
                경매에 출품된 작품 수 대비 실제로 낙찰된 작품 수의 비율입니다. 시장의 수요와 건전성을 나타내는 핵심 지표입니다.
            </Text>

            {/* 메트릭 카드 */}
            <View style={chartStyles.metricGrid}>
                {/* 최신 낙찰률 */}
                <View style={[chartStyles.kpiCard, chartStyles.borderIndigo]}>
                    <Text style={chartStyles.kpiLabel}>최신 낙찰률 (2025년 {latestMonth})</Text>
                    <Text style={chartStyles.kpiValue}>
                        {latestRate.toFixed(1)}<Text style={chartStyles.unit}>%</Text>
                    </Text>
                </View>

                {/* 전월 대비 변화 */}
                <View style={[chartStyles.kpiCard, chartStyles.borderYellow]}>
                    <Text style={chartStyles.kpiLabel}>전월 대비 변화</Text>
                    <View style={chartStyles.trendChangeContainer}>
                        <Text style={[chartStyles.trendValue, trendInfo.style]}>
                            {trendInfo.icon} {Math.abs(change).toFixed(1)}%
                        </Text>
                        <Text style={[chartStyles.trendStatus, trendInfo.style]}>
                            {trendInfo.text}
                        </Text>
                    </View>
                </View>

                {/* 시장 건전성 평가 */}
                <View style={[chartStyles.kpiCard, chartStyles.borderPink]}>
                    <Text style={chartStyles.kpiLabel}>시장 건전성 평가</Text>
                    <Text style={chartStyles.chartSubtitle}>
                        {latestRate > 80 ? "견고한 수요 기반" : "안정적 수요"}
                    </Text>
                    <Text style={chartStyles.chartDescriptionSmall}>
                        *80% 이상은 매우 긍정적인 시장 심리를 의미합니다.
                    </Text>
                </View>
            </View>

            {/* 차트 영역 */}
            <View style={chartStyles.chartContentArea}>
                <Text style={chartStyles.chartSubtitleMain}>월별 낙찰률 추이 (최근 12개월)</Text>
                <LineChart
                    data={chartData}
                    width={screenWidth - 32} // 전체 폭 - 좌우 패딩 16*2
                    height={400}
                    chartConfig={chartConfig}
                    bezier // 부드러운 곡선
                    style={chartStyles.chartStyle}
                />
            </View>

            {/* 해석 가이드 */}
            <View style={chartStyles.analysisGuideBox}>
                <Text style={chartStyles.guideHeader}>분석 가이드</Text>
                <View style={chartStyles.guideList}>
                    <Text style={chartStyles.guideItem}>
                        <Text style={chartStyles.guideItemStrong}>75% 이하:</Text> 매수자 우위 시장, 가격 하락 압력이 높아질 수 있습니다.
                    </Text>
                    <Text style={chartStyles.guideItem}>
                        <Text style={chartStyles.guideItemStrong}>80% 이상:</Text> 매도자 우위 시장, 수요가 강하고 새로운 거래에 대한 기대감이 높습니다.
                    </Text>
                    <Text style={chartStyles.guideItem}>
                        낙찰률이 급격히 하락하면 경매 출품량을 조절하는 것이 일반적입니다.
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default SellThroughRateChart;

// -------------------------------------------------------------------------
// 4. 스타일 정의
// -------------------------------------------------------------------------

const chartStyles = StyleSheet.create({
    chartPageContainer: {
        // backgroundColor: '#fff',
    },
    chartTitle: {
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        lineHeight: 30,
        color: '#ecececff',
    },
    chartDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        lineHeight: 20,
    },
    chartDescriptionSmall: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    
    // --- KPI Metric Styles ---
    metricGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    kpiCard: {
        flex: 1,
        marginHorizontal: 4,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        borderLeftWidth: 4,
    },
    borderIndigo: {
        borderLeftColor: '#4f46e5',
    },
    borderYellow: {
        borderLeftColor: '#f59e0b',
    },
    borderPink: {
        borderLeftColor: '#ec4899',
    },
    kpiLabel: {
        fontSize: 16,
        color: '#777',
        marginBottom: 4,
    },
    kpiValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    unit: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    
    // --- Trend Styles ---
    trendChangeContainer: {
        flexDirection: 'column',
    },
    trendValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    trendStatus: {
        fontSize: 12,
        marginTop: 2,
    },
    trendUp: {
        color: '#22c55e', // Green
    },
    trendDown: {
        color: '#ef4444', // Red
    },
    trendNeutral: {
        color: '#999', // Gray
    },
    chartSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    chartSubtitleMain: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },

    // --- Chart Area ---
    chartContentArea: {
        alignItems: 'center',
        marginBottom: 30,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    chartStyle: {
        marginVertical: 8,
    },

    // --- Analysis Guide Styles ---
    analysisGuideBox: {
        padding: 15,
        backgroundColor: '#f0f4ff', // Light Blue Background
        borderRadius: 12,
        marginBottom: 30,
    },
    guideHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1e3a8a',
    },
    guideList: {
        paddingLeft: 5,
    },
    guideItem: {
        fontSize: 14,
        lineHeight: 22,
        color: '#333',
        marginBottom: 5,
    },
    guideItemStrong: {
        fontWeight: 'bold',
    }
});