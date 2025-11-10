// layout.tsx (수정된 전체 코드)

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* 1. 기본 탭 내비게이터의 헤더를 숨깁니다. (기존 코드 유지) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* 2. Modal 화면 설정 (기존 코드 유지) */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        
        {/* 3. SearchDetail 화면의 헤더를 숨깁니다. */}
        <Stack.Screen 
          name="Home/1_searchdetail/SearchDetail" 
          options={{ 
            headerShown: false // ⬅️ 이 옵션이 기본 네비게이션 헤더를 제거합니다.
          }} 
        />
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}