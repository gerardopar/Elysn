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
      // @ts-expect-error zod types are not compatible with MCP types
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
      // @ts-expect-error zod types are not compatible with MCP types
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

// const res = await fetch("http://localhost:4000/mcp", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json, text/event-stream",
//   },
//   body: JSON.stringify({
//     jsonrpc: "2.0",
//     id: 1,
//     method: "tools/call",
//     params: {
//       name: "add",
//       arguments: { a: 2, b: 3 },
//     },
//   }),
// });
// console.log(await res.json().then((res) => res));
// console.log(await res.json());
