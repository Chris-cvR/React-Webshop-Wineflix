import CardFactory from "./CardFactory";

function catalogue() {
    const Reset = () => {
      // function body here
    };
   
    const AttributeFilter = (attribute: string, value: string | number) => {
      // function body here
    };
   
    return (
      <div className="container mx-auto mt-5 mb-5">
        <div id="filter-container">
          <div className="container mx-auto mt-5 mb-5">
            <div className="btn-group">
              <button className="btn btn-secondary" type="button" onClick={Reset} id="resetButton" aria-haspopup="true" aria-expanded="false">
                Reset
              </button>
            </div>
            <div className="btn-group">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Countries
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={() => AttributeFilter('country', 'South Africa')}>South Africa</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('country', 'France')}>France</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('country', 'Italy')}>Italy</a>
              </div>
            </div>
            <div className="btn-group">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Type of Wine
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={() => AttributeFilter('type', 'Red')}>Red</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('type', 'White')}>White</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('type', 'Sparkling')}>Sparkling</a>
              </div>
            </div>
            <div className="btn-group">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Year of vintage
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={() => AttributeFilter('year', 2014)}>2014</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('year', 2016)}>2016</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('year', 2017)}>2017</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('year', 2019)}>2019</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('year', 2020)}>2020</a>
                <a className="dropdown-item" onClick={() => AttributeFilter('year', 2021)}>2021</a>
              </div>
            </div>
          </div>
        </div>
        <CardFactory carousel={false} endpoint="api/products"></CardFactory>
      </div>
    );
  }
   
  export default catalogue;
  