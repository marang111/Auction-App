import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 12, // 원하는 크기 (예: 14pt)로 설정
          fontWeight: '600', // 선택 사항: 가독성을 위해 굵게 설정
        },
      }}>
      
      {/* 1. 홈 탭 (index) */}
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {/* 2. 관심 작품 탭 (Wish) */}
      <Tabs.Screen
        name="Art&Auction" 
        options={{
          title: '작품/경매',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="heart.fill" color={color} /> ,
        }}
      />

      {/* 3. 차트 분석 탭 */}
      <Tabs.Screen
        name="Chart" 
        options={{
          title: '레이더', 
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="aqi.medium" color={color} />,
        }}
      />

      {/* 4. 경매 탭 (Auction) */}
      <Tabs.Screen
        name="Auction"
        options={{
          title: '옥션',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="tag.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}