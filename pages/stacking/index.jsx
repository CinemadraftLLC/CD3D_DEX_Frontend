import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import ClearFix from "../../components/ClearFix/ClearFix";
import StakingForm from "../../components/Form/StakingForm";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormSubmitBtn from "../../components/Form/FormSubmitBtn";

import LpStakingIcon from "./lp_staking_icon";
import StStakingIcon from "./st_staking_icon";
import { DateTimePicker } from "@mui/lab";
import { ArrowDropDown } from "@mui/icons-material";
import { useTokenBalance } from "../../state/wallet/hooks";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import RewardRecrod from "./rewardRecord";
import moment from "moment";
import useStaking from "../../hooks/useStaking";
import { useBlockNumber } from "../../state/application/hooks";
import useCurrentBlockTimestamp from "../../hooks/useCurrentBlockTimestamp";
import { useApproveCallback } from "../../hooks/useApproveCallback";

const StackingBannerContainer = styled(Container)(({ theme }) => ({
  height: "350px",
  maxHeight: "350px",
  marginTop: "40px",
  position: "relative",
  "& .MuiTypography-h2": {
    color: "#4CDC8F",
    fontSize: "40px",
    fontWeight: "bold",
    letterSpacing: "2px",
    lineHeight: "60px",
  },

  "& .MuiTypography-h3": {
    color: "#EAFBF3",
    fontSize: "32px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  "& .MuiTypography-subtitle1": {
    color: "#BAC4D7",
    fontSize: "16px",
  },
  [theme.breakpoints.down("md")]: {
    "& .MuiTypography-h2": {
      lineHeight: "50px",
      fontSize: "35px",
    },
  },
}));

const MiningContainer = styled(Container)(({ theme }) => ({
  "& .MuiTypography-h3": {
    color: "#CAF4DE",
    fontSize: "18px",
  },
  "& .MuiGrid-item": {
    padding: 0,
    marginBottom: "30px",
    marginRight: "15px",
  },
  [theme.breakpoints.down("md")]: {
    "& .MuiGrid-item": {
      marginRight: 0,
    },
  },
}));

const MiningItemContainer = styled(Container)({
  backgroundColor: "rgba(0, 0, 0, 0.15)",
  borderRadius: "15px",
  cursor: "pointer",
  backdropFilter: "blur(30px)",
  padding: "30px 20px",
  "& .MuiTypography-subtitle1": {
    color: "#BAC4D7",
    fontSize: "18px",
  },
  "& .MuiTypography-subtitle2": {
    color: "#7689B0",
    fontSize: "12px",
    lineHeight: "25px",
  },
});

const RewardContainer = styled(Container)({
  marginTop: "20px",
  "& .MuiTypography-h3": {
    color: "#CAF4DE",
    fontSize: "18px",
  },
  "& .MuiIconButton-root": {
    backgroundColor: "rgba(0, 0, 0, 0.15)",

    "& .MuiSvgIcon-root": {
      color: "#BAC4D7",
    },
  },
});

const RewardLabel = styled(InputLabel)({
  transform: "translate(0, -3px) scale(1)",
  width: "100%",
  "& .MuiTypography-subtitle1": {
    color: "#75E4AA",
    fontSize: "12px",
  },
  "& .MuiTypography-subtitle2": {
    color: "#BAC4D7",
    fontSize: "12px",
  },
});

const RewardChip = styled(Chip)({
  backgroundColor: "#800022",
  color: "#FFF1F5",
  borderRadius: "6px",
});

const StakingListContainer = styled(Container)({
  marginTop: "60px",
  "& .MuiTypography-h3": {
    color: "#4CDC8F",
    fontSize: "20px",
  },

  "& .MuiTypography-subtitle1": {
    color: "#BAC4D7",
    fontSize: "18px",
  },
});

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    color: "#808498",
    border: "none",
    padding: "10px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
});

const MiningType = {
  SINGLE_STAKING: "SINGLE_STAKING",
  LP_STAKING: "LP_STAKING",
};

const RewardField = {
  RADDRESS: "rewardTokenAddress",
  DREWARD: "dailyReward",
  TREWARD: "totalReward",
  PERBLCOK: "perblock",
};

const RewardPlaceholder = {
  rewardTokenAddress: "",
  dailyReward: 0,
  totalReward: 0,
  perblock: 0,
};

