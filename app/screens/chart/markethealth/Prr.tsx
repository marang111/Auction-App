import React, { FC } from "react";
import { StyleSheet, Text, View } from 'react-native';

// --- 1. 컴포넌트 정의 ---
const Prr: FC = () => {
  return (
    // <div> -> View로 변환
    <View>
        {/* <p> -> Text로 변환, className/인라인 스타일 -> style={...} */}
        <Text style={prrStyles.dashboardItem}>
            전체 낙찰가 대비 추정가 달성률: 
            {/* <strong> 태그와 인라인 스타일을 하나의 Text 컴포넌트로 변환 */}
            <Text style={prrStyles.largeGreenText}>108.5%</Text>
        </Text>

        <Text style={prrStyles.dashboardItem}>
            전월 대비 달성률 변화: 
            {/* className={styles.highlightOrange} -> style={prrStyles.highlightOrange} */}
            <Text style={prrStyles.highlightOrange}>+3.2%p 증가</Text>
        </Text>

        <Text style={prrStyles.dashboardItem}>
            평균 응찰 건수 (Lot당): 
            {/* className={styles.highlightRed} -> style={prrStyles.highlightRed} */}
            <Text style={prrStyles.highlightRed}>8.1건</Text>
        </Text>

        {/* 캡션: 인라인 스타일을 RN 스타일로 변환 */}
        <Text style={prrStyles.caption}>
            * 100% 초과 시 강세 심리, 미만 시 관망세
        </Text>
    </View>
    );
}

export default Prr;

const prrStyles = StyleSheet.create({
    // 대시보드 정보 스타일
    dashboardItem: {
        fontSize: 16, // font-size: 1rem을 16px로 가정
        color: '#2c3e50', //
        marginBottom: 8, //
    },
    // 인라인 스타일 (낙찰률 108.5%) 변환
    largeGreenText: {
        fontSize: 28, // font-size: 1.8rem을 약 28px로 가정
        color: '#27ae60', // 인라인 스타일 color
        fontWeight: 'bold', // <strong> 태그 역할
    },
    // .highlightRed
    highlightRed: {
        color: '#c0392b',
        fontWeight: 'bold',
    },
    // .highlightOrange
    highlightOrange: {
        color: '#f39c12',
        fontWeight: 'bold',
    },
    // 캡션 스타일 (인라인 스타일 변환)
    caption: {
        fontSize: 13, // font-size: 0.8rem을 약 13px로 가정
        color: '#999', //
        marginTop: 10, //
    }
});