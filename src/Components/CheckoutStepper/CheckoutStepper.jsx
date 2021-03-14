import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Login from "../../Components/Login/Login";
import AddressForm from "./AdressForm";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import PaymentStatus from "./PaymentStatus";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setShippingInfo } from "../../features/userSlice";
import { db } from "../../firebase";
import { selectBasket } from "../../features/basketSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  btnNext: {
    marginLeft: "70%",
    textAlign: "right",
  },
}));

function getSteps() {
  return ["fill your shipping adress", "choose your payment system", "Pay"];
}

export default function CheckoutStepper() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLEKEY);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const submitAdress = (data) => {
    localStorage.setItem("shippingAdress", JSON.stringify(data));
    handleNext();
    dispatch(setShippingInfo({ ...data }));
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AddressForm submitAdress={submitAdress} />;
      case 1:
        return (
          <Elements stripe={stripePromise}>
            <CheckoutForm handleBack={handleBack} />
          </Elements>
        );

      default:
        return "Unknown stepIndex";
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography className={classes.instructions}>
        {getStepContent(activeStep)}
      </Typography>
    </div>
  );
}
