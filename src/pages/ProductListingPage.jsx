import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartReducer";
import { addToWishlist, removeFromWishlist } from "../features/wishlistReducer";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
export default function ProductListingPage() {
  const navigate = useNavigate();

  const {
    data: outfits,
    loading,
    error,
  } = useFetch("https://mystylespot-backend.onrender.com/outfit", []);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState(550);
  const [sortBy, setSortBy] = useState("");

  // For search filter from Redux
  const searchText = useSelector((state) => state.search.text.toLowerCase());

  // Redux dispatch and selectors
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Filtering the outfits based on filters
  let filteredOutfits = outfits.filter((outfit) => {
    const matchesCategory =
      selectedCategory.length === 0 ||
      selectedCategory.includes(outfit.category);
    const matchesRating =
      selectRating === null || outfit.rating >= selectRating;
    const matchesPrice = outfit.price <= priceRange;
    const matchesSearch =
      searchText === "" ||
      outfit.title.toLowerCase().includes(searchText) ||
      outfit.category.toLowerCase().includes(searchText);

    return matchesCategory && matchesRating && matchesPrice && matchesSearch;
  });

  // Sorting
  if (sortBy === "Price-Low To High") {
    filteredOutfits = filteredOutfits.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price-High To Low") {
    filteredOutfits = filteredOutfits.sort((a, b) => b.price - a.price);
  }

  // Handlers for filter inputs
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategory((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  const handleRatingChange = (e) => {
    setSelectedRating(parseFloat(e.target.value));
  };

  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value, 10));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Wishlist toggle
  const handleAddToWishlist = (outfit) => {
    const isPresent = wishlistItems.some((item) => item._id === outfit._id);
    if (isPresent) {
      dispatch(removeFromWishlist(outfit._id));
      toast.error(`Removed "${outfit.title}" from wishlist.`);
    } else {
      dispatch(addToWishlist(outfit));
      toast.success(`Added "${outfit.title}" to wishlist! ❤️`);
    }
  };

  // // Cart toggle
  // const handleToggleCart = (outfit) => {
  //   const isPresent = cartItems.some((item) => item._id === outfit._id);
  //   if (isPresent) {
  //     dispatch(removeFromCart(outfit._id));
  //   } else {
  //     dispatch(addToCart(outfit));
  //   }
  // };

  const handleToggleCart = (outfit) => {
    const isPresent = cartItems.some((item) => item._id === outfit._id);

    if (isPresent) {
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
            {/* filters */}
            <div className="col-md-3">
              <div className="d-flex justify-content-between">
                <h5>Filters</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    setSelectedCategory([]);
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
              <div className="d-flex justify-content-between ">
                <span>350</span>
                <span>450</span>
                <span>550</span>
              </div>
              <input
                type="range"
                className="form-range"
                min="350"
                max="550"
                step="100"
                value={priceRange}
                onChange={handlePriceChange}
              />
              <br />
              <br />
              <h5>Category</h5>
              <label htmlFor="men">
                <input
                  type="checkbox"
                  value="Men"
                  id="men"
                  onChange={handleCategoryChange}
                  checked={selectedCategory.includes("Men")}
                />{" "}
                Men Clothing
              </label>
              <br />
              <label htmlFor="women">
                <input
                  type="checkbox"
                  value="Women"
                  id="women"
                  onChange={handleCategoryChange}
                  checked={selectedCategory.includes("Women")}
                />{" "}
                Women Clothing
              </label>
              <br />
              <label htmlFor="kids">
                <input
                  type="checkbox"
                  value="Kids"
                  id="kids"
                  onChange={handleCategoryChange}
                  checked={selectedCategory.includes("Kids")}
                />{" "}
                Kids Clothing
              </label>

              <br />
              <br />
              <h5>Rating</h5>
              <label for="4Stars">
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
              <label for="3Stars">
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
              <label for="2Stars">
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
              <label for="1Stars">
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

            {/* products list */}
            <div className="col-md-9 bg-light py-4 px-4">
              <h5>
                Showing All Products{" "}
                <small>(Showing {filteredOutfits.length} products)</small>
              </h5>
              <p>
                <i>Find your perfect style match right here!🥰</i>
              </p>
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
                          {/* rest of the card content */}
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
          <>
            {loading && (
              <p className="alert alert-primary">Loading Products List...</p>
            )}
            {error && (
              <p className="alert alert-danger">
                Error loading products: {error}
              </p>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
