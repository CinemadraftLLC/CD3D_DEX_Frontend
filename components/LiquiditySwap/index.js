import React, {useCallback, useState} from 'react';
import {Box, Container, InputAdornment, Stack} from "@mui/material";
import Image from 'next/image';
import {useRouter} from "next/router";
import {Link, Typography} from '@material-ui/core';
import {styled} from "@mui/material/styles";

import styles from '../../styles/liduidity.module.css';
import CustomContainedButton from '../../components/CustomContainedButton';
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import ConnectButton from "../ConnectWalletButton";
import currencyId, {useCurrency} from "../../hooks/Tokens";
import {useCurrencyBalance} from "../../state/wallet/hooks";
import {useDerivedMintInfo, useMintActionHandlers, useMintState} from "../../state/mint/hooks";
import PlusIcon from '../../public/assets/plusIcon.svg';
import {Field, ONE_BIPS, ROUTER_ADDRESS, SWAP_TOKEN_LIST} from "../../constants";
import {useUserDeadline, useUserSlippageTolerance} from "../../state/user/hooks";
import {calculateGasMargin, calculateSlippageAmount, getBscScanLink, getRouterContract} from "../../utils";
import {ApprovalState, useApproveCallback} from "../../hooks/useApproveCallback";
import {useTransactionAdder} from "../../state/transactions/hooks";
import {wrappedCurrency} from "../../utils/wrappedCurrency";
import {MinimalPositionCard} from "../PositionCard";
import {PairState} from "../../data/Reserves";
import LiquiditySupplyDialog from "../Dialogs/LiquiditySupplyDialog";
import LiquiditySubmittingTxDialog from "../Dialogs/LiquiditySubmittingTxDialog";
import tokens from "../../constants/tokens";
import {TokenSelect} from "../Swap/TokenSelect";
import FormAdvancedTextField from "../Form/FormAdvancedTextField";
import SwapEndAdornment from "../Swap/SwapEndAdornment";
import ClearFix from "../ClearFix/ClearFix";
import {showToast} from "../../utils/toast";

const LiquidityContainer = styled(Container)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: '50px 10px',
    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",
})

