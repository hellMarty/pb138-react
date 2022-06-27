import React from "react";
import '../styles/Card.css'

interface ICardProps {
    image: string;
    name: string;
    price: number;
    quantity: number;
}
  
export const Card = (props: ICardProps) => {
    return (
      <div className="card">
        <img className="image" src={props.image}/>
        <div className="card__info">
            <div className="card__info--line">
              <div className="bold">{props.name}</div>
              <div>Price: {props.price}€/piece</div>
            </div>
            <div className="card__info--line">
              <div>Quantity: {props.quantity}</div>
              <div className="bold">{props.price * props.quantity}€</div>
            </div>
        </div>
      </div>
    );
};

export default Card;