#Notes for React Study Group
###Voting App

####What's a component?

- Building a React app is all about components. 
- An individual React component can be thought of as a UI compnent in app
- We can break apart the interface of our app into two classes of components 

	1. Product List (Parent Component)
	2. Products (Child Components)

- React compnents map cleanly to UI components and are self contained
- The markup, vire logic, and often component specific style is all housed in one place.  **This feature makes React components reusable.**
- When there is a need for a component change bases on user-input, React simply re-renders that component.

--

##Our First Component

- React componentes are ES6 classes that extend the class React.Component

####There are 2 ways to declare React Components
1. As an ES6 class
		
		class ProductList extends React.Component {
			render() {
				return(
					<div className="classnames">
						I'm a basic react component
					</div>
				);
			}
		}
		
		class ProductList extends React.Component {
			render() {
				return <div className="classnames">
					I'm a basic react component
				</div>
				);
			}
		}

2. Using React.createClass() method

		class HelloWorld extends React.Component {
			render() {return (<p> Hello, World!</p>) }
		}
		
--
####JSX
- React components ultimately render HTML which is displayed in the browser. So the render() method of a component needs to describe hoe the view should be represented as HTML.  
- React builds app with a fake representation of the DOM, called *Virtual DOM* allowing us to describe a compnent's HTML representation in JS
- JSX offers a light abstraction over JS syntax.
- Even though it looks like HTML it is actually compiled into Javascript.

--
####Babel

[https://babeljs.io/
]()

Most Browsers dont fully support ES6 even though it is the future of Javascript. To get around this we use Bable, or a **Javascript Transpiler**.

- Babel turns ES6 into ES5 or transpiling. 
- Babel understands JSX and compiles JSX into vanilla ES5

--
###Tell React that our component needs to be inserted into page.

We need to instruct React to render the component ProductList that we have created above. To do this we need to insert the following code into app.js below our component.

		ReactDom.render(
			<ProductList />,
			document.getElementById('content')
		);
		
--
####React-Dom

React-Dom is from the react-dom library: [https://www.npmjs.com/package/react-dom
]()

Were passing in two arguments:
So think `ReactDOM.render([what],[where];`

1. What we'd like to Render: `<ProductList />`
2. Where we'd like to render it: `document.getElementById('content')`

--

##Building Product Component

`<Product />` is our first child compnent and will contain the product liusting.

1. Declare a new ES6 class that extends React.Component
2. Define a single method render()

		class Product extends React.Component {
			render() {
				return(
					<div>
						{/*...todo...*/}
					</div>
				);
			}
		}
	
Currently we're creating this inside app.js where the ProductList component is, but most likely we will break this out into a separate file.  To render child component on page reference it like so where the parent component <ProductList /> is rendered

	class ProductList extends React.Component {
 		render() {
    		return (
      			<div className="ui unstackable items">
        			<Product />
      			</div>
  			);
  		}
	}

--

##Making `<Product/>` data driven

Currently `<Product/>` is static since we've hard-coded in image, name, desc, and author deets.  We need to make it dynamic so we can render the component based on the data we give it.

- Data flows from parent to child through **Props**
- When a parent renderes a child it can send along props the child depends on.

i.e. `<ProductList/>` ProductList will pass down props to `<Product/>`

--

###ES6 Const, Let, Var

Here are some resources to look into this further.  For this books exercises we will declaring blocked scoped variables with ES6 const and let, rather than function scoped variables with Var

[http://wesbos.com/javascript-scoping/
]()

[http://wesbos.com/let-vs-const/
]()
###const
From MDN

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const]()

This declaration creates a constant whose scope can be either global or local to the function in which it is declared. An initializer for a constant is required; that is, you must specify its value in the same statement in which it's declared (which makes sense, given that it can't be changed later).

The const declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned. For instance, in the case where the content is an object, this means the object's contents (e.g. its parameters) can be altered.

All the considerations about the "temporal dead zone" apply to both let and const.

