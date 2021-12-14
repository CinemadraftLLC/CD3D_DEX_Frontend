import {styled} from '@mui/material/styles';
import ChartContainer from "../../components/CustomChart";
import {Container, Grid, Stack, Box, FormControl, InputLabel, InputAdornment, IconButton} from "@mui/material";
import {Typography} from "@material-ui/core";
import LoopIcon from '@mui/icons-material/Loop';
import React, {useCallback, useState} from "react";
import Image from 'next/image';
import DownA from '../../public/assets/homepage/down-arrow.svg';
import FormLabel from "../../components/Form/FormLabel";
import FormAdvancedTextField from "../../components/Form/FormAdvancedTextField";
import SwapEndAdornment from "../../components/Swap/SwapEndAdornment";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {NETWORK_CHAIN_ID} from "../../connectors";
import {BUSD, CD3D, Field, SWAP_TOKEN_LIST} from "../../constants";
import {TokenSelect} from "../../components/Swap/TokenSelect";
import {tryParseAmount} from "../../utils";
import {useTradeExactIn, useTradeExactOut} from "../../hooks/Trades";
import {ETHER, JSBI, Price} from "cd3d-dex-libs-sdk";
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

const SwapContainer = styled(Container)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: '50px 10px',
    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",
})

const Swap = () => {
    const [independentField, setIndependentField] = useState(Field.INPUT)
    const {account} = useActiveWeb3React()

    const [tokenSelect, setTokenSelect] = useState(0);
    const swapContainerRef = React.useRef(null);

    const [payToken, setPayToken] = useState(tokens.busd);
    const [receiveToken, setReceiveToken] = useState(tokens.cd3d);
    const [typedValue, setTypeValue] = useState('');

    const [{swapErrorMessage, attemptingTxn, txHash}, setSwapState] = useState({
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined,
    })

    const tokenChangeHandler = (val) => {
        if (tokenSelect === Field.INPUT) {
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
        setIndependentField(Field.INPUT);
    };

    const handleChangeOutput = (event) => {
        setTypeValue(event.target.value);
        setIndependentField(Field.OUTPUT);
    };

    const handleExchangeToken = () => {
        const oldPaytoken = payToken;
        setPayToken(receiveToken);
        setReceiveToken(oldPaytoken);
    }

    const isExactIn = independentField === Field.INPUT;
    const dependentField = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

    const payCurrency = useCurrency(payToken === ETHER ? 'BNB' : payToken.address);
    const receiveCurrency = useCurrency(receiveToken === ETHER ? 'BNB' : receiveToken.address);

    const parsedAmount = isExactIn ? tryParseAmount(typedValue, payCurrency) : tryParseAmount(typedValue, receiveCurrency);
    const trade = isExactIn ? useTradeExactIn(parsedAmount, receiveCurrency) : useTradeExactOut(payCurrency, parsedAmount);
    const parsedAmounts = {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
    }

    const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [payCurrency, receiveCurrency]);
    const currencyBalances = {
        [Field.INPUT]: relevantTokenBalances[0],
        [Field.OUTPUT]: relevantTokenBalances[1],
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

    let inputError;

    if (!parsedAmount) {
        inputError = 'Enter an amount'
    }

    const slippageAdjustedAmounts = trade && allowedSlippage && computeSlippageAdjustedAmounts(trade, allowedSlippage)

    // compare input balance to max input based on version
    const [balanceIn, amountIn] = [
        currencyBalances[Field.INPUT],
        slippageAdjustedAmounts ? slippageAdjustedAmounts[Field.INPUT] : null,
    ]

    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
        inputError = `Insufficient ${amountIn.currency.symbol} balance`
    }

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
                setTypeValue('');
            })
            .catch((error) => {
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

    return (
        <Container maxWidth={"xl"}>
            <Stack mt={{xs: 2, sm: 2, md: 3, lg: 5}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid item xs={12} sm={12} md={12} xl={8}>
                        <ChartContainer/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={4}>
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
                                                <Typography component={'span'} variant={"body2"}>Approx. $5.00</Typography>
                                                <Typography component={'span'} variant={"body2"}>Min. Buy $10.00</Typography>
                                            </Stack>
                                        }
                                        InputProps={{
                                            type: 'number',
                                            placeholder: '0',
                                            min: '0',
                                            onChange: handleChangeInput,
                                            disableUnderline: true,
                                            value: formattedAmounts[Field.INPUT],
                                            endAdornment: <InputAdornment position="end">
                                                <SwapEndAdornment value={payToken} onClick={() => setTokenSelect(Field.INPUT)}/>
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
                                                <Typography component={'span'} variant={"body2"}>1 {receiveToken?.symbol} = {swapPrice?.toSignificant(6) ?? 0} {payToken?.symbol}</Typography>
                                                <IconButton color="primary" aria-label="Refresh" size={"small"}>
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
                                            value: formattedAmounts[Field.OUTPUT],
                                            endAdornment: <InputAdornment position="end">
                                                <SwapEndAdornment value={receiveToken} onClick={() => setTokenSelect(Field.OUTPUT)}/>
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
                                            label={inputError || swapCallbackError || (priceImpactSeverity > 3 ? 'Price Impact Too High' : 'Sell CD3D')}
                                            disabled={inputError || priceImpactSeverity > 3 || swapCallbackError}
                                            loading={attemptingTxn}
                                            onSubmit={onSwap}
                                        />
                                }
                            </Box>
                            <TokenSelect
                                label={tokenSelect === Field.INPUT ? 'Pay Token' : 'Receive Token'}
                                container={swapContainerRef.current}
                                show={tokenSelect !== 0}
                                onClose={() => setTokenSelect(0)}
                                onSelect={tokenChangeHandler}
                                tokenList={SWAP_TOKEN_LIST}
                                disabledTokens={tokenSelect === Field.INPUT ? [receiveToken] : [payToken]}
                            />
                            <LiquiditySubmittingTxDialog
                                show={attemptingTxn}
                                txHash={txHash}
                                swapErrorMessage={swapErrorMessage}
                                onRetry={onSwap}
                                onClose={() => setSwapState(prevState => ({
                                    ...prevState,
                                    attemptingTxn: false
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
