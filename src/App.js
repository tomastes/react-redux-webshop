import React, { useEffect } from "react";
import "./App.css";
import CheckoutStepper from "./Components/CheckoutStepper/CheckoutStepper";
import Navigation from "./Components/Navigation/Navigation";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import { auth, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import SignUp from "./Components/SignUp/SignUp";
import AddProductPage from "./Components/Admin/AddProductPage/AddProductPage";
import Shop from "./Components/Shop/Shop";
import BasketPage from "./Components/BasketPage/BasketPage";
import {
  selectBasket,
  setBasketFromLocalStorage,
} from "./features/basketSlice";
import PaymentStatus from "./Components/CheckoutStepper/PaymentStatus";
function App() {
  //  const history = useHistory();
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();

  // console.log(params);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === process.env.REACT_APP_ADMIN_ID1) {
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoURL,
              admin: true,
            })
          );
        } else {
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoURL,
              admin: false,
            })
          );
        }
      }
    });
    dispatch(
      setBasketFromLocalStorage(JSON.parse(localStorage.getItem("basket")))
    );
    console.log();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* home */}
          <Route exact path="/">
            <Navigation />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          {/* shop */}
          <Route path="/shop">
            <>
              <Navigation />
              <Shop />
            </>
          </Route>
          <Route path="/basket">
            <>
              <Navigation />
              <BasketPage />
            </>
          </Route>
          <Route path="/about">
            <Navigation />
          </Route>
          {/* checkout stepper if user */}
          <Route path="/checkout">
            {user ? (
              <>
                <Navigation />
                <CheckoutStepper />
                {/* <h2>passed</h2> */}
              </>
            ) : (
              <Login />
            )}
          </Route>
          {/* to payment status */}
          <Route path="/paymentStatus">
            {user ? (
              <>
                <Navigation />

                <PaymentStatus />
              </>
            ) : (
              <Login />
            )}
          </Route>

          {/* admin routes */}

          <Route path="/admin-addProducts">
            {user?.admin ? (
              <>
                <Navigation /> <AddProductPage />
              </>
            ) : (
              <Login />
            )}
          </Route>
          {/* <Route path="/admin-Orders">
            {user?.admin ? (
              <>
                <Navigation /> <Orders />
              </>
            ) : (
              <Login />
            )}
          </Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
//
