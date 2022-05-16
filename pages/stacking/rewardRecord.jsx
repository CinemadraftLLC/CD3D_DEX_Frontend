import {
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import StakingForm from "../../components/Form/StakingForm";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCurrency } from "../../hooks/Tokens";
import { tryParseAmount } from "../../utils";
import { useCurrencyBalance } from "../../state/wallet/hooks";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { parseUnits } from "@ethersproject/units";
import {
  useApproveCallback,
  ApprovalState,
} from "../../hooks/useApproveCallback";
import { getMiningFactoryAddress } from "../../utils/addressHelpers";
import { CheckCircle } from "@mui/icons-material";

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
  overflow: "visible",
});

const RewardChip = styled(Chip)({
  backgroundColor: "#800022",
  color: "#FFF1F5",
  borderRadius: "6px",
  cursor: "pointer",
});

const RewardField = {
  RADDRESS: "rewardTokenAddress",
  DREWARD: "dailyReward",
  TREWARD: "totalReward",
  PERBLCOK: "perblock",
};

export default function RewardRecrod({
  infoIndex,
  rinfo,
  onRewardChange,
  onNewReward,
  onRemoveReward,
  duration,
  onChangeDuration,
}) {
  const { account } = useActiveWeb3React();
  const token = useCurrency(rinfo[RewardField.RADDRESS]);
  const balance = useCurrencyBalance(account, token);

  const [approvalState, approve] = useApproveCallback(
    balance,
    getMiningFactoryAddress()
  );

  useEffect(() => {
    if (!token || !rinfo) return;
    if (!rinfo.dailyReward) return;
    // console.log(parseUnits(String(rinfo.dailyReward), token.decimals).div(28800).toString())
    // blocks per day 86400 / 3 = 28800
    onRewardChange(
      infoIndex,
      "perblock",
      parseUnits(String(rinfo.dailyReward), token.decimals)
        .div(28800)
        .toString()
    );
  }, [token, rinfo.dailyReward]);

  return (
    <Stack
      direction={{ xs: "column", sm: "column", md: "row" }}
      spacing={1}
      justifyContent={"start"}
      alignItems={{ xs: "stretch", sm: "stretch", md: "end" }}
      flexBasis={1}
      key={infoIndex}
    >
      <FormControl variant={"standard"} sx={{ flex: "2" }}>
        <RewardLabel shrink htmlFor={"daily_reward"}>
          <Typography variant={"subtitle1"} component={"label"}>
            Reward Token
          </Typography>
        </RewardLabel>
        <StakingForm
          id={"reward_token"}
          InputProps={{
            type: "text",
            placeholder: "0xABCD..EF",
            disableUnderline: true,
            onChange: (e) => {
              onRewardChange(infoIndex, "rewardTokenAddress", e.target.value);
            },
            value: rinfo.rewardTokenAddress,
          }}
        />
      </FormControl>
      <FormControl variant={"standard"} sx={{ flex: "2" }}>
        <RewardLabel shrink htmlFor={"daily_reward"}>
          <Typography variant={"subtitle1"} component={"label"}>
            Campaign Period (Days)
          </Typography>
        </RewardLabel>
        <StakingForm
          id={"campaign_period"}
          InputProps={{
            type: "number",
            value: duration,
            min: 1,
            step: 1,
            placeholder: "0",
            onChange: (e) => {
              onChangeDuration(e.target.value);
            },
            disableUnderline: true,
          }}
        />
      </FormControl>
      <FormControl variant={"standard"} sx={{ flex: "2" }}>
        <RewardLabel shrink htmlFor={"daily_reward"}>
          <Typography variant={"subtitle1"} component={"label"}>
            Daily Rewards
          </Typography>
        </RewardLabel>
        <StakingForm
          id={"daily_reward"}
          InputProps={{
            type: "number",
            placeholder: "0",
            onChange: (e) => {
              onRewardChange(infoIndex, "dailyReward", e.target.value);
            },
            value: rinfo.dailyReward,
            disableUnderline: true,
          }}
        />
      </FormControl>
      <FormControl variant={"standard"} sx={{ flex: "3" }}>
        <RewardLabel shrink htmlFor={"total_rewards"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant={"subtitle1"} component={"label"}>
              Total Rewards&nbsp;
            </Typography>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              overflow="visible"
            >
              {balance && (
                <>
                  <Typography variant={"subtitle2"} component={"label"}>
                    Available : {balance.toSignificant(2)}
                  </Typography>
                  <RewardChip
                    onClick={() =>
                      onRewardChange(
                        infoIndex,
                        "totalReward",
                        balance.toExact()
                      )
                    }
                    size="small"
                    label={"Max"}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </RewardLabel>
        <StakingForm
          id={"total_rewards"}
          InputProps={{
            type: "number",
            placeholder: "0",
            onChange: (e) => {
              onRewardChange(infoIndex, "totalReward", e.target.value);
            },
            value: rinfo.totalReward,
            disableUnderline: true,
          }}
        />
        {approvalState === ApprovalState.APPROVED ? (
          <Button
            variant="outlined"
            color="success"
            className="approve-btn"
            startIcon={<CheckCircle />}
          >
            Approved
          </Button>
        ) : approvalState === ApprovalState.NOT_APPROVED && (
          <Button variant="outlined" color="error" className="approve-btn" onClick={approve}>
            Approve
          </Button>
        )}
      </FormControl>
      <Stack
        sx={{ height: "100%", paddingBottom: "3px" }}
        direction={"row"}
        justifyContent={"end"}
        alignItems={"end"}
      >
        {infoIndex === 0 ? (
          <Box onClick={onNewReward}>
            <IconButton aria-label="add">
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <Box onClick={() => onRemoveReward(infoIndex)}>
            <IconButton aria-label="remove">
              <RemoveIcon />
            </IconButton>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
