class ProductList extends React.Component {
  render() {
    return (
      <div className="ui unstackable items">
        <Product />
      </div>
    );
  }
}


class Product extends React.Component {
  render() {
    return(
    <div className="item"> 
        <div className="image">
          <img src="images/products/image-aqua.png" />
        </div>
        <div className='middle aligned content'>
        </div>
        <div className='description'>
          <a>Fort Knight</a>
          <p> Authentic Renaissance actors....</p>
        </div>
        <div className="extra">
          <span> Submitted by:</span>
          <img 
            className ="ui avatar image"
            src="images/avatars/daniel.jpg"
          />
        </div>
      </div>  
    );
  }
}


ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);