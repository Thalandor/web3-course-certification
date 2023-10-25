import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/client'

const Home: NextPage = () => {
  const { walletAddress } = useSigningClient()

  const testApi = async () => {
    const apiCall = await fetch('/api/users')
    const result = await apiCall.json()
    console.log('users on the system: :', result)
  }

  return (
    <WalletLoader>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
        <Link href="/nftCollection" passHref>
          <a className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">NFT_Collection &rarr;</h3>
            <p className="mt-4 text-xl">
              Create you NFT class and mint NFTs for it.
            </p>
          </a>
        </Link>
        <button onClick={() => testApi()}>Click here to test api</button>
      </div>
    </WalletLoader>
  )
}

export default Home
