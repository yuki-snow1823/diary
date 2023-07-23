import { gql } from '@apollo/client'

export const CREATE_JOURNAL = gql`
  mutation createJournal($userId: Int!, $title: String!, $content: String!) {
    createJournal(
      input: { userId: $userId, title: $title, content: $content }
    ) {
      journal {
        id
        title
        content
      }
    }
  }
`
