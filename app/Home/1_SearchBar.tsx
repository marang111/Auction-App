import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  // ⭐️ 페이지 이동 함수를 prop으로 받습니다. (필수 추가)
  onFocusNavigate: () => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    placeholder = "최근 업데이트 수정일: 25.11.23" , 
    onFocusNavigate // ⭐️ prop으로 받습니다.
}) => {
  
  return (
    <View style={searchBarStyles.searchBarContainer}>
      {/* ⭐️ View 대신 TouchableOpacity를 사용하고, onPress에 네비게이션 함수 연결 */}
      <TouchableOpacity 
          style={searchBarStyles.searchBarWrapper} 
          onPress={onFocusNavigate} // ⭐️ 클릭 시 페이지 이동 함수 호출
          activeOpacity={0.7} 
      >

          {/* 검색 아이콘 */}
          <View style={searchBarStyles.searchIconWrapper}>
              <Ionicons name="search" size={20} color="#a0a0a0" />
          </View>

          {/* ⭐️ TextInput 대신 Text로 대체하여 placeholder 역할만 수행 */}
          <Text style={searchBarStyles.searchInputPlaceholder} numberOfLines={1}>
              {placeholder}
          </Text>
          
      </TouchableOpacity>
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
  },

  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },

  // ❌ searchBarWrapperFocused 스타일 제거
  
  searchIconWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    flexShrink: 0,
  },

  // ⭐️ 새로운 스타일: Text를 위한 플레이스홀더 스타일
  searchInputPlaceholder: {
    flexGrow: 1, // 남은 공간 모두 차지
    fontSize: 16,
    color: '#a0a0a0', // Placeholder 색상
    paddingVertical: 0,
  },
  // ❌ searchInput 스타일 제거
});