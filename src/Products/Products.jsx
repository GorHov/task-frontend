import "./Product.css";

const Products = ({ result }) => {
  
  return (
    <>
      {!result.length ? (
        <section className="no-products">
          <h1>there are not products</h1>
        </section>
      ) : (
        <section className="card-container">
          {result}
        </section>
      )}
    </>
  );
};

export default Products;
