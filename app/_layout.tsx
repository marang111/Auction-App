import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Alert, View, StyleSheet } from 'react-native'; 

import { ToastProvider } from './../components/SwipeCardToast'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FloatingGuideButton } from '../components/FloatingGuideButton';
import { GuideProvider, useGuideContext } from '../context/GuideContext'; 
import GuideModal from '../components/guidemodal/GuideModal'; 


export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutContent() {
  const handleGuideButtonClick = () => {
    Alert.alert("가이드", "가이드 페이지로 이동하거나 도움말을 보여줍니다."); 
  };
  const colorScheme = useColorScheme();

  const { isModalVisible } = useGuideContext(); 

  return (
    <GestureHandlerRootView style={styles.root}>
      
      <ToastProvider> 
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen 
              name="Home/1_searchdetail/SearchDetail" 
              options={{ headerShown: false }} 
            />
          </Stack>
          
          <FloatingGuideButton onPress={handleGuideButtonClick} />
          <GuideModal /> 

          <StatusBar style="auto" />
        </ThemeProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <GuideProvider> 
      <RootLayoutContent />
    </GuideProvider>
  );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    // ⭐️ scrollBlocker 스타일 정의 제거
});
//정상