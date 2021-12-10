import React from "react";
import styles from "../../../styles/navbar.module.css";
import Image from "next/image";

const WalletHeaderComponent = (props) => {
    const {wallet, busd, cd3d} = props
    return (
        <div className={styles.walletContainer}>
            <div className={styles.item}>
                <Image src={"/assets/images/cd3d.png"} height={19} width={16} objectFit={"contain"}/>
                <span className={styles.itemLabel}>{cd3d}</span>
            </div>
            <div className={styles.item}>
                <Image src={"/assets/images/busd.png"} height={19} width={19} objectFit={"contain"}/>
                <span className={styles.itemLabel}>{busd}</span>
            </div>
            <div className={styles.item}>
                <Image src={"/assets/images/wallet.png"} height={15} width={14} objectFit={"contain"}/>
                <span className={styles.itemLabel}>{wallet ? wallet.substr(0, 2) + "..." + wallet.substr(wallet.length - 4) : ""}</span>
            </div>
        </div>
    );
}

export default WalletHeaderComponent;