import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ⭐️ 디자인 가이드 Key Colors 정의 (다른 컴포넌트와 통일)
const COLORS = {
    DEEP_NAVY: '#1D2A3A',      
    CHARCOAL_GRAY: '#2C3E50',  // Text Primary
    ACCENT_GOLD: '#DAA520',    // Accent
    LIVE_RED: '#FF3B30',       // Highlight
    LIGHT_GRAY: '#6A6A6A',     
    BG_WHITE: '#FFFFFF',
    BORDER: '#eee',
};

// 📰 뉴스/칼럼 예시 데이터 배열
const newsArticles = [
    {
        id: 1,
        category: "칼럼",
        title: "미술품 투자, 2025년 주목해야 할 5가지 키워드",
        summary: "글로벌 미술 시장의 최신 동향과 전문가 전망 분석합니다. 다양한 장르와 신흥 아티스트에 주목하세요.",
        date: "2025.10.01",
        image: require('../../assets/images/home/News/james.png') 
    },
    {
        id: 2,
        category: "뉴스",
        title: "단색화 거장 '박서보', 최고가 경신... 시장 활기",
        summary: "주요 경매에서 예상가를 훌쩍 뛰어넘는 낙찰가로 마감.",
        date: "25.09.28",
    },
    {
        id: 3,
        category: "이슈",
        title: "아트페어 프리뷰: Frieze Seoul 2025 하이라이트가 매우 길어서 잘리는지 확인해 주세요.", // 제목 길이 테스트
        summary: "놓치지 말아야 할 부스와 주목할 만한 신규 갤러리 소개.",
        date: "25.09.25",
    },
    {
        id: 4,
        category: "칼럼",
        title: "NFT와 전통 미술의 융합, 새로운 시장 가능성 탐구",
        summary: "디지털 자산과 물리적 작품의 경계가 허물어지다.",
        date: "25.09.20",
    },
    {
        id: 5,
        category: "뉴스",
        title: "국제 미술 시장 동향: 아시아 컬렉터의 부상",
        summary: "글로벌 미술 시장에서 아시아 컬렉터의 영향력 확대 분석.",
        date: "25.09.15",
    },
    {
        id: 6,
        category: "이슈",
        title: "환경과 예술의 만남: 지속 가능한 미술 프로젝트",
        summary: "친환경 재료와 주제로 주목받는 현대 미술가들.",
        date: "25.09.10",
    },
    {
        id: 7,
        category: "칼럼",
        title: "예술과 기술의 융합: AI 아트의 현재와 미래",
        summary: "인공지능이 창조하는 새로운 예술 형식과 그 가능성.",
        date: "25.09.05",
    },
    {
        id: 8,
        category: "뉴스",
        title: "서울옥션, 글로벌 경매 시장에서 두각 나타내다",
        summary: "국제 경매에서의 성공 사례와 향후 전략.",
        date: "25.09.01",
    },
    {
        id: 9,
        category: "이슈",
        title: "미술품 보존과 복원: 최신 기술 동향",
        summary: "첨단 기술이 미술품 보존에 미치는 영향과 사례 연구.",
        date: "25.08.28",
    },
    {
        id: 10,
        category: "칼럼",
        title: "컬렉터 인터뷰: 현대 미술에 대한 열정과 비전",
        summary: "주요 컬렉터들의 미술품 수집 철학과 시장 전망.",
        date: "25.08.25",
    }
];

// ⭐️ HeroNewsCard 컴포넌트 (유지)
const HeroNewsCard = ({ article, onPress }) => (
    <TouchableOpacity
        style={heroStyles.card}
        onPress={() => onPress(article.id)}
        activeOpacity={0.9}
    >
        <Image 
            source={article.image as any} 
            style={heroStyles.image}
        />
        <View>
            {/* \n이 포함된 title 처리 */}
            <Text style={heroStyles.title} numberOfLines={2}>
                {article.title.split('\n').map((line, index) => (
                    <Text key={index}>
                        {line}
                        {index < article.title.split('\n').length - 1 ? '\n' : ''}
                    </Text>
                ))}
            </Text>
            <Text style={heroStyles.summary} numberOfLines={2}>{article.summary}</Text>
            <View style={heroStyles.bottomRow}>
                <Text style={heroStyles.date}>{article.date}</Text>
            </View>
        </View>
    </TouchableOpacity>
);