function LiquiditySwap() {
    const router = useRouter()
    const {addresses} = router.query;

    const {account, chainId, library} = useActiveWeb3React();

    const liquidityContainerRef = React.useRef(null);
    const [tokenSelect, setTokenSelect] = useState(0);

    // Add Liquidity States
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [{attemptingTxn, txErrorMessage, txHash}, setLiquidityState] = useState({
        attemptingTxn: false,
        txErrorMessage: undefined,
        txHash: undefined,
    })

    const currencyIdA = (addresses && addresses[0])?addresses[0]:'BNB';
    const currencyIdB = (addresses && addresses[1])?addresses[1]:tokens.cd3d.address;

    const currencyA = useCurrency(currencyIdA);
    const currencyB = useCurrency(currencyIdB);

    const currencyABalance = useCurrencyBalance(account ?? undefined, currencyA ?? undefined);
    const currencyBBalance = useCurrencyBalance(account ?? undefined, currencyB ?? undefined);

    const balances = {
        [Field.CURRENCY_A]: currencyABalance?.toSignificant(6),
        [Field.CURRENCY_B]: currencyBBalance?.toSignificant(6)
    }

    // mint state
    const {independentField, typedValue, otherTypedValue} = useMintState();
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
    } = useDerivedMintInfo(currencyA, currencyB);

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
            wrappedCurrency(currencyA, chainId)?.address ?? '',
            wrappedCurrency(currencyB, chainId)?.address ?? '',
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
        await estimate(...args, value ? {value} : {})
            .then((estimatedGasLimit) =>
                method(...args, {
                    ...(value ? {value} : {}),
                    gasLimit: calculateGasMargin(estimatedGasLimit),
                }).then((response) => {
                    console.log('response', response);
                    setLiquidityState(prevState => ({...prevState, attemptingTxn: false, txErrorMessage: false, txHash: response.hash}));

                    onFieldAInput('');
                    addTransaction(response, {
                        summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
                            currencies[Field.CURRENCY_A]?.symbol
                        } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
                    });

                    showToast("success", "Transaction Receipt", "Your transaction was succeed.",
                        (<Link target={"_blank"} href={getBscScanLink(response.hash, 'transaction')}>
                            <Typography className={`${styles.DialogBinance}`} variant="subtitle2">
                                View on Binance
                            </Typography>
                        </Link>));
                })
            )
            .catch((e) => {
                setLiquidityState(prevState => ({...prevState, attemptingTxn: false, txErrorMessage: e?.message, txHash: undefined}));
                showToast("error", "Transaction Failed", e?.message??'');

                // we only care if the error is something _other_ than the user rejected the tx
                if (e?.code !== 4001) {
                    console.error(e)
                }
            })
    }

    const poolShare = (noLiquidity && price) ? 100 : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? 0;

    const tokenChangeHandler = useCallback((val) => {
        if (tokenSelect === Field.CURRENCY_A) {
            if(currencyA !== val){
                const newCurrencyIdA = currencyId(val);
                router.push(`/liquidity/${newCurrencyIdA}/${currencyIdB}`);
            }
        } else {
            if(currencyB !== val){
                const newCurrencyIdB = currencyId(val);
                router.push(`/liquidity/${currencyIdA}/${newCurrencyIdB}`);
            }
        }
        setTokenSelect(0);
    }, [tokenSelect, currencyIdA, currencyIdB, setTokenSelect]);

    return (
        <>
            <LiquidityContainer ref={liquidityContainerRef}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>Create Liquidity</div>
                    {
                        noLiquidity ?
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
                    <ClearFix height={15}/>
                    <FormAdvancedTextField
                        id={"liquidity_pay"}
                        helperText={
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                Balance : {balances[Field.CURRENCY_A]}
                            </Typography>
                        }
                        InputProps={{
                            type: 'number',
                            placeholder: '0',
                            min: '0',
                            onChange: onFieldAInput,
                            disableUnderline: true,
                            value: formattedAmounts[Field.CURRENCY_A],
                            endAdornment: <InputAdornment position="end">
                                <SwapEndAdornment value={currencyA} onClick={() => setTokenSelect(Field.CURRENCY_A)}/>
                            </InputAdornment>,
                        }}
                    />

                    <Box sx={{
                        height: "20px",
                    }}>
                        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{height: "100%"}}>
                            <Image src={PlusIcon} alt='Picture of DownArrow'/>
                        </Stack>
                    </Box>
                    <ClearFix height={15}/>
                    <FormAdvancedTextField
                        id={"liquidity_receive"}
                        helperText={
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                Balance : {balances[Field.CURRENCY_B]}
                            </Typography>
                        }
                        InputProps={{
                            type: 'number',
                            placeholder: '0',
                            min: '0',
                            onChange: onFieldBInput,
                            disableUnderline: true,
                            value: formattedAmounts[Field.CURRENCY_B],
                            endAdornment: <InputAdornment position="end">
                                <SwapEndAdornment value={currencyB} onClick={() => setTokenSelect(Field.CURRENCY_B)}/>
                            </InputAdornment>,
                        }}
                    />
                </div>

                <div className={styles.statsContainer}>

                    <Typography variant='h6' gutterBottom component='div' className={styles.statsHeading}>
                        {
                            noLiquidity ? 'Initial prices and pool share' : 'Prices and pool share'
                        }
                    </Typography>

                    <div className={styles.statsSubContainer}>
                        <div className={styles.stats}>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                {price?.toSignificant(6) ?? '-'}
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                {currencyA.symbol} per {currencyB.symbol}
                            </Typography>
                        </div>
                        <div className={styles.stats}>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                {price?.invert()?.toSignificant(6) ?? '-'}
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom component='div'>
                                {currencyB.symbol} per {currencyA.symbol}
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
            <TokenSelect
                label={tokenSelect === Field.CURRENCY_A ? 'Token A' : 'Token B'}
                container={liquidityContainerRef.current}
                show={tokenSelect !== 0}
                onClose={() => setTokenSelect(0)}
                onSelect={tokenChangeHandler}
                tokenList={SWAP_TOKEN_LIST}
                disabledTokens={tokenSelect === Field.CURRENCY_A ? [currencyB.symbol] : [currencyA.symbol]}
            />
            </LiquidityContainer>
            {pair && !noLiquidity && pairState !== PairState.INVALID ?
                <MinimalPositionCard pair={pair}/> : null
            }
            <LiquiditySupplyDialog
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onSubmit={onAdd}
                lpToken={'-'}
                currencyA={currencyA}
                currencyB={currencyB}
                currencyAAmount={formattedAmounts[Field.CURRENCY_A]}
                currencyBAmount={formattedAmounts[Field.CURRENCY_B]}
                currencya_rate={price?.toSignificant(6) ?? 0}
                currencyb_rate={price?.invert()?.toSignificant(6) ?? 0}
                pool={poolShare}
            />
            <LiquiditySubmittingTxDialog
                show={attemptingTxn || !!txHash || !!txErrorMessage}
                txHash={txHash}
                swapErrorMessage={txErrorMessage}
                onClose={() => setLiquidityState(prevState => ({
                    ...prevState,
                    txHash: undefined,
                    txErrorMessage: undefined,
                    attemptingTxn: false
                }))}
                onRetry={() => {
                    setLiquidityState(prevState => ({
                        ...prevState,
                        txHash: undefined,
                        txErrorMessage: undefined,
                        attemptingTxn: false
                    }));
                    onAdd();
                }}
            />
        </>
    );
}

export default LiquiditySwap;
