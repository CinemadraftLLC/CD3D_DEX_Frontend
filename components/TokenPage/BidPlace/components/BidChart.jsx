import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../../../styles/bidChart.module.css";
import Typography from "@mui/material/Typography";
import Demo from "./Chart";
import Image from "next/image";
import useResizeObserver from "@react-hook/resize-observer";
import { NewCounter } from "../../../Countdown/Counter";
import useCD3D from "../../../../hooks/useCD3D";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const chart_data = [
  {
    name: "Page A",
    uv: 0,
    pv: 0,
    amt: 1400,
  },
  {
    name: "Page b",
    uv: 0,
    pv: 23,
    amt: 1400,
  },
  {
    name: "Page c",
    uv: 0,
    pv: 232,
    amt: 1400,
  },
  {
    name: "Page d",
    uv: 0,
    pv: 442,
    amt: 1400,
  },
  {
    name: "Page e",
    uv: 300,
    pv: 1500,
    amt: 2210,
  },
  {
    name: "Page f",
    uv: 600,
    pv: 2500,
    amt: 2290,
  },
  {
    name: "Page g",
    uv: 978,
    pv: 3508,
    amt: 2000,
  },
  {
    name: "Page h",
    uv: 1289,
    pv: 4500,
    amt: 2181,
  },
  {
    name: "Page i",
    uv: 1539,
    pv: 5500,
    amt: 2500,
  },
  {
    name: "Page j",
    uv: 590,
    pv: 6500,
    amt: 2100,
  },
];

const useSize = (target) => {
  const [size, setSize] = React.useState();

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BidChart = (props) => {
  const target = React.useRef(null);
  const size = useSize(target);
  const { data } = useCD3D();
  return (
    <div className={styles.bidChartOuter}>
      <div className={styles.bidChartInnerLeft}>
        <Typography variant="h5" gutterBottom component="h5">
          Bids Placed
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          {numberWithCommas(data?.bids || 0)}
        </Typography>
      </div>
      <div className={styles.bidChartInnerRight}>
        <Typography variant="h5" gutterBottom component="h5">
          Sale Ends in
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          <NewCounter />
        </Typography>
      </div>
      <div className={styles.leftCurtain}>
        <Image src={"/assets/homepage/curtain1.png"} width={600} height={600} />
      </div>
      <div className={styles.rightCurtain}>
        <Image src={"/assets/homepage/curtain2.png"} width={600} height={600} />
      </div>
      <div ref={target} className={styles.areaChart}>
        <ResponsiveContainer
          width={680 || size?.width}
          height={300 || size.height}
        >
          <AreaChart
            data={chart_data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="#ffafc4"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={0.4}
              fill="#4CDC8F"
            />
          </AreaChart>
          {/* <AreaChart
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
              fillOpacity={0.9}
              strokeWidth={3}
            />
          </AreaChart> */}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BidChart;
