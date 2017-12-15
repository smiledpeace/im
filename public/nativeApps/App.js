import React from 'react';

import { Action } from './indexAction/index';
import { Clock } from "./clock/clock";

import { BackGround } from "./background/bg";

import { Reservation } from "./form/reservation";

import { Calculator } from "./BoilingVerdict/Calculator";

import { Game } from './games/game.js';

import { Header } from './head/head.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onHandleMenuLi = this.onHandleMenuLi.bind(this);
        this.state = {
            showGame: false
        }
    }
    onHandleMenuLi(value) {
        if (value === 'game') {
            this.setState({
                showGame: !this.state.showGame
            });
        }
    }
    render() {
        return (
            <div>
                <Header onHandleMenuLi={this.onHandleMenuLi}/>
                <BackGround/>
                <Action/>
                <Clock />
                <Clock />
                <Clock />
                <Reservation/>
                <Calculator/>
                <Game animation={this.state.showGame ? 'active' : ''}/>
            </div>
        )
    }
};
export { App }