import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  initialAdd,
  addToWishlist,
  removeFromWishlist,
} from "../store/actions";
import { useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist";
import Swal from "sweetalert2";
import ModalComponent from "./ModalComponent";
import SingleMemeDetail from "./SingleMemeDetail";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistView, setWishlistView] = useState(false);
  const [serachText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const [singleData, setSingleData] = useState([]);

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
    Swal.fire("Success!", "Meme added to your wishlist!", "success");
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
  const handleRemove = (e, data) => {
    e.preventDefault();
    dispatch(removeFromWishlist(data));
  };
  const showModal = (e, data) => {
    e.preventDefault();
    setSingleData(data);
    setShow(true);
  };

  return (
    <>
      <div className="main-home-page">
        <div className="navbar-div" style={{ backgroundColor: "#66dde8" }}>
          <nav className="navbar  ">
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
        <ModalComponent show={show} setShow={setShow} data={singleData} />

        {wishlistView == true ? (
          <Wishlist wishlistData={wishlistData} />
        ) : (
          <div className="card-holder-parent  row ">
            {loading == true ? (
              <h1>Loading...</h1>
            ) : data.length > 0 ? (
              data?.map((elm) => {
                return (
                  <div
                    className="card m-1 container shadow-lg p-3 mb-5 bg-body rounded"
                    style={{ width: "19%" }}
                    key={elm.id}
                  >
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
                        showModal(e, elm);
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{elm.name}</h5>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No memes found</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
