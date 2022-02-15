import React from "react";

function CardHeader({ icon, title, subtitle, action, className, titleClass }) {
  return (
    <div className={`card_header ${className || ""}`}>
      {icon && icon}
      <div className="title_area">
        <h4 className={titleClass ? titleClass : "card_title"}>{title}</h4>
        {subtitle && <h6 className="card_subtitle">{subtitle}</h6>}
      </div>
      {action && <div className="actions_area">{action}</div>}
    </div>
  );
}

export default CardHeader;
