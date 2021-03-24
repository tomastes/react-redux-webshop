import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db, storage } from "../../../../firebase";
import firebase from "firebase";
import "./AddProductForm.css";
const AddProductForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [weight, setWeight] = useState("");
  const handleAddProduct = (data) => {
    setLoading(true);
    //!upload image first
    console.log(data.image[0].lastModified);
    const uploadTask = storage
      .ref(`images/${data.image[0].lastModified}${data.image[0].name}`)
      .put(data.image[0]);
    //! and get url
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(data.image[0].name)
          .getDownloadURL()
          .then((url) => {
            db.collection("products")
              .add({
                author: data.author,
                amount: parseFloat(data.amount),
                weight: parseFloat(data.weight),
                title: data.title,
                price: parseFloat(data.price),
                description: data.description,
                image: url,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then((res) => {
                setDescription("");
                setTitle("");
                setPrice("");
                setAuthor("");
                setLoading(false);
              })
              .catch((error) => {
                alert(error);
              });
          });
      }
    );
  };
  return (
    <div className="form_container">
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <h2>Add product </h2>
        <label htmlFor="Author">Author</label>
        <input
          ref={register({ required: true })}
          name="author"
          placeholder="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <p>author is required</p>}
        <label htmlFor="Title">Title</label>
        <input
          ref={register({ required: true })}
          name="title"
          placeholder="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p>title is required</p>}
        <label htmlFor="price">Price</label>
        <input
          ref={register({ required: true })}
          name="price"
          placeholder="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p>price is required</p>}
        {/* in stock */}
        <label htmlFor="amount">in stock</label>
        <input
          ref={register({ required: true })}
          name="amount"
          placeholder="in stock"
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <p>in stock is required</p>}
        {/* weight in  gram */}
        <label htmlFor="weight">Weight in grams</label>
        <input
          ref={register({ required: true })}
          name="weight"
          placeholder="weight in grams"
          type="number"
          value={weight}
          min={0}
          onChange={(e) => setWeight(e.target.value)}
        />
        {errors.price && <p>price is required</p>}
        <label htmlFor="image">Image</label>
        <input
          ref={register({ required: true })}
          name="image"
          placeholder="file"
          type="file"
        />
        {errors.file && <p>file is required</p>}
        <label htmlFor="Description">Description</label>
        <textarea
          ref={register({ required: true })}
          name="description"
          placeholder="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p>title is required</p>}
        <Button disabled={loading} type="submit" className="btn_addProduct">
          Add{loading && <CircularProgress className="btn_loading" size={28} />}
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;
