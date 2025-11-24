import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { useGuideContext } from '../context/GuideContext';

const AnimatedText = Animated.createAnimatedComponent(Text); 
// ⭐️ [추가] GUIDE_CONTENTS를 임포트하여 버튼 텍스트를 조회
import { GUIDE_CONTENTS } from '../components/guidemodal/GuideContentData';

const { width, height } = Dimensions.get('window');

interface FloatingGuideButtonProps {
  onPress: () => void; 
}

const BUTTON_SIZE = 60; 
const DRAG_THRESHOLD = 5; 
const initialLeft = width - BUTTON_SIZE - 20; 
const initialTop = height - BUTTON_SIZE - 100; 

// -----------------------------------------------------------
// ⭐️ 1. 버튼 콘텐츠 컴포넌트 (텍스트 수정)
// -----------------------------------------------------------
interface ButtonContentProps {
  panHandlers: any; 
}

const ButtonContent: React.FC<ButtonContentProps> = ({ panHandlers }) => {
  const { progressAnim, activeAreaId } = useGuideContext(); 

  const buttonBackgroundColor = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', '#FF6347'], 
    extrapolate: 'clamp',
  });
  
  const buttonTextColor = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#6b514cff', 'white'], 
    extrapolate: 'clamp',
  });
  
  const buttonAnimatedStyle: ViewStyle = {
    backgroundColor: buttonBackgroundColor,
  } as ViewStyle; 
  
  // ⭐️ [수정] activeAreaId를 사용하여 GUIDE_CONTENTS에서 buttonText를 조회
  const currentContent = GUIDE_CONTENTS[activeAreaId] || GUIDE_CONTENTS.default;
  const buttonLabel = activeAreaId ? currentContent.buttonText : '가이드';

  return (
    <Animated.View
        style={[styles.buttonContainer, buttonAnimatedStyle]}
        {...panHandlers} 
    >
        <AnimatedText style={[styles.text, { color: buttonTextColor }]}>
            {buttonLabel} {/* ⭐️ 수정된 변수 사용 */}
        </AnimatedText>
    </Animated.View>
  );
};


// -----------------------------------------------------------
// ⭐️ 2. 버튼 위치 제어 컴포넌트 (FloatingGuideButton)
// -----------------------------------------------------------
export const FloatingGuideButton: React.FC<FloatingGuideButtonProps> = ({ onPress }) => {
  const { buttonY, setIsModalVisible, isModalVisible } = useGuideContext(); 
  
  const pan = useRef(new Animated.ValueXY({ x: initialLeft, y: initialTop })).current;
  const currentPosition = useRef({ x: initialLeft, y: initialTop });
  const isDragging = useRef(false);
  const clickStart = useRef(0);
  const isClick = useRef(true); 

  useEffect(() => {
    buttonY.setValue(initialTop);

    const listenerId = pan.y.addListener(({ value }) => {
        if (!isDragging.current) {
            buttonY.setValue(value);
        }
    });

    return () => pan.y.removeListener(listenerId);
  }, [buttonY, pan.y]);

  const panResponder = useRef(
    PanResponder.create({
      // ⭐️ [수정 확인] 모달이 닫혀 있을 때만 PanResponder가 활성화되어야 함
      onStartShouldSetPanResponder: () => !isModalVisible, 
      onMoveShouldSetPanResponder: (e, gesture) => {
        return Math.abs(gesture.dx) > DRAG_THRESHOLD || Math.abs(gesture.dy) > DRAG_THRESHOLD;
      },
      onPanResponderGrant: (e, gesture) => {
        pan.setOffset(currentPosition.current);
        pan.setValue({ x: 0, y: 0 });
        isDragging.current = false;
        isClick.current = true; 
        clickStart.current = Date.now();
      },
      onPanResponderMove: (e, gesture) => {
        if (Math.abs(gesture.dx) > DRAG_THRESHOLD || Math.abs(gesture.dy) > DRAG_THRESHOLD) {
            isDragging.current = true;
            isClick.current = false; 
            pan.x.setValue(gesture.dx);
            pan.y.setValue(gesture.dy);
            
            buttonY.setValue(currentPosition.current.y + gesture.dy);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        
        const currentX = pan.x._value;
        const currentY = pan.y._value;
        const screenMiddleX = width / 2;
        const margin = 20;

        // 1. 클릭 처리
        if (!isDragging.current && (Date.now() - clickStart.current < 250)) {
            // 모달 상태 토글
            setIsModalVisible(prev => !prev);
            
        } else {
            // 2. 드래그 후 스냅 처리
            let finalX = currentX;
            if (currentX < screenMiddleX - BUTTON_SIZE / 2) {
                finalX = margin; 
            } else {
                finalX = width - BUTTON_SIZE - margin; 
            }
            
            let finalY = Math.max(margin, Math.min(currentY, height - BUTTON_SIZE - margin));
            
            currentPosition.current = { x: finalX, y: finalY };

            Animated.spring(pan, {
                toValue: { x: finalX, y: finalY },
                useNativeDriver: false,
                bounciness: 0,
                speed: 25,
            }).start();
        }

        isDragging.current = false;
        
      },

      onPanResponderTerminate: (e, gesture) => {
        pan.flattenOffset();
        
        const margin = 20;
        let finalX = Math.max(margin, Math.min(pan.x._value, width - BUTTON_SIZE - margin));
        let finalY = Math.max(margin, Math.min(pan.y._value, height - BUTTON_SIZE - margin));
        
        currentPosition.current = { x: finalX, y: finalY };
        pan.setValue({ x: finalX, y: finalY });
      }
    })
  ).current;


  return (
    <Animated.View
      style={[{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
        position: 'absolute', 
        zIndex: 9999,
      } as ViewStyle]}
      // ⭐️ [수정 확인] 모달이 닫혀있을 때만 (isModalVisible: false) 터치 이벤트를 받습니다.
      pointerEvents={isModalVisible ? 'none' : 'auto'}
    >
        <ButtonContent 
            panHandlers={panResponder.panHandlers} 
        />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { 
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  }
});