import React from "react";
import { TimelineItem } from "./TimelineItem";
import styles from "../../styles/timeline.module.css";
import { timelineData } from "data/data";

const Timeline = () => {
  return (
    <>
      {timelineData.length > 0 && (
        <>
          <div className={styles.timelineContainer}>
            {timelineData.map((data) => (
              <TimelineItem data={data} key={data.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Timeline;
