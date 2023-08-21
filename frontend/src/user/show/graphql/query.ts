import { gql } from '@apollo/client'

export const USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`
