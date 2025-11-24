import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

// ⭐️ TargetAreaState 타입 정의: 영역을 구분할 id 필드 추가
interface TargetAreaState {
  id: string; // ⭐️ 추가: 영역을 구분할 ID
  absoluteY: number; // 타겟 컴포넌트의 화면 상단 절대 Y 좌표
  height: number; // 타겟 컴포넌트의 높이
}

interface GuideContextType {
  targetAreas: TargetAreaState[] | null; 
  setTargetAreas: React.Dispatch<React.SetStateAction<TargetAreaState[] | null>>;
  
  buttonY: Animated.Value;
  progressAnim: Animated.Value; 

  // ⭐️ 추가: 현재 활성화된 영역의 ID (버튼이 위에 있는 영역)
  activeAreaId: string | null; 
  setActiveAreaId: React.Dispatch<React.SetStateAction<string | null>>;

  // ⭐️ 추가: 모달 상태
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuideContext = createContext<GuideContextType | undefined>(undefined);

// ⭐️ Provider 컴포넌트
export const GuideProvider = ({ children }: { children: React.ReactNode }) => {
  const [targetAreas, setTargetAreas] = useState<TargetAreaState[] | null>(null);
  const [activeAreaId, setActiveAreaId] = useState<string | null>(null); // ⭐️ 추가: 활성화 ID
  const [isModalVisible, setIsModalVisible] = useState(false); // ⭐️ 추가: 모달 상태

  // 버튼의 Y 위치를 저장하는 Animated.Value
  const buttonY = useRef(new Animated.Value(0)).current;
  // 색상 애니메이션 진행도를 저장하는 Animated.Value
  const progressAnim = useRef(new Animated.Value(0)).current; 


  // ⭐️ [핵심 수정: useCallback] 버튼 위치에 따라 progressAnim을 업데이트하는 함수 (무한 루프 방지)
  const updateProgress = useCallback((currentButtonY: number, targetAreas: TargetAreaState[] | null) => {
    
    // 버튼의 중앙 Y 좌표 계산
    const BUTTON_SIZE = 60; 
    const buttonCenterY = currentButtonY + BUTTON_SIZE / 2;
    
    let isButtonInArea = false;
    let newActiveAreaId: string | null = null;

    if (targetAreas) {
        for (const targetAreaState of targetAreas) {
            const areaTop = targetAreaState.absoluteY;
            const areaBottom = targetAreaState.absoluteY + targetAreaState.height;

            // 버튼의 중심이 영역 안에 있는지 확인
            if (buttonCenterY >= areaTop && buttonCenterY <= areaBottom) {
                isButtonInArea = true;
                // ⭐️ 활성화된 영역의 ID 저장
                newActiveAreaId = targetAreaState.id; 
                break;
            }
        }
    }
        
    // ⭐️ activeAreaId 상태 업데이트
    setActiveAreaId(newActiveAreaId);

    // progressAnim 업데이트 (색상 애니메이션)
    Animated.spring(progressAnim, {
        toValue: isButtonInArea ? 1 : 0,
        useNativeDriver: false,
        bounciness: 0,
        speed: 25, // ⭐️ [수정: 속도 개선] 색상 변화 속도 증가 (25)
    }).start();
    
  }, [progressAnim]); // progressAnim만 의존성에 포함


  // ⭐️ [핵심 수정: useEffect] TargetAreas나 ButtonY가 변경될 때마다 Progress를 계산하여 업데이트
  useEffect(() => {
    
    // buttonY 값이 변경될 때마다 updateProgress를 호출하는 리스너 등록
    const listenerId = buttonY.addListener(({ value: currentButtonY }) => {
        updateProgress(currentButtonY, targetAreas);
    });
    
    // 초기 값 설정
    updateProgress(buttonY._value, targetAreas);

    // ⭐️ 클린업 함수: 컴포넌트 언마운트 또는 의존성 변경 시 리스너 제거
    return () => buttonY.removeListener(listenerId);
    
    // ⭐️ 종속성: targetAreas, buttonY, updateProgress가 변경될 때만 리스너를 다시 등록합니다.
  }, [targetAreas, buttonY, updateProgress]); 


  const contextValue = React.useMemo(() => ({
    targetAreas, 
    setTargetAreas,
    buttonY,
    progressAnim,
    activeAreaId, // ⭐️ 추가
    setActiveAreaId, // ⭐️ 추가
    isModalVisible, // ⭐️ 추가
    setIsModalVisible, // ⭐️ 추가
  }), [targetAreas, buttonY, progressAnim, activeAreaId, isModalVisible]); // ⭐️ 의존성 업데이트

  return (
    <GuideContext.Provider value={contextValue}>
      {children}
    </GuideContext.Provider>
  );
};

// ⭐️ Context Hook
export const useGuideContext = () => {
  const context = useContext(GuideContext);
  if (context === undefined) {
    throw new Error('useGuideContext must be used within a GuideProvider');
  }
  return context;
};
//정상