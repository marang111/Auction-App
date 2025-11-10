import React, { FC } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AUCTION_DATA, StatisticCardProps, AuctionCategoryData } from './data/AuctionData';

// -------------------------------------------------------------------------
// 1. 색상 정의
// -------------------------------------------------------------------------
const COLORS = {
  cardBackground: '#FFFFFF',
  textDark: '#2D3748', 
  textMedium: '#4A5568', 
  textLight: '#718096', 
  dividerLight: '#E2E8F0',
  
  primaryBrand: '#3498DB', 
  green: '#27AE60', 
  red: '#E74C3C', 
  grayBackground: '#F2F4F7',
};

// -------------------------------------------------------------------------
// 2. 개별 컴포넌트
// -------------------------------------------------------------------------

// 상단 통계 카드
const StatisticCard: FC<StatisticCardProps> = ({ label, value, iconName, change, changeColor }) => (
  <View style={cardStyles.statisticCard}>
    <View style={cardStyles.statisticHeader}>
      <Text style={cardStyles.statisticLabel}>{label}</Text>
      {iconName && <FontAwesome5 name={iconName as any} size={16} color={COLORS.textLight} />} 
    </View>
    <Text style={cardStyles.statisticValue}>{value}</Text>
    {change && (
      <Text style={[cardStyles.statisticChange, { color: changeColor || COLORS.textMedium }]}>
        {change}
      </Text>
    )}
  </View>
);

// 진행률 바
const ProgressBar: FC<{ progress: number }> = ({ progress }) => (
  <View style={cardStyles.progressBarBackground}>
    <View style={[cardStyles.progressBarFill, { width: `${progress * 100}%` }]} />
  </View>
);

// 카테고리별 낙찰 현황 아이템
const CategoryAuctionItem: FC<AuctionCategoryData> = ({ category, ratioText, percentage, progress }) => (
  <View style={cardStyles.categoryItemContainer}>
    <View style={cardStyles.categoryTextRow}>
      <Text style={cardStyles.categoryName}>{category}</Text>
      <View style={cardStyles.categoryStats}>
        <Text style={cardStyles.categoryRatio}>{ratioText}</Text>
        <Text style={cardStyles.categoryPercentage}>{percentage}</Text>
      </View>
    </View>
    <ProgressBar progress={progress} />
  </View>
);

// -------------------------------------------------------------------------
// 3. 메인 컴포넌트
// -------------------------------------------------------------------------

