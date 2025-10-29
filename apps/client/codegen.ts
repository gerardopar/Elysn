import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
        },
        defaultScalarType: "unknown",
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },
  },
};

export default config;
