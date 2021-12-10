import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import Image from "next/image";
import useTotalSupply from "../../data/TotalSupply";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import styles from "../../styles/liquidity2.module.css";
import {JSBI, Percent} from "cd3d-dex-libs-sdk";
import {useTokenBalance} from "../../state/wallet/hooks";

export function MinimalPositionCard ({pair}) {
    const { account } = useActiveWeb3React()

    const currency0 = pair.token0
    const currency1 = pair.token1

    const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
    const totalPoolTokens = useTotalSupply(pair.liquidityToken)

    const poolTokenPercentage =
        !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
            ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
            : undefined

    const [token0Deposited, token1Deposited] =
        !!pair &&
        !!totalPoolTokens &&
        !!userPoolBalance &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
            ? [
                pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
                pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
            ]
            : [undefined, undefined]

    return (
        <div className={styles.miniContainer}>
            <div className={styles.title}>
                <Typography variant='subtitle2' component={'p'}>
                    LP tokens in your wallet
                </Typography>
            </div>
            <div className={styles.tokenStats}>
                <div className={styles.statContainer}>
                    <div className={styles.lpContainer}>
                        <Image src={'/assets/busd-cd3d.png'} alt={''} height={40} width={50} />
                        <Typography variant='subtitle2' component={'p'}>
                            {currency0.symbol} - {currency1.symbol} LP
                        </Typography>
                    </div>
                    <div className={styles.lpValues}>
                        {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
                    </div>
                </div>
                <div className={styles.statContainer}>
                    <div className={styles.lpContainer}>
                        <Typography variant='subtitle2' component={'p'}>
                            Share of Pool
                        </Typography>
                    </div>
                    <div className={styles.lpValues}>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(2)}%` : '-'}</div>
                </div>
                <div className={styles.statContainer}>
                    <div className={styles.lpContainer}>
                        <Typography variant='subtitle2' component={'p'}>
                            Pooled {currency1.symbol}
                        </Typography>
                    </div>
                    <div className={styles.lpValues}>{ token1Deposited ? token1Deposited?.toSignificant(6) : '-' }</div>
                </div>
                <div className={styles.statContainer}>
                    <div className={styles.lpContainer}>
                        <Typography variant='subtitle2' component={'p'}>
                            Pooled {currency0.symbol}
                        </Typography>
                    </div>
                    <div className={styles.lpValues}>{ token0Deposited ? token0Deposited?.toSignificant(6) : '-' }</div>
                </div>
            </div>
        </div>
    )
}
