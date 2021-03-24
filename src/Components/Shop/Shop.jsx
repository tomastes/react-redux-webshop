import { IconButton } from "@material-ui/core";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteOutlined,
  ShoppingBasketRounded,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, selectBasket } from "../../features/basketSlice";
import { addToLikes, selectLikes } from "../../features/likesSlice";
import { db } from "../../firebase";
import "./Shop.css";
const Shop = () => {
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  const likes = useSelector(selectLikes);
  const [products, setProducts] = useState([]);

  const [liked, setLiked] = useState(false);

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
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);
  const addToCartHandlar = (id) => {
    const checkIfInBasket = basket?.find((item) => item.id == id);
    if (checkIfInBasket) {
      return;
    }
    const productToBasket = products?.find((item) => item.id == id);

    const { data } = productToBasket;

    dispatch(
      addToBasket({
        id,
        price: data.price,
        title: data.title,
        image: data.image,
        author: data.author,
        amount: 1,
        inStock: data.amount,
      })
    );
    localStorage.setItem("basket", JSON.stringify(basket));
  };
  const addToLikedHandlar = (id) => {
    const checkIfInLikes = likes?.find((item) => item.id == id);
    if (checkIfInLikes) {
      return;
    }
    const productToLikes = products?.filter((item) => item.id == id);
    const { data } = productToLikes[0];
    dispatch(
      addToLikes({
        id,
        price: data.price,
        title: data.title,
        image: data.image,
        author: data.author,
      })
    );
  };

  return (
    <div className="shop_container">
      {/* shop header */}
      <div className="shop_header">
        <h4>
          {" "}
          ወኵሉ መጽሐፍ ዘበመንፈሰ እግዚአብሔር ተጽሕፈ ይበቍዕ ለኵሉ ትምህርት ወተግሣጽ ወአርትዖ ወጥብብ ወጽድቅ።{" "}
        </h4>
      </div>
      {/* mains shop */}
      <div className="shop_products_view">
        {products
          ?.filter(({ data }) => data.amount > 0)
          .map(({ id, data }) => (
            <div key={id} className="shop_single_product">
              <div className="shop_singleProduct_detail">
                <img src={data.image} alt="product iamge" />
                <div className="shop_singleProduct_Minidetail">
                  <p className="title">{data.title}</p>
                  <p className="author">A book By: {data.author}</p>
                  <p className="description">{data.description}</p>
                  <p className="price">${data.price}.00</p>
                  {basket?.find((item) => item.id == id) ? (
                    <IconButton
                      disabled={true}
                      onClick={(e) => addToCartHandlar(id)}
                    >
                      <AddShoppingCartOutlined fontSize="large" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={(e) => addToCartHandlar(id)}>
                      <AddShoppingCartOutlined
                        color="primary"
                        fontSize="large"
                      />
                    </IconButton>
                  )}

                  {likes?.find((item) => item.id == id) ? (
                    <IconButton
                      disabled={true}
                      onClick={(e) => addToLikedHandlar(id)}
                    >
                      <FavoriteOutlined
                        fontSize="large"
                        style={{ color: "rgba(194, 3, 3, 0.493)" }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton onClick={(e) => addToLikedHandlar(id)}>
                      <FavoriteBorder fontSize="large" />
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shop;
