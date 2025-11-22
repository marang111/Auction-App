export interface AuctionItem {
    id: number;
    title: string;
    artist: string;
    auctionHouse: string;
    location: string;
    pieces: number;
    totalEstimate: string;
    timeLeft: string;
}

export const AUCTION_DATA: AuctionItem[] = [
    {
        id: 1, 
        title: '이건희 자선행사',
        artist: '레오나르도 다빈치, 김환기 외',
        auctionHouse: '크리스티',
        location: 'Geneva',
        pieces: 40,
        totalEstimate: '₩ 1,800억',
        timeLeft: 'CLOSED'
    },
    {
        id: 2, 
        title: '스트리트 아트: 뱅크시 스페셜',
        artist: '뱅크시',
        auctionHouse: '소더비',
        location: 'Online',
        pieces: 25,
        totalEstimate: '₩ 500억',
        timeLeft: 'CLOSED'
    },
    {
        id: 3, 
        title: '20세기 & 동시대 미술: 이브닝',
        artist: '피카소, 뱅크시',
        auctionHouse: '크리스티',
        location: 'New York',
        pieces: 55,
        totalEstimate: '₩ 1,500억',
        timeLeft: 'LIVE'
    },
    {
        id: 4, 
        title: '인상파 & 모던 아트',
        artist: '모네, 르누아르',
        auctionHouse: '소더비',
        location: 'London',
        pieces: 72,
        totalEstimate: '₩ 890억',
        timeLeft: 'D-3'
    },
    {
        id: 5, 
        title: 'NFT Special: The Future',
        artist: 'Beeple, Pak',
        auctionHouse: '필립스',
        location: 'Online',
        pieces: 30,
        totalEstimate: '₩ 450억',
        timeLeft: 'D-10'
    },
    {
        id: 6, 
        title: '한국 근현대 회화 컬렉션',
        artist: '이중섭, 박수근',
        auctionHouse: '서울옥션',
        location: 'Seoul',
        pieces: 120,
        totalEstimate: '₩ 320억',
        timeLeft: 'D-12'
    },
    {
        id: 7, 
        title: '마스터피스 프라이빗 세일',
        artist: '요하네스 베르메르',
        auctionHouse: '케이옥션',
        location: 'Online',
        pieces: 15,
        totalEstimate: '₩ 2,000억',
        timeLeft: 'D-20'
    },
    {
        id: 8, 
        title: '현대 조각 특별전',
        artist: '로댕, 무어',
        auctionHouse: '크리스티',
        location: 'Paris',
        pieces: 40,
        totalEstimate: '₩ 670억',
        timeLeft: 'D-27'
    },
    {
        id: 9, 
        title: 'Post-War: 2025 Summer Sale',
        artist: '게르하르트 리히터',
        auctionHouse: '소더비',
        location: 'New York',
        pieces: 65,
        totalEstimate: '₩ 1,100억',
        timeLeft: 'D-31'
    },
];