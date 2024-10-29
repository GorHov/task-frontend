import Category from "./Category/Category";
import Price from "./Price/Price";
import Rating from "./Rating/Rating";
import "./Sidebar.css";

const Sidebar = ({ handleCategoryChange, handlePriceChange, handleRatingChange }) => {
  return (
    <section className="sidebar">
      <div className="logo-container">
        <h1>🛒</h1>
      </div>
      <Category handleChange={handleCategoryChange} />
      <Price handleChange={handlePriceChange} />
      <Rating handleChange={handleRatingChange} />
    </section>
  );
};

export default Sidebar;
