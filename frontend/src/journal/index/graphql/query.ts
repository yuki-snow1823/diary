import { gql } from "@apollo/client";

export const GET_JOURNALS = gql`
  query journals {
    journals {
      id
      title
      content
    }
  }
`