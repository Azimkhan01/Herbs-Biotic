import React from "react";
import CurveDivider from "../common/CurveDivider";

function Recommendation() {
  return (
    <div>
      <CurveDivider
        direction="up"
        color="#fff"
      />

      <section className="h-screen bg-white">
        Content
      </section>

      <CurveDivider
        direction="down"
        color="#F3F4F6"
        className="bg-white"
      />
    </div>
  );
}

export default Recommendation;