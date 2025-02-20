import type {
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    Action,
} from "@elizaos/core";
import { ApiTestService } from "../services/ApiTestService";

export const getVibe: Action = {
    name: "GET_VIBE",
    similes: ["CHECK_VIBE", "VIBE_CHECK"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description: "Get the current vibe check",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ): Promise<boolean> => {
        const service = ApiTestService.getInstance();
        const vibe = await service.getVibe();

        callback({
            text: vibe,
        });

        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "What's the vibe?" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Let me check the vibe for you",
                    action: "GET_VIBE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Can you do a vibe check?" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I'll check the vibe",
                    action: "GET_VIBE",
                },
            },
        ],
    ] as ActionExample[][],
}; 