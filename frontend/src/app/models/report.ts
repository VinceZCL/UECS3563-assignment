export interface DailyReport {
    id: number;
    userId: number;
    yesterday: string;
    today: string;
    blockers: string;
    submitted_at: Date;
}

export interface EnrichedReport extends DailyReport {
    username: string;
}