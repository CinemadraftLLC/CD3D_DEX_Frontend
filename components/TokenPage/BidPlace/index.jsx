import React from "react";
import BidGrid from "./components/BidGrid";
import BidChart from "./components/BidChart";
import BidBeforeStatus from "../../BidBeforeTimeStatus/BidBeforeStatus";

const BidPlace = () => {
  return (
    <React.Fragment>
      <BidGrid />
      <BidBeforeStatus />
      {/* <BidChart /> */}
    </React.Fragment>
  );
};

export default BidPlace;
