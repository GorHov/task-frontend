import "./SortOptions.css";

const SortOptions = ({ handleSortChange }) => {
  return (
    <div className="sort-options">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="none">None</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="ratingAsc">Rating: Low to High</option>
        <option value="ratingDesc">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default SortOptions;
