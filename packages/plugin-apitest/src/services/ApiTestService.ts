export class ApiTestService {
    private static instance: ApiTestService | null = null;

    private BASE_URL = "";

    static getInstance(): ApiTestService {
        if (!this.instance) {
            this.instance = new ApiTestService();
        }
        return this.instance;
    }

    async getVibe(): Promise<string> {
        // This will be replaced with actual API calls later

        if (!this.BASE_URL) {
            throw new Error("No URL");
        }

        try {

            const response = await fetch(this.BASE_URL);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Weather API Error:", error.message);
            throw error;
        }
    }
} 