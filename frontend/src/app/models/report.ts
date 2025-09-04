export interface DailyReport {
    id: number;
    userId: number;
    yesterday: string;
    today: string;
    blockers: string;
    submitted_at: Date;
}
