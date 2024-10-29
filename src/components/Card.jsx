import { AiFillStar } from "react-icons/ai";

const Card = ({ name, price, rating, imageUrl }) => {
  return (
    <>
      <section className="card">
        <img src={imageUrl} alt={name} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{name}</h3>
          <section className="card-reviews">
            {rating} <AiFillStar className="rating-star" />
          </section>
          <section className="card-price">
            <div className="price">
              {price}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
