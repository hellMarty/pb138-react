import React, { FC } from "react";
import '../styles/PurchaseSum.css';
import cart from '../static/cart.json';
import Card from './Card';


interface IPurchaseProps {
    nextAction: Function;
}
  
export const PurchaseSum: FC<IPurchaseProps> = ({ nextAction }) => {
  const totalSum = cart.products
    .reduce((a, b) => { return a + (b.price * b.quantity); }, 0)
    .toFixed(1);

  return (
    <div className="main">
      <h2>Step 1: Purchase summary</h2>
      {cart.products.map((item) => <Card key={item.name} {...item}/>)}
      <div className="total">
        <span>Total:</span>
        <span>{totalSum}€</span>
      </div>
      <button onClick={() => nextAction(1)}>Next</button>
    </div>
  );
};
  