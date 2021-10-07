import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../../../styles/bidChart.module.css";
import Typography from "@mui/material/Typography";
import Demo from "./Chart";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 145,
    pv: 2000,
    amt: 1400,
  },
  {
    name: "Page B",
    uv: 300,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 200,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 278,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 189,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 239,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 590,
    pv: 4300,
    amt: 2100,
  },
];

const BidChart = () => {
  return (
    <div className={styles.bidChartOuter}>
      <div className={styles.bidChartInnerLeft}>
        <Typography variant="h5" gutterBottom component="h5">
          Bids Placed
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          $0.01 BUSD/CD3D
        </Typography>
      </div>
      <div className={styles.bidChartInnerRight}>
        <Typography variant="h5" gutterBottom component="h5">
          Time Left
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          $0.01 BUSD/CD3D
        </Typography>
      </div>
      {/* </div> */}
      <div className={styles.leftCurtain}>
        <Image src={"/assets/homepage/curtain1.png"} width={600} height={600} />
      </div>
      <div className={styles.rightCurtain}>
        <Image src={"/assets/homepage/curtain2.png"} width={600} height={600} />
      </div>

      <AreaChart
        width={750}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" width={600} />
        {/* <YAxis dataKey="token"  /> */}

        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#41AF78"
          fill="#4D8971"
          fillOpacity={0.9}
          strokeWidth={3}
        />
      </AreaChart>
    </div>
  );
};

export default BidChart;
