import Countdown from "react-countdown";
import { renderer } from "./CounterRander";
import styles from "../../styles/counter.module.css";
import { newRenderer } from "./NewCounterRander";

export default function Counter({ hours, minutes, seconds }) {
  return (
    <div className={styles.timeOuter}>
      {/* Add text here to display in screen */}
      <Countdown
        date={new Date("Oct 7, 2021 12:59:59:999").toISOString()}
        renderer={renderer}
      />
    </div>
  );
}

export const NewCounter = ({ hours, minutes, seconds }) => {
  return (
    <div className={styles.timeOuter}>
      <Countdown
        date={Date.now() + 1000 * 60 * 60 * 24}
        renderer={newRenderer}
      />
    </div>
  );
};
