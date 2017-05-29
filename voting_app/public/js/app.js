class ProductList extends React.Component {
  render() {
    return (
      <div className="ui unstackable items">
        Hello, Friend I am a basic React Compnent..
      </div>
    );
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);