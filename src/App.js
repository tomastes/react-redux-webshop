import React, { useEffect } from "react";
import "./App.css";
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
import Orders from "./Components/Orders/Orders";
import NavContainer from "./Components/Containers/Navigation/NavContainer";
import PaswordReset from "./Components/Login/PaswordReset";
import Footer from "./Components/Footer/Footer";
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
      <Switch>
        {/* home */}
        <Route exact path="/">
          <NavContainer />
          <Footer />
        </Route>
        <Route path="/login">
          <Login />
          <Footer />
        </Route>
        <Route path="/signup">
          <SignUp />
          <Footer />
        </Route>
        <Route path="/resetPasword">
          <PaswordReset />
        </Route>
        {/* shop */}
        <Route path="/shop">
          <>
            <NavContainer />
            <Shop />
            <Footer />
          </>
        </Route>
        <Route path="/news">
          <>
            <NavContainer />
          </>
        </Route>
        <Route path="/basket">
          <>
            <NavContainer />
            <BasketPage />
            <Footer />
          </>
        </Route>
        <Route path="/about">
          <NavContainer />
          <Footer />
        </Route>
        {/* checkout stepper if user */}

        {/* to payment status */}
        <Route path="/orders">
          {user ? (
            <>
              <NavContainer />
              <Orders /> <Footer />
            </>
          ) : (
            <>
              <Login /> <Footer />
            </>
          )}
        </Route>

        {/* admin routes */}

        <Route path="/admin-addProducts">
          {user?.admin ? (
            <>
              <NavContainer /> <AddProductPage /> <Footer />
            </>
          ) : (
            <>
              <Login /> <Footer />
            </>
          )}
        </Route>
        {/* <Route path="/admin-Orders">
            {user?.admin ? (
              <>
                <NavContainer /> <Orders />
              </>
            ) : (
              <Login />
            )}
          </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
//
