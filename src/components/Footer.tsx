function Footer() {
    return (
        <footer className="text-center text-lg-start text-muted vw-100 primary">
        <section
          className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom"
        ></section>
  
        <section className="Footer">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text">
                  <i className="fas fa-gem me-3 text"></i>Wineflix
                </h6>
                <p className="text">
                  Looking for a deliciously smooth wine that will tantalize your taste buds? 
                  Look no further than Wineflix! We offer a wide selection of top-quality wines from around the world, all at affordable prices!</p>
              </div>
  
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="fw-bold mb-4 text">Top three Red Wines:</h6>
                <p>
                  <a href="http://127.0.0.1:5500/product.html?id=122" className="text-reset accent-text">Three Men in a Tub</a>
                </p>
                <p>
                  <a href="http://127.0.0.1:5500/product.html?id=130" className="text-reset accent-text">Juno Shiraz - Mourvedre</a>
                </p>
                <p>
                  <a href="http://127.0.0.1:5500/product.html?id=3" className="text-reset accent-text">Touch of Oak Pinotage</a>
                </p>
              </div>
  
              <div className="col-md-2 col-lg-2 col-xl-3 mx-auto mb-4 text">
                <h6 className="text-uppercase fw-bold mb-4 text">Opening Hours:</h6>
                <p>
                  <strong className="fas fa-home me-3 accent-text">Monday - Friday:</strong> 9-18
                </p>
                <p>
                  <strong className="fas fa-home me-3 accent-text">Saturday:</strong> 10-15
                </p>
                <p>
                  <strong className="fas fa-home me-3 accent-text">Sunday & Holidays:</strong> Closed
                </p>
              </div>
  
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text">
                <h6 className="text-uppercase fw-bold mb-4">Contact us:</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Rued Langgaards Vej 7, 2300
                  København, Danmark
                </p>
                <p><i className="fas fa-envelope me-3">Wineflix@itu.dk</i></p>
                <p><i className="fas fa-phone me-3"></i>+45 72 18 50 00</p>
              </div>
              
            </div>
          </div>
        </section>
  
        <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>© 2023 Wineflix International</div>
      </footer>
  
    )
}

export default Footer;