import CardFactory from "./CardFactory";

function catalogue() {   
    return (
      <div className="container mx-auto mt-5 mb-5">
        <CardFactory carousel={false} endpoint="api/products"></CardFactory>
      </div>
    );
  }
   
  export default catalogue;
  