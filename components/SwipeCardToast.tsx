import Ionicons from "@expo/vector-icons/Ionicons";
import React, { createContext, FC, useContext, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

// 1. 토스트 타입 정의
export interface ToastItem {
    id: number;
    message: string;
}

// 2. Context 생성 (어디서든 호출 가능하게 함)
interface ToastContextType {
    addToast: (message: string) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 3. Hook 생성 (사용할 때 이것만 부르면 됨)
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};

// 4. Provider 컴포넌트 (앱의 최상위를 감싸는 역할)
export const ToastProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = (message: string) => {
        setToasts((prev) => [...prev, { id: Date.now(), message }]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* 여기에 배치하면 앱의 가장 위에(z-index), 가장 바닥에(position) 뜹니다 */}
            <View style={styles.wrapper} pointerEvents="box-none">
                {toasts.map((toast, index) => (
                    <SingleToast
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        onClose={removeToast}
                        index={index}
                    />
                ))}
            </View>
        </ToastContext.Provider>
    );
};

// 5. 개별 토스트 디자인 
const SingleToast: FC<{
    id: number;
    message: string;
    onClose: (id: number) => void;
    index: number;
}> = ({ id, message, onClose, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;
    const scale = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
                Animated.spring(translateY, { toValue: 0, tension: 60, friction: 7, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, useNativeDriver: true })
            ]),
            Animated.delay(2000),
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 20, duration: 250, useNativeDriver: true }),
            ]),
        ]).start(() => onClose(id));
    }, []);

    return (
        <Animated.View
            style={[
                styles.toast,
                { 
                    opacity: fadeAnim, 
                    transform: [{ translateY }, { scale }],
                    zIndex: index + 1 
                },
            ]}
        >
            <Ionicons name="checkmark-circle" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 9999, // 앱 최상위 보장
        paddingBottom: 40, // 아이폰 하단바 여백
        paddingHorizontal: 20,
    },
    toast: {
        position: 'absolute',
        bottom: 40,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(33, 33, 33, 0.95)",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        minWidth: SCREEN_WIDTH * 0.85,
    },
    text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 4,
        flexShrink: 1,
    },
});