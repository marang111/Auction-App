// ModalContent.tsx
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewProps } from 'react-native';

interface ModalContentProps {
  content: { title: string; description: string };
  handleClose: () => void;
  // PanResponder 핸들러를 외부(GuideModal)에서 받아서 핸들러 영역에 적용
  panHandlers: ViewProps['onStartShouldSetResponderCapture'];
}

const ModalContent: React.FC<ModalContentProps> = ({ content, handleClose, panHandlers }) => {
  return (
    <>
      {/* 핸들러 영역 */}
      <View style={styles.handleContainer} {...panHandlers}> 
          <View style={styles.handleBar} />
      </View>

      {/* 모달 콘텐츠 영역 */}
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.description}>{content.description}</Text>

      <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
          </View>
      </TouchableWithoutFeedback>
    </>
  );
};

// UI 관련 스타일 정의
const styles = StyleSheet.create({
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: '#FF6347',
    margin: 'auto',
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalContent;
//정상 