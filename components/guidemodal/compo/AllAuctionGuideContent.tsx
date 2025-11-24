import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// ⭐️ 스와이프 가능한 아이템 컴포넌트 (예시)
const SwipeItem: React.FC<{ title: string; subtitle: string; color: string }> = ({ title, subtitle, color }) => {
    return (
        <View style={[styles.itemContainer, { backgroundColor: color }]}>
            <View style={styles.swipeHintContainer}>
                <Text style={styles.swipeHint}>⇦ Swipe to see more options</Text>
            </View>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
            
            {/* ⭐️ 숨겨진 스와이프 옵션 영역 (시각적 예시) */}
            <View style={styles.hiddenOptions}>
                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>관심 등록</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.optionButton, { backgroundColor: '#FF8C00' }]}>
                    <Text style={styles.optionText}>알림 설정</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// ⭐️ '전체 경매 목록' 가이드 상세 내용 컴포넌트
const AllAuctionGuideContent: React.FC = () => {
  return (
    <View style={styles.fullContent}>
        
        <Text style={styles.header}>작품 리스트 확인 및 관리</Text>
        <Text style={styles.subDescription}>
            목록의 작품들은 필터링과 정렬 기능을 지원하며, 각 리스트 아이템은 스와이프하여 빠르게 추가 액션을 취할 수 있습니다.
        </Text>
        
        <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>➡️ 스와이프 기능 예시</Text>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                pagingEnabled
            >
                {/* ⭐️ 스와이프 예시 아이템 (실제 리스트 구현 방식과 유사) */}
                <SwipeItem 
                    title="스와이프 작동 방식" 
                    subtitle="아이템을 오른쪽에서 왼쪽으로 밀어보세요." 
                    color="#f4f4f4"
                />
                <SwipeItem 
                    title="추가 액션 확인" 
                    subtitle="숨겨진 관심 등록, 알림 설정 버튼이 나타납니다." 
                    color="#f4f4f4"
                />
            </ScrollView>
        </View>

        <Text style={styles.footerNote}>
            * 스와이프 기능은 Art&Auction 목록 화면에서 직접 사용 가능합니다.
        </Text>

    </View>
  );
};

export default AllAuctionGuideContent;

const styles = StyleSheet.create({
    fullContent: {
        paddingHorizontal: 20,
        width: screenWidth,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D2A3A',
        marginBottom: 8,
        textAlign: 'center',
    },
    subDescription: {
        fontSize: 14,
        color: '#6A6A6A',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    listSection: {
        width: '100%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    // 스와이프 리스트 스타일
    scrollContent: {
        paddingVertical: 5,
    },
    itemContainer: {
        width: screenWidth - 40, // 패딩 고려
        height: 100,
        borderRadius: 10,
        padding: 15,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    swipeHintContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeHint: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
        zIndex: 1,
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#666',
        zIndex: 1,
    },
    hiddenOptions: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        paddingLeft: 10,
        backgroundColor: '#eee', // 배경색을 달리하여 숨겨진 옵션 예시
        width: 150, // 예시 영역 크기
        justifyContent: 'flex-end',
        alignItems: 'center',
        transform: [{ translateX: 150 }], // 기본적으로 숨김
    },
    optionButton: {
        backgroundColor: '#778899',
        padding: 8,
        borderRadius: 5,
        marginLeft: 5,
    },
    optionText: {
        color: 'white',
        fontSize: 12,
    },
    footerNote: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginTop: 10,
    }
});
//정상