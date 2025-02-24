import {
    Service,
    ServiceType,
    type IAgentRuntime,
    Memory,
    State,
    elizaLogger,
    stringToUuid,
} from "@elizaos/core";

import { Citation, Post } from "../types";

// Add SAMPLE to ServiceType enum in types.ts
declare module "@elizaos/core" {
    export enum ServiceType {
        BLOG_POST = "blog_post",
    }
}

// The SampleService is a simple service that logs "Hello world" every 15 minutes.
export class BlogPostService  {
    private static instance: BlogPostService | null = null;
    private baseUrl: string;
    private static activeTaskCount = 0;

    private constructor() {
        // Default to localhost for development
        this.baseUrl = process.env.INSIGHTS_API_URL || 'https://skin-science-insights-zerothtech.replit.app';
    }



    static getInstance(): BlogPostService {
        // Verify if the service is already initialized
        if (!this.instance) {
           this.instance = new BlogPostService();
        }
        return this.instance
    }



        // Start the periodic task
    //     this.startPeriodicTask();
    //     BlogPostService.isInitialized = true;
    //     elizaLogger.info("BlogPostService initialized and started periodic task");
    // }



    // private startPeriodicTask(): void {
    //     // Verify if a task is already active
    //     if (BlogPostService.activeTaskCount > 0) {
    //         elizaLogger.warn(
    //             "BlogPostService: Periodic task already running, skipping"
    //         );
    //         return;
    //     }

    //     // Clear any existing interval
    //     if (this.intervalId) {
    //         clearInterval(this.intervalId);
    //     }

    //     BlogPostService.activeTaskCount++;
    //     elizaLogger.info(
    //         `BlogPostService: Starting periodic task (active tasks: ${BlogPostService.activeTaskCount})`
    //     );

    //     // Initial call immediately
    //     this.fetchSample();

    //     // Set up periodic calls
    //     this.intervalId = setInterval(() => {
    //         this.fetchSample();
    //     }, this.DEFAULT_INTERVAL);
    // }

    async fetchSample(): Promise<Post> {


        try {
            // Example of using the sampleProvider
            // Create dummy memory and state objects for the provider
            // const dummyMemory: Memory = {
            //     id: stringToUuid("blog-post-service-trigger"),
            //     userId: this.runtime.agentId,
            //     agentId: this.runtime.agentId,
            //     roomId: this.runtime.agentId,
            //     content: { text: "Periodic blog-post fetch" },
            //     createdAt: Date.now(),
            // };

            // const dummyState: State = {
            //     userId: this.runtime.agentId,
            //     bio: "",
            //     lore: "",
            //     messageDirections: "",
            //     postDirections: "",
            //     roomId: this.runtime.agentId,
            //     actors: "",
            //     recentMessages: "",
            //     recentMessagesData: [],
            // };
            // await sampleProvider.get(this.runtime, dummyMemory, dummyState);

            // First login to get token
            const token = await this.login("admin", "admin123456");

            // Create a post
            const newPost: Post = {
                title: "My First Post",
                content: "# Hello Skincare Enthusiasts\nThis is my first post content.",
                excerpt: "A brief introduction",
                tags: ["hello", "first-post"],
                citations: [{
                    id: "1",
                    text: "Example citation",
                    url: "https://google.com",
                    type: "article"
                }]
            };

            const result = await this.createPost(token, newPost);
            console.log("Post created:", result);
            return newPost;


            elizaLogger.info(
                "BlogPostService: Successfully created post"
            );
        } catch (error) {
            elizaLogger.error("BlogPostService: Error creating post:", error);
        }


    }

    // Method to stop the service
    // stop(): void {
    //     if (this.intervalId) {
    //         clearInterval(this.intervalId);
    //         this.intervalId = null;
    //         BlogPostService.activeTaskCount--;
    //         elizaLogger.info(
    //             `SampleService stopped (active tasks: ${BlogPostService.activeTaskCount})`
    //         );
    //     }
    //     BlogPostService.isInitialized = false;
    // }

    // Method to manually trigger a sample fetch (for testing)
    async forceFetch(): Promise<void> {
        await this.fetchSample();
    }

    async login(username: string, password: string): Promise<string> {
        const response = await fetch("https://skin-science-insights-zerothtech.replit.app/api/admin/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        return data.token;
    }

    async createPost(token: string, post: Post): Promise<any> {
        const response = await fetch("https://skin-science-insights-zerothtech.replit.app/api/admin/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
            body: JSON.stringify(post),
        });

        if (!response.ok) {
        throw new Error("Failed to create post");
        }

        return response.json();
    }
}

export default BlogPostService;;


  

  
//   // Example usage:
//   async function example() {
//     try {
//       // First login to get token
//       const token = await login("admin", "admin123456");
  
//       // Create a post
//       const newPost: Post = {
//         title: "My First Post",
//         content: "# Hello World\nThis is my first post content.",
//         excerpt: "A brief introduction",
//         tags: ["hello", "first-post"],
//         citations: [{
//           id: "1",
//           text: "Example citation",
//           url: "https://example.com",
//           type: "article"
//         }]
//       };
  
//       const result = await createPost(token, newPost);
//       console.log("Post created:", result);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }