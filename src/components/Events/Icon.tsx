import React from "react";

function Icon(props) {
  const { url } = props;
  return (
    <div>
      <img src={url} alt='' />
    </div>
  );
}

export default Icon;
