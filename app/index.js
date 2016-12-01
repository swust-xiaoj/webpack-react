import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Hello React!</h1>
            </div>
        );
    }
}

const lists = ['Javascript', 'Python', 'Node', 'Java', 'Ruby'];
class MsgList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ul>
                {lists.map((result, index) => {
                    return (<li key={index}>{result}</li>);
                })}
            </ul>
        );
    }
}

class HelloMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Hello {this.props.name}</h1>
                <MsgList />
            </div>
        );
    }
}
// propTypes validate, if not string output error
HelloMsg.propTypes = {
    name: React.PropTypes.string,
};
// default prop
HelloMsg.defaultProps = {
    name: 'x1a0j13',
}

// Functional Component
const HelloMsg_2 = (props) => (
    <div>Hello {props.name}</div>
);
const HelloMsg_3 = function (props) {
    return (
        <div>Hello {props.name}</div>
    );
}
HelloMsg_2.propTypes = {
    name: React.PropTypes.string,
};
// default prop
HelloMsg_2.defaultProps = {
    name: 'x1a0j13_2',
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        // bind this context, unless arrow function
        this.tick = this.tick.bind(this);
        // same to es5 getInitialState
        this.state = {
            secondsElapsed: 0,
        }
    }

    tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }

    componentDidMount() {
       this.interval = setInterval(this.tick, 1000);
	// this.interval = setInterval(() => this.tick(), 1000); // arrow function
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>Second Elapsed: {this.state.secondsElapsed}</div>
        );
    }
}
/**
 * [TodoList description]
 * @param {[type]} props [description]
 */
const TodoList = (props) => (
    <ul>
        {
            props.items.map((item) => (
                // Each child in an array or iterator should have a unique "key" prop
                <li key={item.id}>{item.text}</li>
            ))
        }
    </ul>
);
class TodoApp extends React.Component{
    constructor(props) {
        super(props);
        // bind this context
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            items: [],
            text: '',
        }
    }
    onChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
        const nextText = '';
        this.setState({items: nextItems, text: nextText});
    }

    render() {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.text}/>
                    <button>{'Add # ' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        );
    }
}

class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.rawMarkup = this.rawMarkup.bind(this);
        this.state = {
            value: 'Type your *markdown* here!',
        }
    }

    handleChange() {
        this.setState({value: this.refs.textarea.value});
    }

    rawMarkup() {
        const md = new Remarkable();
        return { __html: md.render(this.state.value) };
    }
    render() {
        return (
            <div className="MarkdownEditor">
                <h3>Input</h3>
                <textarea
                    onChange={this.handleChange}
                    ref="textarea"
                    defaultValue={this.state.value}
                />
                <h3>Output</h3>
                <div
                    className="content"
                    dangerouslySetInnerHTML={this.rawMarkup()}
                />
            </div>
        )
    }
}

class LifeCycleTest extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            name: 'Jay',
        }
    }

    handleClick() {
        this.setState({name: 'Hsiao'});
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
    }

    componentWillUpdate() {
        console.log('componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        return (
            <div onClick={this.handleClick}>Hi, {this.state.name}</div>
        );
    }
}
/**
 * ajax async
 * deal in componentDidMount
 */

class GithubUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            githubUrl: '',
            avatarUrl: '',
        }
    }

    componentDidMount() {
        $.get(this.props.source, (rst) => {
            const data = rst;
            if (data) {
                this.setState({
                    userName: data.name,
                    githubUrl: data.html_url,
                    avatarUrl: data.avatar_url
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h3>{this.state.userName}</h3>
                <img src={this.state.avatarUrl} />
                <a href={this.state.githubUrl}>Github Link</a>
            </div>
        );
    }
}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
class EasySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Javascript'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({value: e.target.value});
    }
    handleSubmit(e) {
        alert('you choosed : ' + this.state.value);
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>choos the language just you like:</h2>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="C#">C#</option>
                    <option value="Python">Python</option>
                    <option value="Javascript">Javascript</option>
                    <option value="Ruby">Ruby</option>
                </select>
                <input type="submit" value="submit" />
            </form>
        );
    }
}

function LeftPanel() {
    return (
        <div className='left' />
    );
}

function RightPanel() {
    return (
        <div className='right' />
    );
}
function Panel(props) {
    return (
        <div className='container'>
            <div className='left-wrap'>
                {props.left}
            </div>
            <div className='right-wrap'>
                {props.right}
            </div>
        </div>
    );
}
function PanelApp() {
    return (
        <Panel left = { <LeftPanel /> } right = { <RightPanel /> } />
    );
}

function Dialog(props) {
    return (
        <div className={'border border-' + props.borderColor}>
            <h2 className='title'>{props.title}</h2>
            <p className='message'>{props.message}</p>
            {props.children}
        </div>
    );
}
class SignupDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            loginName: ''
        };
    }
    handleChange(e) {
        this.setState({loginName: e.target.value});
    }
    handleClick(e) {
        // es6 template
        alert(`your name is: ${this.state.loginName}`);
    }
    render() {
        return (
            <Dialog title='React study Login' message='How we call you?' borderColor='blue'>
                {/* props.children */}
                <input type='text' value={this.state.loginName} onChange={this.handleChange} />
                <button onClick={this.handleClick}>Sign up</button>
            </Dialog>
        );
    }
}
/* product demo */
class ProductCategoryRow extends React.Component {
    render() {
        return <tr><th colSpan="2">{this.props.category}</th></tr>;
    }
}
class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}
class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if (product.name.indexOf(this.props.filter === -1
                || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.props.onUserInput(
            this.filterTextInput.value,
            this.inStockOnlyInput.checked
        );
    }
    render() {
        return (
            <form>
                <input type="type" placeholder="Search..." value={this.props.filterText}
                    ref={(input) => this.filterTextInput = input}
                    onChange={this.handleChange} />
                <p>
                    <input type="checkbox"
                        checked={this.props.inStockOnly}
                        ref={(input) => this.inStockOnlyInput = input}
                        onChange={this.handleChange} />
                    {' '}
                    Only show products in styck
                </p>
            </form>
        );
    }
}
class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
             inStockOnly: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }
    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput} />
                <ProductTable products={this.props.products}
                    filterText={this.this.state.} />
            </div>
        );
    }
}
var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<HelloMsg name="more"/>, document.getElementById('app'));
// ReactDOM.render(<HelloMsg_2 />, document.getElementById('app'));
ReactDOM.render(<Timer />, document.getElementById('app'));
ReactDOM.render(<TodoApp />, document.getElementById('todo-app'));
ReactDOM.render(<MarkdownEditor />, document.getElementById('markdown'));
ReactDOM.render(<LifeCycleTest />, document.getElementById('life-cycle'));
ReactDOM.render(<GithubUser source="https://api.github.com/users/swust-xiaoj" />, document.getElementById('githubuser'));
ReactDOM.render(<NameForm />, document.getElementById('root'));
ReactDOM.render(<EasySelect />, document.getElementById('select'));
ReactDOM.render(<PanelApp />, document.getElementById('panel'));
ReactDOM.render(<SignupDialog />, document.getElementById('dialog'));
ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('product'));
