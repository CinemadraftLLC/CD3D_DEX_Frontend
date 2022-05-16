import { useState } from "react";
import { Slash } from "react-feather";

const BAD_SRCS = {};

export default function Logo({ srcs, alt, style, ...rest }) {
  const [, refresh] = useState(0);

  const src = srcs.find((src) => !BAD_SRCS[src]);

  if (src) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        style={style}
        onError={() => {
          if (src) BAD_SRCS[src] = true;
          refresh((i) => i + 1);
        }}
      />
    );
  }

  return (
    <img {...rest} style={{ ...style, color: "#eee" }} src="/assets/CD3D.png" />
  );
}
