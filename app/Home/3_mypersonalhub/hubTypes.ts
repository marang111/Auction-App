export type WorkItem = {
    id: number;
    title: string;
    artist: string;
    image: { uri: string } | number;
    status: 'BIDDING' | 'WISHED' | 'NONE'; 
    currentPrice: number; 
    performanceVsEstimate: number;
    totalWatchers: number; 
    lastActivity: string; 
};

export type ActionChip = {
    id: number;
    title: string;
    icon: string;
};

export type NextActionPromptType = {
    needsInsight: boolean;
    type: 'VALUE_UPDATE'; 
    subject: string;
    detail: string;
};

export type RiskExposureItem = { 
    artist: string; 
    percentage: number; 
    color: string; 
};

export type MetricDetail = {
    totalWorks?: number; 
    estimatedValue?: string; 
    upArtists?: number; 
    downArtists?: number; 
    genre?: string; 
    rate?: string; 
    icon: string; 
    label: string; 
};

export type PersonalMetricsType = {
    portfolio: MetricDetail;
    marketTrend: MetricDetail;
    genrePerformance: MetricDetail;
};