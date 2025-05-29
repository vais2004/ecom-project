import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../features/cartReducer";
import { addToWishlist, removeFromWishlist } from "../features/wishlistReducer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    fetchOutfit();
  }, [id]);

  const fetchOutfit = async () => {
    try {
      const response = await fetch(
        `https://mystylespot-backend.onrender.com/outfit/${id}`
      );
      if (!response.ok) {
        console.error("Failed to fetch product details.");
        return;
      }
      const data = await response.json();
      setOutfit(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

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

  const handleToggleCart = (outfit) => {
    const isInCart = cartItems.some((item) => item._id === outfit._id);
    if (isInCart) {
      dispatch(removeFromCart(outfit._id));
      toast.error(`Removed "${outfit.title}" from cart.`);
    } else {
      dispatch(addToCart({ ...outfit, quantity: 1 }));
      toast.success(`Added "${outfit.title}" to cart! 🛒`);
    }
  };

  const renderStars = (rating) => {
    if (!rating) return "No rating";
    return "⭐️".repeat(rating);
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />

      {outfit ? (
        <main className="bg-light">
          <div className="container py-5">
            {loading && (
              <p className="alert alert-primary text-center" role="alert">
                Loading product Details...
              </p>
            )}
            <div className="card p-3 p-md-5">
              <div className="row g-4">
                <div className="col-12 col-md-5 col-lg-4">
                  <div
                    className="position-relative d-flex justify-content-center align-items-center bg-white rounded w-100"
                    style={{
                      height: "300px",
                      overflow: "hidden",
                    }}>
                    <img
                      src={outfit.imgUrl}
                      className="img-fluid"
                      alt={outfit.title}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                    />
                    <button
                      onClick={() => handleAddToWishlist(outfit)}
                      className="position-absolute top-0 end-0 m-2 fs-5 shadow-sm"
                      style={{
                        background: "white",
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        border: "1px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        cursor: "pointer",
                      }}
                      aria-label="Toggle Wishlist">
                      {wishlistItems.some((item) => item._id === outfit._id)
                        ? "❤️"
                        : "🤍"}
                    </button>
                  </div>

                  <div className="d-grid gap-2 col-10 col-md-8 mx-auto mt-4">
                    <button
                      onClick={() => handleToggleCart(outfit)}
                      className={`btn ${
                        cartItems.some((item) => item._id === outfit._id)
                          ? "btn-outline-danger"
                          : "btn-outline-primary"
                      }`}>
                      {cartItems.some((item) => item._id === outfit._id)
                        ? "Remove from Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>

                <div className="col-12 col-md-7 col-lg-8">
                  <h3>{outfit.title}</h3>
                  <p>
                    <b>Rating:</b>{" "}
                    <span className="fs-5">{renderStars(outfit.rating)}</span>
                  </p>
                  <p>
                    <b>Price:</b> ₹{outfit.price}
                  </p>
                  <p className="text-muted">50% off</p>

                  <p>
                    <b>Available Sizes:</b>
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    {["S", "M", "L", "XL", "XXL"].map((s) => (
                      <span
                        key={s}
                        className={`badge rounded-pill px-3 py-2 fs-6 ${
                          outfit.size === s
                            ? "text-bg-secondary border"
                            : "text-bg-light border border-secondary text-muted"
                        }`}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <br />
                  <p>
                    <b>Quantity:</b> 1
                  </p>

                  <hr />

                  <div className="row text-center mb-4">
                    {[
                      {
                        img: "https://cdn-icons-png.flaticon.com/512/1513/1513520.png",
                        text: "10 Days Returnable",
                      },
                      {
                        img: "https://th.bing.com/th/id/R.93f31d069567d92287a217aa607d39a2?rik=F%2ftEE4eBrxOoag&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ffree-shipping-png-free-shipping-icon-1600.png&ehk=kPdnOmIwc3o91rZ6p8fnz%2frQGzTAGS7xjUBk0MGZa5M%3d&risl=&pid=ImgRaw&r=0",
                        text: "Safe Delivery",
                      },
                      {
                        img: "https://cdn-icons-png.flaticon.com/512/10149/10149282.png",
                        text: "Pay on Delivery",
                      },
                      {
                        img: "https://cdn-icons-png.flaticon.com/512/8477/8477054.png",
                        text: "Secure Payment",
                      },
                    ].map(({ img, text }, index) => (
                      <div className="col-6 col-md-3 mb-3" key={index}>
                        <img
                          src={img}
                          alt={text}
                          className="img-fluid mb-2"
                          style={{ height: "50px", width: "50px" }}
                        />
                        <div className="small text-secondary">{text}</div>
                      </div>
                    ))}
                  </div>

                  <hr />
                  <strong>Description:</strong>
                  <p>{outfit.description}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <p className="alert alert-primary text-center my-5">
          Loading product details...
        </p>
      )}

      <Footer />
    </>
  );
}
