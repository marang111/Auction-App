import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { ToastProvider } from './../components/SwipeCardToast'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider> 
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            {/* 1. 기본 탭 내비게이터 */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            
            {/* 2. Modal 화면 */}
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            
            {/* 3. SearchDetail 화면 */}
            <Stack.Screen 
              name="Home/1_searchdetail/SearchDetail" 
              options={{ headerShown: false }} 
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}