const AuctionDashboard: FC = () => {
  const {
    statisticCards,
    auctionSuccessRate,
    averageAuctionPrice,
    categoryAuctionStatus,
  } = AUCTION_DATA;

  return (
    <View style={styles.dashboardContainer}>
      {/* 1. 상단 통계 카드 그룹 */}
      <View style={styles.statisticCardsContainer}>
        {statisticCards.map((card, index) => (
          <StatisticCard key={index} {...card} />
        ))}
      </View>

      {/* 2. 낙찰 성공률 섹션 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>낙찰 성공률</Text>
        <Text style={styles.cardDescription}>{auctionSuccessRate.description}</Text>

        <View style={styles.successRateMain}>
          <Text style={styles.successRatePercentage}>{auctionSuccessRate.rate}</Text>
          <View style={styles.successRateTextGroup}>
            <Text style={styles.successRateTotal}>{auctionSuccessRate.totalText}</Text>
            <Text style={styles.successRateLabel}>{auctionSuccessRate.totalLabel}</Text>
          </View>
        </View>
        <ProgressBar progress={auctionSuccessRate.progress} />

        <View style={styles.successRateDetail}>
          <View style={styles.successRateItem}>
            <Text style={styles.successRateItemLabel}>{auctionSuccessRate.completedLabel}</Text>
            <Text style={styles.successRateItemValueGreen}>{auctionSuccessRate.completedCount}</Text>
          </View>
          <View style={styles.successRateItem}>
            <Text style={styles.successRateItemLabel}>{auctionSuccessRate.failedLabel}</Text>
            <Text style={styles.successRateItemValueRed}>{auctionSuccessRate.failedCount}</Text>
          </View>
        </View>
      </View>

      {/* 3. 평균 낙찰가 섹션 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>평균 낙찰가</Text>
        <Text style={styles.cardDescription}>낙찰 건당 평균 금액</Text>

        <View style={styles.averagePriceMain}>
          <Text style={styles.averagePriceValue}>{averageAuctionPrice.averagePrice}</Text>
          <Text style={styles.averagePriceLabel}>{averageAuctionPrice.averageLabel}</Text>
        </View>

        <View style={styles.priceDetailRow}>
          <Text style={styles.priceDetailLabel}>{averageAuctionPrice.minLabel}</Text>
          <Text style={styles.priceDetailValue}>{averageAuctionPrice.minPrice}</Text>
        </View>
        <View style={styles.priceDetailRow}>
          <Text style={styles.priceDetailLabel}>{averageAuctionPrice.maxLabel}</Text>
          <Text style={styles.priceDetailValue}>{averageAuctionPrice.maxPrice}</Text>
        </View>
        <View style={[styles.priceDetailRow, { borderBottomWidth: 0, marginBottom: 0 }]}>
          <Text style={styles.priceDetailLabel}>{averageAuctionPrice.medianLabel}</Text>
          <Text style={styles.priceDetailValue}>{averageAuctionPrice.medianPrice}</Text>
        </View>
      </View>

      {/* 4. 카테고리별 낙찰 현황 섹션 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>카테고리별 낙찰 현황</Text>
        <Text style={styles.cardDescription}>주요 카테고리별 낙찰 비율</Text>

        {categoryAuctionStatus.map((item, index) => (
          <CategoryAuctionItem key={index} {...item} />
        ))}
      </View>
    </View>
  );
};

export default AuctionDashboard;

// -------------------------------------------------------------------------
// 4. 스타일 정의
// -------------------------------------------------------------------------

const styles = StyleSheet.create({
  dashboardContainer: {},
  statisticCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700', 
    color: COLORS.textDark,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: COLORS.textMedium,
    marginBottom: 16,
  },
  successRateMain: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  successRatePercentage: {
    fontSize: 32,
    fontWeight: '700', 
    color: COLORS.primaryBrand,
    marginRight: 8,
  },
  successRateTextGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  successRateTotal: {
    fontSize: 18,
    color: COLORS.textDark,
    marginRight: 4,
  },
  successRateLabel: {
    fontSize: 13,
    color: COLORS.textMedium,
  },
  successRateDetail: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  successRateItem: {
    alignItems: 'center',
  },
  successRateItemLabel: {
    fontSize: 13,
    color: COLORS.textMedium,
    marginBottom: 4,
  },
  successRateItemValueGreen: {
    fontSize: 16,
    fontWeight: '700', 
    color: COLORS.green,
  },
  successRateItemValueRed: {
    fontSize: 16,
    fontWeight: '700', 
    color: COLORS.red,
  },
  averagePriceMain: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  averagePriceValue: {
    fontSize: 24,
    fontWeight: '700', 
    color: COLORS.textDark,
    marginRight: 6,
  },
  averagePriceLabel: {
    fontSize: 14,
    color: COLORS.textMedium,
  },
  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.dividerLight,
  },
  priceDetailLabel: {
    fontSize: 14,
    color: COLORS.textMedium,
  },
  priceDetailValue: {
    fontSize: 14,
    fontWeight: '700', 
    color: COLORS.textDark,
  },
});

const cardStyles = StyleSheet.create({
  statisticCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: '48%', 
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statisticHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statisticLabel: {
    fontSize: 13,
    color: COLORS.textMedium,
  },
  statisticValue: {
    fontSize: 20,
    fontWeight: '700', 
    color: COLORS.textDark,
    marginBottom: 4,
  },
  statisticChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: COLORS.grayBackground,
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primaryBrand,
    borderRadius: 4,
  },
  categoryItemContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.dividerLight,
    paddingTop: 12,
  },
  categoryTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  categoryStats: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  categoryRatio: {
    fontSize: 13,
    color: COLORS.textMedium,
    marginRight: 4,
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '700', 
    color: COLORS.textDark,
  },
});