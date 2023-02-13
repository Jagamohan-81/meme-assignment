import React, { useState, useEffect } from "react";
import Axios from "axios";
import { RxHalf1, RxHeart } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import {
  initialAdd,
  addToWishlist,
  removeFromWishlist,
} from "../store/actions";
import { useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistView, setWishlistView] = useState(false);
  const [serachText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const initialData = useSelector(
    (state) => state.initialDataReducer.initialData
  );
  const wishlistData = useSelector((state) => state.wishlistReducer.wishlist);
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/");
  }
  useEffect(() => {
    setLoading(true);

    Axios.get("https://api.imgflip.com/get_memes").then((res) => {
      dispatch(initialAdd(res.data.data.memes));
      setData(res.data.data.memes);
    });
  }, []);

  useEffect(() => {
    initialData != undefined ? setData(initialData) : null;
    setLoading(false);
  }, []);
  // const filtered=()=>{

  // }
  const showWishlist = (e) => {
    e.preventDefault;
    setData(wishlistData);
    setWishlistView(true);
  };
  const handleAdd = (e, data) => {
    // console.log(wishlistData);

    let ind = wishlistData.indexOf(data);
    ind < 0 ? dispatch(addToWishlist(data)) : null;
    // console.log(ind);
  };
  const handleSerach = (e) => {
    e.preventDefault();
    console.log(serachText);
    const searched = initialData.filter((meme) => {
      if (meme.name.toLowerCase().includes(serachText.toLowerCase()) == true) {
        return meme;
      }
    });
    setData(searched);
  };

  return (
    <>
      <div className="main-home-page">
        <div className="navbar-div">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand">
                {wishlistView == true
                  ? "You loved these memes !"
                  : "Your Memes Destination !"}
              </a>
              <div className=" ">
                <span
                  onClick={(e) => {
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
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={(e) => {
                    handleSerach(e);
                  }}
                >
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>

        {wishlistView == true ? (
          <Wishlist wishlistData={wishlistData} />
        ) : (
          <div className="card-holder-parent  row ">
            {loading == true ? (
              <h1>Loading...</h1>
            ) : (
              data?.map((elm) => {
                return (
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
                    {wishlistView == false ? (
                      <button
                        type="button"
                        className="btn btn-success  m-2"
                        onClick={(e) => {
                          handleAdd(e, elm);
                        }}
                      >
                        Add2Whishlist
                      </button>
                    ) : null}
                    <i className="fas fa-plus-circle"></i>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
