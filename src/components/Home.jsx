import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { initialAdd } from "../store/actions";
import { useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist";
import SingleMemeDetail from "./SingleMemeDetail";
import SerachBar from "./SerachBar";
import Navbar from "./Navbar";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistView, setWishlistView] = useState(false);

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

  return (
    <>
      <div className="main-home-page">
        <Navbar setData={setData} setWishlistView={setWishlistView} />

        {wishlistView == true ? (
          <Wishlist wishlistData={wishlistData} />
        ) : (
          <div className="card-holder-parent  row ">
            {loading == true ? (
              <h1>Loading...</h1>
            ) : data.length > 0 ? (
              data?.map((elm) => {
                return (
                  <SingleMemeDetail
                    elm={elm}
                    setSingleData={setSingleData}
                    key={elm.id}
                  />
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
