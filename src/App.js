import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="container pt-3">
        <div className="row justify-content-center text-center">
          {/* Category Cards */}
          {["Men", "Women", "Kids"].map((category, i) => {
            const imgSrcs = {
              Men: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-256.png",
              Women:
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-256.png",
              Kids: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/girl-512.png",
            };

            return (
              <div
                key={category}
                className="col-6 col-sm-4 col-md-4 mb-3 d-flex justify-content-center">
                <div
                  className="bg-light p-3 rounded d-flex flex-column align-items-center"
                  style={{
                    cursor: "pointer",
                    maxWidth: "150px",
                    width: "100%",
                  }}
                  onClick={() => navigate(`/outfits/${category}`)}>
                  <img
                    src={imgSrcs[category]}
                    alt={`${category} category`}
                    className="img-fluid"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div>
                    <span className="badge text-bg-secondary px-2 py-2 fs-6 d-block mt-2">
                      {category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel */}
        <div className="mt-5 bg-light">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {[
                {
                  src: "https://static.vecteezy.com/system/resources/previews/004/759/229/non_2x/super-big-sale-background-free-vector.jpg",
                  captionTitle: "BUY 1 GET 1 FREE",
                  captionText:
                    "Gen Young Fashion from Rs.249 + Extra discount + Free delivery",
                },
                {
                  src: "https://assets-global.website-files.com/6523ed2d670117e5922bd1d3/6569c51a8f5de07a8689b3cc_655222fa52c3b2554888c9a6_Retail-Software-Development.jpeg",
                  captionTitle: "",
                  captionText: "",
                },
                {
                  src: "https://explainerd.com/wp-content/uploads/2022/08/Ecommerce-Product-Videos-The-Definitive-Guide.jpg",
                  captionTitle: "",
                  captionText: "",
                },
              ].map(({ src, captionTitle, captionText }, idx) => (
                <div
                  key={idx}
                  className={`carousel-item${idx === 0 ? " active" : ""}`}>
                  <img
                    src={src}
                    className="d-block w-100 img-fluid"
                    alt={`Slide ${idx + 1}`}
                    style={{
                      maxHeight: "550px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/products")}
                  />
                  {(captionTitle || captionText) && (
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                      <h3>{captionTitle}</h3>
                      <p>{captionText}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev">
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next">
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* New Arrivals Section */}
        <div className="row my-4 g-3">
          {[1, 2].map((item) => (
            <div key={item} className="col-12 col-md-6">
              <div className="d-flex bg-light p-3">
                <img
                  src="https://thumbs.dreamstime.com/b/hand-drawn-fashion-woman-clothes-vector-accessories-watercolor-sketch-outfit-modern-illustration-model-summer-beautiful-style-127472984.jpg"
                  alt="Summer Collection"
                  className="img-fluid"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
                <div className="ms-3">
                  <small>NEW ARRIVALS</small>
                  <h5>
                    <b>Summer Collection</b>
                  </h5>
                  <p className="text-muted">
                    Check out our best winter collection to stay warm in style
                    this season.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
