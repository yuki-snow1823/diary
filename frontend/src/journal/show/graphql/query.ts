import { gql } from '@apollo/client';

export const FIND_JOURNAL = gql`
  query Journal($id: ID!) {
    journal(id: $id) {
      id
      title
      content
    }
  }
`
