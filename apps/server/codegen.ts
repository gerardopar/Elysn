import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/schema/**/*.graphql",
  generates: {
    "src/graphql/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        namingConvention: { enumValues: "keep" },
        useTypeImports: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
