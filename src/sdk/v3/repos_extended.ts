/* eslint no-console: 0 */ // --> OFF
import {
  InputMaybe,
  IOrgReposAgExtended_V3QueryVariables
} from '../../generated/graphql.sdk'
import { reposExQueryGraphQlSDK } from '../utils/queries'
import { IRepoParameters2 } from '../utils/models'

import { version } from '../../../package.json'
export function status(): string {
  return version
}

export type IRepoExRefactored = {
  id: string
  url: string
  lastPushToDefaultBranch?: {
    name: string
    message: string | null | undefined
    pushedDate?: string | null | undefined
    committedDate: string | null | undefined
    status?: string
  }
}

export async function reposExtended({
  pat,
  gitHubGraphQLUrl,
  orgName
}: IRepoParameters2): Promise<IRepoExRefactored | null> {
  if (!pat) {
    throw new Error('GitHub Personal Access Token is required')
  }
  if (!gitHubGraphQLUrl) {
    throw new Error('GitHub GraphQL URL is required')
  }
  if (!orgName) {
    throw new Error('orgName is required')
  }

  const page_size: InputMaybe<number> = 1 // Max page size for GitHub
  const variables: IOrgReposAgExtended_V3QueryVariables = {
    organization: orgName,
    pageSize: page_size,
    after: null
  }
  const data = await reposExQueryGraphQlSDK(gitHubGraphQLUrl, pat, variables)
  const repo =
    data.organization?.repositories?.edges &&
    data.organization?.repositories?.edges.length > 0
      ? data.organization?.repositories?.edges[0]?.node
      : null

  if (repo === null) return null
  if (JSON.stringify(repo) === JSON.stringify({})) return null

  let repoReturned = null

  if (repo !== null && repo !== undefined) {
    repoReturned = {
      id: repo.id || '',
      url: repo.url || '',
      lastPushToDefaultBranch: null
    }

    // Get last commit
    const lastCommitTarget = repo.lastPushToDefaultBranch?.target

    if (lastCommitTarget !== null && lastCommitTarget !== undefined) {
      const history = lastCommitTarget.history

      // just to see what history is
      console.log(history)
    }
  }

  return repoReturned
}
