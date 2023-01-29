import { GITHUB_GRAPHQL } from '../../sdk/utils/constants'
import { beforeAll, describe, expect, test } from '@jest/globals'
import dotenv from 'dotenv'
import {
  REPOS_EXTENDED_PROCESSED,
  REPOS_EXTENDED
} from '../mockdata/repos.ex.data'
import { IRepoParameters2 } from '../../sdk/utils/models'
import * as reposSDK from '../../sdk/utils/queries'
import { reposExtended, IRepoExRefactored } from '../../sdk/v3/repos_extended'

dotenv.config()

describe('repos extended', () => {
  let fakePat: string

  beforeAll(() => {
    fakePat = '123'
  })
  async function returnMockData(): Promise<any> {
    console.log('mock')
    return Promise.resolve(REPOS_EXTENDED)
  }

  test('Repos extended success', async () => {
    let spy = jest
      .spyOn(reposSDK, 'reposExQueryGraphQlSDK')
      .mockImplementation(returnMockData)

    const repoReturned: IRepoExRefactored = (await reposExtended({
      pat: fakePat,
      gitHubGraphQLUrl: GITHUB_GRAPHQL,
      orgName: 'Azure-Sample'
    })) as IRepoExRefactored

    expect(JSON.stringify(repoReturned)).toEqual(
      JSON.stringify(REPOS_EXTENDED_PROCESSED)
    )

    spy.mockReset()
  })
})
