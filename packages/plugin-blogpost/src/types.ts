import { z } from "zod";

// Base resource schema
export const ResourceSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1),
    type: z.enum(["document", "image", "video"]),
    description: z.string(),
    tags: z.array(z.string()),
});

// Create resource schema
export const CreateResourceSchema = ResourceSchema.omit({ id: true });

// Read resource schema
export const ReadResourceSchema = z.object({
    id: z.string(),
    fields: z.array(z.string()).optional(),
});

// Update resource schema
export const UpdateResourceSchema = z.object({
    id: z.string(),
    updates: z.record(z.string(), z.any()),
});

// Type definitions
export type Resource = z.infer<typeof ResourceSchema>;
export type CreateResourceContent = z.infer<typeof CreateResourceSchema>;
export type ReadResourceContent = z.infer<typeof ReadResourceSchema>;
export type UpdateResourceContent = z.infer<typeof UpdateResourceSchema>;

// Type guards
export const isCreateResourceContent = (
    obj: object
): obj is CreateResourceContent => {
    return CreateResourceSchema.safeParse(obj).success;
};

export const isReadResourceContent = (obj: object): obj is ReadResourceContent => {
    return ReadResourceSchema.safeParse(obj).success;
};

export const isUpdateResourceContent = (
    obj: object
): obj is UpdateResourceContent => {
    return UpdateResourceSchema.safeParse(obj).success;
};

// Plugin configuration type
export interface ExamplePluginConfig {
    apiKey: string;
    apiSecret: string;
    endpoint?: string;
}

export interface Citation {
    id: string;
    text: string;
    url: string;
    type: "research" | "article" | "study";
}
  
export interface Post {
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
    citations: Citation[];
}

export function createSamplePost(): Post {
    return {
        title: "The Impact of Artificial Intelligence on Modern Skincare Formulations",
        content: `Recent advances in artificial intelligence have revolutionized how we approach skincare formulation. 
Machine learning algorithms are now capable of analyzing thousands of ingredient combinations to predict efficacy and potential reactions.
This has led to more personalized and effective skincare solutions that can be tailored to individual skin types and concerns.`,
        excerpt: "Exploring how AI is transforming the skincare industry through advanced formulation analysis and personalization.",
        tags: ["AI", "skincare", "machine learning", "personalization", "cosmetic science"],
        citations: [
            {
                id: "cit_001",
                text: "AI-Driven Approaches to Cosmetic Formulation: A Systematic Review",
                url: "https://example.com/ai-cosmetics-review",
                type: "research"
            },
            {
                id: "cit_002", 
                text: "Machine Learning Applications in Personalized Skincare",
                url: "https://example.com/ml-skincare-study",
                type: "study"
            },
            {
                id: "cit_003",
                text: "The Future of AI in Beauty Industry",
                url: "https://example.com/ai-beauty-article",
                type: "article"
            }
        ]
    };
}
