import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/actions";
function Wishlist({ wishlistData }) {
  //const wishlistData = useSelector((state) => state.wishlistReducer.wishlist);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleRemove = (e, data) => {
    e.preventDefault();
    dispatch(removeFromWishlist(data));
  };
  return (
    <div>
      {console.log(wishlistData, "here...")}
      <div className="card-holder-parent  row ">
        {loading == true ? (
          <h1>Loading...</h1>
        ) : (
          wishlistData?.map((elm) => {
            return (
              /* */

              <div
                className="card m-1"
                style={{ width: "19%", height: "auto" }}
                key={elm.id}
              >
                <img
                  className="card-img-top"
                  src={elm.url}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{elm.name}</h5>
                </div>
                <div
                  onClick={(e) => {
                    handleRemove(e, elm);
                  }}
                >
                  Remove
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Wishlist;
