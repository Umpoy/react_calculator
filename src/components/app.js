import React, { Component } from 'react';

class FitInText extends Component {
    state = {
        scale: 1
    }
    componentDidUpdate() {

        const { scale } = this.state;

        const node = this.node;
        const parentNode = node.parentNode;

        const availableWidth = parentNode.offsetWidth;
        const actualWidth = node.offsetWidth;
        const actualScale = availableWidth / actualWidth;
        console.log('scale: ', scale);
        console.log('node: ', node);
        console.log('parentNode: ', parentNode);
        console.log('availabeWidth: ', availableWidth);
        console.log('actialWidth: ', actualWidth);
        console.log('actualScale: ', actualScale);
        if (scale === actualScale) {
            return
        }
        if (actualScale < 1) {
            this.setState({ scale: actualScale })
        } else if (scale < 1) {
            this.setState({ scale: 1 })
        }
    }

    render() {
        const { scale } = this.state;
        console.log(this.props)
        return (
            <div
                className="auto-scaling-text"
                style={{ transform: `scale(${scale}, ${scale})` }}
                ref={node => this.node = node}
            >{this.props.value}</div>
        )
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            displayValue: '0',
            operatorValue: null,
            hasOperator: false
        }
    }

    renderDisplay(input) {
        const { displayValue, hasOperator } = this.state
        if (hasOperator) {
            this.setState({
                displayValue: String(input),
                hasOperator: false
            })
        } else {
            this.setState({
                displayValue: displayValue === '0' ? String(input) : displayValue + input
            })
        }

    }

    inputDecimal() {
        const { displayValue, hasOperator } = this.state
        if (hasOperator) {
            this.setState({
                displayValue: '.',
                hasOperator: false
            })
        } else if (displayValue.indexOf('.') === -1) {
            this.setState({
                displayValue: displayValue + '.',
                hasOperator: false
            })
        }
    }

    clearDisplay() {
        this.setState({ displayValue: "0" })
        this.setState({ value: null })
    }

    negative_postive() {
        const { displayValue } = this.state
        this.setState({
            displayValue: displayValue.indexOf('-') === -1 ? '-' + displayValue : displayValue.substr(1)
        })
    }

    percent() {
        const { displayValue } = this.state
        const value = parseFloat(displayValue)
        this.setState({
            displayValue: String(value / 100) // String() is add so numbers will add on istead of incrament count
        })
    }

    inputOperator(operator) {
        const { displayValue, operatorValue, value, hasOperator } = this.state
        const prevValue = value
        const nextValue = parseFloat(displayValue)

        const operations = {
            'x': (prevValue, nextValue) => prevValue * nextValue,
            '/': (prevValue, nextValue) => prevValue / nextValue,
            '+': (prevValue, nextValue) => prevValue + nextValue,
            '-': (prevValue, nextValue) => prevValue - nextValue,
            '=': (prevValue, nextValue) => nextValue
        }

        if (value == null) {
            this.setState({
                value: nextValue
            })
        } else if (operatorValue) {
            const currentValue = value || 0;
            const computedValue = operations[operatorValue](currentValue, nextValue);

            this.setState({
                value: computedValue,
                displayValue: String(computedValue)
            })
        }

        this.setState({
            hasOperator: true,
            operatorValue: operator
        })
    }
    render() {
        const { displayValue } = this.state
        return (
            < div className="calculator" >
                <FitInText className="output" value={displayValue} />
                <div className="calculator-keypad">
                    <div className="grey" id="clear" onClick={() => this.clearDisplay()}>AC</div>
                    <div className="grey" id="clearOne" onClick={() => this.negative_postive()}>+/-</div>
                    <div className="grey" id="percent" onClick={() => this.percent()}>%</div>
                    <div className="key-divide" id="b/" onClick={() => this.inputOperator('/')}>÷</div>
                    <div className="key-7" onClick={() => this.renderDisplay(7)}>7</div>
                    <div className="key-8" onClick={() => this.renderDisplay(8)}>8</div>
                    <div className="key-9" onClick={() => this.renderDisplay(9)}>9</div>
                    <div className="key-multiply" onClick={() => this.inputOperator('x')}>x</div>
                    <div className="key-4" onClick={() => this.renderDisplay(4)}>4</div>
                    <div className="key-5" onClick={() => this.renderDisplay(5)}>5</div>
                    <div className="key-6" onClick={() => this.renderDisplay(6)}>6</div>
                    <div className="key-subtract" onClick={() => this.inputOperator('-')}>-</div>
                    <div className="key-1" onClick={() => this.renderDisplay(1)}>1</div>
                    <div className="key-2" onClick={() => this.renderDisplay(2)}>2</div>
                    <div className="key-3" onClick={() => this.renderDisplay(3)}>3</div>
                    <div className="key-add" onClick={() => this.inputOperator('+')}>+</div>
                    <div className="key-0" id="double" onClick={() => this.renderDisplay(0)}>0</div>
                    <div className="key-dot" onClick={() => this.inputDecimal()}>.</div>
                    <div className="key-equals" onClick={() => this.inputOperator('=')}>=</div>
                </div>
            </div >

        );
    }
}
