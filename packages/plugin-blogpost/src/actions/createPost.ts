import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type HandlerCallback,
    type State,
    composeContext,
    generateObject,
    ModelClass,
    elizaLogger,
} from "@elizaos/core";

import { Post, Citation, createSamplePost } from "../types";
import { BlogPostService } from "../services/blogPostService";

export const createPostAction: Action = {
    name: "CREATE_BLOG_POST",
    description: "Create a new blog post",
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        return !!_message.content?.text;
    },
    similes: ["CREATE_POST", 
        "CREATE_BLOG_POST",
        "CREATE_BLOG_POST_ACTION",
        "WRITE_BLOG_POST",
        "DEVELOP_BLOG_POST",
        "DRAFT_BLOG_POST",
        "PUBLISH_BLOG_POST",
        "POST_BLOG_POST",
        "BLOG_POST",
        "BLOG_POST_ACTION",
        "BLOG_POST_TEMPLATE",
        "BLOG_POST_TEMPLATE_ACTION",
    ],
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        state: State,
        _options: object,
        callback: HandlerCallback
    ) => {
        try {
            // const context = composeContext({
            //     state,
            //     template: createResourceTemplate,
            // });

            // const resourceDetails = await generateObject({
            //     runtime,
            //     context,
            //     modelClass: ModelClass.SMALL,
            //     schema: CreateResourceSchema,
            // });



            // // persist relevant data if needed to memory/knowledge
            // const memory = {
            //     type: "resource",
            //     content: resourceDetails.object,
            //     timestamp: new Date().toISOString()
            // };

            // await runtime.storeMemory(memory);
            const service = BlogPostService.getInstance();

            const post = service.fetchSample();

            callback(
                {
                    text: `Post has been posted.`,
                },
                []
            );
        } catch (error) {
            elizaLogger.error("Error creating resource:", error);
            callback(
                { text: "Failed to create resource. Please check the logs." },
                []
            );
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Can you write a blog post about the latest developments in AI and skincare?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: `Post has been posted.`,
                    action: "CREATE_BLOG_POST",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Write a blog post about sustainable beauty practices and eco-friendly packaging",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: `Post has been posted.`,
                    action: "CREATE_BLOG_POST",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Create a blog post discussing the benefits of natural ingredients in skincare",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: `Post has been posted.`,
                    action: "CREATE_BLOG_POST",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Write an article about the role of vitamins in skin health",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: `Post has been posted.`,
                    action: "CREATE_BLOG_POST",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Create a blog post about the science behind anti-aging skincare products",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: `Post has been posted.`,
                    action: "CREATE_BLOG_POST",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Write about the impact of diet on skin health",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: `Post has been posted.`,
                    action: "CREATE_BLOG_POST",
                },
            },
        ],
    ],
};