A constant cannot share its name with a function or a variable in the same scope.




###let 
From MDN:
[
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let]()

let allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used. This is unlike the var keyword, which defines a variable globally, or locally to an entire function regardless of block scope.Variables declared by let have as their scope the block in which they are defined, as well as in any contained sub-blocks . In this way, let works very much like var. The main difference is that the scope of a var variable is the entire enclosing function:


--

###Props

1. Modify parent `<ProductList/>` to pass down props to `<Product/>` 

Currently the product variable is set to the javascript object that describes our first object. Notice that they props are written like data attributes and are mapping back to object properties you can find in the first object in seed.js.

From seed.js 

	  const products = [
    {
      id: 1,
      title: 'Yellow Pail',
      description: 'On-demand sand castle construction expertise.',
      url: '#',
      votes: generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
    },
    ...
    
`<ProductList/>` passing down props to `<Product/>`

	class ProductList extends React.Component {
	  constructor() {
	    super();
	    
	    this.doStuff = this.doStuff.bind(this);
	  }
	  
	  doStuff() {
	  }
	  
	  render() {
	    const product = Seed.products[0];
	    return (
	      <div className='ui unstackable items'>
	        <Product
	          id={product.id}
	          title={product.title}
	          description={product.description}
	          url={product.url}
	          votes={product.votes}
	          submitterAvatarUrl={product.submitterAvatarUrl}
	          productImageUrl={product.productImageUrl}
	          doStuff={this.doStuff}
	        />
	      </div>
	    );
	  }
	}


2.
Next we need to modify the `<Product/>` component to use the props being passed down from parent component `<ProductList/>` . To do this we need to swap out everywhere we hardcoded data with props. 

`this` is bound to the React component class

We've done that for the img and the src is now `src={this.props.productImageUrl}`

For Votes
`{this.props.votes}`

For link
`{this.props.url}`

For Title
`{this.props.title}`

...and so on...

			class Product extends React.Component {
		  render() {
		    return (
		      <div className='item'>
		        <div className='image'>
		          <img src={this.props.productImageUrl} />
		        </div>
		        <div className='middle aligned content'>
		          <div className='header'>
		            <a>
		              <i className='large caret up icon' />
		            </a>
		            {this.props.votes}
		          </div>
		          <div className='description'>
		            <a href={this.props.url}>
		              {this.props.title}
		            </a>
		            <p>
		              {this.props.description}
		            </p>
		          </div>
		          <div className='extra'>
		            <span>Submitted by:</span>
		            <img
		              className='ui avatar image'
		              src={this.props.submitterAvatarUrl}
		            />
		          </div>
		        </div>
		      </div>
		    );
		  }
		}
		

##Rendering multiple `<Product/>`' s for list

To render multiple products we'll first have to generate an array of `<Product/>` components derived from individual object in the Seed array.

To do this we'll use ES6 maps:

###Map 

**CORRECT
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map?v=example

**linking to wrong map link to 
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map]()

The Map object holds key-value pairs. A Map object iterates its elements in insertion order — a for...of loop returns an array of [key, value] for each iteration.

[http://www.javascripttutorial.net/es6/javascript-map/
]()

--

1. Modify product variable to be productComponents. Instead of the value being one object in the array, the value will now be a map of all the existing objects and their key/value pairs.

    	const productComponents = Seed.products.map((product) => (
    		//Props
		));
		
	or 
		
		class ProductList extends React.Component {
		  render() {
		    const productComponents = Seed.products.map((product) => (
		      <Product
		        key={'product-' + product.id}
		        id={product.id}
		        title={product.title}
		        description={product.description}
		        url={product.url}
		        votes={product.votes}
		        submitterAvatarUrl={product.submitterAvatarUrl}
		        productImageUrl={product.productImageUrl}
		      />
		    ));
		    return (
		      <div className='ui unstackable items'>
		        {productComponents}
		      </div>
		    );
		  }
		}
		