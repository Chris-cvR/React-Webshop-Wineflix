import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/Usercontext";
import { CartModal } from "./CartModal"


function Navbar() {
  const { user } = useContext(UserContext);
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light primary py-3 border border-secondary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0 home-icon" href="#"></a>

          <NavLink
            className="navbar-brand mt-2 mt-lg-0 home-icon nav-link"
            to="/"
          >
            <svg
              width="50"
              height="39"
              viewBox="0 0 64 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M42.4155 32.2505L54.3703 2H64.0003L51.1811 34.4379C49.4894 33.4287 46.2684 32.696 42.4155 32.2505Z"
                fill="#373737"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9517 34.2796L28.7083 2H38.3383L26.496 31.9658C21.8039 32.3194 17.8095 33.0849 15.9517 34.2796Z"
                fill="#373737"
              />
              <mask
                id="path-3-outside-1_3620_18581"
                maskUnits="userSpaceOnUse"
                x="25.6611"
                y="0"
                width="30"
                height="39"
                fill="black"
              >
                <rect fill="white" x="25.6611" width="30" height="39" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M40.5408 32.0604L28.6611 2H38.2911L51.0891 34.3842C49.0978 33.2444 45.1379 32.4645 40.5408 32.0604Z"
                />
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.5408 32.0604L28.6611 2H38.2911L51.0891 34.3842C49.0978 33.2444 45.1379 32.4645 40.5408 32.0604Z"
                fill="#373737"
              />
              <path
                d="M28.6611 2V0.125557H25.9049L26.9179 2.68892L28.6611 2ZM40.5408 32.0604L38.7976 32.7493L39.2231 33.8263L40.3767 33.9277L40.5408 32.0604ZM38.2911 2L40.0344 1.31108L39.5658 0.125557H38.2911V2ZM51.0891 34.3842L50.158 36.011L54.7968 38.6661L52.8324 33.6952L51.0891 34.3842ZM26.9179 2.68892L38.7976 32.7493L42.2841 31.3715L30.4044 1.31108L26.9179 2.68892ZM38.2911 0.125557H28.6611V3.87444H38.2911V0.125557ZM52.8324 33.6952L40.0344 1.31108L36.5479 2.68892L49.3459 35.0731L52.8324 33.6952ZM52.0202 32.7574C50.7718 32.0428 49.059 31.5145 47.1842 31.1135C45.2745 30.7049 43.0553 30.3998 40.705 30.1932L40.3767 33.9277C42.6234 34.1252 44.6827 34.412 46.4 34.7794C48.1523 35.1542 49.4151 35.5858 50.158 36.011L52.0202 32.7574Z"
                fill="#FCFBF6"
                mask="url(#path-3-outside-1_3620_18581)"
              />
              <mask
                id="path-5-outside-2_3620_18581"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="28"
                height="38"
                fill="black"
              >
                <rect fill="white" width="28" height="38" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.7976 34.3832L3 2H12.63L24.5417 32.1416C20.5839 32.5591 17.3351 33.3024 15.7976 34.3832Z"
                />
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7976 34.3832L3 2H12.63L24.5417 32.1416C20.5839 32.5591 17.3351 33.3024 15.7976 34.3832Z"
                fill="#373737"
              />
              <path
                d="M3 2V0.125557H0.243725L1.25675 2.68892L3 2ZM15.7976 34.3832L14.0544 35.0721L14.929 37.2852L16.8757 35.9167L15.7976 34.3832ZM12.63 2L14.3732 1.31108L13.9047 0.125557H12.63V2ZM24.5417 32.1416L24.7384 34.0057L27.1916 33.7469L26.285 31.4527L24.5417 32.1416ZM1.25675 2.68892L14.0544 35.0721L17.5409 33.6943L4.74325 1.31108L1.25675 2.68892ZM12.63 0.125557H3V3.87444H12.63V0.125557ZM26.285 31.4527L14.3732 1.31108L10.8867 2.68892L22.7985 32.8305L26.285 31.4527ZM24.3451 30.2775C22.3119 30.492 20.419 30.7941 18.8093 31.1947C17.2417 31.5849 15.7749 32.1079 14.7196 32.8498L16.8757 35.9167C17.3578 35.5777 18.2842 35.1887 19.7147 34.8326C21.1033 34.487 22.8138 34.2087 24.7384 34.0057L24.3451 30.2775Z"
                fill="#FCFBF6"
                mask="url(#path-5-outside-2_3620_18581)"
              />
            </svg>
          </NavLink>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/catalogue">
                Products
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <a
            className="nav-link"
            href="#"
            onClick={() => setModalShow(true)}
          >
            <div id="cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                width="29px"
                height="30px"
                viewBox="-2.4 -2.4 28.80 25.80"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.048"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M8 12L8 8C8 5.79086 9.79086 4 12 4V4C14.2091 4 16 5.79086 16 8L16 12"
                    stroke="#222222"
                    strokeWidth="1.176"
                    strokeLinecap="round"
                  />{" "}
                  <path
                    d="M3.69435 12.6678C3.83942 10.9269 3.91196 10.0565 4.48605 9.52824C5.06013 9 5.9336 9 7.68053 9H16.3195C18.0664 9 18.9399 9 19.514 9.52824C20.088 10.0565 20.1606 10.9269 20.3057 12.6678L20.8195 18.8339C20.904 19.8474 20.9462 20.3542 20.6491 20.6771C20.352 21 19.8435 21 18.8264 21H5.1736C4.15655 21 3.64802 21 3.35092 20.6771C3.05382 20.3542 3.09605 19.8474 3.18051 18.8339L3.69435 12.6678Z"
                    fill="#222222"
                  />{" "}
                </g>
              </svg>
            </div>
          </a>

          <ul
            className="navbar-nav align-items-center"
            style={{ display: "contents" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <circle cx="12" cy="8" r="4" fill="#222222" />{" "}
                <path
                  d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z"
                  fill="#222222"
                />{" "}
              </g>
            </svg>
            <li className="nav-item">
              {user.firstname ? (
                <div>Hello, {user.firstname}!</div>
              ) : (
                <NavLink className="nav-link" to="/login">
                  Log in
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
      <CartModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </nav>
  );
}

export default Navbar;
