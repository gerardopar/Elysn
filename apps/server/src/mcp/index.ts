import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const setupMcpServer = async () => {
  const mcpServer = new McpServer({
    name: "elysn-server",
    version: "1.0.0",
  });

  mcpServer.registerTool(
    "add",
    {
      title: "Addition Tool",
      description: "Add two numbers",
      // @ts-ignore
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
      // @ts-ignore
      outputSchema: z.object({
        result: z.number(),
      }),
    },
    async ({ a, b }: { a: number; b: number }) => {
      const output = { result: a + b };

      console.log(output);

      return {
        content: [{ type: "text", text: JSON.stringify(output) }],
        structuredContent: output,
      };
    }
  );

  return mcpServer;
};
