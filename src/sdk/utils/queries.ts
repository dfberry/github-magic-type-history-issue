import {
  getSdk,
  Sdk,
  IOrgReposAgExtended_V3Query,
  IOrgReposAgExtended_V3QueryVariables
} from '../../generated/graphql.sdk'
import { GraphQLClient } from 'graphql-request'

export type GraphQLResult = { __typename: string }
export type ValueOfTypename<T extends GraphQLResult> = T['__typename']

export function isType<
  Result extends GraphQLResult,
  Typename extends ValueOfTypename<Result>
>(
  result: Result,
  typename: Typename
): result is Extract<Result, { __typename: Typename }> {
  return result?.__typename === typename
}

export async function reposExQueryGraphQlSDK(
  gitHubGraphQlUrl: string,
  pat: string,
  variables: IOrgReposAgExtended_V3QueryVariables
): Promise<IOrgReposAgExtended_V3Query> {
  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pat}`
  }

  return await sdk.OrgReposAgExtended_v3(variables, requestHeaders)
}
