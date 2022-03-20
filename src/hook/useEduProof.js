import { useCallback } from 'react'
import { useEduProofContract } from 'hook/useContracts'
import useActiveWeb3React from 'hook/useActiveWeb3React'


export const useRegisterEI = () => {
    const account = useActiveWeb3React()
    const contract = useEduProofContract()
    const registerEIID = useCallback(async (eiid, name, secretHash) => {
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
    }, [account, contract])
    return registerEIID
}

export const useApproveEIID = () => {
    const account = useActiveWeb3React()
    const contract = useEduProofContract()
    const approveEIID = useCallback(async (eiAddress, secretWord) => {
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
    }, [account, contract])
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

export const useVerifyTranscript = () => {
    const account = useActiveWeb3React()
    const contract = useEduProofContract()
    const verifyTranscript = useCallback(async (eiAddress, studentID, hash) => {
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
    }, [account, contract])
    return verifyTranscript
}

