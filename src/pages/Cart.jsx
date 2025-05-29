import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../features/cartReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../features/wishlistReducer";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const navigate = useNavigate();
  const goToPlaceOrder = () => {
    navigate("/place-order");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleAddToWishlist = (outfit) => {
    const isInWishlist = wishlistItems.some((item) => item._id === outfit._id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(outfit._id));
      toast.error(`Removed "${outfit.title}" from wishlist.`);
    } else {
      dispatch(addToWishlist(outfit));
      toast.success(`Added "${outfit.title}" to wishlist! ❤️`);
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.error(`Removed from cart.`);
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(updateQuantity(product._id, product.quantity + 1));
    toast.info("Quantity increased");
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(updateQuantity(product._id, product.quantity - 1));
      toast.info("Quantity decreased");
    }
  };

  const getTotal = () => {
    return cartItems.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  };

  const discountPrice = getTotal() * 0.8;

  return (
    <>
      <Header />
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />
      <main className="container py-5">
        <h2 className="mb-3">My Cart</h2>
        <span>
          Total items in cart:{" "}
          {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </span>
        <hr />

        {cartItems.length === 0 ? (
          <>
            <p className="alert alert-warning text-center">
              Your cart is empty...!
            </p>
            <h4 className="text-secondary text-center mt-5">
              Your cart’s looking a little lonely… maybe it needs a friend!
            </h4>
            <h6 className="text-center text-success">
              You're just getting started! There's so much more waiting to be
              discovered.
            </h6>
            <div className="d-grid gap-2 col-12 col-sm-6 col-md-4 mx-auto py-4">
              <Link className="btn btn-outline-warning" to="/products">
                Continue shopping...!
              </Link>
            </div>
          </>
        ) : (
          <div className="row gy-4">
            {/* Cart Items Column */}
            <div className="col-12 col-lg-7">
              {cartItems.map((product) => (
                <div className="card mb-3" key={product._id}>
                  <div className="row g-0">
                    <div className="col-12 col-md-4 position-relative">
                      <img
                        src={product.imgUrl}
                        className="img-fluid py-2 ps-2 pe-2 rounded-start w-100"
                        alt={product.title}
                        style={{ objectFit: "cover", height: "100%" }}
                        onClick={() => navigate(`/details/${product._id}`)}
                      />
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className="position-absolute top-0 end-0 m-2 fs-5"
                        style={{
                          background: "white",
                          border: "1px solid #ccc",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        aria-label="Toggle Wishlist">
                        {wishlistItems.some((item) => item._id === product._id)
                          ? "❤️"
                          : "🤍"}
                      </button>
                    </div>
                    <div className="col-12 col-md-8 pt-3 px-4">
                      <div className="card-body">
                        <h5 className="card-title fw-bold mb-3">
                          {product.title}
                        </h5>
                        <p className="card-text mb-1">
                          Price:{" "}
                          <strong>
                            ₹{product.price * 0.8}{" "}
                            <span className="text-muted">
                              <strike>₹{product.price}</strike>
                            </span>
                          </strong>
                        </p>
                        <p className="text-muted mb-2">
                          <b>20% off</b>
                        </p>
                        <div className="mb-3 d-flex align-items-center">
                          <span className="me-2">Quantity:</span>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => handleIncreaseQuantity(product)}>
                            +
                          </button>
                          <span className="fw-bold">{product.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm ms-2"
                            onClick={() => handleDecreaseQuantity(product)}>
                            -
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(product._id)}
                          className="btn btn-outline-danger w-100">
                          Remove From Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Details Column */}
            <div className="col-12 col-lg-5">
              <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="fw-bold mb-3">PRICE DETAILS</h5>
                <hr />
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between mb-2">
                    <span>Total item quantity</span>
                    <span>
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </li>
                  <hr />
                  <li className="d-flex justify-content-between mb-2">
                    <span>Price</span>
                    <span>₹{getTotal().toFixed(2)}</span>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>Discount</span>
                    <span className="text-success">
                      - ₹{(getTotal() * 0.2).toFixed(2)}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span>Delivery Charges</span>
                    <span className="text-danger">
                      ₹{cartItems.length > 0 ? 99 : 0}
                    </span>
                  </li>
                  <hr />
                  <li className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total Amount</span>
                    <span>
                      ₹
                      {(
                        getTotal() * 0.8 +
                        (cartItems.length > 0 ? 99 : 0)
                      ).toFixed(2)}
                    </span>
                  </li>
                </ul>
                <p className="text-success mt-2">
                  You will save ₹{(getTotal() * 0.2).toFixed(2)} on this order
                </p>
                <button
                  onClick={goToPlaceOrder}
                  className="btn btn-primary w-100 mt-3">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
