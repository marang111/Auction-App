import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Animated as RNAnimated,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { GUIDE_CONTENTS, GuideContent } from '../GuideContentData';

interface GuideButtonAnimationContentProps {
  content: GuideContent;
}

const BUTTON_SIZE = 60; 

const GuideButtonAnimationContent: React.FC<GuideButtonAnimationContentProps> = ({ content }) => {
    const progressAnim = useRef(new Animated.Value(0)).current; 
    
    const buttonLabel = content.buttonText || GUIDE_CONTENTS.default.buttonText;

    // 애니메이션 구동 로직 (0에서 1로 왕복 반복)
    useEffect(() => {
        const loopAnimation = () => {
            Animated.sequence([
                // 0 -> 1 (활성화)
                Animated.timing(progressAnim, {
                    toValue: 1,
                    duration: 1500, // 1.5초 동안 활성화
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
                // 1 -> 0 (비활성화)
                Animated.timing(progressAnim, {
                    toValue: 0,
                    duration: 1500, // 1.5초 동안 비활성화
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
            ]).start((result) => {
                if (result.finished) {
                    loopAnimation(); // 반복
                }
            });
        };
        
        loopAnimation();
        
        return () => progressAnim.stopAnimation();
    }, [progressAnim]);

    const buttonBackgroundColor = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', '#FF6347'], // 배경: white -> 오렌지
        extrapolate: 'clamp',
    });
    
    const buttonTextColor = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#6b514cff', 'white'], // 텍스트: 갈색 -> white
        extrapolate: 'clamp',
    });
    
    // 애니메이션 스타일 (Animated.ViewStyle 사용)
    const buttonAnimatedStyle: RNAnimated.ViewStyle = {
        backgroundColor: buttonBackgroundColor,
    } as RNAnimated.ViewStyle; 
    
    // AnimatedText 컴포넌트 생성
    const AnimatedText = Animated.createAnimatedComponent(Text);

    return (
        <View style={demoStyles.container}>
            <Text style={demoStyles.description}>
                버튼이 가이드가 필요한 영역에 진입하면 활성화 됩니다.
            </Text>
            
            <View style={demoStyles.demoArea}>
                {/* 시뮬레이션 버튼 */}
                <Animated.View
                    style={[demoStyles.buttonContainer, buttonAnimatedStyle]}
                >
                    <AnimatedText style={[demoStyles.text, { color: buttonTextColor }]}>
                        {buttonLabel}
                    </AnimatedText>
                </Animated.View>
            </View>
            
        </View>
    );
};

const demoStyles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',

    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20, 
    },
    demoArea: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
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
    },
    statusText: {
        marginTop: 15,
        fontSize: 13,
        color: '#888',
    }
});

export default GuideButtonAnimationContent;