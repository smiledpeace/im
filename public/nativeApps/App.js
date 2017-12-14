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
    }
    render() {
        return (
            <div>
                <Header />
                <BackGround/>
                <Action/>
                <Clock />
                <Clock />
                <Clock />
                <Reservation/>
                <Calculator/>
                <Game xNum={5}/>
            </div>
        )
    }
};
export { App }