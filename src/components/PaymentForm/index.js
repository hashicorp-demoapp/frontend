import React, {useEffect} from "react";
import M from "materialize-css";
import '../../materialize.css'
import {Person, CreditCard, DateRange, Lock, Send} from '@material-ui/icons'

export default function PaymentForm(props) {

    useEffect(() => {
      M.AutoInit();
    })

    function handleSubmit(e) {
        alert("A credit card was submitted: " );
        e.preventDefault();
    }

    return <form class="col s12" onSubmit={handleSubmit}>
          <div class="row">
            <div class="input-field col s12">
              <select id="cardType">
                <option value="" disabled selected>
                 {props.dropdownDefault}
                </option>
                <option value="1">Visa</option>
                <option value="2">Mastercard</option>
                <option value="3">American Express</option>
              </select>
            </div>

            <div class="input-field col s12">
              <input id="name" type="text" class="validate"></input>
              <label for="name">
                Cardholder Name
                <i class="material-icons right" style={{ marginRight: "1em" }}>
                <Person/> 
                </i>
              </label>
            </div>
            <div class="input-field col s12">
              <input id="cardNumber" type="text" class="validate"></input>
              <label for="cardNumber">
                Card Number
                <i class="material-icons right" style={{ marginRight: "1em" }}>
                <CreditCard/>
                </i>
              </label>
            </div>

            <div class="input-field col s12 datepicker">
              <input id="expiry" type="text" class="validate"></input>
              <label for="expiry">
                Expiry Date
                <i class="material-icons right" style={{ marginRight: "1em" }}>
                <DateRange/>
                </i>
              </label>
            </div>
            <div class="input-field col s12">
              <input id="cvc" type="text" class="validate"></input>
              <label for="cvc">
                CVC
                <i class="material-icons right" style={{ marginRight: "1em" }}>
                  <Lock/>
                </i>
              </label>
            </div>
          </div>
          <button
            class="btn waves-effect waves-light black"
            type="submit"
            name="action"
          >
            Submit
            <i class="material-icons right"><Send/></i>
          </button>
        </form>
;
  }