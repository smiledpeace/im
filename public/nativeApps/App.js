import React from 'react';

import { Action } from './indexAction/index';

import { Clock } from "./clock/clock";

import { BackGround } from "./background/bg";

import { Reservation } from "./form/reservation";

import { Calculator } from "./BoilingVerdict/Calculator";

import { Game } from './games/game.js';

import { Header } from './head/head.js';

import { Chat } from './chat/chat.js';

import { Registe } from './registe/registe.js';

import { Learn } from './learn/learn.js';

import { ajaxQuery } from '../js/util.js';

import { Confirm } from '../components/confirm/confirm.js';

import { Editor } from './richEditor/editor.js';

import Todos  from './todos/index.js';


import { createStore } from 'redux'; 

import { Provider } from 'react-redux';

import reducers from './todos/redux/reducers.js';



String.prototype.firstUpperCase = function(){
    return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
    });
}
const Type = document.querySelector('#type').value.firstUpperCase();

let store = createStore(reducers);
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onHandleMenuLi = this.onHandleMenuLi.bind(this);
        this.state = {
            showGame: false,
            showAction: false,
            showReservation: false,
            showCalculator: false,
            showChat: false,
            showLearn: false,
            showEditor: false,
            showTodo: false,
            socket: null,
            g35user: null
        }
    }
    componentWillMount() {
        if (!this.state.socket) {
            this.setState({
                socket:  io('http://localhost:3000')
            });
        }
        ajaxQuery('/users/gs', {}, (res) => {
            console.log(res.data.result === 'TRUE');
            if (res.data.result === 'TRUE') {
                const userObj = res.data.data;
                this.setState({
                    g35user: userObj 
                });
                this.state.socket.emit('online', userObj);
                this.onHandleMenuLi('editor');
            }
        })
        
    }
    onHandleMenuLi(value) {
        if (value === 'game') {
            this.setState({
                showGame: !this.state.showGame,
                showAction: false,
                showReservation: false,
                showChat: false,
            });
        }

        if (value === 'action') {
            this.setState({
                showAction: !this.state.showAction,
                showGame: false,
                showReservation: false,
                showChat: false,
            });
        }

        if (value === 'reservation') {
            this.setState({
                showReservation: !this.state.showReservation,
                showGame: false,
                showAction: false,
                showChat: false,
            });
        }

        if (value === 'calculator') {
            this.setState({
                showCalculator: !this.state.showCalculator,
                showGame: false,
                showAction: false,
                showReservation: false,
                showChat: false,
            });
        }

        if (value === 'chat') {
            this.setState({
                showCalculator: false,
                showGame: false,
                showAction: false,
                showReservation: false,
                showChat: !this.state.showChat,
            });
        }

        if (value === 'learn') {
            this.setState({
                showCalculator: false,
                showGame: false,
                showAction: false,
                showReservation: false,
                showChat: false,
                showLearn: !this.state.showLearn,
            });
        }

        if (value === 'editor') {
            this.setState({
                showCalculator: false,
                showGame: false,
                showAction: false,
                showReservation: false,
                showChat: false,
                showLearn: false,
                showEditor: !this.state.showEditor,
                showTodo: false
            });
        }

        if (value === 'todo') {
            this.setState({
                showCalculator: false,
                showGame: false,
                showAction: false,
                showReservation: false,
                showChat: false,
                showLearn: false,
                showEditor: false,
                showTodo: true
            });
        }
    }
    render() {
        return (
            <div className="appWrapper">
                <BackGround/>
                <Header onHandleMenuLi={this.onHandleMenuLi}/>
                <section className="section">
                    {
                        Type === 'Registe' ? < Registe socket={this.state.socket} onHandleMenuLi={this.onHandleMenuLi}/> : ''
                    }
                    { 
                        this.state.showAction ? <Action/> : ''
                    }
                    {
                        this.state.showReservation ? <Reservation/> : ''
                    }
                    {
                        this.state.showCalculator ? <Calculator/> : ''
                    }
                    {
                        this.state.showChat ? <Chat g35user={this.state.g35user} animation={'active'} socket={this.state.socket}/> : ''
                    }
                    {
                        this.state.showLearn ? <Learn g35user={this.state.g35user}/> : ''
                    }
                    {
                        this.state.showEditor ? <Editor g35user={this.state.g35user}/> : ''
                    }

                    {
                        this.state.showTodo ? 
                            <Provider store={store}>
                                < Todos /> 
                            </Provider>

                        : ''
                    }
                    
                    <Game animation={this.state.showGame ? 'active' : ''}/>
                </section>
                
            </div>
        )
    }
};
export { App }