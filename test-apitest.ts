import { PluginApitest } from "@elizaos/plugin-apitest";
import { AgentRuntime } from "@elizaos/core";

async function testPlugin() {
    const plugin = new PluginApitest();

    // Create a minimal runtime for testing
    const runtime = new AgentRuntime({
        // Minimal required config
        character: {
            name: "Test Character",
            modelProvider: "openai",
            clients: []
        }
    });

    // Initialize plugin with runtime
    await plugin.initialize(runtime);

    // Test the commands
    const testResult = await plugin.runTest("hello");
    console.log("Test command result:", testResult);

    const executeResult = await plugin.execute();
    console.log("Execute result:", executeResult);
}

testPlugin();