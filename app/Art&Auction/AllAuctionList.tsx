import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'; // ⭐️ Text, TouchableOpacity import 추가
import { ScrollView } from 'react-native-gesture-handler'; 
import { AUCTION_DATA } from './allauctionlist/compo/AuctionListData'; 
import { AuctionItemCard } from './allauctionlist/AuctionItemCard'; 
import { COLORS } from '../../styles/COLORS'; 

const AuctionList: FC = () => {

    const handleLoadMore = () => {
        console.log('목록 더보기 버튼이 눌렸습니다. (디자인 확인용)');
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                activeOffsetY={[-30, 30]} 
                failOffsetX={[-10, 10]} 
                directionalLockEnabled={true}
            >
                {AUCTION_DATA.map((item) => (
                    <AuctionItemCard 
                        key={item.id} 
                        item={item} 
                    />
                ))}
                
                {/* ⭐️ 목록 더보기 버튼 추가 */}
                <TouchableOpacity 
                    style={styles.loadMoreButton} 
                    onPress={handleLoadMore}
                    activeOpacity={0.7}
                >
                    <Text style={styles.loadMoreText}>목록 더보기</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

export default AuctionList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: -20,
    },
    scrollContent: {
        // paddingBottom: 20,
    },
    loadMoreButton: {
        paddingVertical: 12,
        marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: COLORS.DIVIDER_LIGHT, 
        backgroundColor: COLORS.SURFACE_CARD,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadMoreText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.TEXT_MEDIUM, 
    },
    list: {
    },
});