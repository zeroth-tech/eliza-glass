export class ApiTestService {
    private static instance: ApiTestService | null = null;

    static getInstance(): ApiTestService {
        if (!this.instance) {
            this.instance = new ApiTestService();
        }
        return this.instance;
    }

    async getVibe(): Promise<string> {
        // This will be replaced with actual API calls later
        return "clyde and ank back at it again";
    }
} 