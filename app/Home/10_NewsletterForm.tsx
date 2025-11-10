// NewsletterForm.tsx (React Native TSX)

import React, { useState } from "react";
import { 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Alert 
} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 

// ⭐️ 디자인 가이드 Key Colors 정의 (통일)
const COLORS = {
    DEEP_NAVY: '#1D2A3A',      
    CHARCOAL_GRAY: '#2C3E50',  
    ACCENT_GOLD: '#DAA520',    // 강조 색상
    LIGHT_GRAY: '#6A6A6A',     
    BG_WHITE: '#FFFFFF',
    BORDER: '#E0E0E0',
    ACTIVE_BORDER: '#A0A0A0', 
};

function NewsletterForm(): React.JSX.Element {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [agreed, setAgreed] = useState(false); 
    
    const [emailFocused, setEmailFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);

    const handleSubmit = () => {
        if (!agreed) {
            Alert.alert('구독 실패', '개인정보 수집 및 이용에 동의해야 구독이 가능합니다.');
            return;
        }
        if (!email || !name) {
            Alert.alert('구독 실패', '이메일과 이름을 모두 입력해주세요.');
            return;
        }
        
        // 실제 구독 로직...
        Alert.alert('구독 신청 완료', `[${name}]님, 뉴스레터 구독 신청이 완료되었습니다!`);
        
        setEmail('');
        setName('');
        setAgreed(false);
    };
    
    const toggleCheckbox = () => {
        setAgreed(!agreed);
    };

    return (
        // ⭐️ 컨테이너 스타일 변경: 그림자 제거, border-radius 제거
        <View style={styles.container}>
            <Text style={styles.header}>레이더 뉴스레터</Text>
            <Text style={styles.description}>
                주요 경매 결과, 시장 동향, 그리고 독점 칼럼을 정기적으로 받아보세요.
            </Text>
            
            <View style={styles.form}>
                
                {/* 이름 입력 필드 */}
                <TextInput
                    style={[
                        styles.inputField,
                        // 포커스 시 스타일 변경
                        nameFocused && { borderColor: COLORS.ACTIVE_BORDER, borderWidth: 1 } 
                    ]}
                    placeholder="이름 (필수)"
                    placeholderTextColor={COLORS.LIGHT_GRAY}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                />

                {/* 이메일 입력 필드 */}
                <TextInput
                    style={[
                        styles.inputField,
                        // 포커스 시 스타일 변경
                        emailFocused && { borderColor: COLORS.ACTIVE_BORDER, borderWidth: 1 }
                    ]}
                    placeholder="이메일 주소 (필수)"
                    placeholderTextColor={COLORS.LIGHT_GRAY}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                />
                
                {/* 동의 영역 */}
                <View style={styles.consentArea}>
                    <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxLabel}>
                        <FontAwesome 
                            name={agreed ? "check-square" : "square-o"} 
                            size={18} 
                            color={agreed ? COLORS.ACCENT_GOLD : COLORS.LIGHT_GRAY} 
                            style={styles.checkboxIcon}
                        />
                        <Text style={styles.labelText}>
                            개인정보 수집 및 이용 동의 (필수)
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {/* ⭐️ 구독하기 버튼: 블록 요소로 분리 (consentArea 밖으로) */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>
                        구독하기
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default NewsletterForm;

const styles = StyleSheet.create({
    container: {
        // ⭐️ 그림자 제거, border-radius 제거, 깔끔한 경계선
        marginHorizontal: 16,
        padding: 20,
        backgroundColor: COLORS.BG_WHITE,
        borderWidth: 1, // 얇은 경계선 유지
        borderColor: COLORS.BORDER,
        // borderRadius: 0, (제거)
        // shadowColor: ... (제거)
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.DEEP_NAVY,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: COLORS.LIGHT_GRAY,
        marginBottom: 25,
        lineHeight: 20,
    },
    form: {
        gap: 15, // 항목 간 간격
    },
    inputField: {
        width: '100%', 
        paddingVertical: 14, // 패딩 살짝 줄여서 더 날렵하게
        paddingHorizontal: 15, 
        borderWidth: 1,
        borderColor: COLORS.BORDER, 
        // borderRadius: 0, (제거)
        fontSize: 16,
        color: COLORS.CHARCOAL_GRAY,
        backgroundColor: COLORS.BG_WHITE, // 배경색 흰색으로 깔끔하게
    },
    consentArea: {
        // ⭐️ 블록 버튼 분리로 인해 justify-content: 'flex-start'로 변경하거나,
        // 기존 스타일 (flexDirection: 'row', justify-content: 'space-between', alignItems: 'center') 제거 
        // -> 여기서는 오직 체크박스 레이블만 포함하도록 단순화
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10, // 버튼과의 간격 확보
    },
    checkboxLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1, 
    },
    checkboxIcon: {
        marginRight: 8, 
    },
    labelText: {
        fontSize: 13,
        color: COLORS.CHARCOAL_GRAY, 
    },
    
    // ⭐️ Submit Button: 블록 요소 (전체 너비), border-radius 제거
    submitButton: {
        backgroundColor: "#e4e4e4ff", 
        paddingVertical: 14, // 패딩 증가하여 블록 요소 강조
        alignItems: 'center',
        borderRadius: 20,
    },
    submitButtonText: {
        color: COLORS.DEEP_NAVY, 
        fontSize: 16,
        fontWeight: '700',
    },
});