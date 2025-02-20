import type { Plugin } from "@elizaos/core";
import { getVibe } from "./actions/getVibe";
export * as actions from "./actions";

/**
 * A simple plugin-apitest.
 *
 * This plugin returns a test message when executed.
 */
export const apiTestPlugin: Plugin = {
    name: "apitest",
    description: "Test plugin for API integration",
    actions: [getVibe],
};

// Also export the class for direct usage
export class PluginApitest implements Plugin {
    name = "apitest";
    description = "Test plugin for API integration";
    actions = [getVibe];
} 