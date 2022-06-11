import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack } from "@mui/material";
import { CreateTokenBigLabel, CreateTokenSmallLabel, CreateTokenSpan } from "../create_token_widget";
import ClearFix from "../../ClearFix/ClearFix";

function TaxPercent({ fontColor, taxPercent, text }) {
  return (
    <Box>
      <CreateTokenSmallLabel color={fontColor}>{text}</CreateTokenSmallLabel>
      <ClearFix height={30} />
      <Stack direction={"row"} alignItems={"center"}>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={fontColor}>{taxPercent.reduce((a, b) => a + b, 0)}%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Fee</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>=</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={fontColor}>{taxPercent[0]}%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Development</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={fontColor}>{taxPercent[1]}%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Marketing</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={fontColor}>{taxPercent[2]}%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Charity</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={fontColor}>{taxPercent[3]}%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Liquidity</CreateTokenSmallLabel>
        </Stack>
      </Stack>
    </Box>
  )
}

TaxPercent.propTypes = {
  fontColor: PropTypes.string.isRequired,
  taxPercent: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
}

export default TaxPercent
