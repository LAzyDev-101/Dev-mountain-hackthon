import { nodes } from './getRpcUrl'


export const setupNetwork = async () => {
    const provider = window.ethereum
    if (provider) {
        const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
        console.log(`0x${chainId.toString(16)}`)
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`,
                        chainName: 'Local Network',
                        nativeCurrency: {
                            name: 'ETH',
                            symbol: 'eth',
                            decimals: 18,
                        },
                        rpcUrls: nodes,
                        blockExplorerUrls: ['process.env.REACT_APP_BLOCK_EXPLORER_1'],
                    },
                ],
            })
            return true
        } catch (error) {
            console.log('Failed to setup the network in Metamask: ', error)
            return false
        }
    } else {
        console.log("Can't setup the Network on metamask because window.ethereum is undefined")
        return false
    }
}