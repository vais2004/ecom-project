import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart, removeFromCart } from "../features/cartReducer";
import { addToWishlist, removeFromWishlist } from "../features/wishlistReducer";

// Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductByCategory() {
  const navigate = useNavigate();

  const { category } = useParams();

  const {
    data: outfits = [],
    loading,
    error,
  } = useFetch(
    `https://mystylespot-backend.onrender.com/outfit/category/${category}`,
    []
  );

  const [filters, setFilters] = useState({
    priceRange: 550,
    rating: null,
    sortBy: "",
  });

  const [selectRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState(550);
  const [sortBy, setSortBy] = useState("");

  let filteredOutfits = outfits.filter((outfit) => {
    const matchesRating =
      selectRating === null || outfit.rating >= selectRating;
    const matchesPrice = outfit.price <= priceRange;
    return matchesRating && matchesPrice;
  });

  if (sortBy === "Price-Low To High") {
    filteredOutfits = filteredOutfits.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price-High To Low") {
    filteredOutfits = filteredOutfits.sort((a, b) => b.price - a.price);
  }

  const handleRatingChange = (e) => {
    setSelectedRating(parseFloat(e.target.value));
  };

  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value, 10));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const dispatch = useDispatch();
  //for wishlist
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleAddToWishlist = (outfit) => {
    const isPresentInWishlist = wishlistItems.some(
      (item) => item._id === outfit._id
    );
    if (isPresentInWishlist) {
      dispatch(removeFromWishlist(outfit._id));
      toast.error(`Removed "${outfit.title}" from wishlist.`);
    } else {
      dispatch(addToWishlist(outfit));
      toast.success(`Added "${outfit.title}" to wishlist! ❤️`);
    }
  };

  //cart

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleToggleCart = (outfit) => {
    const isPresentInCart = cartItems.some((item) => item._id === outfit._id);
    if (isPresentInCart) {
      dispatch(removeFromCart(outfit._id));
      toast.error(`Removed "${outfit.title}" from cart.`);
    } else {
      dispatch(addToCart({ ...outfit, quantity: 1 }));
      toast.success(`Added "${outfit.title}" to cart! 🛒`);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />

      <main className="container-fluid py-3">
        {outfits ? (
          <div className="row">
            <div className="col-md-3">
              <div className="d-flex justify-content-between">
                <h5>Filters</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    setSelectedRating(null);
                    setPriceRange(550);
                    setSortBy("");
                  }}>
                  Clear Filters
                </button>
              </div>
              <br />
              <br />
              <h5>Price</h5>

              <div className="d-flex justify-content-between">
                <span>350</span>
                <span>450</span>
                <span>550</span>
              </div>
              <input
                type="range"
                className="form-range"
                id="priceSlider"
                min="350"
                max="550"
                step="100"
                value={priceRange}
                onChange={handlePriceChange}
              />
              <br />
              <br />

              <h5>Rating</h5>
              <label htmlFor="4Stars">
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  id="4Stars"
                  onChange={handleRatingChange}
                  checked={selectRating === 4}
                />{" "}
                4 Star & above
              </label>
              <br />
              <label htmlFor="3Stars">
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  id="3Stars"
                  onChange={handleRatingChange}
                  checked={selectRating === 3}
                />{" "}
                3 Star & above
              </label>
              <br />
              <label htmlFor="2Stars">
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  id="2Stars"
                  onChange={handleRatingChange}
                  checked={selectRating === 2}
                />{" "}
                2 Star & above
              </label>
              <br />
              <label htmlFor="1Stars">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  id="1Stars"
                  onChange={handleRatingChange}
                  checked={selectRating === 1}
                />{" "}
                1 Star & above
              </label>
              <br />
              <br />
              <h5>Sort by</h5>
              <label htmlFor="lowToHigh">
                <input
                  type="radio"
                  name="sortBy"
                  value="Price-Low To High"
                  id="lowToHigh"
                  onChange={handleSortChange}
                  checked={sortBy === "Price-Low To High"}
                />{" "}
                Price-Low To High
              </label>
              <br />
              <label htmlFor="highToLow">
                <input
                  type="radio"
                  name="sortBy"
                  value="Price-High To Low"
                  id="highToLow"
                  onChange={handleSortChange}
                  checked={sortBy === "Price-High To Low"}
                />{" "}
                Price-High To Low
              </label>
            </div>

            <div className="col-md-9 bg-light py-4 px-4">
              <h5>
                Showing All Products{" "}
                <small>
                  <span>
                    {" "}
                    <small>(Showing {filteredOutfits.length} products) </small>
                  </span>
                </small>
              </h5>
              <i>
                {category === "Women"
                  ? "Hey Women, your style deserves to turn heads everywhere you go!🦋"
                  : category === "Kids"
                  ? "Kids, get ready to shine bright with colors as playful as you are!🌈"
                  : "Men, step up your game with styles that match your confidence.👑"}
              </i>{" "}
              <hr />
              {loading && (
                <p className="alert alert-primary" role="alert">
                  Loading products...
                </p>
              )}
              <div className="container">
                <div className="row g-3">
                  {filteredOutfits.map((outfit) => (
                    <div
                      key={outfit._id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3">
                      <div className="card h-100 d-flex flex-column">
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "250px", overflow: "hidden" }}>
                          <img
                            src={outfit.imgUrl}
                            alt={outfit.title}
                            className="img-fluid"
                            style={{
                              objectFit: "contain",
                              maxHeight: "100%",
                              maxWidth: "100%",
                              cursor: "pointer",
                            }}
                            onClick={() => navigate(`/details/${outfit._id}`)}
                          />
                          <button
                            onClick={() => handleAddToWishlist(outfit)}
                            className="position-absolute top-0 end-0 m-1 fs-4"
                            style={{
                              background: "none",
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                              border: "1px solid",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderColor: "lightgray",
                            }}>
                            {wishlistItems.some(
                              (item) => item._id === outfit._id
                            )
                              ? "❤️"
                              : "🤍"}
                          </button>
                        </div>
                        <div className="card-body text-center d-flex flex-column">
                          <h6 className="card-title">{outfit.title}</h6>
                          <p className="card-text fw-bold mb-3">
                            ₹ {outfit.price}
                          </p>

                          <button
                            onClick={() => handleToggleCart(outfit)}
                            className={`btn mt-auto ${
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="alert alert-primary" role="alert">
            Loading Products List...
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
