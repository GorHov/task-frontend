import Button from "../../components/Button";
import SortOptions from "../SortOptions/SortOptions";
import "./Brand.css";

const Brand = ({ handleClick,handleSortChange }) => {
  return (
    <div className="aaa">
      <div>
        <h2 className="brand-title">Brand</h2>
        <div className="brand-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="Nike" title="Nike" />
          <Button onClickHandler={handleClick} value="Adidas" title="Adidas" />
          <Button onClickHandler={handleClick} value="Puma" title="Puma" />
          <Button onClickHandler={handleClick} value="Vans" title="Vans" />
        </div>
      </div>
      <SortOptions handleSortChange={handleSortChange} />
    </div>
  );
};

export default Brand;
