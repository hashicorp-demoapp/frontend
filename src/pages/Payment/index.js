import React, {useEffect} from "react";
import M from "materialize-css";
import '../../materialize.css'
import PaymentForm from '../../components/PaymentForm'

export default function Payment() {

  function handleChange(event) {
    this.setState({ value: event.target.value });
  }

  function handleSubmit(event) {
    alert("A credit card was submitted: " + this.state.value);
    event.preventDefault();
  }

    return (
      <div class="row">
        <PaymentForm
          dropdownDefault="Card Type"
        />
      </div>
    );
  }

//'{"name": "Gerry", "type": "mastercard", "number": "1234-1234-1234-1234", "expiry": "01/23", "cvc": "123"}' localhost:8080  | jq