// ⭐️ ListItem 컴포넌트: 일반 뉴스 목록의 깔끔한 행 (내용 수정)
const ListItem = ({ article, isLast, onPress }) => (
    <TouchableOpacity 
        style={[listStyles.item, isLast && listStyles.lastItem]}
        onPress={() => onPress(article.id)}
        activeOpacity={0.7}
    >
        <View style={listStyles.mainRow}> 
            <Text style={listStyles.categoryText}>{article.category}</Text>
                        <Text 
                style={listStyles.titleText} 
                numberOfLines={1} // 한 줄로 제한
                ellipsizeMode="tail" // 끝에 ... 표시
            >
                {article.title}
            </Text>
            <Text style={listStyles.dateText}>{article.date}</Text>
        </View>
        
    </TouchableOpacity>
);


function News() {
    const heroArticle = newsArticles[0]; 
    const listArticles = newsArticles.slice(1);

    const handleArticlePress = (id: number) => {
        console.log(`News article ${id} clicked.`);
    };

    const handleViewAllPress = () => {
        console.log('View All News button clicked.');
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Feature Section (Hero Card) */}
            <Text style={styles.sectionHeader}>주요 칼럼 및 이슈</Text>
            {heroArticle && (
                <HeroNewsCard 
                    article={heroArticle} 
                    onPress={handleArticlePress} 
                />
            )}

            {/* 2. Latest News List */}
            <View style={styles.latestListContainer}>
                <Text style={styles.sectionHeader}>최신 업데이트</Text>
                {listArticles.map((article, index) => (
                    <ListItem
                        key={article.id}
                        article={article}
                        isLast={index === listArticles.length - 1}
                        onPress={handleArticlePress}
                    />
                ))}
            </View>
            
            {/* 3. Action Button (View All) - 기능적 버튼 강조 */}
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllPress}>
                <Text style={styles.viewAllText}>
                    뉴스 전체 보기 <Ionicons name="arrow-forward" size={14} color={COLORS.CHARCOAL_GRAY} />
                </Text>
            </TouchableOpacity>

        </View>
    );
}

export default News;


// ⭐️ Hero Card Styles 
const heroStyles = StyleSheet.create({
    card: {
        marginBottom: 36,
        overflow: 'hidden',
        // backgroundColor:"red"
        
    },
    image: {
        width: '100%',
        height: 200, 
        backgroundColor: COLORS.BORDER,
        resizeMode: 'cover',
        marginBottom: 12,
        borderRadius: 2,
    },
    category: {
        fontSize: 15,
        color: COLORS.ACCENT_GOLD,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.DEEP_NAVY,
        lineHeight: 28,
        marginBottom: 5,
    },
    summary: {
        fontSize: 15.5,
        // fontWeight: '400',
        color: COLORS.CHARCOAL_GRAY,
        marginBottom: 10,
        lineHeight: 25,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        fontSize: 13,
        color: COLORS.LIGHT_GRAY,
    },
});


// 뉴스 리스트 스탈
const listStyles = StyleSheet.create({
    item: {
        paddingVertical: 13,
        borderBottomWidth: 0.5,
        borderBottomColor: "lightgray",
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    mainRow: { 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryText: { 
        fontSize: 15.5,
        color: COLORS.ACCENT_GOLD,
        fontWeight: '700',
        marginRight: 12,
        textAlign: 'left',
    },
    titleText: { 
        flex: 1, // 남은 공간 모두 차지
        fontSize: 15.5,
        fontWeight: '600',
        color: COLORS.CHARCOAL_GRAY,
        marginRight: 12,
    },
    
    dateText: { 
        fontSize: 13,
        color: COLORS.LIGHT_GRAY,
        textAlign: 'right',
    },
});

// ⭐️ Main News Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        fontSize: 19,
        fontWeight: '800',
        color: COLORS.DEEP_NAVY,
        marginBottom: 16,
    },

    latestListContainer: {
        marginTop: 16, 
    },

    // 뉴스 전체보기 버튼
    viewAllButton: {
        paddingVertical: 26,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    viewAllText: {
        color: COLORS.CHARCOAL_GRAY, 
        fontSize: 15,
        fontWeight: '900',
        alignItems: 'center',
        textAlignVertical: 'center',
    },
});