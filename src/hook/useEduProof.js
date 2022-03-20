import { useCallback } from 'react'
import { useEduProofContract } from 'hook/useContracts'
import useActiveWeb3React from 'hook/useActiveWeb3React'


export const useRegisterEI = (eiid, name, secretHash) => {
    const account = useActiveWeb3React()
    const contract = useEduProofContract()
    const registerEIID = useCallback(async () => {
        if (account) {

            try {
                const res = await contract.registerEIID(eiid, name, secretHash)
                await res.wait()
            } catch (e) {
                console.log("err : ", e)
                return false
            }
        }
        return true
    }, [account, eiid, name, secretHash, contract])
    return registerEIID
}

export const useApproveEIID = (eiAddress, secretWord) => {
    const account = useActiveWeb3React()
    const contract = useEduProofContract()
    const approveEIID = useCallback(async () => {
        if (account) {

            try {
                const res = await contract.approveEIID(eiAddress, secretWord)
                await res.wait()
            } catch (e) {
                console.log("err : ", e)
                return false
            }
        }
        return true
    }, [account, eiAddress, secretWord, contract])
    return approveEIID
}

export const useIssueTranscript = () => {
    const account = useActiveWeb3React()
    const contract = useEduProofContract()
    const issueTranscript = useCallback(async (studentID, hash) => {
        if (account) {

            try {
                const res = await contract.issueTranscript(studentID, hash)
                await res.wait()
            } catch (e) {
                console.log("err : ", e)
                return false
            }
        }
        return true
    }, [account, contract])
    return issueTranscript
}

export const useVerifyTranscript = (eiAddress, studentID, hash) => {
    const account = useActiveWeb3React()
    const contract = useEduProofContract()
    const verifyTranscript = useCallback(async () => {
        if (account) {

            try {
                const res = await contract.verifyTransript(eiAddress, studentID, hash)
                await res.wait()
            } catch (e) {
                console.log("err : ", e)
                return false
            }
        }
        return true
    }, [account, eiAddress, studentID, hash, contract])
    return verifyTranscript
}

