import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search Artsy" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (text: string) => {
    setSearchTerm(text);
  };

  // 키보드 엔터 또는 아이콘 클릭 시 검색 처리
  const handleSearch = () => {
    console.log("검색어:", searchTerm);
    // TODO: 실제 검색 API 호출 로직 추가
  };

  return (
    // 부모의 padding을 상쇄하기 위해 음수 마진이 적용된 컨테이너
    <View style={searchBarStyles.searchBarContainer}>
      <View style={[
          searchBarStyles.searchBarWrapper,
          isFocused && searchBarStyles.searchBarWrapperFocused // 포커스 시 스타일 적용
      ]}>

        {/* 검색 아이콘 (클릭 가능) */}
        <TouchableOpacity onPress={handleSearch} style={searchBarStyles.searchIconWrapper}>
            <Ionicons name="search" size={20} color="#a0a0a0" />
        </TouchableOpacity>

        {/* 검색 입력 필드 */}
        <TextInput
          style={searchBarStyles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          value={searchTerm}
          onChangeText={handleChange}
          returnKeyType="search" // 키보드 '검색' 버튼 활성화
          onSubmitEditing={handleSearch}
          onFocus={() => setIsFocused(true)} // 포커스 상태 추적
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
}

export default SearchBar;

// =========================================================================
// 스타일 정의 (StyleSheet)
// =========================================================================

const searchBarStyles = StyleSheet.create({
  // 가로 꽉 채움 디자인을 위한 음수 마진 적용
  searchBarContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'black',
    marginHorizontal: -16, // 부모의 paddingHorizontal: 16 상쇄
  },

  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    // 그림자 스타일 (iOS/Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },

  // 포커스 시 테두리 효과
  searchBarWrapperFocused: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: 'rgba(170, 170, 170, 0.2)',
    paddingHorizontal: 13, // border-width로 인해 패딩 조정
    shadowOffset: { width: 0, height: 0 },
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
    flexGrow: 1, // 남은 공간 모두 차지
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
});