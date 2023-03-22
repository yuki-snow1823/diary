import React from "react";
import { useQuery, gql } from "@apollo/client";

const testField = gql`
  query GetTestField {
    testField
  }
`;

export const Sample = () => {
  const { loading, error, data } = useQuery(testField);

  if (loading) return <>'ロード中....'</>;
  if (error) return <>`Error ${error.message}`;</>;

  return (
    <>
      {data.testField}
      <div>ログインフォーム</div>
      <form action="post"></form>
    </>
  );
};
