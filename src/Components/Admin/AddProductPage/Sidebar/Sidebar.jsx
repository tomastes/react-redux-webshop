import { SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/userSlice";
import { db } from "../../../../firebase";
import "./Sidebar.css";
const Sidebar = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  function fetchProducts() {
    db.collection("products")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  const deleteHandlar = (id) => {
    console.log(id);
    db.collection("products").doc(id).delete();
  };
  const updateHandlar = (id) => {
    console.log(id);
  };
  return (
    <div className="sidebar">
      <div className="search_container">
        <form action="">
          <input type="text" name="search" placeholder="search" id="" />
          <SearchOutlined />
        </form>
      </div>
      {/* products list */}
      <div className="Sidebar_productsList">
        {products?.map(({ id, data }) => (
          <div key={id} className="single_product">
            <img src={data.image} alt="" />
            <div className="product_detail">
              <p className="product_detail_title">{data.title}</p>
              <p className="product_detail_author">{data.author}</p>
            </div>
            <div className="product_buttons">
              <p onClick={(e) => deleteHandlar(id)} className="delete_button">
                delete
              </p>
              {/* <p onClick={(e) => updateHandlar(id)} className="update_button">
                update
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
