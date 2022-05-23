import React, { useState } from "react";
import Modal from "react-modal";

import { Button, Card } from "@mui/material";
import styled from "styled-components";
import {
  usePool,
  useStakingCallback,
  useStakingRewardCallback,
  useStakingWithdrawCallback,
} from "../../../hooks/useStaking";
import { useCurrency, useformatedTokenBalance } from "../../../hooks/Tokens";
import { formatUnits } from "ethers/lib/utils";
import { tryParseAmount } from "../../../utils";
import {
  ApprovalState,
  useApproveCallback,
} from "../../../hooks/useApproveCallback";
import CurrencyLogo from "../../../components/Logo/CurrencyLogo";
import { useCurrencyBalance } from "../../../state/wallet/hooks";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { useMineV3Contract } from "../../../hooks/useContract";
import { useSingleCallResult } from "../../../state/multicall/hooks";
import { constants } from "ethers";
const { Zero } = constants;

const HeaderTokenName = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const HeaderWrapper = styled.div`
  display: inline-block;
  margin-left: 10px;
  & .amount {
    font-size: 12px;
  }
`;
const HeaderIcon = styled.img`
  vertical-align: top;
`;

const PercentSelector = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  text-align: right;
  width: 100%;
  border: 1px solid #1d9756;
  border-radius: 15px;
  padding: 10px;
  font-size: medium;
  background-color: #fff1f5;
  &:focus-visible {
    outline: none;
  }
`;

const InputLabel = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
`;

const ActiveTab = styled.div`
  color: #cc0136;
  cursor: pointer;
  opacity: ${({ active }) => (active ? 0.3 : 1)};
`;

const ClaimButton = styled(Button)`
  margin-left: 3px;
  border-radius: 15px;
`;

const ACTIVETABS = {
  STAKE: "Stake",
  UNSTAKE: "Unstake",
};

const RewardDetail = ({ pDetail, poolAddr }) => {
  const { account } = useActiveWeb3React();
  const { rewardToken } = pDetail;
  const token = useCurrency(rewardToken);
  const mintV3 = useMineV3Contract(poolAddr);
  const pendingReward =
    useSingleCallResult(mintV3, "getPendingRewardByToken", [
      account,
      rewardToken,
    ]).result?.[0] ?? Zero;

  const formatedPendingReward = useformatedTokenBalance(pendingReward, token);

  return (
    <div className="space-between">
      <div className="flex-1">
        <span>{token?.symbol || ""}</span>
      </div>
      <div className="flex-1 text-center">0%</div>
      <div className="flex-1 text-right">
        {formatedPendingReward}
      </div>
    </div>
  );
};

const ModalBody = ({ poolAddr }) => {
  const { account } = useActiveWeb3React();
  const { rewardNum, stakeToken, totalSupply, poolDetails, balance } =
    usePool(poolAddr);
  const token = useCurrency(stakeToken);

  const [activeTab, setActiveTab] = useState(ACTIVETABS.STAKE);

  const tokenBalance = useCurrencyBalance(account, token);
  // const formatedTokenBalance = useformatedTokenBalance(tokenBalance, token);

  const tSupply = formatUnits(totalSupply, token?.decimals ?? 18);
  const [openAction, setOpenAction] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const amount = tryParseAmount(inputValue, token);

  const [approvalState, approve] = useApproveCallback(amount, poolAddr);

  const deposit = useStakingCallback(poolAddr, amount);

  const onDeposit = () => {
    if (approvalState === ApprovalState.APPROVED) {
      deposit();
    }
    if (approvalState === ApprovalState.NOT_APPROVED) {
      approve();
    }
  };

  const claim = useStakingRewardCallback(poolAddr);

  const withdraw = useStakingWithdrawCallback(poolAddr, amount);

  const stakedAmount = useformatedTokenBalance(balance, token);

  const modalAction = () => {
    switch (activeTab) {
      case ACTIVETABS.STAKE:
        onDeposit();
        break;
      case ACTIVETABS.UNSTAKE:
        withdraw();
      default:
        break;
    }
  };

  return (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <div>
          {/* <HeaderIcon src="/assets/images/CD3D.png" /> */}
          <CurrencyLogo currency={token} style={{ verticalAlign: "top" }} />
          <HeaderWrapper>
            <HeaderTokenName>{token?.symbol}</HeaderTokenName>
            <div className="amount">Amount Staked - {stakedAmount} - $132</div>
          </HeaderWrapper>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="flex-1">Token</div>
          <div className="flex-1 text-center">
            APR
          </div>
          <div className="flex-1 text-right">ClaimableRewards</div>
        </div>
        {poolDetails.map((pDetail) => (
          <RewardDetail
            pDetail={pDetail}
            poolAddr={poolAddr}
            key={pDetail.rewardToken}
          />
        ))}
        <div>
          <div className="d-flex pv-1">
            <div className="d-flex">
              <ActiveTab
                active={activeTab === ACTIVETABS.STAKE}
                onClick={() => setActiveTab(ACTIVETABS.STAKE)}
              >
                Stake
              </ActiveTab>
              <ActiveTab
                style={{ marginLeft: "20px" }}
                active={activeTab === ACTIVETABS.UNSTAKE}
                onClick={() => setActiveTab(ACTIVETABS.UNSTAKE)}
              >
                Unstake
              </ActiveTab>
            </div>
            <div className="ml-auto">
              Available : {tokenBalance?.toSignificant(6) ?? 0}
            </div>
          </div>
          <div className="relative">
            <InputLabel>{token?.symbol}</InputLabel>
            <Input
              type="number"
              style={{ textAlgin: "right" }}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="space-between align-center pv-1">
            {/* <Button onClick={claim} color="info">
              Claim
            </Button> */}
            <div>Claim Rewareds</div>
            <PercentSelector>
              <ClaimButton
                onClick={() => claim(25)}
                variant="outlined"
                color="success"
              >
                25%
              </ClaimButton>
              <ClaimButton
                onClick={() => claim(50)}
                variant="outlined"
                color="success"
              >
                50%
              </ClaimButton>
              <ClaimButton
                onClick={() => claim(75)}
                variant="outlined"
                color="success"
              >
                75%
              </ClaimButton>
              <ClaimButton
                onClick={() => claim(100)}
                variant="contained"
                color="success"
              >
                Max
              </ClaimButton>
            </PercentSelector>
          </div>
        </div>

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={modalAction}
        >
          {activeTab}
        </Button>
      </div>
    </>
  );
};

export default function StakeModal({ show, onDismiss, poolAddr }) {
  return (
    <Modal
      isOpen={show}
      centered
      ariaHideApp={false}
      onRequestClose={onDismiss}
      style={{
        overlay: {
          backgroundColor: "#00000050",
        },
        content: {
          width: "582px",
          height: "502px",
          margin: "auto",
          borderRadius: "15px",
          padding: "20px",
          backgroundColor: "#EAFBF3",
          color: "#166C3D",
        },
      }}
    >
      {poolAddr ? <ModalBody poolAddr={poolAddr} /> : <div>Loading...</div>}
    </Modal>
  );
}
