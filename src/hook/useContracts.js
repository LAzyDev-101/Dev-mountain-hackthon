import { useMemo } from 'react'
import useActiveWeb3React from 'hook/useActiveWeb3React'
import { getEduProofContract } from 'utils/contractHelpers'

export const useEduProofContract = () => {
    const { library } = useActiveWeb3React()
    return useMemo(() => getEduProofContract(library?.getSigner()), [library])
}