import React from "react";
import { TimelineItem } from "./TimelineItem";
import styles from "../../styles/timeline.module.css";
import { timelineData } from "data/data";
import { Typography } from "@mui/material";

const Timeline = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom component="h4">
        The stars align at CinemaDraft
      </Typography>
      <Typography variant="h6" gutterBottom component="h6">
        <i>“You are only ever as good to me as the money you make!”</i>
      </Typography>
      <Typography variant="subtitle2" gutterBottom component="p">
        – Micky, 21
      </Typography>
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
