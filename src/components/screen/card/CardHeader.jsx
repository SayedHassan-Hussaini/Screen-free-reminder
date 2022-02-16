import React from "react";
import style from './style.module.css'

function CardHeader({ icon, title, subtitle, action, className, titleClass }) {
  return (
    <div className={`${style.cardHeader} ${className || ""}`}>
      {icon && icon}
      <div className={`${style.titleArea}`}>
        <h4 className={titleClass ? titleClass : "card_title"}>{title}</h4>
        {subtitle && <h6 className="card_subtitle">{subtitle}</h6>}
      </div>
      {action && <div className={`${style.actionsArea}`}>{action}</div>}
    </div>
  );
}

export default CardHeader;
