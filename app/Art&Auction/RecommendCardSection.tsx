import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RecommendCard from './1_recommendcard/RecommendCard';
import RecommendCardPopup from './1_recommendcard/RecommendCardPopup';
import { COLORS, TARGET_CARDS_DATA, TargetData } from './1_recommendcard/RecommendData';

interface TargetCardSectionProps {
    onViewAllTargets: () => void;
};

const TargetCardSection: FC<TargetCardSectionProps> = ({ onViewAllTargets }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState<TargetData | null>(null);

    const handleCardClick = (card: TargetData) => {
        setSelectedCard(card);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedCard(null);
    };

    // 첫 번째 카드만 보여줌
    const topCard = TARGET_CARDS_DATA[0];

    return (
        <View style={styles.container}>
            {/* 섹션 헤더 */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>추천하는 작품</Text>
                <TouchableOpacity onPress={onViewAllTargets}>
                    <Text style={styles.viewAllText}>전체보기</Text>
                </TouchableOpacity>
            </View>

            {/* 카드 1개만 표시 */}
            <View style={styles.cardWrapper}>
                <RecommendCard
                    companyName={topCard.companyName}
                    companyLogoText={topCard.companyLogoText}
                    title={topCard.title}
                    payRange={topCard.payRange}
                    tags={topCard.tags}
                    postedDaysAgo={topCard.postedDaysAgo}
                    colorClass={topCard.colorClass}
                    onClick={() => handleCardClick(topCard)}
                    imageSource={topCard.imageSource}
                />
            </View>

            {/* 팝업 */}
            <RecommendCardPopup
                visible={popupVisible}
                onClose={handleClosePopup}
                data={selectedCard ?? undefined}
                onOpenDetail={(id) => console.log("Navigate to detail of card", id)}
            />
        </View>
    );
};

export default TargetCardSection;

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        marginBottom: 20,
    },
    cardWrapper: {
        paddingVertical: 18,
        paddingHorizontal: 15,
        borderRadius: 16,
        backgroundColor: COLORS.CARD_BG,
        borderWidth: 1,
        borderColor: COLORS.DIVIDER_LIGHT,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.PRIMARY_BRAND,
    },
    
});
