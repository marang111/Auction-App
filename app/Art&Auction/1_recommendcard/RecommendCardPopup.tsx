import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TARGET_CARDS_DATA, TargetData } from './RecommendData';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

// Reanimated 버전의 Animated.View 사용을 위한 준비
const ReanimatedView = Animated.createAnimatedComponent(View);

const { height: WINDOW_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = Math.round(WINDOW_HEIGHT * 0.6); // 원본 스타일의 높이 유지

interface TargetCardPopupProps {
  visible: boolean;
  onClose: () => void;
  data?: TargetData;
  onOpenDetail?: (id: number) => void;
}

const TargetCardPopup: FC<TargetCardPopupProps> = ({ visible, onClose, data, onOpenDetail }) => {
  // PanResponder 대신 Reanimated의 SharedValue 사용
  const offsetY = useSharedValue(WINDOW_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const [internalData, setInternalData] = useState<TargetData | null>(data ?? null);

  useEffect(() => {
    setInternalData(data ?? TARGET_CARDS_DATA[0]);
  }, [data]);

  // JS 스레드에서 onClose를 호출하기 위한 worklet 함수
  const handleClose = () => {
    'worklet';
    runOnJS(onClose)();
  };

  // 1. 시트 열기/닫기 효과 (Reanimated 사용)
  useEffect(() => {
    if (visible) {
      // 열릴 때: 부드러운 스프링 애니메이션
      offsetY.value = withSpring(0, { friction: 10, tension: 60 });
      backdropOpacity.value = withTiming(0.5, { duration: 220 });
    } else {
      // 닫힐 때: 타겟 위치를 WINDOW_HEIGHT로 설정 (제스처로 닫는 경우 이 useEffect는 발동 안됨)
      offsetY.value = withTiming(WINDOW_HEIGHT, { duration: 200 });
      backdropOpacity.value = withTiming(0, { duration: 160 });
    }
  }, [visible]);

  // 2. 제스처 정의
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // 아래로 드래그하는 경우에만 offsetY 업데이트 (위로 스크롤 잠금)
      if (e.translationY > 0) {
        offsetY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      // 닫힘 조건: 120px 이상 드래그 또는 빠른 속도 (vy > 1200)
      if (e.translationY > 120 || e.velocityY > 1200) {
        // 팝업 닫힘 애니메이션 (네이티브 스레드에서 실행)
        offsetY.value = withTiming(WINDOW_HEIGHT, { duration: 200 }, () => {
          handleClose();
        });
        backdropOpacity.value = withTiming(0, { duration: 160 });
      } else {
        // 원래 위치(0)로 복귀
        offsetY.value = withSpring(0, { friction: 10, tension: 60 });
        backdropOpacity.value = withTiming(0.5, { duration: 160 });
      }
    });

  // 3. 애니메이션 스타일 정의
  const sheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }],
    };
  });

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
    };
  });

  if (!internalData) return null;

  const handleOpenDetail = () => {
    onOpenDetail?.(internalData.id);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      {/* Modal 내부의 모든 제스처를 처리하기 위해 GestureHandlerRootView로 감쌉니다. */}
      <GestureHandlerRootView style={styles.modalRootView}>
        
        {/* 배경 */}
        <ReanimatedView style={[styles.backdrop, backdropAnimatedStyle]} />

        {/* 제스처 디텍터를 시트 전체에 적용 */}
        <GestureDetector gesture={panGesture}>
          <ReanimatedView
            style={[
              styles.sheetContainer,
              sheetAnimatedStyle,
            ]}
          >
            
            <View style={styles.handleBarContainer}>
              <View style={styles.handleBar} />
            </View>

            {/* 원본 콘텐츠 영역 복원 */}
            <View style={styles.contentArea}> 

              <View style={styles.contentRow}>
                <View style={styles.avatarWrap}>
                  {internalData.companyLogoText ? (
                    <View style={styles.avatarCircle}>
                      <Text style={styles.avatarText}>{internalData.companyLogoText}</Text>
                    </View>
                  ) : (
                    <Image source={{ uri: internalData.thumbnail || undefined }} style={styles.avatarImage} />
                  )}
                </View>

                <View style={styles.headerTextWrap}>
                  <Text style={styles.artistName}>{internalData.title}</Text>
                  <Text style={styles.genreText}>{internalData.tags?.[0] ?? ''}</Text>
                  <Text numberOfLines={2} style={styles.oneLiner}>{internalData.payRange ?? ''}</Text>
                </View>
              </View>

              <View style={styles.tagsWrap}>
                {(internalData.tags ?? []).slice(0, 4).map((t, i) => (
                  <View key={i} style={styles.pill}>
                    <Text style={styles.pillText}>{t}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.galleryWrap}>
                {/* FlatList를 복원했지만, 제스처는 상위 GestureDetector가 가로챕니다. */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={internalData.examples ?? []}
                  keyExtractor={(it, idx) => `${internalData.id}-ex-${idx}`}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => handleOpenDetail()} style={styles.thumbPress}>
                      <Image source={{ uri: item }} style={styles.thumb} />
                    </Pressable>
                  )}
                />
              </View>
              
            </View>
            {/* Content Area 끝 */}

            <View style={styles.ctaRow}>
              <TouchableOpacity style={styles.primaryBtn} onPress={handleOpenDetail}>
                <Text style={styles.primaryBtnText}>작품 보러가기</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} onPress={onClose}>
                <Text style={styles.secondaryBtnText}>다음에 보기</Text>
              </TouchableOpacity>
            </View>
          </ReanimatedView>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default TargetCardPopup;

// -------------------------------------------------------------------------
// Styles (원본 스타일 유지 및 Modal RootView 스타일 추가)
// -------------------------------------------------------------------------

const styles = StyleSheet.create({
  modalRootView: {
    flex: 1, // Modal 콘텐츠가 전체 영역을 차지하도록 설정
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SHEET_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 18, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 20,
  },
  handleBarContainer: {
    alignItems: 'center',
    paddingTop: 18, 
    paddingBottom: 10,
  },
  handleBar: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  contentArea: {
    marginBottom: 16, 
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    marginRight: 12,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: '700',
    color: '#2D3748',
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  headerTextWrap: {
    flex: 1,
  },
  artistName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  genreText: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 3,
  },
  oneLiner: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 6,
  },
  tagsWrap: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EDF2F7',
    marginRight: 8,
    marginBottom: 8,
  },
  pillText: {
    fontSize: 12,
    color: '#2D3748',
    fontWeight: '600',
  },
  galleryWrap: {
    marginTop: 12,
    height: 140,
  },
  thumbPress: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumb: {
    width: 120,
    height: 140,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#F8FAFC',
  },
  ctaRow: {
    paddingVertical: 10,
    backgroundColor: '#fff', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#4299E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#374151',
    fontWeight: '600',
  },
});