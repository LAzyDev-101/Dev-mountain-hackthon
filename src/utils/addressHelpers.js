import addresses from '../config/constants/contracts'

export const getAddress = (address) => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId]
}

export const getEduProofContractAddress = () => {
  return getAddress(addresses.EduProof)
}