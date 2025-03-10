import { elizaLogger } from "@elizaos/core";

interface InsightsRequest {
    message: string;
}

interface InsightsResponse {
    analysis: string;
    sources: string[];
}

export class InsightsService {
    private static instance: InsightsService | null = null;
    private baseUrl: string;

    private constructor() {
        // Default to localhost for development
        this.baseUrl = process.env.INSIGHTS_API_URL || 'http://157.180.17.60:8000';
    }

    static getInstance(): InsightsService {
        if (!this.instance) {
            this.instance = new InsightsService();
        }
        return this.instance;
    }

    async getInsights(topic: string, maxLoops: number = 1): Promise<InsightsResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/glass-query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: topic
                } as InsightsRequest)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data as InsightsResponse;

        } catch (error) {
            elizaLogger.error('Error fetching insights:', error);
            throw error;
        }
    }
} 