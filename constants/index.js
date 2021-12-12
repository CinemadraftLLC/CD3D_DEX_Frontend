import {ChainId, Currency, JSBI, Percent, Token, WETH} from 'cd3d-dex-libs-sdk'

export const ROUTER_ADDRESS = '0xDD01D7d8302fdef0537FCbCbD1eb6d136b7E6e97'

export const CD3D = {
    [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x9108c36dc1dcbf08187d4f4d4579d72e6a35d979', 9, 'CD3D', 'CD3D'),
    [ChainId.BSCTESTNET]: new Token(ChainId.BSCTESTNET, '0xFd4C59960Ba11F34a978a737E63ff6ECa9aB4979', 9, 'CD3D', 'CD3D'),
}

export const BUSD = {
    [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18, 'BUSD', 'Binance USD'),
    [ChainId.BSCTESTNET]: new Token(ChainId.BSCTESTNET, '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7', 18, 'BUSD', 'Binance USD')
}

export const CAKE = new Token(
    ChainId.MAINNET,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token'
)

export const WBNB = new Token(ChainId.MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB')
export const DAI = new Token(ChainId.MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin')
export const BTCB = new Token(ChainId.MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')

export const UST = new Token(
    ChainId.MAINNET,
    '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    18,
    'UST',
    'Wrapped UST Token'
)

export const ETH = new Token(
    ChainId.MAINNET,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum Token'
)

const WETH_ONLY = {
    [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
    [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, BTCB, USDT, UST, ETH],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the lists of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES = {
    [ChainId.MAINNET]: {},
}

// used for display in the default lists when adding liquidity
export const SUGGESTED_BASES = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
}

// used to construct the lists of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, BTCB, USDT],
}

export const PINNED_PAIRS = {
    [ChainId.MAINNET]: [
        [CAKE, WBNB],
        [BUSD, USDT],
        [DAI, USDT],
    ],
}

export const NetworkContextName = 'NETWORK'

// Connect Wallet Name
export const ConnectorName = "Injected";

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

/////////////////////////////////////////////////////////////////////////////////////////////
///
/// Swap

export const SWAP_TOKEN_LIST = {
    [ChainId.BSCTESTNET]: [Currency.ETHER, CD3D[ChainId.BSCTESTNET], BUSD[ChainId.BSCTESTNET]],
    [ChainId.MAINNET]: [Currency.ETHER, CD3D[ChainId.MAINNET], BUSD[ChainId.MAINNET]],
}
