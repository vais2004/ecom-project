import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="bg-light py-2 text-center">
        {/* <div className="container py-3 d-flex justify-content-between align-items-center"> */}
        <p className="mb-0 mx-auto text-center">
          &copy; MyStyleSpot. All rights reserved.
        </p>
        <br />
        <div className="pb-3">
          <i onClick={() => navigate("/")} className="bi bi-facebook px-2"></i>
          <i onClick={() => navigate("/")} className="bi bi-twitter-x px-2"></i>
          <i onClick={() => navigate("/")} className="bi bi-instagram px-2"></i>
          <i onClick={() => navigate("/")} className="bi bi-youtube px-2"></i>
          {/* </div> */}
        </div>
      </footer>
    </>
  );
}
