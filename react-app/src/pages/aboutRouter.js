import React from "react";

function AboutRouter({ match }) {
  return (
    <div style={{ background: "green" }}>
      About with router id : {match.params.id}
    </div>
  );
}

export default AboutRouter;
