import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function SerachBar({ setData }) {
  const [serachText, setSearchText] = useState("");
  const initialData = useSelector(
    (state) => state.initialDataReducer.initialData
  );
  const handleSerach = (e) => {
    e.preventDefault();
    // console.log(serachText);
    const searched = initialData.filter((meme) => {
      if (meme.name.toLowerCase().includes(serachText.toLowerCase()) == true) {
        return meme;
      }
    });

    setData(searched);
  };
  return (
    <div>
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
  );
}

export default SerachBar;
