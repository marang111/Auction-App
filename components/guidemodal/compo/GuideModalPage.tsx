import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextStyle } from 'react-native'; 
import { GuideContent, PortfolioDetail, StyledTextSegment } from '../GuideContentData'; 
import AllAuctionGuideContent from './AllAuctionGuideContent'; 
import GuideButtonAnimationContent from './GuideButtonAnimationContent'; 


// -------------------------------------------------------------------------
// 1. StyledTextRenderer 인라인 스타일
// -------------------------------------------------------------------------
const StyledTextRenderer: React.FC<{ segments: StyledTextSegment[] }> = ({ segments }) => {
    return (
        <Text style={styles.itemContent}>
            {segments.map((segment, index) => {
                const highlightStyle: TextStyle = segment.isHighlight ? styles.highlightedText : {};
                
                const textWithBreaks = segment.text.split('\n').map((line, lineIndex, array) => (
                    <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < array.length - 1 && '\n'}
                    </React.Fragment>
                ));

                return (
                    <Text key={index} style={highlightStyle}>
                        {textWithBreaks}
                    </Text>
                );
            })}
        </Text>
    );
};


// -------------------------------------------------------------------------
// 2. NumberedListRenderer (번호 매기기 구조 스타일링 - 1., 2., 3. 형태)
// -------------------------------------------------------------------------
const NumberedListRenderer: React.FC<{ items: StyledTextSegment[][] }> = ({ items }) => {
    if (!items || items.length === 0 || items.every(item => item.every(segment => !segment.text || segment.text.trim() === ""))) {
        return <Text style={styles.itemContent}>- 내용 없음 -</Text>;
    }

    return (
        <View style={styles.listContainer}>
            {items.map((segments, index) => {
                const itemNumber = index + 1;
                
                const isItemEmpty = segments.every(segment => !segment.text || segment.text.trim() === "");
                if (isItemEmpty) return null;

                return (
                    <View key={index} style={styles.listItem}>
                        <Text style={styles.listNumber}>{itemNumber}. </Text>
                        
                        <View style={styles.listContentWrapper}>
                           <StyledTextRenderer segments={segments} />
                        </View>
                    </View>
                );
            })}
        </View>
    );
};


// -------------------------------------------------------------------------
// 3. PortfolioItem 컴포넌트
// -------------------------------------------------------------------------
const PortfolioItem: React.FC<{ title: string; content: StyledTextSegment[][] }> = ({ title, content }) => {
    const hasContent = content.some(item => item.some(segment => segment.text && segment.text.trim() !== ""));
    if (!hasContent) {
        return null;
    }
    
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
            <NumberedListRenderer items={content} /> 
        </View>
    );
};


// -------------------------------------------------------------------------
// 4. TagMenu 컴포넌트 (유지)
// -------------------------------------------------------------------------
const TagMenu: React.FC<{ goToPage: (id: string) => void }> = ({ goToPage }) => {
    const guideTags = [
        { id: 'guide', label: '가이드 버튼' },
        { id: 'recommendCard', label: '추천 작품' },
        { id: 'hotTrend', label: 'Hot Trend' },
        { id: 'allAuctionList', label: '전체 경매 목록' },
    ];

    return (
        <View style={styles.tagContainer}>
            <Text style={styles.tagHeader}>주요 가이드 살펴보기</Text>
            <View style={styles.tagWrapper}>
                {guideTags.map((tag) => (
                    <TouchableOpacity 
                        key={tag.id} 
                        style={styles.tagButton} 
                        onPress={() => goToPage(tag.id)}
                    >
                        <Text style={styles.tagText}>{tag.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


// -------------------------------------------------------------------------
// 5. GuideModalPage 메인 컴포넌트
// -------------------------------------------------------------------------
interface GuidePageProps {
  content: GuideContent;
  guideId: string;
  goToPage: (id: string) => void;
}

const GuideModalPage: React.FC<GuidePageProps> = ({ content, guideId, goToPage }) => {
    
    const portfolioDetails = content.portfolioDetails;

    return (
        <View 
            style={styles.pageContainer}
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>{content.title}</Text>
            
            {/* 1. 기본 설명 */}
            {content.description && (
                <>
                    <Text style={styles.description}>
                        {content.description!.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < content.description!.split('\n').length - 1 && '\n'}
                            </React.Fragment>
                        ))}
                    </Text>
                </>
            )}

            {/* 2. 애니메이션 데모 컴포넌트 (Guide) */}
            {guideId === 'guide' && (
                <GuideButtonAnimationContent content={content} />
            )}
            
            {/* ⭐️ [핵심 수정 부분] 스와이프 데모 컴포넌트 (AllAuctionList) */}
            {guideId === 'allAuctionList' && (
                <AllAuctionGuideContent content={content} />
            )}

            {/* 3. 포트폴리오 상세 내용 (하이라이트/번호 매기기 적용) */}
            {portfolioDetails && (
                <View style={styles.detailsContainer}>
                    <PortfolioItem title="기획 의도" content={portfolioDetails.planning} as any />
                    <PortfolioItem title="디자인 전략" content={portfolioDetails.design} as any />
                    <PortfolioItem title="기능 요소" content={portfolioDetails.technical} as any />
                </View>
            )}
            
            {/* 4. 태그 메뉴 */}
            {guideId === 'default' && (
                <TagMenu goToPage={goToPage} />
            )}
            
        </View>
    );
};

export default GuideModalPage;


// -------------------------------------------------------------------------
// 6. 스타일 정의
// -------------------------------------------------------------------------
const styles = StyleSheet.create({
    pageContainer: {
        width: '100%',
        paddingTop: 10,
    },
    scrollContent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10, 
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20, 
    },
    
    detailsContainer: {
        width: '100%',
        paddingTop: 10,
    },
    itemContainer: { 
        borderRadius: 8,
        padding: 12,
    },
    itemTitle: { 
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    itemContent: { 
        fontSize: 15,
        color: '#4A5568',
        lineHeight: 23,
        textAlign: 'left',
    },
    
    highlightedText: {
        fontWeight: 'bold',
        color: '#7ba64bff',
    },
    
    listContainer: {
        marginTop: 5,
        paddingLeft: 5, 
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    listNumber: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#a5a5a5ff',
        marginRight: 5,
        alignSelf: 'flex-start', 
        lineHeight: 23,
    },
    listContentWrapper: {
        flex: 1, 
    },

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