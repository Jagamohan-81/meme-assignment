import React from "react";
import SerachBar from "./SerachBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar({ setData, setWishlistView }) {
  const wishlistData = useSelector((state) => state.wishlistReducer.wishlist);
  const navigate = useNavigate();

  const initialData = useSelector(
    (state) => state.initialDataReducer.initialData
  );
  const showWishlist = (e) => {
    e.preventDefault;
    setData(wishlistData);
    setWishlistView(true);
  };

  return (
    <div className="navbar-div" style={{ backgroundColor: "#66dde8" }}>
      <nav className="navbar  ">
        <div className="container-fluid">
          <span>Meme world</span>
          <div className=" ">
            <span
              onClick={(e) => {
                // navigate("/main");
                setData(initialData), setWishlistView(false);
              }}
              className="wishlist-icon"
            >
              Home
            </span>
            <span
              onClick={(e) => {
                showWishlist(e);
              }}
              className="wishlist-icon mx-2"
            >
              Wishlist
            </span>
          </div>
          <SerachBar setData={setData} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
