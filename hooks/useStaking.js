import { useCallback } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import { useMiningFactoryContract } from "./useContract";

export default function useStaking() {
    const {account} = useActiveWeb3React()
    const mf = useMiningFactoryContract()

    const deployStakingPool = useCallback((stakingToken, rewardTokens, rewardPerBlock, startBlock, endBlock) => {
        if(!account || !mf) return 
        mf.deployMiningPool(account, stakingToken, rewardTokens, rewardPerBlock, startBlock, endBlock)
    }, [account, mf])

    return {deployStakingPool}
}