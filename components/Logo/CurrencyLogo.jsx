import { ETHER, Token } from "cd3d-dex-libs-sdk";
import React, { useMemo } from "react";
import styled from "styled-components";
import Logo from ".";
import { WrappedTokenInfo } from "../../state/lists/hooks";
import getTokenLogoURL from "../../utils/getTokenLogoURL";

const StyledLogo = styled(Logo)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background: radial-gradient(
    white 50%,
    #ffffff00 calc(75% + 1px),
    #ffffff00 100%
  );
  border-radius: 50%;
  -mox-box-shadow: 0 0 1px ${({ native }) => (native ? "white" : "black")};
  -webkit-box-shadow: 0 0 1px ${({ native }) => (native ? "white" : "black")};
  box-shadow: 0 0 1px ${({ native }) => (native ? "white" : "black")};
  border: 0px solid rgba(255, 255, 255, 0);
`;

export default function CurrencyLogo({
  currency,
  size = "24px",
  style,
  ...rest
}) {
  const srcs = useMemo(() => {
    if (currency === ETHER) return [];
    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [currency.logoURI, getTokenLogoURL(currency.address)];
      }
      return [getTokenLogoURL(currency.address)];
    }
    return [];
  }, [currency]);

  if (currency === ETHER) {
    return <img src="/images/matic.png" width={size} style={style} alt="bnb" />;
  }

  return (
    <StyledLogo
      size={size}
      native={currency?.isNative ?? false}
      srcs={srcs}
      alt={`${currency?.symbol ?? "token"} logo`}
      style={style}
      {...rest}
    />
  );
}
