export const fetchStonesQuery = `
query FetchUserStones($address: String!) {
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
          seasonId
          nft {
            tokenId
            nftContract {
              contract
            }
          }
        }
      }
    }
}
}
  `;
