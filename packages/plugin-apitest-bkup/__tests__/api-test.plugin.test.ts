import { describe, it, expect } from "vitest";
import { PluginApitest } from "../src/index";

describe("PluginApitest", () => {
    it("should return the expected test message", async () => {
        const plugin = new PluginApitest();
        const result = await plugin.execute();
        expect(result).toBe("clyde and ank back at it again");
    });
}); 