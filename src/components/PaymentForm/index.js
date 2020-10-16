import React, {useEffect, useState} from "react";
import {InputLabel, MenuItem, FormHelperText, FormControl, Grid, TextField, Button} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    flexGrow: 1
  },
  inputLabel: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(2)

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {

  }
}));



export default function PaymentForm(props) {

    const classes = useStyles();
    const [cardType, setCardType] = React.useState('');
    const [name, setCardholderName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [cvc, setCVC] = React.useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());

    const handleCardTypeChange = (e) => {
      setCardType(e.target.value);
    };

    const handleCardNameChange = (e) => {
      setCardholderName(e.target.value);
    };

    const handleCardNumberChange = (e) => {
      setCardNumber(e.target.value);
    };

    const handleCVC = (e) => {
      setCVC(e.target.value);
    };


    const handleDateChange = (date) => {
      setExpiryDate(date);
    };


    function handleSubmit(e) {
        console.log(cardType, name, cardNumber, cvc, expiryDate)

        if (!cardType || !name || !cardNumber || !cvc || !expiryDate) {
         alert('One of the required fields is missing') 
        }

        e.preventDefault();
    }

//'{"name": "Gerry", "type": "mastercard", "number": "1234-1234-1234-1234", "expiry": "01/23", "cvc": "123"}' localhost:8080  | jq
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="column"
        >
          <Grid item xs={12}>
                <FormControl  fullWidth >
                  <InputLabel 
                    id="cardTypeMUILabel" 
                    variant="standard"
                    className={classes.root}
                    required
                  >
                    {props.dropdownDefault}</InputLabel>
                  <Select
                    id="cardTypeMUI"
                    value={cardType}
                    onChange={handleCardTypeChange}
                    className={classes.root}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Visa'}>Visa</MenuItem>
                    <MenuItem value={'Mastercard'}>Mastercard</MenuItem>
                    <MenuItem value={'AmericanExpress'}>AmericanExpress</MenuItem>
                  </Select>

                  <TextField 
                    id="name" 
                    label="Cardholder Name"
                    className={classes.root}
                    onChange={handleCardNameChange}
                    required
                  />
                  <TextField 
                    id="number" 
                    label="Card Number"
                    className={classes.root}
                    onChange={handleCardNumberChange}
                    required
                  />
                  <TextField 
                    id="cvc" 
                    label="CVC"
                    className={classes.root}
                    onChange={handleCVC}
                    required
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.root}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Expiry Date"
                        format="MM/dd/yyyy"
                        value={expiryDate}
                        onChange={handleDateChange}
                        className={classes.root}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        required
                      />
                  </MuiPickersUtilsProvider>
              </FormControl>
                  <Button
                    variant="contained"
                    className={classes.button}
                    fullWidth
                    type="submit"
                    onClick={handleSubmit}
                  >Submit Payment</Button>

              </Grid>
            </Grid>

      </div>

    );


  }