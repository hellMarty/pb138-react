import React, { FC } from "react";
import '../styles/Summary.css';
import cart from '../static/cart.json';


interface ISummary {
    nextAction: Function;
  }
  
  export const Summary: FC<ISummary> = ({ nextAction, data }) => {
    
    return (
      <div className="main">
        <h2>Step 3: Summary</h2>
        <div>
            {cart.products.map((item) =>
                <div className="summary_item">
                    <p className="summary_item--basis">{item.name}</p>
                    <p className="summary_item--basis">{item.quantity}</p>
                    <p className="summary_item--basis">{item.price}€/piece</p>
                    <p style={{ fontWeight: "bold" }}>{item.price * item.quantity}€</p>
                </div>
            )}
        </div>
        
        <div className="deliver_data">
            <span><b>Deliver to:</b></span>
            <div className="deliver_data--item">
                <span><b>Name:</b></span>
                <span>{data.firstName} {data.surname}</span>
            </div>
            <div className="deliver_data--item">
                <span><b>Address:</b></span>
                <span>{data.street} {data.streetNo}, {data.city}, {data.zipCode}</span>
            </div>
            <div className="deliver_data--item">
                <span><b>Phone Number:</b></span>
                <span>{data.prePhone} {data.phoneNumber}</span>
            </div>
            {data.email &&
            <div className="deliver_data--item">
                <span><b>Email:</b></span>
                <span>{data.email}</span>
            </div>
            }
            {data.note &&
            <div className="deliver_data--item">
                <span><b>Note:</b></span>
                <span>{data.note}</span>
            </div>
            }
        </div>
        <button onClick={() => nextAction(3)}>Next</button>
      </div>
    );
  };
  