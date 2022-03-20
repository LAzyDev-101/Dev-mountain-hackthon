import { useCallback } from 'react';
import { injected } from '../utils/Web3React';
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { setupNetwork } from '../utils/wallet';

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(() => {
    activate(injected, async (error) => {
      if (error instanceof UnsupportedChainIdError) {
        const hasSetup = await setupNetwork()
        if (hasSetup) {
          activate(injected)
        }
      }
    })
  }, [activate])

  const logout = useCallback(() => {
    deactivate()
  }, [deactivate])
  return { login, logout }
}

export default useAuth;
