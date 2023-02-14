import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { addToWishlist, removeFromWishlist } from "../store/actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../App.css";
import Navbar from "./Navbar";
import { useParams, useLocation } from "react-router-dom";
function DetailsPage() {
  const navigate = useNavigate();

  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const data = location.state.singleData;
  let setData = location.state.setData;
  let setWishlistView = location.state.setWishlistView;
  console.log(location, "here");

  const wishlistData = useSelector((state) => state.wishlistReducer.wishlist);
  const initialData = useSelector(
    (state) => state.initialDataReducer.initialData
  );
  const handleAdd = (e, data) => {
    let ind = wishlistData.indexOf(data);
    ind < 0 ? dispatch(addToWishlist(data)) : null;
    Swal.fire("Added!", "Meme added to your wishlist!", "success");
  };
  const handleRemove = (e, data) => {
    e.preventDefault();
    dispatch(removeFromWishlist(data));
    Swal.fire("Removed!", "Meme removed from your wishlist !", "success");
  };

  return (
    <div className="main">
      <nav className="navbar  " style={{ backgroundColor: "#66dde8" }}>
        <div className="container-fluid">
          <span>Meme world</span>
          <div className=" ">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="btn btn-success"
            >
              Back
            </button>
          </div>
        </div>
      </nav>

      <div
        className="card m-1 container "
        style={{ width: "500px" }}
        key={data.id}
      >
        {wishlistData.indexOf(data) < 0 ? (
          <BsSuitHeart
            onClick={(e) => {
              handleAdd(e, data);
            }}
            className="icon fa-lg"
          >
            Add to Whishlist
          </BsSuitHeart>
        ) : (
          <BsSuitHeartFill
            style={{ color: "red" }}
            onClick={(e) => {
              handleRemove(e, data);
            }}
            className="icon fa-lg"
          />
        )}
        <img
          className="card-img-top"
          src={data.url}
          alt="Card image cap"
          style={{ height: "50%", width: "50%" }}
        />

        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
        </div>
        <div>
          <span>Meme detail : </span> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Aut at cum ea quidem dolores, nemo eaque id
          cupiditate architecto commodi vel modi explicabo aliquam rerum sit
          velit ratione, maxime officiis.
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
