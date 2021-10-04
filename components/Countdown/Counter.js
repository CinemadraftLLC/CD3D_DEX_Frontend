import Countdown from "react-countdown";
import { renderer } from "./CounterRander";
import styles from "../../styles/counter.module.css";
import { newRenderer } from "./NewCounterRander";

export default function Counter({ hours, minutes, seconds }) {
  var myDateObj = new Date("Oct 7, 2021 12:00:00:000 GMT");
  return (
    <div className={styles.timeOuter}>
      <Countdown date={myDateObj.getTime()} renderer={renderer} />
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
