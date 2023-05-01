import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';

interface IProduct {
  brand: string;
  description: string;
  id: number;
  image: string;
  list_price: number;
  name: string;
  country: string;
  year: number;
  category: string;
  price: number;
  url: string;
}

function CardFactory({ endpoint, carousel }: { endpoint: string, carousel: boolean }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint]);

  const fetchData = async (endpoint: string): Promise<any> => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8888/${endpoint}`);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  function addToCart(id: any): void {
    throw new Error('Function not implemented.');
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>

      {carousel ? (
        <OwlCarousel className="owl-theme" loop margin={10} nav>
          {products.map((product: IProduct) => {
            const { id, image, name, price, description } = product;

            return (
              <div key={id} className="card">
                <div className="card-body">
                  <NavLink className="nav-link" to={`/product/${id}`}>
                    <div>
                      <img className="mb-5" src={`${image}`} alt={`${name}`} />
                      <h5 className="card-title">{`${name}`}</h5>
                    </div>
                  </NavLink>
                  <h5 className="card-price">{`${price}`} DKK</h5>
                  <div className="card-text">{`${description}`}</div>
                  <button
                    className="basket-button"
                    onClick={() => addToCart(id)}
                    data-pid={id}
                  >
                    Add to basket
                  </button>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      ) : (
    <div>
      <div id="filter-container">
        <div className="container mx-auto mt-5 mb-5">
          <button className="btn btn-secondary" type="button" onClick={() => fetchData("api/products")} id="resetButton" aria-haspopup="true" aria-expanded="false">
            Reset
          </button>
          <label htmlFor="country">Countries:</label>
          <select name="country" id="country" onChange={(e) => fetchData(`api/products?country=${e.target.value}`)}>
            <option value="">Select Country</option>
            <option value="South Africa">South Africa</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
          </select>
          <label htmlFor="wineType">Type of Wine:</label>
          <select name="wineType" id="wineType" onChange={(e) => fetchData(`api/products?category=${e.target.value}`)}>
            <option value="">Select Type of Wine</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="sparkling">Sparkling</option>
          </select>
          <label htmlFor="vintageYear">Year of vintage:</label>
          <select name="vintageYear" id="vintageYear" onChange={(e) => fetchData(`api/products?year=${e.target.value}`)}>
            <option value="">Select Year of vintage</option>
            <option value="2014">2014</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </div>
      </div>
        <div id='grid-container'>
          {products.map((product: IProduct) => {
            const { id, image, name, price, description } = product;

            return (
              <div key={id} className="card">
                <div className="card-body">
                  <NavLink className="nav-link" to={`/product/${id}`}>
                    <div>
                      <img className="mb-5" src={`${image}`} alt={`${name}`} />
                      <h5 className="card-title">{`${name}`}</h5>
                    </div>
                  </NavLink>
                  <h5 className="card-price">{`${price}`} DKK</h5>
                  <div className="card-text">{`${description}`}</div>
                  <button
                    className="basket-button"
                    onClick={() => addToCart(id)}
                    data-pid={id}
                  >
                    Add to basket
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      )}
    </>
  );
}

export default CardFactory;
