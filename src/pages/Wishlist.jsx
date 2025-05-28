import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../features/wishlistReducer";
import { addToCart, removeFromCart } from "../features/cartReducer";
import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WishlistPage() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Header wishlist={wishlistItems} />
      <main className="container py-4">
        <h2>My Wishlist</h2>

        {loading && (
          <p className="alert alert-primary" role="alert">
            Loading products...
          </p>
        )}

        {wishlistItems.length === 0 ? (
          <h5 className="text-center py-4">
            <i>
              It looks like your wishlist is craving attention. Add something
              it’ll love...! 💘
            </i>
          </h5>
        ) : (
          <>
            <h5 className="py-4">
              <i>Looks like you’ve got great taste—these picks are 🔥!</i>
            </h5>
            <div className="row">
              {wishlistItems.map((outfit) => (
                <div className="col-md-4" key={outfit._id}>
                  <div className="card text-center">
                    <img
                      src={outfit.imgUrl}
                      className="card-img-top ms-5 py-2"
                      alt={outfit.title}
                      style={{ height: "350px", width: "300px" }}
                    />
                    <button
                      onClick={() => handleAddToWishlist(outfit)}
                      className="position-absolute top-0 end-0 m-3 fs-5"
                      style={{
                        background: "none",
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
                    <div className="card-body">
                      <h5 className="card-title">{outfit.title}</h5>
                      <p>
                        <b>₹ {outfit.price}</b>
                      </p>
                      <div className="d-grid gap-2">
                        <button
                          onClick={() => handleToggleCart(outfit)}
                          className="btn btn-outline-primary">
                          {cartItems.some((item) => item._id === outfit._id)
                            ? "Remove from Cart"
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />
    </>
  );
}
