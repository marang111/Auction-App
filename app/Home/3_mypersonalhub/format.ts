
export const formatCurrency = (value: number) => 
    value.toLocaleString('ko-KR', { maximumFractionDigits: 0 });

export const insertZeroWidthSpace = (text: string): string => 
    text.replace(/(.{20})/g, '$1\u200b');