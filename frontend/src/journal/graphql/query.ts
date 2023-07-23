import { gql } from '@apollo/client'

export const QUERY_TYPE = gql`
  query findJournal($journalId: Int!) {
    findJournal(input: { journalId: $journalId }) {
      journal(journalId: $journalId) {
        id
        title
        content
      }
    }
  }
`
