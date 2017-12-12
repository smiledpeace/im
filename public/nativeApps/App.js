import React from 'react';

import { Action } from './indexAction/index';
import { Clock } from "./clock/clock";

import { BackGround } from "./background/bg";

import { Reservation } from "./form/reservation";

import { Calculator } from "./BoilingVerdict/Calculator";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <BackGround/>
                <Action/>
                <Clock />
                <Clock />
                <Clock />
                <Reservation/>
                <Calculator/>
            </div>
        )
    }
}

export { App }