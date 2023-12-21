import React, { useEffect } from "react";
import { GlobalElements } from "../../lib/globalElements";
import { useCommonContext } from "../../context/CommonContext";
import Testing from "@/components/testing";

const Test = ({ globalElements }) => {
  const { updateCommonState } = useCommonContext();

  // Use the data obtained from getStaticProps to update the common state
  useEffect(() => {
    updateCommonState({ globalElements });
  }, [globalElements]);

  return (
    <>
      <Testing />
    </>
  );
};

export async function getStaticProps() {
  // Fetch data from an API or other source
  const globalElements = await GlobalElements();
  //   const data = await globalElements.json();

  // Return the data as props
  return {
    props: {
      globalElements,
    },
  };
}

export default Test;
