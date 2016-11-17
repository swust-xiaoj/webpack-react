import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';

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
                <li data-key={item.id}>{item.text}</li>
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
// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<HelloMsg name="more"/>, document.getElementById('app'));
// ReactDOM.render(<HelloMsg_2 />, document.getElementById('app'));
ReactDOM.render(<Timer />, document.getElementById('app'));
ReactDOM.render(<TodoApp />, document.getElementById('todo-app'));
ReactDOM.render(<MarkdownEditor />, document.getElementById('markdown'));
