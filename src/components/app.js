import React, { Component } from 'react';

class FitInText extends Component {
    state = {
        scale: 1
    }
    componentDidUpdate() {
        const { scale } = this.state
        const node = this.node
        const parentNode = node.parentNode

        const parentWidth = parentNode.offsetWidth
        const scale = offsetWidth / parentWidth
        if (scale > 1) {
            this.setState({
                scale: 1 / scale
            })
        } else {
            this.setState({
                scale: 1
            })
        }
    }
    render() {
        const { scale } = this.state
        return (
            <div>
                {...this.props}
                style = {{ transform: `scale(${scale}, ${scale})` }}
                ref = {node => this.node = node}
            </div>
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
        return (
            <div className="phone">
                <div className="text-center" id="calculator">
                    <FitInText className="output">{this.state.displayValue}</FitInText>
                    <div className="grey btn" id="clear" onClick={() => this.clearDisplay()}>AC</div>
                    <div className="grey btn" id="clearOne" onClick={() => this.negative_postive()}>+/-</div>
                    <div className="grey btn" id="b%" onClick={() => this.percent()}>%</div>
                    <div className="operator orange btn" id="b/" onClick={() => this.inputOperator('/')}>÷</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(7)}>7</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(8)}>8</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(9)}>9</div>
                    <div className="operator orange btn" onClick={() => this.inputOperator('x')}>x</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(4)}>4</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(5)}>5</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(6)}>6</div>
                    <div className="operator orange btn" onClick={() => this.inputOperator('-')}>-</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(1)}>1</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(2)}>2</div>
                    <div className="number white btn" onClick={() => this.renderDisplay(3)}>3</div>
                    <div className="operator orange btn" onClick={() => this.inputOperator('+')}>+</div>
                    <div className="number white btn" id="double" onClick={() => this.renderDisplay(0)}>0</div>
                    <div className="number white btn" onClick={() => this.inputDecimal()}>.</div>
                    <div className="orange btn equal" onClick={() => this.inputOperator('=')}>=</div>
                </div>
                <div className="circle text-center"></div>
            </div>
        );
    }
}
