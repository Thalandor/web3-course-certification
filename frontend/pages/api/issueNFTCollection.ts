// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NFT } from 'coreum-js'
import { useSigningClient } from 'contexts/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { walletAddress, signingClient } = useSigningClient()
  const issuer = walletAddress

  const newNFTCollection = NFT.IssueClass({
    issuer: issuer,
    //Unique for each user collection
    symbol: 'NEW2',
    name: 'My testing collectiion',
    description: 'a new collection of NFTs',
    uri: 'http://test.com/',
    uriHash: 'somehash',
    royaltyRate: '0',
    // burning = 0, freezing = 1,  whitelisting = 2,disable_sending = 3
    features: [2, 3],
  })

  const whitelistedNFT = NFT.AddToWhitelist({

    classId: "",
    id: "NFT TO WHITELIST",
    sender: issuer,
    account : "testcore1wudvzlcj07q5ln3ngjfhxz2c2x6d0h8llragp8",

});

  console.log(newNFTCollection)

  const newCollection = await signingClient?.signAndBroadcast(
    issuer,
    [whitelistedNFT],
    'auto'
  )

  res.status(200).json({ name: newCollection })
}
