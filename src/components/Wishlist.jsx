import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/actions";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

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
        ) : wishlistData.length < 1 ? (
          <h6 style={{}}>No meme added to wishlist</h6>
        ) : (
          wishlistData?.map((elm) => {
            return (
              /* */

              <div
                className="card m-1 container"
                style={{ width: "19%", height: "auto" }}
                key={elm.id}
              >
                <BsSuitHeartFill
                  style={{ color: "red" }}
                  onClick={(e) => {
                    handleRemove(e, elm);
                  }}
                  className="icon fa-lg"
                />
                <img
                  className="card-img-top"
                  src={elm.url}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{elm.name}</h5>
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

// import React, { Component } from 'react'

// export default class Wishlist extends Component {
//   constructor(props) {
//   }
//   render() {
//     return (
//       <div>
//       {console.log(wishlistData, "here...")}
//       <div className="card-holder-parent  row ">
//         {loading == true ? (
//           <h1>Loading...</h1>
//         ) : wishlistData.length < 1 ? (
//           <h6 style={{}}>No meme added to wishlist</h6>
//         ) : (
//           wishlistData?.map((elm) => {
//             return (
//               /* */

//               <div
//                 className="card m-1 container"
//                 style={{ width: "19%", height: "auto" }}
//                 key={elm.id}
//               >
//                 <BsSuitHeartFill
//                   style={{ color: "red" }}
//                   onClick={(e) => {
//                     handleRemove(e, elm);
//                   }}
//                   className="icon fa-lg"
//                 />
//                 <img
//                   className="card-img-top"
//                   src={elm.url}
//                   alt="Card image cap"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{elm.name}</h5>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//     )
//   }
// }
