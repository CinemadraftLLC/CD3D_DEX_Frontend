import React, {useRef, useState} from 'react';
import CustomContainedButton from '../../components/CustomContainedButton';
import CustomTokenInput from '../../components/CustomTokenInput';
import {Typography} from '@material-ui/core';
import styles from '../../styles/liduidity.module.css';
import Image from 'next/image';
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import ConnectButton from "../ConnectWalletButton";
import {useCurrency} from "../../hooks/Tokens";
import {NETWORK_CHAIN_ID} from "../../connectors";
import {useCurrencyBalance} from "../../state/wallet/hooks";
import {useDerivedMintInfo, useMintActionHandlers, useMintState} from "../../state/mint/hooks";
import PlusIcon from '../../public/assets/plusIcon.svg';
import CD3Dlogo from '../../public/assets/homepage/CD3D-icon.svg';
import BUSDlogo from "../../public/assets/homepage/BUSD-icon.svg";
import {BUSD, CD3D, ONE_BIPS, ROUTER_ADDRESS} from "../../constants";
import {useUserDeadline, useUserSlippageTolerance} from "../../state/user/hooks";
import {calculateGasMargin, calculateSlippageAmount, getRouterContract} from "../../utils";
import {Field} from "../../state/mint/actions";
import {ApprovalState, useApproveCallback} from "../../hooks/useApproveCallback";
import {useTransactionAdder} from "../../state/transactions/hooks";
import {wrappedCurrency} from "../../utils/wrappedCurrency";
import {MinimalPositionCard} from "../PositionCard";
import {PairState} from "../../data/Reserves";
import LiquiditySupplyDialog from "../Dialogs/LiquiditySupplyDialog";
import LiquiditySubmittingTxDialog from "../Dialogs/LiquiditySubmittingTxDialog";

