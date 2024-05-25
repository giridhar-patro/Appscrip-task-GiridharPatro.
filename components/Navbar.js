import React, { useState } from "react";
import { AiFillGitlab } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { SlUser } from "react-icons/sl";
import { BsBagDash } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "../styles/navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [homeActive, setHomeActive] = useState(true);
  const [linksVisible, setLinksVisible] = useState(true);

  const handleClick = () => {
    setClicked(!clicked);
    setLinksVisible(!linksVisible);
  };

  const handleHomeClick = () => {
    setHomeActive(true);
  };

  const handleShopClick = () => {
    setHomeActive(false);
  };

  return (
    <>
      <div className="head">
        <div  >
          <div className="left">
            <div className="left-icons">
              <AiFillGitlab className="logo" />
            </div>
            <div  id="mobile" className="hamburger" onClick={handleClick}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
        
        <label className="navlogo">LOGO</label>
        <div className="right-icons">
          <AiOutlineSearch className="icon" />
          <AiOutlineHeart className="icon" />
          <BsBagDash className="icon" />
          <SlUser className="icon" />
          <select>
            <option value="English">Eng</option>
            <option value="Spanish">Span</option>
            <option value="French">Fren</option>
          </select>
        </div>
      </div>
      <nav className={clicked ? "active" : ""}>
        <ul id="navbar">
        <li>
            <a href="#">SHOPS</a>
          </li>
          <li>
            <a href="#">SKILSS</a>
          </li>
          <li>
            <a href="#">STORIES</a>
          </li>
          <li>
            <a href="#">ABOUT</a>
          </li>
          <li>
            <a href="#">CONTACT US</a>
          </li>
        </ul>
      </nav>
      {linksVisible && <div id="mobile-links" className={linksVisible ? "" : "active"}>
        <a
          href="#"
          onClick={handleHomeClick}
          className={homeActive ? "active" : ""}
        >
          HOME&nbsp;
        </a>
        <a href="#" onClick={handleShopClick} className={homeActive ? "" : "active"}>
          SHOP
        </a>
      </div>}
    </>
  );
};

export default Navbar;
