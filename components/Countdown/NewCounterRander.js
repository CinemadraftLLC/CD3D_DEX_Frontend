import { Typography } from "@mui/material";
import styles from "../../styles/counter.module.css";

export const newRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <div>
        <h1>"Time until Initial CD3D Offering token sale ends" </h1>
      </div>
    );
  } else {
    // Render a countdown
    return (
      <>
        <h3>
          Hours <span className={styles.time}>{hours}</span>
        </h3>
        <span className={styles.timeMid}>:</span>
        <h3>
          Minutes <span className={styles.time}>{minutes}</span>
        </h3>
        <span className={styles.timeMid}>:</span>
        <h3>
          Seconds <span className={styles.time}>{seconds}</span>
        </h3>
        <div className={styles.bottomText}></div>
      </>
    );
  }
};

export const newOneRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <h1>"Time until Initial CD3D Offering token sale ends" </h1>;
  } else {
    // Render a countdown
    return (
      <>
        <span className={styles.time}>{hours}</span>

        <span className={styles.timeMid}>:</span>

        <span className={styles.time}>{minutes}</span>

        <span className={styles.timeMid}>:</span>

        <span className={styles.time}>{seconds}</span>

        <div className={styles.bottomText}></div>
      </>
    );
  }
};