function LiquiditySwap(props) {
    const {account, chainId, library} = useActiveWeb3React()

    // Add Liquidity States
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [{attemptingTxn, txErrorMessage, txHash}, setLiquidityState] = useState({
        attemptingTxn: false,
        txErrorMessage: undefined,
        txHash: undefined,
    })

    const currencyCD3D = useCurrency(CD3D[NETWORK_CHAIN_ID].address);
    const cd3dBalance = useCurrencyBalance(account ?? undefined, currencyCD3D ?? undefined);

    const currencyBUSD = useCurrency(BUSD[NETWORK_CHAIN_ID].address);
    const busdBalance = useCurrencyBalance(account ?? undefined, currencyBUSD ?? undefined);

    const balances = {
        [Field.CURRENCY_A]: busdBalance?.toSignificant(6),
        [Field.CURRENCY_B]: cd3dBalance?.toSignificant(6)
    }

    // mint state
    const { independentField, typedValue, otherTypedValue } = useMintState();
    const {
        dependentField,
        currencies,
        pair,
        pairState,
        currencyBalances,
        parsedAmounts,
        price,
        noLiquidity,
        liquidityMinted,
        poolTokenPercentage,
        error,
    } = useDerivedMintInfo(currencyBUSD, currencyCD3D);

    const {onFieldAInput, onFieldBInput} = useMintActionHandlers(noLiquidity);

    // check whether the user has approved the router on the tokens
    const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS)
    const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], ROUTER_ADDRESS)

    const addTransaction = useTransactionAdder()

    // txn values
    const [deadline] = useUserDeadline() // custom from users settings
    const [allowedSlippage] = useUserSlippageTolerance() // custom from users

    // get formatted amounts
    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    }

    /**
     * Hosokawa 2021/12/9
     * Add Liquidity Pool BUSD <-> CD3D
     */
    async function onAdd() {
        setShowConfirmModal(false);

        if (!chainId || !library || !account) return
        const router = getRouterContract(chainId, library, account)

        const {[Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB} = parsedAmounts
        if (!parsedAmountA || !parsedAmountB) {
            return
        }

        const amountsMin = {
            [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
            [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
        }

        const deadlineFromNow = Math.ceil(Date.now() / 1000) + deadline

        let estimate
        let method
        let args
        let value = null;

        estimate = router.estimateGas.addLiquidity
        method = router.addLiquidity
        args = [
            wrappedCurrency(currencyBUSD, chainId)?.address ?? '',
            wrappedCurrency(currencyCD3D, chainId)?.address ?? '',
            parsedAmountA.raw.toString(),
            parsedAmountB.raw.toString(),
            amountsMin[Field.CURRENCY_A].toString(),
            amountsMin[Field.CURRENCY_B].toString(),
            account,
            deadlineFromNow,
        ]

        setLiquidityState(prevState => ({...prevState, attemptingTxn: true, txErrorMessage: false, txHash: undefined}));
        // const aa = await estimate(...args, value ? { value } : {})
        console.log('args', args);
        await estimate(...args, value ? { value } : {})
            .then((estimatedGasLimit) =>
                method(...args, {
                    ...(value ? { value } : {}),
                    gasLimit: calculateGasMargin(estimatedGasLimit),
                }).then((response) => {
                    console.log('response', response);
                    setLiquidityState(prevState => ({...prevState, attemptingTxn: false, txErrorMessage: false, txHash: response.hash}));

                    addTransaction(response, {
                        summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
                            currencies[Field.CURRENCY_A]?.symbol
                        } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
                    })

                })
            )
            .catch((e) => {
                setLiquidityState(prevState => ({...prevState, attemptingTxn: false, txErrorMessage: e?.message, txHash: undefined}));

                // we only care if the error is something _other_ than the user rejected the tx
                if (e?.code !== 4001) {
                    console.error(e)
                }
            })
    }

    const poolShare = (noLiquidity && price) ? 100 : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? 0;

    return (
        <>
            <div className={styles.subContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>Create Liquidity</div>
                        {
                            noLiquidity?
                            <>
                                <div className={styles.subTitle}>
                                    You are the first liquidity provider.
                                </div>
                                <div className={styles.subTitle}>
                                    The ratio of tokens you add will set the price of this pool.
                                </div>
                                <div className={styles.subTitle}>
                                    Once you are happy with the rate click supply to review.
                                </div>
                            </>
                            :
                            <div className={styles.subTitle}>
                                Provide to receive trading fees
                            </div>
                        }
                </div>

                <div className={styles.inputContainer}>

                    <div className={styles.tokenInputContainer}>
                        <CustomTokenInput
                            value={formattedAmounts[Field.CURRENCY_A]}
                            handleChange={onFieldAInput}
                            errMsg={''}
                            tokenName={'BUSD'}
                            tokenImage={BUSDlogo}
                            maxValue={balances[Field.CURRENCY_A]}
                            maxButton={true}
                        />
                        <div className={styles.tokenInputTextContainer}>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                Balance : {balances[Field.CURRENCY_A]}
                            </Typography>
                        </div>
                    </div>

                    <div className={styles.downOuter}>
                        <Image src={PlusIcon} alt='Picture of DownArrow'/>
                    </div>

                    <div className={styles.tokenInputContainer}>
                        <CustomTokenInput
                            value={formattedAmounts[Field.CURRENCY_B]}
                            handleChange={onFieldBInput}
                            errMsg={''}
                            tokenName={'CD3D'}
                            tokenImage={CD3Dlogo}
                            maxValue={balances[Field.CURRENCY_B]}
                            maxButton={true}
                        />
                        <div className={styles.tokenInputTextContainer}>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                Balance : {balances[Field.CURRENCY_B]}
                            </Typography>
                        </div>
                    </div>

                </div>

                <div className={styles.statsContainer}>

                    <Typography variant='h6' gutterBottom component='div' className={styles.statsHeading}>
                        {
                            noLiquidity? 'Initial prices and pool share' : 'Prices and pool share'
                        }
                    </Typography>

                    <div className={styles.statsSubContainer}>
                        <div className={styles.stats}>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                {price?.toSignificant(6) ?? '-'}
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                BUSD per CD3D
                            </Typography>
                        </div>
                        <div className={styles.stats}>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                {price?.invert()?.toSignificant(6) ?? '-'}
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                CD3D per BUSD
                            </Typography>
                        </div>
                        <div className={styles.stats}>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                {poolShare} %
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                Share of Pool
                            </Typography>
                        </div>
                    </div>

                </div>
                {
                    !account ?
                        <ConnectButton/>
                        :
                        // TODO Approve tokens
                        <CustomContainedButton
                            btnTitle={error ?? 'Supply'}
                            disabled={error || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
                            customStyles={{
                                color: 'white',
                            }}
                            onClick={() => setShowConfirmModal(true)}
                        />
                }
            </div>
            { pair && !noLiquidity && pairState !== PairState.INVALID ?
                <MinimalPositionCard pair={pair} /> : null
            }
            <LiquiditySupplyDialog
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onSubmit={onAdd}
                lpToken={'-'}
                busd={formattedAmounts[Field.CURRENCY_A]}
                cd3d={formattedAmounts[Field.CURRENCY_B]}
                cd3d_rate={price?.toSignificant(6)??0}
                busd_rate={price?.invert()?.toSignificant(6)??0}
                pool={poolShare}
            />
            <LiquiditySubmittingTxDialog
                show={attemptingTxn}
                txHash={txHash}
                swapErrorMessage={txErrorMessage}
                onClose={() => setLiquidityState(prevState => ({
                    ...prevState,
                    attemptingTxn: false
                }))}
            />
        </>
    );
}

export default LiquiditySwap;
