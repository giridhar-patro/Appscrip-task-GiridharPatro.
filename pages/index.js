import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import ProductCard from "../components/ProductCard";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"; 
import styles from "../styles/PLP.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const filterOptions = {
  category: [
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Jewelery", value: "jewelery" },
  ],
  rating: [
    { label: "1 Star & Up", value: 1 },
    { label: "2 Stars & Up", value: 2 },
    { label: "3 Stars & Up", value: 3 },
    { label: "4 Stars & Up", value: 4 },
  ],
  price: [
    { label: "$0 - $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200+", value: "200+" },
  ],
};

export default function Home({ products }) {
  const [sortOption, setSortOption] = useState("Recommended");
  const [showFilter, setShowFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleFilterGroupVisibility = (filterType) => {
    if (filterType === "category") setShowCategoryFilter(!showCategoryFilter);
    else if (filterType === "rating") setShowRatingFilter(!showRatingFilter);
    else if (filterType === "price") setShowPriceFilter(!showPriceFilter);
  };

  const handleFilterChange = (filterType, value) => (e) => {
    const { checked } = e.target;
    const setterMap = {
      category: setCategoryFilter,
      rating: setRatingFilter,
      price: setPriceFilter,
    };

    setterMap[filterType]((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const sortProducts = (products, sortOrder) => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      if (sortOrder === "PriceHighToLow") {
        return b.price - a.price;
      } else if (sortOrder === "PriceLowToHigh") {
        return a.price - b.price;
      }
      return 0;
    });
    return sortedProducts;
  };

  const filteredProducts = products
    .filter((product) =>
      categoryFilter.length ? categoryFilter.includes(product.category) : true
    )
    .filter((product) =>
      ratingFilter.length
        ? ratingFilter.some((rating) => product.rating.rate >= parseInt(rating))
        : true
    )
    .filter((product) => {
      if (!priceFilter.length) return true;
      const priceRanges = {
        "0-50": [0, 50],
        "50-100": [50, 100],
        "100-200": [100, 200],
        "200+": [200, Infinity],
      };
      return priceFilter.some(
        (priceRange) =>
          product.price >= priceRanges[priceRange][0] &&
          product.price < priceRanges[priceRange][1]
      );
    });
    const getArrowIcon = (filterType) => {
      if (filterType === "category")
        return showCategoryFilter ? <FaAngleUp /> : <FaAngleDown />;
      else if (filterType === "rating")
        return showRatingFilter ? <FaAngleUp /> : <FaAngleDown />;
      else if (filterType === "price")
        return showPriceFilter ? <FaAngleUp /> : <FaAngleDown />;
    };

  const sortedProducts = sortProducts(filteredProducts, sortOption);

  return (
    <div className={styles.mainContainer}>
        <Navbar/>
        <hr className={styles.horizontalLine} />
      <Head>
        <title>Product Listing Page</title>
        <meta name="description" content="Browse our range of products" />
      </Head>

      <div className={styles.introContainer}>
        <h1 className={styles.title}>DISCOVER OUR PRODUCTS</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </div>

      <hr className={styles.horizontalLine} />

      <div className={styles.menuBar}>
        <div className={styles.itemCount}>{filteredProducts.length} ITEMS</div>
        <div
          onClick={toggleFilter}
          style={{ width: showFilter ? "30%" : "auto" }}
        >
          {showFilter ? (
            <>
              &lt;&nbsp;
              <span className={styles.filterSection}>HIDE FILTER</span>
            </>
          ) : (
            <>
            <div className={styles.desktopFilter}> 
              &gt;&nbsp;
              <span className={styles.filterSection}>SHOW FILTER</span>
            </div>
            <div className={styles.mobileFilter}>
            <span>FILTER</span>
            <div class={styles.verticalLine}></div>
          </div>
          </>
          )}
        </div>
        <div className={styles.sortSection}>
  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className={styles.sortDropdown}
  >
    <option value="Recommended" >RECOMMENDED</option>
    <option value="NewestFirst">NEWEST FIRST</option>
    <option value="Popular">POPULAR</option>
    <option value="PriceHighToLow">PRICE: HIGH TO LOW</option>
    <option value="PriceLowToHigh">PRICE: LOW TO HIGH</option>
  </select>
</div>

      </div>

      <hr className={styles.horizontalLine} />

      <div className={styles.container} style={{ display: "flex" }}>
        <div
          className={styles.filterContainer}
          style={{ width: showFilter ? "20%" : "0", overflow: "hidden" }}
        >
          {showFilter && (
            <div className={styles.filters}>
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <div key={filterType}>
                  <div
                    className={styles.filterOption}
                    onClick={() => toggleFilterGroupVisibility(filterType)}
                  >
                    <label>{filterType.toUpperCase()}</label>
                    {getArrowIcon(filterType)}
                  </div>
                  {filterType === "category" && showCategoryFilter && (
                    <div className={styles.dropdownContent}>
                      {options.map((option) => (
                        <label key={option.value}>
                          <input
                            type="checkbox"
                            value={option.value}
                            onChange={handleFilterChange(
                              filterType,
                              option.value
                            )}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  )}
                  {filterType === "rating" && showRatingFilter && (
                    <div className={styles.dropdownContent}>
                      {options.map((option) => (
                        <label key={option.value}>
                          <input
                            type="checkbox"
                            value={option.value}
                            onChange={handleFilterChange(
                              filterType,
                              option.value
                            )}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  )}
                  {filterType === "price" && showPriceFilter && (
                    <div className={styles.dropdownContent}>
                      {options.map((option) => (
                        <label key={option.value}>
                          <input
                            type="checkbox"
                            value={option.value}
                            onChange={handleFilterChange(
                              filterType,
                              option.value
                            )}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  )}
                  <hr className={styles.horizontalLine} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={styles.productContainer}
          style={{ width: showFilter ? "80%" : "100%" }}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
       <Footer/>
    </div>
   
  );
}

export async function getServerSideProps() {
  const res = await axios.get("https://fakestoreapi.com/products");
  const products = res.data;

  return {
    props: {
      products,
    },
  };
}
