import React, { useState, useEffect } from 'react';
import CardFactory from './CardFactory';
import { useParams } from 'react-router-dom';

function Product() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async (id: any): Promise<any> => {
        const response = await fetch(`http://localhost:8888/api/products/?id=${id}`);
        const data = await response.json();
        return data;
      }
  
      fetchData(id)
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, [id]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }

  function addToCart(id: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      {products.map((product: { id: any; image: any; name: any; price: any; description: any; brand: any; country: any}) => {
        const { id, image, name, price, description, brand, country } = product;

        return (
          <div>
            <div style={{display:"flex", backgroundColor: "white"}} className="container mx-auto mt-5 mb-5">
              <div id="product">
                <div className="Product-picture" style={{width: "40%", float:"right", paddingLeft: "5%", marginTop: "1%"}}>     
                  <img className="mb-5" src={`${image}`} style={{maxWidth:"100%", zoom: "140%", backgroundColor:"white"}} />
                </div>
                <div className="Product-info" style={{width: "60%", float:"left", marginTop: "1%"}}>
                  <h3 id="name">{`${name}`}</h3>    
                  <h5 className=" producer-link" style={{color:"#9D2626"}}>{`${brand}`}</h5>
                  <h5 style={{color:"#9D2626"}}>{`${country}`}</h5>
                  <h6 className="title-price"><small>Price</small></h6>
                  <h5 style={{marginTop:"0px"}}>{`${price} DKK`}</h5>
                  <div className="section" style={{paddingBottom:"20px"}}>
                    <button className="basket-button" onClick={() => addToCart(id)}>Add to basket</button>
                  </div>
                  <div className="Product-description">
                    <p style={{width:"100%", float:"left"}}>{`${description}`}</p>
                  </div>
                </div>
              </div> 
            </div>
            <div className="container mx-auto mt-5 mb-5">
              <h3><b>Alternative Products:</b></h3>
              <CardFactory carousel={true} endpoint={"api/products?category=white"} />
            </div>
          </div>
        );
        
      })}
</div>
  );
}

export default Product;
