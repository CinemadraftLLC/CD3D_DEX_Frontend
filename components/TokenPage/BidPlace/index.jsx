import React from "react";
import BidGrid from "./components/BidGrid";
import BidChart from "./components/BidChart";
import BidBeforeStatus from "../../BidBeforeTimeStatus/BidBeforeStatus";
import AfterBidTimeStatus from "../../AfterBidTimeStatus/AfterBidTimeStatus";

function getDifferenceInSeconds(date1, date2) {
  const diffInMs = date2 - date1;
  return diffInMs;
}

const BidPlace = () => {
  const today = new Date();
  const saleStartDate = new Date("Oct 7, 2021 12:00:00:000 GMT");
  const saleEndDate = new Date("Oct 8, 2021 12:00:00:000 GMT");
  const center = getDifferenceInSeconds(today, saleEndDate);
  console.log(center);
  const seconds = getDifferenceInSeconds(today, saleStartDate);

  return (
    <React.Fragment>
      <BidGrid />
      {seconds >= 0 ? (
        <BidBeforeStatus />
      ) : center > 0 ? (
        <BidChart />
      ) : (
        <AfterBidTimeStatus />
      )}
    </React.Fragment>
  );
};

export default BidPlace;
