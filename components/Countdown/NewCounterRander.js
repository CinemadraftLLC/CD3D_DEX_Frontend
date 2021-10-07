import { Typography } from "@mui/material";
import styles from "../../styles/counter.module.css";

export const newRenderer = ({ hours, minutes, seconds, completed }) => {
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
