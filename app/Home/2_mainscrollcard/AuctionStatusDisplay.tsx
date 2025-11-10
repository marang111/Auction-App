import React, { memo, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type LivebidResponse = { bidders: number; highestBid: number; currency?: string; };
export type AuctionItem = {
    id: number;
    time: string;
    liveStatus?: LivebidResponse; 
    preLiveStatus?: { wishCount: number; regCount: number; }; 
};

// ⭐️ Props 타입 정의 (기존과 동일)
type Props = {
    auction: AuctionItem;
    updateLiveStatus: (id: number, newStatus: LivebidResponse) => void;
};


// ⭐️ 디자인 가이드 Key Colors (단색 배경 테마에 맞게 조정)
const COLORS = {
    // ⭐️ 배경: 단색 흰색
    BG_WHITE:          '#FFFFFF',
    // ⭐️ 쉐도우 및 경계선
    DEFAULT_BORDER:    '#E0E0E0',       // 기본 경계선
    DEFAULT_SHADOW:    'rgba(0, 0, 0, 0.1)', // 기본 그림자
    LIVE_GLOW_SHADOW:  'rgba(255, 197, 211, 0.8)', // ⭐️ 라이브 강조 그림자 (더 진하게)
    // 텍스트/강조 색상 (가독성을 위해 짙은 색 사용)
    DEEP_NAVY:         '#1D2A3A',      // 메인 텍스트
    CHARCOAL_GRAY:     '#4A4A4A',      // 보조 텍스트
    ACCENT_BLUE:       'rgba(30, 30, 30, 1)',      // LIVE 강조
    ACCENT_GOLD:       '#DAA520',      // PRE-SALE 강조
    LIVE_RED:          '#E74C3C',       // 경고
    LIGHT_GRAY:        '#95A5A6',       // 가장 은은한 텍스트
};

// 통화 형식 포맷터 (기존과 동일)
const formatCurrency = (value: number) => {
    try {
        return value.toLocaleString('ko-KR', { maximumFractionDigits: 0 }); 
    } catch {
        return `${value.toLocaleString()}`;
    }
};

const AuctionStatusDisplay = memo(function AuctionStatusDisplay({ auction, updateLiveStatus }: Props) {
    const isLive = auction.time === 'LIVE';

    const [liveStatus, setLiveStatus] = useState(auction.liveStatus);
    const [updatedAt, setUpdatedAt] = useState(new Date().toLocaleTimeString('ko-KR'));
    
    // 상태 업데이트 로직 (생략)
    useEffect(() => {
        if (auction.liveStatus) {
            setLiveStatus(auction.liveStatus);
        } else {
            setLiveStatus(undefined); 
        }
    }, [auction.liveStatus]); 

    // LIVE 경매 데이터 모킹/업데이트 로직 (생략)
    useEffect(() => {
        if (isLive) {
            const interval = setInterval(() => {
                const currentHighestBid = liveStatus?.highestBid ?? auction.liveStatus?.highestBid ?? 100000000;
                const currentBidders = liveStatus?.bidders ?? auction.liveStatus?.bidders ?? 10;
                
                const newHighestBid = currentHighestBid + Math.floor(Math.random() * 5 + 1) * 500000;
                const newBidders = currentBidders + Math.floor(Math.random() * 3 + 1);
                
                const newStatus = { highestBid: newHighestBid, bidders: newBidders, currency: '원' };

                updateLiveStatus(auction.id, newStatus); 
                
                setUpdatedAt(new Date().toLocaleTimeString('ko-KR'));
            }, 10000); 

            return () => clearInterval(interval);
        }
    }, [isLive, auction.id, liveStatus, updateLiveStatus, auction.liveStatus]); 


    return (
        // ⭐️ 1. 전체 컨테이너 (LIVE 상태에 따라 동적 쉐도우 적용)
        <View 
            style={[
                statusStyles.dataAreaContainer, 
                isLive ? statusStyles.liveGlowEffect : statusStyles.defaultShadowEffect
            ]}
        >
            {/* ⭐️ 2. 일반 View에 단색 배경 및 패딩 적용 */}
            <View style={statusStyles.plainBackground}>
                {isLive ? (
                    // ⭐️ LIVE 경매 렌더링
                    <>
                        <Text style={statusStyles.labelLive}>현재 최고 입찰가</Text>
                        <Text style={statusStyles.highestBid}>
                            {formatCurrency(liveStatus?.highestBid ?? auction.liveStatus?.highestBid ?? 0)} 
                            <Text style={statusStyles.currency}> 원</Text>
                        </Text>

                        <View style={statusStyles.divider} />

                        {/* 상세 지표 1: 현재 입찰자 */}
                        <View style={statusStyles.detailRow}>
                            <View style={statusStyles.detailItem}>
                                <Ionicons name="people-outline" size={18} color={COLORS.ACCENT_GOLD} /> 
                                <Text style={statusStyles.detailLabel}>현재 입찰자</Text>
                            </View>
                            <Text style={statusStyles.detailValueLive}>
                                {liveStatus?.bidders ?? auction.liveStatus?.bidders ?? 0}명
                            </Text>
                        </View>

                        {/* 상세 지표 2: 최근 업데이트 시간 */}
                        <View style={statusStyles.detailRow}>
                            <View style={statusStyles.detailItem}>
                                <Ionicons name="time-outline" size={18} color={COLORS.ACCENT_GOLD} /> 
                                <Text style={statusStyles.detailLabel}>최근 업데이트 시각</Text>
                            </View>
                            <Text style={statusStyles.updatedText}>
                                {updatedAt}
                            </Text>
                        </View>
                    </>
                ) : (
                    // ⭐️ D-Day / Online 경매 렌더링
                    <>
                        <Text style={statusStyles.label}>총 관심 지표</Text>
                        <Text style={statusStyles.preSaleMainValue}>
                            {formatCurrency((auction.preLiveStatus?.wishCount ?? 0) + (auction.preLiveStatus?.regCount ?? 0))} 
                            <Text style={statusStyles.preSaleUnit}> 회</Text>
                        </Text>

                        <View style={statusStyles.divider} />

                        {/* 상세 지표 1: 프리뷰 신청 */}
                        <View style={statusStyles.detailRow}>
                            <View style={statusStyles.detailItem}>
                                <Ionicons name="bookmark-outline" size={18} color={COLORS.ACCENT_GOLD} />
                                <Text style={statusStyles.detailLabel}>프리뷰 신청</Text>
                            </View>
                            <Text style={statusStyles.detailValuePre}>
                                {auction.preLiveStatus?.regCount ?? 0}명
                            </Text>
                        </View>

                        {/* 상세 지표 2: 찜 등록 수 */}
                        <View style={statusStyles.detailRow}>
                            <View style={statusStyles.detailItem}>
                                <Ionicons name="star-outline" size={18} color={COLORS.ACCENT_GOLD} />
                                <Text style={statusStyles.detailLabel}>찜 등록 수</Text>
                            </View>
                            <Text style={statusStyles.detailValuePre}>
                                {auction.preLiveStatus?.wishCount ?? 0}회
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
});

export default AuctionStatusDisplay;

const statusStyles = StyleSheet.create({
    // ⭐️ 1. 전체 컨테이너 기본 스타일 (쉐도우 적용 영역)
    dataAreaContainer: {
        marginHorizontal: 30,
        marginBottom: 20,
        borderRadius: 10, 
        overflow: 'visible', // 쉐도우가 잘 보이도록 overflow를 visible로 설정
        backgroundColor: COLORS.BG_WHITE, 
        // 쉐도우를 잘 보이게 하기 위해 경계선은 얇게 설정
        borderWidth: 1,
        borderColor: COLORS.DEFAULT_BORDER,
    },
    // ⭐️ 2. LIVE 경매일 때 적용되는 발광 효과
    liveGlowEffect: {
        // shadowColor: COLORS.LIVE_GLOW_SHADOW, // ⭐️ 라이브 강조 색상
        // shadowOffset: { width: 0, height: 0 }, 
        // shadowOpacity: 1, // 불투명도 최대
        // shadowRadius: 6, // ⭐️ 그림자 반경을 키워 발광 효과
        // elevation: 6, // Android용 그림자

        shadowColor: COLORS.DEFAULT_SHADOW,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,

        overflow: 'visible', // 쉐도우가 잘 보이도록 overflow를 visible로 설정
        backgroundColor: COLORS.BG_WHITE, 
        borderColor: COLORS.LIVE_RED, // 라이브 테두리 강조
        borderWidth: 1, 
    },
    // ⭐️ 3. 기본 상태일 때 적용되는 은은한 그림자
    defaultShadowEffect: {
        shadowColor: COLORS.DEFAULT_SHADOW,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    
    // ⭐️ 4. View에 적용할 배경 및 패딩 (높이 유지)
    plainBackground: {
        backgroundColor: COLORS.BG_WHITE, // 단색 배경
        padding: 18, // ⭐️ 높이 유지
        borderRadius: 10,
    },
    labelLive:{
        fontSize: 14, 
        color: COLORS.LIVE_RED, 
        fontWeight: '800',
        marginBottom: 8, 
    },

    // 공통 라벨
    label: {
        fontSize: 14, 
        color: COLORS.LIGHT_GRAY, 
        fontWeight: '500',
        marginBottom: 8, 
    },
    
    // LIVE
    highestBid: { 
        fontSize: 26, 
        fontWeight: '900',
        color: COLORS.ACCENT_BLUE, 
        letterSpacing: -0.5,
    },
    currency: { 
        fontSize: 18, 
        fontWeight: '700',
        color: COLORS.ACCENT_BLUE,
    },
    
    // PRE-SALE
    preSaleMainValue: { 
        fontSize: 26,
        fontWeight: '900',
        color: COLORS.DEEP_NAVY, 
        letterSpacing: -0.5,
    },
    preSaleUnit: { 
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.DEEP_NAVY,
    },
    
    // 공통
    divider: {
        height: 1,
        backgroundColor: COLORS.DEFAULT_BORDER, 
        marginVertical: 12, 
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8, 
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailLabel: {
        marginLeft: 10, 
        fontSize: 15, 
        color: COLORS.CHARCOAL_GRAY, 
        fontWeight: '500',
    },
    // 상세 값 (LIVE / PRE-SALE 별로 색상 분리하여 기능 강조)
    detailValueLive: {
        fontSize: 16, 
        fontWeight: '700',
        color: COLORS.LIVE_RED, 
    },
    detailValuePre: {
        fontSize: 16, 
        fontWeight: '700',
        color: COLORS.CHARCOAL_GRAY, 
    },
    updatedText: {
        fontSize: 13, 
        color: COLORS.LIGHT_GRAY,
        fontWeight: 500,
    },
});