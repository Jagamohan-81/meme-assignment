import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/actions";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function SingleMemeDetail({ elm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistData = useSelector((state) => state.wishlistReducer.wishlist);
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
    <div className="card m-1 container" style={{ width: "19%" }} key={elm.id}>
      {wishlistData.indexOf(elm) < 0 ? (
        <BsSuitHeart
          onClick={(e) => {
            handleAdd(e, elm);
          }}
          className="icon fa-lg"
        >
          Add to Whishlist
        </BsSuitHeart>
      ) : (
        <BsSuitHeartFill
          style={{ color: "red" }}
          onClick={(e) => {
            handleRemove(e, elm);
          }}
          className="icon fa-lg"
        />
      )}
      <img
        className="card-img-top"
        src={elm.url}
        alt="Card image cap"
        onClick={(e) => {
          navigate(`/details/${elm.id}`, {
            state: {
              singleData: elm,
            },
          });
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{elm.name}</h5>
      </div>
    </div>
  );
}

export default SingleMemeDetail;
