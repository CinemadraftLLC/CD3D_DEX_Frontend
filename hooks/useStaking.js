import { useCallback, useEffect, useMemo, useState } from "react";
import { useMultipleContractSingleData, useSingleCallResult, useSingleContractMultipleData } from "../state/multicall/hooks";
import useActiveWeb3React from "./useActiveWeb3React";
import { useMineV3Contract, useMiningFactoryContract } from "./useContract";
import { ethers, constants } from "ethers";
const { Zero } = constants

export default function useStaking() {
    const { account } = useActiveWeb3React()
    const mf = useMiningFactoryContract()

    const poolLength = useSingleCallResult(mf, 'getPoolLength').result?.[0].toNumber() ?? 0
    const poolIds = Array(poolLength).fill().map((id, i) => [i]) ?? []

    const deployStakingPool = useCallback((stakingToken, rewardTokens, rewardPerBlock, startBlock, endBlock) => {
        if (!account || !mf) return
        mf.deployMiningPool(account, stakingToken, rewardTokens, rewardPerBlock, startBlock, endBlock)
    }, [account, mf])

    const pools = useSingleContractMultipleData(mf, 'deployedMiningPools', poolIds).map(({ result }) => result?.[0]).filter(result => result)

    return { deployStakingPool, pools }
}

export function usePool(pool) {
    const { account } = useActiveWeb3React()
    const mineV3 = useMineV3Contract(pool)
    const rewardNum = useSingleCallResult(mineV3, 'getRewardNum').result?.[0].toNumber() ?? 1
    const stakeToken = useSingleCallResult(mineV3, '_TOKEN_').result?.[0]
    const totalSupply = useSingleCallResult(mineV3, 'totalSupply').result?.[0] ?? Zero
    const balance = useSingleCallResult(mineV3, 'balanceOf', [account]).result?.[0] ?? Zero
    const poolDetails = useSingleContractMultipleData(mineV3, 'rewardTokenInfos', Array(rewardNum).fill().map((v, i) => [i])).map(d => d.result).filter(d => d)

    return { rewardNum, stakeToken, totalSupply, poolDetails, balance }
}

export function useStakingCallback(pool, amount) {
    const { account } = useActiveWeb3React()
    const mineV3 = useMineV3Contract(pool)
    const deposit = useCallback(async () => {

        if (!account || !mineV3 || !amount) return
        await mineV3.deposit(amount.raw.toString())
    }, [account, mineV3, amount])

    return deposit
}

export function useStakingRewardCallback(pool) {
    const { account } = useActiveWeb3React()
    const mineV3 = useMineV3Contract(pool)
    const claimRewards = useCallback(async (percent) => {
        if (!account || !mineV3) return
        await mineV3.claimAllRewards(percent)
    }, [account, mineV3])

    return claimRewards
}

export function useStakingWithdrawCallback(pool, amount) {
    const { account } = useActiveWeb3React()
    const mineV3 = useMineV3Contract(pool)
    const withdrawCall = useCallback(async () => {
        if (!account || !mineV3 || !amount) return
        await mineV3.withdraw(amount)
    }, [account, mineV3, amount])

    return withdrawCall
}
