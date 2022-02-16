import React from "react";

function CardBody(props) {
  return (
    <div className={`card_body ${props.className || ""}`}>{props.children}</div>
  );
}

export default CardBody;
