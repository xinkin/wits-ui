export const fetchStonesQuery = `
query FetchUserStones($address: String!) {
globalStates {
    items {
      id
      currentSeasonId
    }
  }
users(where: {address: $address}) {
    items {
      ownedNfts {
        items {
          nftTokenId
          nftContractAddress
          id
        }
        totalCount
      }
       stakes(where: {isStaked: true}) {
        items {
          id
          contractStakeId
          seasonId
          startTime
          nft {
            tokenId
            id
            nftContract {
              contract
            }
          }
        }
        totalCount
      }
    }
  }
}
  `;
