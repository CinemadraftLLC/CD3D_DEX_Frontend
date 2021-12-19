import React, {useCallback, useState} from "react";
import Image from 'next/image';
import {styled} from '@mui/material/styles';
import {Link, Typography} from "@material-ui/core";
import LoopIcon from '@mui/icons-material/Loop';
import {ETHER, JSBI, Price} from "cd3d-dex-libs-sdk";
import BigNumber from 'bignumber.js'

import {Container, Grid, Stack, Box, FormControl, InputLabel, InputAdornment, IconButton} from "@mui/material";
import ChartContainer from "../../components/CustomChart";
import DownA from '../../public/assets/homepage/down-arrow.svg';
import FormLabel from "../../components/Form/FormLabel";
import FormAdvancedTextField from "../../components/Form/FormAdvancedTextField";
import SwapEndAdornment from "../../components/Swap/SwapEndAdornment";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {Field, MIN_SWAP_PRICE, SWAP_TOKEN_LIST} from "../../constants";
import {TokenSelect} from "../../components/Swap/TokenSelect";
import {getBscScanLink, tryParseAmount} from "../../utils";
import {useTradeExactIn, useTradeExactOut} from "../../hooks/Trades";
import {useUserDeadline, useUserSlippageTolerance} from "../../state/user/hooks";
import {computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity} from "../../utils/prices";
import useSwapCallback from "../../hooks/useSwapCallback";
import confirmPriceImpactWithoutFee from "../../components/Swap/confirmPriceImpactWithoutFee";
import FormSubmitBtn from "../../components/Form/FormSubmitBtn";
import ConnectButton from "../../components/ConnectWalletButton";
import {useCurrencyBalances} from "../../state/wallet/hooks";
import {useCurrency} from "../../hooks/Tokens";
import LiquiditySubmittingTxDialog from "../../components/Dialogs/LiquiditySubmittingTxDialog";
import tokens from "../../constants/tokens";
import {useFarmFromTokenSymbols, usePollFarmsPublicData} from "../../state/farms/hooks";
import {BIG_ZERO} from "../../utils/bigNumber";
import {showToast} from "../../utils/toast";
import styles from "../../styles/Dialog.module.css";
import {wrappedCurrency} from "../../utils/wrappedCurrency";
import {NETWORK_CHAIN_ID} from "../../connectors";

const SwapContainer = styled(Container)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: '50px 10px',
    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",
})

