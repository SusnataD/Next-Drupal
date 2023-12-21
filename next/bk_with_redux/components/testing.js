import React, { useEffect } from "react";
import { useCommonContext } from "../context/CommonContext";

const Testing = () => {
  const { commonState } = useCommonContext();

  // Use the data obtained from getStaticProps to update the common state

  return <>{console.log("Testing > ", commonState)}</>;
};

export default Testing;
