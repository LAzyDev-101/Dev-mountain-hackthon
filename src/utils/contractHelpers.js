import { ethers } from 'ethers'
import eduProofAbi from '../config/abi/eduProof'
import { simpleRpcProvider } from '../utils/provider'
import { getEduProofContractAddress } from '../utils/addressHelpers'

const getContract = (abi, address, signer) => {
    const signerOrProvider = signer ?? simpleRpcProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}

export const getEduProofContract = (signer) => {
    const address = getEduProofContractAddress()
    return getContract(eduProofAbi, address, signer)
}