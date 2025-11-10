import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

// ⭐️ Footer 전용 색상 (어둡고 차분한 톤)
const FOOTER_COLORS = {
    BACKGROUND: '#efefefff',    // Deep Navy
    TEXT_LIGHT: '#3a3a3aff',    // Bright White Text
    TEXT_MUTED: '#6d6d6dff',    // Muted Secondary Text
    ACCENT: '#DAA520',        // Gold Accent
};

const Footer = () => {
    
    // 더미 데이터
    const supportLinks = [
        { title: '자주 묻는 질문', url: 'https://support.com/faq' },
        { title: '1:1 문의', url: 'https://support.com/contact' },
        { title: '서비스 가이드', url: 'https://guide.com' },
    ];

    const legalInfo = [
        '이용약관 | 개인정보처리방침 | 사업자 정보 확인',
        '주식회사 나 | 대표: 김마랑 | 사업자번호: 123-45-67890',
        '문의: sh70900@naver.com',
    ];
    
    // 외부 링크 열기 핸들러 (간략화를 위해 생략 가능)
    const handleLinkPress = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles.container}>
            
            {/* 1. 로고 및 간단 소개 */}
            <View style={styles.section}>
                <Text style={styles.logoText}>Art Insight</Text>
                <Text style={styles.description}>
                    예술 투자의 새로운 기준. 정확한 시장 데이터와 독점적인 통찰력을 제공합니다.
                </Text>
            </View>

            {/* 2. 고객 지원 링크 */}
            <View style={styles.linkSection}>
                <Text style={styles.columnHeader}>고객 지원</Text>
                <View style={styles.linkRow}>
                    {supportLinks.map((link, index) => (
                        <TouchableOpacity key={index} onPress={() => handleLinkPress(link.url)}>
                            <Text style={styles.linkText}>
                                {link.title}
                                {index < supportLinks.length - 1 ? '  | ' : ''}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            
            {/* 3. 소셜 미디어 */}
            <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="instagram" size={20} color={FOOTER_COLORS.ACCENT} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="facebook-square" size={20} color={FOOTER_COLORS.ACCENT} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="twitter-square" size={20} color={FOOTER_COLORS.ACCENT} />
                </TouchableOpacity>
            </View>

            {/* 4. 법적 정보 및 저작권 */}
            <View style={styles.infoSection}>
                {legalInfo.map((info, index) => (
                    <Text key={index} style={styles.infoText}>{info}</Text>
                ))}
                <Text style={styles.copyrightText}>
                    © {new Date().getFullYear()} Art Insight. All rights reserved.
                </Text>
            </View>

        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: FOOTER_COLORS.BACKGROUND,
        paddingHorizontal: 20,
        paddingVertical: 35, // 패딩 살짝 줄임
        marginTop: 30, 
        gap: 25, 
    },
    section: {
        // gap: 10, // 내부 간격은 필요시 추가
    },
    logoText: {
        fontSize: 22, // 폰트 크기 살짝 줄임
        fontWeight: 'bold',
        color: FOOTER_COLORS.ACCENT,
        marginBottom: 8, // 간격 살짝 줄임
    },
    description: {
        fontSize: 13, // 폰트 크기 살짝 줄임
        color: FOOTER_COLORS.TEXT_MUTED,
        lineHeight: 18,
    },
    
    // --- 2. 고객 지원 링크 섹션 ---
    linkSection: {
        gap: 10,
    },
    columnHeader: {
        fontSize: 15, // 폰트 크기 살짝 줄임
        fontWeight: 'bold',
        color: FOOTER_COLORS.TEXT_LIGHT,
        marginBottom: 5,
    },
    linkRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    linkText: {
        fontSize: 13,
        color: FOOTER_COLORS.TEXT_MUTED,
        // 파이프(|) 구분자를 텍스트 내에서 처리
    },

    // --- 3. 소셜 미디어 스타일 ---
    socialIcons: {
        flexDirection: 'row',
        gap: 20, // ⭐️ gap으로 간격 조정
    },
    socialButton: {
        // 빈 스타일 (margin 제거)
    },

    // --- 4. 법적 정보 스타일 ---
    infoSection: {
        gap: 5, // ⭐️ 정보 줄 간 간격
        marginTop: 5,
    },
    infoText: {
        fontSize: 12,
        color: FOOTER_COLORS.TEXT_MUTED,
    },
    copyrightText: {
        fontSize: 12,
        color: FOOTER_COLORS.TEXT_MUTED,
        marginTop: 5, // 상단 정보 줄과 살짝 구분
        fontWeight: 'bold',
    }
});