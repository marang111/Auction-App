import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // ⭐️ TouchableOpacity 추가
import { GuideContent } from '../GuideContentData'; // ⭐️ [추가] GUIDE_CONTENTS 임포트
// ⭐️ [추가] AllAuctionGuideContent 컴포넌트 임포트
import AllAuctionGuideContent from './AllAuctionGuideContent';


interface GuidePageProps {
  content: GuideContent;
  guideId: string; // ⭐️ [추가] 어떤 가이드 ID인지 받도록 수정
  goToPage: (id: string) => void; // ⭐️ [추가] 페이지 이동 함수
}

// ⭐️ [신규 컴포넌트] 태그 목록 컴포넌트 정의
const TagMenu: React.FC<{ goToPage: (id: string) => void }> = ({ goToPage }) => {
    // ⭐️ Art&Auction 화면의 주요 가이드 ID들을 나열
    const guideTags = [
        // Home 화면 가이드 ID
        { id: 'recommendCard', label: '추천 작품' },
        { id: 'hotTrend', label: 'Hot Trend' },
        
        // Art&Auction 화면 가이드 ID
        { id: 'auctionCalendar', label: '경매 캘린더' },
        { id: 'allAuctionList', label: '전체 경매 목록' },
        // ... 필요한 다른 가이드 ID 추가 (GuideContentData.ts 기준)
    ];

    return (
        <View style={tagStyles.tagContainer}>
            <Text style={tagStyles.tagHeader}>주요 가이드 살펴보기</Text>
            <View style={tagStyles.tagWrapper}>
                {guideTags.map((tag) => (
                    <TouchableOpacity 
                        key={tag.id} 
                        style={tagStyles.tagButton} 
                        onPress={() => goToPage(tag.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={tagStyles.tagText}>#{tag.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


// ⭐️ 개별 가이드 페이지 컴포넌트
const GuideModalPage: React.FC<GuidePageProps> = ({ content, guideId, goToPage }) => {
    
    // ⭐️ [핵심 분기 로직] ID가 allAuctionList일 경우 전용 컴포넌트를 사용
    if (guideId === 'allAuctionList') {
        return <AllAuctionGuideContent />;
    }

    // ⭐️ [핵심 수정] guideId가 'default'일 경우, 태그 메뉴를 포함하여 렌더링
    if (guideId === 'default') {
        return (
            <View style={[styles.pageContainer, { paddingBottom: 80 }]}>
                {/* ⭐️ [제거] GuideModal.tsx가 핸들러를 담당 */}
                
                <Text style={styles.title}>{content.title}</Text>
                <Text style={styles.description}>{content.description}</Text>
                
                {/* ⭐️ 태그 메뉴 추가 */}
                <TagMenu goToPage={goToPage} />
            </View>
        );
    }

    // 그 외 일반 가이드 콘텐츠
    return (
        <View style={styles.pageContainer}>
        <Text style={styles.title}>{content.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{content.description}</Text>
        </View>
    );
};

export default GuideModalPage;


// ⭐️ [신규 스타일] 태그 메뉴 스타일 추가
const tagStyles = StyleSheet.create({
    tagContainer: {
        width: '100%',
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    tagHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    tagWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagButton: {
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tagText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    }
});


const styles = StyleSheet.create({
    pageContainer: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 50, // 페이지네이션 공간 확보
        alignItems: 'center',
        paddingHorizontal: 20, // ⭐️ [수정] 기본 페이지에도 패딩 추가
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    divider: {
        width: 60,
        height: 4,
        backgroundColor: '#ddd',
        borderRadius: 2,
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    }
});
//정상