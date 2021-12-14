import React, {useCallback, useState} from "react";
import styles from "../../../styles/farming.module.css";
import {Box, Grid} from "@mui/material";
import FarmingItem from "./FarmingItem";
import {useWeb3React} from "@web3-react/core";
import {useFarms, usePollFarmsWithUserData, usePriceCd3dBusd} from "../../../state/farms/hooks";
import BigNumber from "bignumber.js";
import { getFarmApr } from '../../../utils/apr'
import { latinise } from '../../../utils/latinise'
import {NETWORK_CHAIN_ID} from "../../../connectors";
import FarmingDialog from "./FarmingDialog";


const getDisplayApr = (cd3dRewardsApr, lpRewardsApr) => {
    if (cd3dRewardsApr && lpRewardsApr) {
        return (cd3dRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    if (cd3dRewardsApr) {
        return cd3dRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
}

const FarmingForm = () => {
    const [{ showModal, stakeParams }, setFarmingState] = useState({
        showModal: false,
        stakeParams: {}
    });
    const [query, setQuery] = useState('');

    const { account } = useWeb3React();
    const cd3dPrice = usePriceCd3dBusd();

    const isActive = true;
    const isArchived = false;

    usePollFarmsWithUserData(isArchived)

    const farmsList = useCallback(
        (farmsToDisplay) => {
            let farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
                if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
                    return farm
                }
                const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
                const { cd3dRewardsApr, lpRewardsApr } = isActive
                    ? getFarmApr(new BigNumber(farm.poolWeight), cd3dPrice, totalLiquidity, farm.lpAddresses[NETWORK_CHAIN_ID])
                    : { cd3dRewardsApr: 0, lpRewardsApr: 0 }

                return { ...farm, apr: cd3dRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
            })

            if (query) {
                const lowercaseQuery = latinise(query.toLowerCase())
                farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => {
                    return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
                })
            }
            return farmsToDisplayWithAPR
        },
        [cd3dPrice, query, isActive],
    )

    const { data: farmsLP, userDataLoaded } = useFarms();
    const farms = farmsList(farmsLP);

    const onDismiss = () => {
        setFarmingState(prevState => ({...prevState, showModal: false, stakeParams: {}}));
    }

    console.log('farms', farms, cd3dPrice);

    return (
        <Box className={styles.farmingFormContainer}>
            <Grid container className={styles.form_wrapper}>
                {
                    farms.map(farm =>
                        <Grid key={farm.pid} item xs={12} sm={12} md={6} xl={4} >
                            <FarmingItem
                                farm={farm}
                                displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                                onStack={(params) => setFarmingState(prevState => ({...prevState, showModal: true, stakeParams: params}))}
                                cd3dPrice={cd3dPrice}
                                account={account}
                            />
                        </Grid>
                    )
                }
            </Grid>
            <FarmingDialog
                params={stakeParams}
                account={account}
                show={showModal}
                onDismiss={onDismiss}
            />
        </Box>
    );
}

export default FarmingForm;
