import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import application from './application/reducer'
import user from './user/reducer'
import lists from './lists/reducer'
import mint from './mint/reducer'
import multicall from './multicall/reducer'
import transactions from './transactions/reducer';

const PERSISTED_KEYS = ['user', 'transactions']
const loadedState = load({ states: PERSISTED_KEYS })

const store = configureStore({
    reducer: {
        application,
        user,
        lists,
        mint,
        transactions,
        multicall,
    },
    middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS })],
    preloadedState: load({ states: PERSISTED_KEYS }),
})

export default store
