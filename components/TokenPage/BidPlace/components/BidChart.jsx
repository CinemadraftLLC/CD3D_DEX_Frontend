import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../../../styles/bidChart.module.css";
import Typography from "@mui/material/Typography";
import Demo from "./Chart";
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
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className={styles.bidChartInner}>
            <Typography variant="h5" gutterBottom component="h5">
              Bids Placed
            </Typography>
            <Typography variant="h4" gutterBottom component="h4">
              $0.2319 BUSD/CD3D
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="p">
              + $0.0027 BUSD/CD3D
            </Typography>
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
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#41AF78"
              fill="#4D8971"
              fillOpacity={0.5}
              strokeWidth={3}
            />
          </AreaChart>
          {/* <Demo /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default BidChart;
