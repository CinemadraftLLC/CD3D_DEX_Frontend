import React from "react";
import styles from "../../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CD3Dlogo from "../../../../public/assets/homepage/CD3D-icon.svg";

const Amount3D = (props) => {
  const { handleChangeOnCd3d } = props;
  return (
    <div className={styles.bidPriceOuter}>
      <label>
        Amount in CD3D <span>(equals how many tokens I will get?)</span>
      </label>
      <div className={styles.bidPriceInput}>
        <input
          type="number"
          placeholder="0"
          min="0"
          onChange={handleChangeOnCd3d}
        />
        <Typography variant="subtitle2" gutterBottom component="p">
          CD3D <Image src={CD3Dlogo} alt="Picture of CD3D" />
        </Typography>
      </div>
    </div>
  );
};

export default Amount3D;
