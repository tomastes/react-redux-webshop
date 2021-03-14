import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import AddProductForm from "./AddProductForm/AddProductForm";
import "./AddProductPage.css";
import Sidebar from "./Sidebar/Sidebar";
const AddProduct = () => {
  return (
    <div className="AddProduct">
      {/* form for adding  product */}
      <div className="add_Product_form__container">
        <AddProductForm />
      </div>
      {/* sidebar to show product */}
      <div className="sidebar_container">
        <Sidebar />
      </div>
    </div>
  );
};

export default AddProduct;