const Swap = () => {
    const [independentField, setIndependentField] = useState(Field.CURRENCY_A)
    const {account} = useActiveWeb3React()

    const [tokenSelect, setTokenSelect] = useState(0);
    const swapContainerRef = React.useRef(null);

    const [payToken, setPayToken] = useState(tokens.busd);
    const [receiveToken, setReceiveToken] = useState(tokens.cd3d);
    const [typedValue, setTypeValue] = useState('');
    const [isInvertPrice, setIsInvertPrice] = useState(false);

    const [{swapErrorMessage, attemptingTxn, txHash}, setSwapState] = useState({
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined,
    })

    usePollFarmsPublicData();

    const tokenChangeHandler = (val) => {
        if (tokenSelect === Field.CURRENCY_A) {
            if (payToken !== val) {
                setTypeValue('');
                setPayToken(val);
            }
        } else {
            if (receiveToken !== val) {
                setTypeValue('');
                setReceiveToken(val);
            }
        }
        setTokenSelect(0);
    }

    const handleChangeInput = (event) => {
        setTypeValue(event.target.value);
        setIndependentField(Field.CURRENCY_A);
    };

    const handleChangeOutput = (event) => {
        setTypeValue(event.target.value);
        setIndependentField(Field.CURRENCY_B);
    };

    const handleExchangeToken = () => {
        const oldPaytoken = payToken;
        setPayToken(receiveToken);
        setReceiveToken(oldPaytoken);
    }

    const isExactIn = independentField === Field.CURRENCY_A;
    const dependentField = independentField === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A;

    const payCurrency = useCurrency(payToken === ETHER ? 'BNB' : payToken.address);
    const receiveCurrency = useCurrency(receiveToken === ETHER ? 'BNB' : receiveToken.address);

    const parsedAmount = isExactIn ? tryParseAmount(typedValue, payCurrency) : tryParseAmount(typedValue, receiveCurrency);
    const trade = isExactIn ? useTradeExactIn(parsedAmount, receiveCurrency) : useTradeExactOut(payCurrency, parsedAmount);
    const parsedAmounts = {
        [Field.CURRENCY_A]: independentField === Field.CURRENCY_A ? parsedAmount : trade?.inputAmount,
        [Field.CURRENCY_B]: independentField === Field.CURRENCY_B ? parsedAmount : trade?.outputAmount,
    }

    const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [payCurrency, receiveCurrency]);
    const currencyBalances = {
        [Field.CURRENCY_A]: relevantTokenBalances[0],
        [Field.CURRENCY_B]: relevantTokenBalances[1],
    }

    console.log('balances', currencyBalances);

    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    }

    const userHasSpecifiedInputOutput = Boolean(
        parsedAmount?.greaterThan(JSBI.BigInt(0))
    )

    const [deadline] = useUserDeadline();
    const [allowedSlippage] = useUserSlippageTolerance();

    // Token Price
    const farm = useFarmFromTokenSymbols(wrappedCurrency(payCurrency, NETWORK_CHAIN_ID)?.symbol, wrappedCurrency(receiveCurrency, NETWORK_CHAIN_ID)?.symbol);
    const payTokenPrice = farm ? new BigNumber(farm.token.symbol === payCurrency.symbol ? farm.tokenPriceBusd : farm.quoteTokenPriceBusd) : BIG_ZERO;
    const payAmount = formattedAmounts[Field.CURRENCY_A] > 0 ? (payTokenPrice.times(new BigNumber(formattedAmounts[Field.CURRENCY_A]))).toNumber() : 0;

    console.log('farm', farm, payTokenPrice);


    let inputError;

    if (!parsedAmount) {
        inputError = 'Enter an amount'
    }

    const slippageAdjustedAmounts = trade && allowedSlippage && computeSlippageAdjustedAmounts(trade, allowedSlippage)

    // compare input balance to max input based on version
    const [balanceIn, amountIn] = [
        currencyBalances[Field.CURRENCY_A],
        slippageAdjustedAmounts ? slippageAdjustedAmounts[Field.CURRENCY_A] : null,
    ]

    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
        inputError = `Insufficient ${amountIn.currency.symbol} balance`
    }

    // if(!inputError && payAmount < MIN_SWAP_PRICE){
    //     inputError = `Not enough ${payToken.symbol} amount`
    // }


    // the callback to execute the swap
    const {callback: swapCallback, error: swapCallbackError} = useSwapCallback(
        trade,
        allowedSlippage,
        deadline);

    const {priceImpactWithoutFee} = computeTradePriceBreakdown(trade)


    /**
     * Hosokawa 2021/12/7
     * Swap BUSD -> CD3D
     */
    const onSwap = useCallback(() => {
        if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
            return
        }

        if (!swapCallback) {
            return
        }


        setSwapState((prevState) => ({...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined}))
        swapCallback()
            .then((hash) => {
                setSwapState((prevState) => ({
                    ...prevState,
                    attemptingTxn: false,
                    swapErrorMessage: undefined,
                    txHash: hash,
                }))

                console.log('hash', hash);
                setTypeValue('');
                showToast("success", "Transaction Receipt", "Your transaction was succeed.",
                    (<Link target={"_blank"} href={getBscScanLink(hash, 'transaction')}>
                        <Typography className={`${styles.DialogBinance}`} variant="subtitle2">
                            View on Binance
                        </Typography>
                    </Link>));
            })
            .catch((error) => {
                showToast("error", "Transaction Failed", error.message);
                setSwapState((prevState) => ({
                    ...prevState,
                    attemptingTxn: false,
                    swapErrorMessage: error.message,
                    txHash: undefined,
                }))
            })
    }, [priceImpactWithoutFee, swapCallback, setSwapState]);

    // warnings on slippage
    const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)
    const swapPrice = trade ? new Price(receiveCurrency, payCurrency, trade.outputAmount.raw, trade.inputAmount.raw) : undefined;
    const submitButtonLabel = (payToken.symbol === 'CD3D') ? 'Sell CD3D' : (receiveToken.symbol === 'CD3D' ? 'Buy CD3D' : 'Swap');
    return (
        <Container maxWidth={"xl"}>
            <Stack mt={{xs: 2, sm: 2, md: 3, lg: 5}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid item xs={12} sm={12} md={7} xl={8}>
                        <ChartContainer/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} xl={4}>
                        <SwapContainer ref={swapContainerRef}>
                            <Box component={"form"} autoComplete={"off"} noValidate>
                                <FormControl variant={"standard"} fullWidth={true}>
                                    <InputLabel shrink htmlFor={"swap_pay"}>
                                        <FormLabel title={"Pay"} description={"(Currency you send)"} required={false}/>
                                    </InputLabel>
                                    <FormAdvancedTextField
                                        id={"swap_pay"}
                                        helperText={
                                            <Stack component={"span"} direction={"row"} justifyContent={"space-between"}>
                                                <Typography component={'span'} variant={"body2"}>Approx. ${payAmount.toFixed(2)}</Typography>
                                                {/*<Typography component={'span'} variant={"body2"}>Min. Buy ${MIN_SWAP_PRICE.toFixed(2)}</Typography>*/}
                                            </Stack>
                                        }
                                        InputProps={{
                                            type: 'number',
                                            placeholder: '0',
                                            min: '0',
                                            onChange: handleChangeInput,
                                            disableUnderline: true,
                                            value: formattedAmounts[Field.CURRENCY_A],
                                            endAdornment: <InputAdornment position="end">
                                                <SwapEndAdornment value={payToken} onClick={() => setTokenSelect(Field.CURRENCY_A)}/>
                                            </InputAdornment>,
                                        }}
                                    />
                                </FormControl>
                                <Box sx={{
                                    height: "120px",
                                }}>
                                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{height: "100%"}}>
                                        <Image src={DownA} onClick={() => handleExchangeToken()} alt='Picture of DownArrow' width={"30px"} height={"30px"}/>
                                    </Stack>
                                </Box>
                                <FormControl variant={"standard"} fullWidth={true}>
                                    <InputLabel shrink htmlFor={"swap_receive"}>
                                        <FormLabel title={"Receive"} description={"(Currency you get)"} required={false}/>
                                    </InputLabel>
                                    <FormAdvancedTextField
                                        id={"swap_receive"}
                                        helperText={
                                            <Stack component={"span"} direction={"row"} justifyContent={"center"}>
                                                <Typography component={'span'} variant={"body2"} style={{padding: 4}}>
                                                    {
                                                        !isInvertPrice ?
                                                            `1 ${receiveToken?.symbol} = ${swapPrice?.toSignificant(6) ?? 0} ${payToken?.symbol}`
                                                            :
                                                            `1 ${payToken?.symbol} = ${swapPrice?.invert()?.toSignificant(6) ?? 0} ${receiveToken?.symbol}`
                                                    }
                                                </Typography>
                                                <IconButton color="primary" aria-label="Refresh" size={"small"} onClick={() => setIsInvertPrice(!isInvertPrice)}>
                                                    <LoopIcon fontSize={"small"}/>
                                                </IconButton>
                                            </Stack>
                                        }
                                        InputProps={{
                                            type: 'number',
                                            placeholder: '0',
                                            min: '0',
                                            onChange: handleChangeOutput,
                                            disableUnderline: true,
                                            value: formattedAmounts[Field.CURRENCY_B],
                                            endAdornment: <InputAdornment position="end">
                                                <SwapEndAdornment value={receiveToken} onClick={() => setTokenSelect(Field.CURRENCY_B)}/>
                                            </InputAdornment>,
                                        }}
                                    />
                                </FormControl>
                                <Box sx={{height: "80px"}}/>
                                {
                                    !account ?
                                        <ConnectButton/>
                                        : !trade?.route && userHasSpecifiedInputOutput ?
                                        <FormSubmitBtn
                                            label={'Insufficient liquidity for this trade.'}
                                            disabled={true}
                                            loading={false}
                                            onSubmit={() => {
                                            }}
                                        />
                                        // TODO Approve tokens
                                        :
                                        <FormSubmitBtn
                                            label={inputError || swapCallbackError || (priceImpactSeverity > 3 ? 'Price Impact Too High' : submitButtonLabel)}
                                            disabled={!!inputError || priceImpactSeverity > 3 || !!swapCallbackError}
                                            loading={attemptingTxn}
                                            onSubmit={onSwap}
                                        />
                                }
                            </Box>
                            <TokenSelect
                                label={tokenSelect === Field.CURRENCY_A ? 'Pay Token' : 'Receive Token'}
                                container={swapContainerRef.current}
                                show={tokenSelect !== 0}
                                onClose={() => setTokenSelect(0)}
                                onSelect={tokenChangeHandler}
                                tokenList={SWAP_TOKEN_LIST}
                                disabledTokens={tokenSelect === Field.CURRENCY_A ? [receiveToken.symbol] : [payToken.symbol]}
                            />
                            <LiquiditySubmittingTxDialog
                                show={attemptingTxn || !!txHash || !!swapErrorMessage}
                                txHash={txHash}
                                swapErrorMessage={swapErrorMessage}
                                onRetry={onSwap}
                                onClose={() => setSwapState(prevState => ({
                                    ...prevState,
                                    attemptingTxn: false,
                                    swapErrorMessage: undefined,
                                    txHash: undefined
                                }))}
                            />
                        </SwapContainer>
                    </Grid>
                </Grid>
            </Stack>
        </Container>

    );
}
export default Swap;
