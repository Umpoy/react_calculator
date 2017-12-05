import React, { Component } from 'react';

export default class App extends Component {

    render() {
        return (
            <div className="phone">

                <div className="text-center" id="calculator">

                    <div className="output">
                        <span>0</span>Name
				</div>
                    <div className="grey btn" id="clear">AC</div>
                    <div className="grey btn" id="clearOne">CE</div>
                    <div className="grey btn" id="b%">%</div>
                    <div className="operator orange btn" id="b/">÷</div>
                    <div className="number white btn">7</div>
                    <div className="number white btn">8</div>
                    <div className="number white btn">9</div>
                    <div className="operator orange btn">x</div>
                    <div className="number white btn">4</div>
                    <div className="number white btn">5</div>
                    <div className="number white btn">6</div>
                    <div className="operator orange btn">-</div>
                    <div className="number white btn">1</div>
                    <div className="number white btn">2</div>
                    <div className="number white btn">3</div>
                    <div className="operator orange btn">+</div>
                    <div className="number white btn" id="double">0</div>
                    <div className="number white btn">.</div>
                    <div className="orange btn equal">=</div>
                </div>
                <div className="circle text-center"></div>
            </div>
        );
    }
}
