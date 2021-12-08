import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { NetworkContextName } from '../constants'

const useActiveWeb3React = () => {
  const context = useWeb3ReactCore()
  return context.active ? context : {}
};

export default useActiveWeb3React;
