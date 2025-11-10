import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HIDDEN_HEADER_OPTIONS } from '../../NavigationOptions';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterGroup from "./FilterGroup";

const screenWidth = Dimensions.get('window').width;


// ⭐️ SearchDetail 컴포넌트 (Wish.tsx의 Search 컴포넌트 내용을 사용)
function SearchDetail() {
  const [searchTerm, setSearchTerm] = React.useState(''); // 검색 상태 추가

  return (
    // SafeAreaView를 사용하여 노치나 상태 표시줄 영역을 피합니다.
    <SafeAreaView style={safeAreaStyles.container}>
      <ScrollView contentContainerStyle={safeAreaStyles.scrollViewContent} showsVerticalScrollIndicator={false}>

        {/* ⭐️ SearchBar (TextInput 형태) - autoFocus={true}로 키보드 자동 표시 */}
        <View style={searchStyles.searchBarContainer}>
            <View style={searchStyles.searchBarWrapper}>
                <View style={searchStyles.searchIconWrapper}>
                    <Ionicons name="search" size={20} color="#a0a0a0" />
                </View>
                <TextInput
                    style={searchStyles.searchInput}
                    placeholder="작가, 작품, 경매 검색"
                    placeholderTextColor="#a0a0a0"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    returnKeyType="search"
                    autoFocus={true} // ⭐️ 페이지가 로드되자마자 키보드를 띄웁니다.
                />
            </View>
        </View>

        {/* 필터 그룹 */}
        {/* FilterGroup 컴포넌트가 임포트되어 있어야 합니다. */}
        <FilterGroup/>

        {/* 검색 카테고리 카드들 */}
        <View style={searchStyles.card}>
          <Text style={searchStyles.header}>작품 검색</Text>
          <Text style={searchStyles.cardText}>작품 뷰어(이미지) / AR 3D 뷰 / 확대·축소</Text>
          <Text style={searchStyles.cardText}>가격 데이터 확인</Text>
        </View>

        <View style={searchStyles.card}>
          <Text style={searchStyles.header}>작가 검색</Text>
          <Text style={searchStyles.cardText}>프로필 / 전시 이력 / 경매 낙찰 히스토리 / 시세 그래프</Text>
        </View>

        <View style={searchStyles.card}>
          <Text style={searchStyles.header}>경매 검색</Text>
          <Text style={searchStyles.cardText}>경매 입찰 상태 및 실시간 업데이트</Text>
        </View>

        <View style={{height: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchDetail;

// =========================================================================
// 스타일 정의
// =========================================================================

const safeAreaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 0, 
  }
});

const searchStyles = StyleSheet.create({
  // ⭐️ 검색창 스타일 (SearchDetail용)
  searchBarContainer: {
    justifyContent: 'center',
    paddingVertical: 10, // 상하 패딩 조정
    paddingHorizontal: 0, // ScrollViewContent에 이미 패딩이 있으므로 0
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    borderRadius: 8, // SearchDetail에서는 모서리를 둥글게
    paddingHorizontal: 15,
    backgroundColor: '#fff', // 배경색 변경
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIconWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  searchInput: {
    flexGrow: 1, 
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  
  // --- Calendar Styles ---
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  calendarHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  calendarDummyText: {
    color: '#999',
    textAlign: 'center',
    paddingVertical: 40,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },

  // --- 더미카드 ---
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5, // 강조선
    borderLeftColor: '#007AFF', // 파란색 강조
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },

  // 필터 그룹 스타일은 FilterGroup 컴포넌트 파일에 있어야 합니다.
});