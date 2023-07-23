import { gql } from '@apollo/client'

export const FIND_JOURNAL = gql`
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
