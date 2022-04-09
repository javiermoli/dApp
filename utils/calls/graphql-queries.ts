import { gql } from "@apollo/client";

export const MINTS = gql`
  query getMints($address: String) {
    mintEntities(where: { address: $address }) {
      id
      amount
      tokens
    }
  }
`;

export const REDEEM = gql`
  query getRedeems($address: String) {
    redeemEntities(where: { address: $address }) {
      id
      amount
      tokens
    }
  }
`;

export const APPROVAL = gql`
  query getApprovals($address: String) {
    approvalEntities(where: { address: $address }) {
      id
      amount
    }
  }
`;

export const BORROW = gql`
  query getBorrows($address: String) {
    borrowEntities(where: { address: $address }) {
      id
      amount
    }
  }
`;
