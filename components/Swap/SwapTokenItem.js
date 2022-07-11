import React, { useCallback } from "react"
import { Stack, Typography } from "@mui/material"
import styles from "../../styles/swap.module.css"
import Image from "next/image"

const SwapTokenItem = (props) => {
  const { value, onChange, disabled } = props

  const onClickHandle = useCallback(() => {
    onChange(value)
  })

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
        return `/assets/images/unknown.svg`
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
    </Stack>
  )
}

export default SwapTokenItem