const Stacking = () => {
  const { account } = useActiveWeb3React();
  const [miningType, setMiningType] = useState(MiningType.SINGLE_STAKING);
  const [stakingTokenAddress, setStakingTokenAddress] = useState("");
  const [startTime, setStartTime] = useState(
    moment().add(1, "day").startOf("date")
  );
  const [endTime, setEndTime] = useState(
    moment().add(1, "day").add(10, "days").startOf("dates")
  );
  const [duration, setDuration] = useState(10); // default 10 days

  const [rewardsInfo, setRewardsInfo] = useState([RewardPlaceholder]);

  const onRewardChange = (index, field, value) => {
    const reward = { ...rewardsInfo[index], [field]: value };
    if (field === RewardField.DREWARD) {
      reward[RewardField.TREWARD] = Number(value) * duration;
    }
    if (field === RewardField.TREWARD) {
      reward[RewardField.DREWARD] = Number(value) / duration;
    }
    const newReward = [...rewardsInfo];
    newReward[index] = reward;
    console.log('updateReward')
    setRewardsInfo(newReward);
  };

  const onNewReward = () => {
    setRewardsInfo([...rewardsInfo, RewardPlaceholder]);
  };

  const onRemoveReward = (index) => {
    const newRewards = [...rewardsInfo];
    if (newRewards.length > 1) {
      newRewards.splice(index, 1);
      setRewardsInfo(newRewards);
    }
  };

  const onChangeDuration = (duration) => {
    const endtime = moment(startTime).add(duration, "days");
    setEndTime(endtime);
    setRewardsInfo(
      rewardsInfo.map((rinfo) => {
        return { ...rinfo, dailyReward: rinfo.totalReward / duration };
      })
    );
  };


  useEffect(() => {
    if (moment(startTime).isBefore(endTime)) {
      const durationD = moment
        .duration(moment(endTime).diff(startTime))
        .asDays();
      setDuration(durationD);
      const durationS = moment
        .duration(moment(endTime).diff(startTime))
        .asSeconds();
      const durationB = (durationS / 3).toFixed();
    }
  }, [startTime, endTime]);

  const { deployStakingPool } = useStaking();

  const blockNumber = useBlockNumber();
  const blockTimeStamp = useCurrentBlockTimestamp();

  const onCreatePool = () => {
    if(!blockTimeStamp || !blockNumber || !stakingTokenAddress) return;

    const valid = rewardsInfo.every(reward => {
      const {dailyReward, perblock, rewardTokenAddress, totalReward} = reward
      return Number(perblock) > 0 && rewardTokenAddress 
    })

    console.log(valid, rewardsInfo)

    if(valid) {
      const blockTime = moment.unix(blockTimeStamp.toNumber())
      const startblock = blockNumber + startTime.diff(blockTime) / 3
      const endblock = blockNumber + endTime.diff(blockTime) / 3
      const rewardTokens = rewardsInfo.map(reward => reward.rewardTokenAddress)
      const rewardPerBlock = rewardsInfo.map(reward => reward.perblock)
      deployStakingPool(stakingTokenAddress, rewardTokens, rewardPerBlock, startblock, endblock)
    }
  };

  return (
    <Container maxWidth={"xl"}>
      <StackingBannerContainer>
        <Box
          component={"div"}
          sx={{ position: "absolute", right: 0, top: 0, zIndex: 0 }}
        >
          <Image
            className={"banner-image"}
            src={"/assets/images/stacking-banner.png"}
            alt={""}
            width={456}
            height={350}
          />
        </Box>
        <Box
          component={"div"}
          sx={{ height: "100%", position: "relative", zIndex: 100 }}
        >
          <Stack
            direction={"column"}
            spacing={2}
            justifyContent={"center"}
            sx={{ height: "100%" }}
          >
            <Typography variant={"h3"} component={"h3"}>
              Staking
            </Typography>
            <Typography variant={"h2"} component={"h2"}>
              Give holders
              <br />
              APY for their buy
            </Typography>
            <Stack
              direction={"row"}
              spacing={{ xs: 2, md: 3 }}
              justifyContent={"start"}
            >
              <Typography variant={"subtitle1"} component={"span"}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  justifyContent={"center"}
                >
                  <StStakingIcon />
                  <Box>Single Token Staking</Box>
                </Stack>
              </Typography>
              <Typography variant={"subtitle1"} component={"span"}>
                OR
              </Typography>
              <Typography variant={"subtitle1"} component={"span"}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  justifyContent={"center"}
                >
                  <LpStakingIcon />
                  <Box>LP Staking</Box>
                </Stack>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </StackingBannerContainer>
      <MiningContainer>
        <Stack direction={"column"} spacing={6}>
          <Typography variant={"h3"} component={"h3"}>
            Choose Mining Type:{" "}
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={12} md={5}>
              <MiningItemContainer
                onClick={() => setMiningType(MiningType.SINGLE_STAKING)}
              >
                <Box
                  component={"div"}
                  sx={{ position: "absolute", left: 20, top: -15, zIndex: 0 }}
                >
                  <StStakingIcon
                    color={
                      miningType === MiningType.SINGLE_STAKING
                        ? "red"
                        : "#bac4d7"
                    }
                  />
                </Box>
                <Stack direction={"column"} spacing={2}>
                  <Typography
                    variant={"subtitle1"}
                    component={"span"}
                    style={{
                      color:
                        miningType === MiningType.SINGLE_STAKING
                          ? "red"
                          : "#bac4d7",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    Single Token Staking
                    <CheckCircleIcon />
                  </Typography>
                  <Typography variant={"subtitle2"} component={"span"}>
                    The amount of token rewards increases the longer the
                    single-sided tokens are deposited.
                  </Typography>
                </Stack>
              </MiningItemContainer>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <MiningItemContainer
                onClick={() => setMiningType(MiningType.LP_STAKING)}
              >
                <Box
                  component={"div"}
                  sx={{ position: "absolute", left: 20, top: -15, zIndex: 0 }}
                >
                  <LpStakingIcon
                    color={
                      miningType === MiningType.LP_STAKING ? "red" : "#bac4d7"
                    }
                  />
                </Box>
                <Stack direction={"column"} spacing={2}>
                  <Typography
                    variant={"subtitle1"}
                    component={"span"}
                    style={{
                      color:
                        miningType === MiningType.LP_STAKING
                          ? "red"
                          : "#bac4d7",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    LP Staking
                    <CheckCircleIcon />
                  </Typography>
                  <Typography variant={"subtitle2"} component={"span"}>
                    The amount of token rewards increases the longer the LP
                    tokens are deposited.
                  </Typography>
                </Stack>
              </MiningItemContainer>
            </Grid>
          </Grid>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={1}
          justifyContent={"start"}
          alignItems={{ xs: "stretch", sm: "stretch", md: "end" }}
          flexBasis={1}
        >
          <FormControl variant={"standard"} sx={{ flex: "3" }}>
            <RewardLabel shrink htmlFor={"daily_reward"}>
              <Typography variant={"subtitle1"} component={"label"}>
                Single-Side Deposit
              </Typography>
            </RewardLabel>
            <StakingForm
              id={"reward_token"}
              InputProps={{
                type: "text",
                placeholder: "Select Token or Provide Token Address",
                onChange: (e) => {
                  setStakingTokenAddress(e.target.value);
                },
                disableUnderline: true,
                value: stakingTokenAddress,
              }}
            >
              <ArrowDropDown />
            </StakingForm>
          </FormControl>
          <FormControl variant={"standard"} sx={{ flex: "2" }}>
            <RewardLabel shrink htmlFor={"daily_reward"}>
              <Typography variant={"subtitle1"} component={"label"}>
                Start Time
              </Typography>
            </RewardLabel>
            <DateTimePicker
              renderInput={(props) => <StakingForm {...props} />}
              value={startTime}
              minDateTime={
                new Date(moment().add(20, "minutes").toLocaleString())
              }
              onChange={setStartTime}
            />
          </FormControl>
          <FormControl variant={"standard"} sx={{ flex: "2" }}>
            <RewardLabel shrink htmlFor={"daily_reward"}>
              <Typography variant={"subtitle1"} component={"label"}>
                End Time
              </Typography>
            </RewardLabel>
            <DateTimePicker
              renderInput={(props) => <StakingForm {...props} />}
              value={endTime}
              minDateTime={
                new Date(moment().add(30, "minutes").toLocaleString())
              }
              onChange={setEndTime}
            />
          </FormControl>
        </Stack>
      </MiningContainer>
      <RewardContainer>
        <Stack direction={"column"} spacing={4}>
          <Typography variant={"h3"} component={"h3"}>
            Add Reward Tokens:{" "}
          </Typography>
          {rewardsInfo.map((rinfo, infoIndex) => {
            return (
              <RewardRecrod
                infoIndex={infoIndex}
                rinfo={rinfo}
                duration={duration}
                onNewReward={onNewReward}
                onRemoveReward={onRemoveReward}
                onRewardChange={onRewardChange}
                onChangeDuration={onChangeDuration}
                key={infoIndex}
              />
            );
          })}

          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box component={"div"} sx={{ width: "350px" }}>
              <FormSubmitBtn
                label={"Create"}
                fullWidth={true}
                onSubmit={onCreatePool}
              />
            </Box>
          </Stack>
        </Stack>
      </RewardContainer>
      <StakingListContainer>
        <Stack direction={"column"} spacing={5}>
          <Typography variant={"h3"} component={"h3"}>
            Staking List
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#2a233a",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  <StyledTableCell
                    align="center"
                    sx={{
                      borderBottomLeftRadius: "15px",
                      borderTopLeftRadius: "15px",
                    }}
                  >
                    Staking Type
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Staking Address
                  </StyledTableCell>
                  <StyledTableCell align="center">Token Staked</StyledTableCell>
                  <StyledTableCell align="center">Start Time</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      borderBottomRightRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  >
                    End Time
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*{rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}*/}
              </TableBody>
            </Table>
          </TableContainer>
          <Box component={"div"} sx={{ width: "100%", minHeight: "300px" }}>
            <Stack
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src={"/assets/images/table-empty-lg.png"}
                alt={""}
                width={32}
                height={26}
              />
              <Typography variant={"subtitle1"} component={"span"}>
                No Match Found
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </StakingListContainer>

      <ClearFix height={100} />
    </Container>
  );
};
export default Stacking;
