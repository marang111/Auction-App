import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGuideContext } from '../../context/GuideContext';
import { GUIDE_CONTENTS } from './GuideContentData';
import GuideModalPage from './compo/GuideModalPage';

const { height: screenHeight } = Dimensions.get('window');
const MODAL_HEIGHT_RATIO = 0.35; 
const SHEET_HEIGHT = screenHeight * MODAL_HEIGHT_RATIO;
const SNAP_TOP = screenHeight - SHEET_HEIGHT; 
const DRAG_CLOSING_THRESHOLD = 100;


const GuideModal: React.FC = () => {
  const { isModalVisible: isContextModalVisible, setIsModalVisible, activeAreaId } = useGuideContext();
  const insets = useSafeAreaInsets();
  
  const translateY = useSharedValue(screenHeight);
  const backdropOpacity = useSharedValue(0);
  
  const [isModalRendered, setIsModalRendered] = useState(false); 
  
  const [currentPageId, setCurrentPageId] = useState<'default' | string>(activeAreaId || 'default'); 
  
  // ⭐️ 페이지 이동 히스토리 스택: 태그 메뉴를 통해 이동한 경우에만 쌓입니다.
  const [pageHistory, setPageHistory] = useState<string[]>([]); 
  

  const handleClose = useCallback(() => {
    'worklet'; 
    translateY.value = withTiming(screenHeight, { duration: 300 });
    backdropOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(setIsModalVisible)(false);
        runOnJS(setIsModalRendered)(false);
        runOnJS(setPageHistory)([]); // 모달 닫을 때 히스토리 초기화
      }
    });
  }, [setIsModalVisible, translateY, backdropOpacity]);


  // ⭐️ [수정된 goToPage] 태그 메뉴에서만 호출되는 것을 가정하고, 히스토리에 현재 페이지를 추가
  const goToPage = useCallback((id: string) => {
    // 현재 페이지를 히스토리에 추가
    setPageHistory(prev => [...prev, currentPageId]);
    setCurrentPageId(id);
  }, [currentPageId]);

  // ⭐️ 뒤로가기 함수: 히스토리에서 이전 페이지로 복귀
  const goBack = useCallback(() => {
    if (pageHistory.length > 0) {
      const newHistory = [...pageHistory];
      const previousPageId = newHistory.pop()!; 
      setPageHistory(newHistory);
      setCurrentPageId(previousPageId);
    } 
    // 히스토리가 비어있으면 goBack이 호출되지 않아야 함 (canGoBack 조건 확인)
  }, [pageHistory]);

  
  useEffect(() => {
    if (isContextModalVisible) {
      // ⭐️ [수정] 모달이 열릴 때, activeAreaId가 있으면 그 페이지로 바로 설정하고 히스토리 비움.
      // activeAreaId가 없으면 'default'로 시작합니다.
      const initialPageId = activeAreaId || 'default';
      setCurrentPageId(initialPageId); 
      setPageHistory([]); 
      setIsModalRendered(true);

      const targetSnap = SNAP_TOP - insets.bottom;

      translateY.value = withTiming(targetSnap, { duration: 300 });
      backdropOpacity.value = withTiming(0.4, { duration: 300 });
    } else {
      if (translateY.value !== screenHeight) {
          translateY.value = withTiming(screenHeight, { duration: 300 });
          backdropOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
              if (finished) {
                  runOnJS(setIsModalRendered)(false);
              }
          });
      }
    }
  }, [isContextModalVisible, activeAreaId, insets.bottom, translateY, backdropOpacity]); 


  const content = currentPageId && GUIDE_CONTENTS[currentPageId]
    ? GUIDE_CONTENTS[currentPageId]
    : GUIDE_CONTENTS.default;

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      'worklet';
      const maxTranslateY = SNAP_TOP - insets.bottom;
      const newTranslateY = maxTranslateY + event.translationY;
      translateY.value = Math.max(maxTranslateY, newTranslateY); 
    })
    .onEnd((event) => {
      'worklet';
      const maxTranslateY = SNAP_TOP - insets.bottom;
      const currentY = translateY.value;
      
      const shouldClose = 
        currentY > maxTranslateY + DRAG_CLOSING_THRESHOLD || event.velocityY > 500;

      if (shouldClose) {
        handleClose();
      } else {
        translateY.value = withTiming(maxTranslateY, { duration: 250 });
      }
    });


  const animatedModalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      paddingBottom: insets.bottom, 
      height: SHEET_HEIGHT + insets.bottom,
      top: 0, 
    };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
    };
  });


  if (!isModalRendered) {
    return null;
  }

  // ⭐️ [수정] 뒤로가기 버튼 표시 여부: 히스토리 스택에 항목이 있을 때만 표시
  const canGoBack = pageHistory.length > 0;

  return (
    <View style={styles.fullScreenContainer} pointerEvents={isContextModalVisible ? 'auto' : 'none'}>
      {/* 1. 배경 (클릭 시 닫기) */}
      <TouchableWithoutFeedback onPress={runOnJS(handleClose)}>
        <Animated.View style={[styles.background, animatedBackdropStyle]} />
      </TouchableWithoutFeedback>

      {/* 2. 모달 컨테이너 */}
      <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
        
        {/* 핸들러 영역에 GestureDetector 적용 */}
        <GestureDetector gesture={panGesture}>
            <View style={styles.handleContainer}> 
                <View style={styles.handleBar} />
            </View>
        </GestureDetector>

        {/* GuideModalPage를 ScrollView로 감싸 스크롤 기능 활성화 */}
        <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
        >
            <GuideModalPage 
                content={content} 
                guideId={currentPageId} 
                goToPage={goToPage}
            />
        </ScrollView>
        

        {/* ⭐️ [수정] 뒤로가기 버튼 또는 닫기 버튼 렌더링 */}
        {canGoBack ? (
            <TouchableWithoutFeedback onPress={goBack}>
                <View style={[styles.controlButton, styles.backButton]}>
                    <Ionicons name="chevron-back" size={20} color="#666" />
                    <Text style={styles.controlButtonText}>뒤로</Text>
                </View>
            </TouchableWithoutFeedback>
        ) : (
            <TouchableWithoutFeedback onPress={runOnJS(handleClose)}>
                <View style={[styles.controlButton, styles.closeButton]}>
                    <Text style={styles.controlButtonText}>닫기</Text>
                </View>
            </TouchableWithoutFeedback>
        )}

      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10000, 
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black', 
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    flexGrow: 1, 
  },
  handleContainer: {
      width: '100%',
      paddingVertical: 10, 
      alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    marginTop: 0, 
    marginBottom: 5, 
  },
  scrollView: {
      width: '100%', 
      flex: 1, 
  },
  scrollContent: {
      paddingBottom: 70, 
      paddingHorizontal: 20, 
  },
  controlButton: {
      position: 'absolute',
      bottom: 20 + 10, 
      backgroundColor: '#f0f0f0',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      zIndex: 10, 
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center',
  },
  controlButtonText: {
      color: '#666',
      fontWeight: 'bold',
      marginLeft: 2, 
  },
  closeButton: {
    right: 20, 
  },
  backButton: {
    left: 20, 
  },
  // closeButton: {
  //   backgroundColor: '#000000ff',
  //   paddingVertical: 12,
  //   paddingHorizontal: 30,
  //   borderRadius: 25,8                                                                                                                 
  //   marginTop: 'auto', 
  //   marginBottom: 25,
  // },
  // closeButtonText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});

export default GuideModal;