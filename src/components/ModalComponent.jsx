import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
function ModalComponent({ show, setShow, data }) {
  const wishlistData = useSelector((state) => state.wishlistReducer.wishlist);
  const handleClose = () => {
    setShow(false);
  };
  console.log(data);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Meme details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <div
          className="card m-1 container"
          style={{}}
          key={data.id}
          // onClick={(e) => {
          //   showModal(e, data);
          // }}
        >
          {/* {wishlistData.indexOf(data) < 0 ? (
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
          )} */}
          <img className="card-img-top" src={data.url} alt="Card image cap" />
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
