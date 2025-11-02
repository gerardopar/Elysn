import React from "react";

import { useHelloQuery } from "@graphql/queries/hello";

export const Home: React.FC = () => {
  const { data } = useHelloQuery({
    name: "World",
  });

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gray-900 font">
      <img
        src="https://cdn.worldvectorlogo.com/logos/apollo-graphql-1.svg"
        alt="apollo-gql"
      />
      <h1 className="text-white">{data?.hello}</h1>
    </div>
  );
};

export default Home;
