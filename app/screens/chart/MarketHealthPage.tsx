import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SellThroughRateChart from "./markethealth/SellThroughRateChart.tsx" 
import AllTradeAmount from "./markethealth/AllTradeAmount.tsx";
import Prr from "./markethealth/Prr.tsx"

// 타입 정의
interface MarketHealthPageProps {
    onGoBack: () => void;
}

// 컴포넌트 정의
const MarketHealthPage: FC<MarketHealthPageProps> = ({ onGoBack }) => {
  const insets = useSafeAreaInsets();
  
  return (
    // SafeArea와 스크롤을 위한 ScrollView 사용
    <ScrollView 
        style={[marketStyles.container, { paddingTop: insets.top }]}
        contentContainerStyle={[marketStyles.content, { paddingBottom: insets.bottom + 20 }]}
    >
        {/* 헤더 */}
        <View style={marketStyles.header}>
            <TouchableOpacity style={marketStyles.backButton} onPress={onGoBack}>
                <Text style={marketStyles.backButtonText}>← 뒤로가기</Text>
            </TouchableOpacity>
        </View>
      
        {/* 메인 콘텐츠 영역 */}
        <View style={marketStyles.main}>

            <Text style={marketStyles.title}>시장 건전성 진단</Text>

            <SellThroughRateChart/>

            <View style={marketStyles.viewcontainer}>
                <Text style={marketStyles.sectionTitle}>총 거래액 (All Trade Amount)</Text>
                <AllTradeAmount/>
            </View>

            <View>
                <Text style={marketStyles.sectionTitle}>시장 심리 지수 (P.R.R)</Text>
                <Prr />
            </View>
            

            
        </View>
    </ScrollView>
  );
};

export default MarketHealthPage;

// 스타일 정의 (생략)
const marketStyles = StyleSheet.create({
    container: {
        flex: 1,
        // 보라색 배경이양 //
        backgroundColor: '#23162dff',
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#007AFF',
    },
    main: {
        paddingTop: 10,
    },
    viewcontainer:{
        marginBottom:20,
    },
    // 시장 건전성 진단
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: '#ecececff',
    },
    chartPlaceholder: {
        textAlign: 'center',
        padding: 50,
        color: '#999',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#ccc',
        borderRadius: 5,
    },
    chartSection: {
        marginBottom: 30,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },

    // 총거래액
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color: '#ecececff',
    },
    content: {
        paddingHorizontal: 16,
    }
});