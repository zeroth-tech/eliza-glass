import type { Plugin } from "@elizaos/core";
import { createPostAction } from "./actions/createPost";
export * as actions from "./actions";

export const BlogPostPlugin: Plugin = {
    name: "blogpost",
    description: "Test plugin for API blog posting. ",
    actions: [createPostAction],
};


