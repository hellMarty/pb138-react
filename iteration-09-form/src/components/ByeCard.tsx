import React, { FC } from "react";
import '../styles/ByeCard.css';
  

interface IByeCard {
    nextAction: Function;
  }

export const ByeCard: FC<IByeCard> = ({ nextAction }) => {
    return (
      <div className="bye_card">
            <span className="bye_card__line"><b>Your order has been placed.</b></span>
            <span className="bye_card__line">Great! Your order will be processed within 24 hours.</span>
            <span className="bye_card__line"><b>Thank you for choosing us!</b></span>
      </div>
    );
};
  