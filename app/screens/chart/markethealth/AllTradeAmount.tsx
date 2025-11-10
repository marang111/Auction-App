import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from 'react-native';
// ⭐️ Recharts 대신 React Native Chart Kit 사용
import { LineChart } from 'react-native-chart-kit';

// --- 1. 타입 및 데이터 정의 ---
interface TradeDataPoint {
    name: string;
    거래액: number; // 억 원
    출품수: number; // 개
}

const trendData: TradeDataPoint[] = [
  { name: "1", 거래액: 120, 출품수: 250 },
  { name: "2", 거래액: 150, 출품수: 280 },
  { name: "3", 거래액: 135, 출품수: 260 },
  { name: "4", 거래액: 180, 출품수: 310 },
  { name: "5", 거래액: 160, 출품수: 300 },
  { name: "6", 거래액: 210, 출품수: 350 },
  { name: "7", 거래액: 190, 출품수: 330 },
  { name: "8", 거래액: 230, 출품수: 360 },
  { name: "9", 거래액: 280, 출품수: 410 }, 
  { name: "10", 거래액: 250, 출품수: 380 },
  { name: "11", 거래액: 300, 출품수: 450 },
  { name: "12", 거래액: 350, 출품수: 480 },
];

const screenWidth = Dimensions.get('window').width;

// 2. Chart Kit 데이터 포맷팅
const chartData = {
    labels: trendData.map(d => `${d.name}월`), 
    datasets: [
        {
            data: trendData.map(d => d.거래액),
            color: (opacity = 1) => `rgba(119, 197, 249, ${opacity})`, // #77c5f9ff (월별 총 거래액)
            name: "월별 총 거래액",
        },
        {
            data: trendData.map(d => d.출품수),
            color: (opacity = 1) => `rgba(105, 215, 151, ${opacity})`, // #69d797ff (월별 출품 경매 수)
            name: "월별 출품 경매 수",
        },
    ],
};

// 3. Chart Kit 설정 (다크 테마 배경에 맞춤)
const chartConfig = {
    backgroundGradientFrom: "#1f1f1f", // 배경 색상 (CSS: rgb(31, 31, 31))
    backgroundGradientTo: "#1f1f1f", 
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // 텍스트 색상
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // X/Y축 레이블 색상
    strokeWidth: 1.5,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, 
    propsForLabels: {
    fontSize: 11,
    },
    // CartesianGrid 대체
    propsForVerticalLabels: {
        strokeDasharray: "3, 3",
        stroke: "gray" 
    },
    propsForHorizontalLabels: {
        strokeDasharray: "3, 3",
        stroke: "gray" 
    },
};


const AllTradeAmount: FC = () => {
    const summaryText = "전체 시장 거래액은 9월부터 가파르게 증가하여 전년 동기 대비 25%의 성장세를 보였습니다.";

    return (
        <View style={tradeChartStyles.lineChart}>
            {/* 헤더 */}
            <Text style={tradeChartStyles.lineChartheader}>거래액 규모 (억 원)</Text>
            
            {/* 차트 영역 */}
            <View style={tradeChartStyles.chartContainer}>
                <LineChart
                    data={chartData}
                    width={screenWidth - 32} // View padding 16*2를 제외
                    height={350} // 웹의 55vh를 고정 높이 350px로 가정
                    chartConfig={chartConfig}
                    withShadow={false}
                    withInnerLines={true}
                    withOuterLines={false}
                    // Y축 (거래액)의 최소값을 데이터 기반으로 자동 설정
                    yAxisLabel="" 
                    yAxisSuffix="억" 
                    // X축 레이블이 많으므로 withHorizontalLabels={false} 처리하거나, 생략
                    style={{ marginLeft: -30 }} // Y축 라벨 공간 확보를 위해 좌측 마진 조정
                />
            </View>

            {/* 요약 정보 텍스트 */}
            <Text style={tradeChartStyles.chartSummary}>{summaryText}</Text>  
        </View>
    );
}

export default AllTradeAmount;

const tradeChartStyles = StyleSheet.create({
    lineChart: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#1f1f1f', // rgb(31, 31, 31)
        borderRadius: 8,
    },
    lineChartheader: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
        marginBottom: 20,
    },
    chartContainer: {
        // Chart Kit은 LineChart 자체에 borderRadius를 적용합니다.
        // 여기서 별도의 스타일링은 필요 없을 수 있습니다.
    },
    chartSummary: {
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1', 
        fontSize: 14,
        color: '#b5b5b5',
        fontWeight: '500',
        textAlign: 'left',
        lineHeight: 20,
    },
});