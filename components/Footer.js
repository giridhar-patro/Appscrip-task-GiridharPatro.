import React, { useState } from "react";
import "../styles/footer.css";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const filterOptions = {
  mettamuse: [
    "About Us",
    "Stories",
    "Artisans",
    "Boutiques",
    "Contact Us",
    "EU Compliances Docs",
  ],
  quicklinks: [
    "Orders & Shopping",
    "Join?Login as a Seller",
    "Payment & Pricing",
    "Return & Refunds",
    "FAQs",
    "Privacy Policy",
    "Terms & Conditions",
  ],
  followus: ["", ""],
};

const Footer = () => {
  const [showMettamuse, setShowMettamuse] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
  const toggleDropdownGroupVisibility = (filterType) => {
    if (filterType === "mettamuse") setShowMettamuse(!showMettamuse);
    else if (filterType === "quicklinks") setShowQuickLinks(!showQuickLinks);
    else if (filterType === "followus") setShowFollow(!showFollow);
  };

  const getArrowIcon = (filterType) => {
    if (filterType === "mettamuse")
      return setShowMettamuse ? <FaAngleUp /> : <FaAngleDown />;
    else if (filterType === "quicklinks")
      return showQuickLinks ? <FaAngleUp /> : <FaAngleDown />;
    else if (filterType === "followus")
      return showFollow ? <FaAngleUp /> : <FaAngleDown />;
  };
  return (
    <>
      <footer className="footer-desktop-container">
        <div className="footersection-1">
          <div className="footer-section">
            <h1>BE THE FIRST TO KNOW </h1>
            <p>Sign up for updates from metta muse.</p>
            <div className="subscribe-input">
              <input
                type="email"
                placeholder="Enter your email"
                className="inp"
              />
              <button id="sub">SUBSCRIBE</button>
            </div>
          </div>
          <div>
            <div>
              <h4 className="footer-heading">CONTACT US </h4>
              <p>+44 221 133 5360 </p>
              <p> customercare@mettamuse.com</p>
            </div>
            <h4 className="footer-heading">CURRENCY </h4>
            <p>USD</p>
            <p>
              Transition will be Euros anda currency reference is availabe on
              hover.
            </p>
          </div>
        </div>
        <hr />

        <div className="footersection-2">
          {Object.entries(filterOptions).map(([filterType, options]) => (
            <div key={filterType} className="subsection-2">
              <h3>
                {filterType === "quicklinks"
                  ? "QUICK LINKS"
                  : filterType === "followus"
                  ? "FOLLOW US"
                  : filterType}
              </h3>

              <div className="optionlist">
                {options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
                {filterType === "followus" && (
                  <div>
                    <h4 className="footer-heading">metta muse ACCEPTS </h4>
                    <div className="payment"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="copyright">
            copyright &copy; 2023 mettamuse. All rights reserved.
          </p>
        </div>
      </footer>

      <footer className="footer-container">
        <div>
          <h4 className="footer-heading">BE THE FIRST TO KNOW </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
        </div>
        <div className="subscribe-input">
          <input type="email" placeholder="Enter your email" className="inp" />
          <button id="sub">SUBSCRIBE</button>
        </div>
        <hr className="horizontalLine" />

        <div>
          <h4 className="footer-heading">CALL US </h4>
          <p>+44 221 133 5360 &nbsp; customercare@mettamuse.com</p>
        </div>
        <hr className="horizontalLine" />
        <div>
          <h4 className="footer-heading">CURRENCY</h4>
          <div className="currency">
            {/* <img src={usaCurrencyImg} alt="us currency" className="currency-img" /> */}
            <p>USD</p>
          </div>
        </div>
        <hr className="horizontalLine" />

        <div>
          {Object.entries(filterOptions).map(([filterType, options]) => (
            <div key={filterType}>
              <div
                className="dropdownOption"
                onClick={() => toggleDropdownGroupVisibility(filterType)}
              >
                <label>{filterType.toUpperCase()}</label>
                {getArrowIcon(filterType)}
              </div>
              {filterType === "mettamuse" && showMettamuse && (
                <div className="optionlist">
                  {options.map((option) => (
                    <li key={index}>
                      <a href="#">{option}</a>
                    </li>
                  ))}
                </div>
              )}
              {filterType === "quicklinks" && showQuickLinks && (
                <div className="optionlist">
                  {options.map((option) => (
                    <li key={index}>
                      <a href="#">{option}</a>
                    </li>
                  ))}
                </div>
              )}
              {filterType === "followus" && showFollow && (
                <div className="optionlist">
                  {options.map((option) => (
                    <li key={index}>
                      <a href="#">{option}</a>
                    </li>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <h4 className="footer-heading">metta muse ACCEPTS </h4>
          <div className="payment"></div>
          <p className="copyright">
            copyright &copy; 2023 mettamuse. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
