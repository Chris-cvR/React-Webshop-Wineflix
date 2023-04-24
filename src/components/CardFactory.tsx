import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


function CardFactory({ endpoint, carousel }: { endpoint: string, carousel: boolean }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async (endpoint: string): Promise<any> => {
        const response = await fetch(`http://localhost:8888/${endpoint}`);
        const data = await response.json();
        return data;
      }
  
      fetchData(endpoint)
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, [endpoint]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }

  function addToCart(id: any): void {
    throw new Error('Function not implemented.');
  }


  return carousel ? (
    <OwlCarousel className="owl-theme" loop margin={10} nav>
        {products.map((product: any) => {
          const { id, image, name, price, description } = product;

          return (
            <div key={id} className="card">
              <div className="card-body">
                <a style={{ textDecoration: 'none' }} href={`./product?id=${id}`}>
                  <div>
                    <img className="mb-5" src={`${image}`} alt={`${name}`} />
                    <h5 className="card-title">{`${name}`}</h5>
                  </div>
                </a>
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
    <div id='grid-container'>
      {products.map((product: any) => {
        const { id, image, name, price, description } = product;

        return (
          <div key={id} className="card">
            <div className="card-body">
              <a style={{ textDecoration: 'none' }} href={`./product?id=${id}`}>
                <div>
                  <img className="mb-5" src={`${image}`} alt={`${name}`} />
                  <h5 className="card-title">{`${name}`}</h5>
                </div>
              </a>
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
  );
}

export default CardFactory;
