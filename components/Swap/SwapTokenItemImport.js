import React, { useCallback } from "react"
import { Stack, Typography, Chip } from "@mui/material"
import { styled } from "@mui/material/styles"
import styles from "../../styles/swap.module.css"
import Image from "next/image"

const SwapMaxChip = styled(Chip)({
  backgroundColor: "#800022",
  color: "#FFF1F5",
  borderRadius: "6px",
  marginRight: "7px",
  "&:hover": {
    backgroundColor: "#E5234A",
  },
})

const SwapTokenItemImport = (props) => {
  const { value, onChange, disabled } = props

  const onClickHandle = useCallback(() => {
    onChange(value)
  })

  const onAddClick = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens")) || []
    tokens.push(value)
    console.log("Tokens -->", tokens)
    localStorage.setItem("tokens", JSON.stringify(tokens))
  }

  const getImage = (val) => {
    switch (val?.symbol?.toLowerCase()) {
      case "bnb":
        return "/assets/images/bnb.png"
      case "busd":
        return "/assets/images/busd.png"
      case "cd3d":
        return "/assets/images/cd3d.png"
      case "wbnb":
        return "https://pancakeswap.finance/images/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png"
      default:
        return `https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/${val?.address}/logo.png`
    }
  }

  return (
    <Stack
      className={`${styles.tokenItem} ${
        disabled ? styles.deactive : styles.active
      }`}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      onClick={() => onClickHandle()}
    >
      <Stack direction={"row"} alignItems={"center"} justifyContent={"start"}>
        <img
          src={getImage(value)}
          width={25}
          height={25}
          objectFit={"contain"}
        />
        <Typography className={styles.typography1} component={"span"}>
          {value?.symbol}
        </Typography>
      </Stack>
      <Typography className={styles.typography2} component={"span"}>
        {value?.name}
      </Typography>
      <SwapMaxChip size="small" label={"Add"} onClick={onAddClick} />
    </Stack>
  )
}

export default SwapTokenItemImport
