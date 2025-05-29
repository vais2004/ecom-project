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
          {/* category */}
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
                    maxWidth: "160px",
                    minWidth: "120px",
                    width: "100%",
                  }}
                  onClick={() => navigate(`/outfits/${category}`)}>
                  <img
                    src={imgSrcs[category]}
                    alt={`${category} category`}
                    className="img-fluid"
                    style={{ width: "60%", height: "auto" }}
                  />
                  <div className="col-12">
                    <span className="badge text-bg-secondary fw-normal px-3 py-2 fs-5 d-block mt-2">
                      <i>{category}</i>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* carousel */}
        <div className="py-4">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleSlidesOnly"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"></button>
              <button
                type="button"
                data-bs-target="#carouselExampleSlidesOnly"
                data-bs-slide-to="1"
                aria-label="Slide 2"></button>
              <button
                type="button"
                data-bs-target="#carouselExampleSlidesOnly"
                data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="col-12 btn btn-outline-secondary rounded-0">
              Shop the Full Collection →
            </button>
            <div className="carousel-inner">
              <div className="carousel-item position-relative active">
                <img
                  src="https://assets-global.website-files.com/6523ed2d670117e5922bd1d3/6569c51a8f5de07a8689b3cc_655222fa52c3b2554888c9a6_Retail-Software-Development.jpeg"
                  className="d-block w-100"
                  onClick={() => navigate("/products")}
                />
              </div>

              <div className="carousel-item position-relative">
                <img
                  src="https://explainerd.com/wp-content/uploads/2022/08/Ecommerce-Product-Videos-The-Definitive-Guide.jpg"
                  className="d-block w-100"
                  alt="Festive Product 2"
                  onClick={() => navigate("/products")}
                />
              </div>
              <div className="carousel-item position-relative">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/011/883/308/non_2x/fashion-clothing-store-for-women-template-hand-drawn-cartoon-flat-illustration-with-shopping-buying-products-cloth-or-dresses-design-vector.jpg"
                  className="d-block w-100"
                  alt="Festive Product 3"
                  style={{ height: "391.5px" }}
                  onClick={() => navigate("/products")}
                />
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="prev">
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="next">
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* new arrivals */}
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
