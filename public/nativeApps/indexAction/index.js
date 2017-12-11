import React from 'react';
import { LeftBar } from './leftBar';
import { Basket } from './basket';
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: [],
            contents: [
                'name', 'test', 'war'
            ]
        }
    }
    updateChange(item) {
        this.setState({
            type: this.state.type.concat(item)
        })
    }
    backFun(item) {
        console.log(item);
        this.setState({
            contents: this.state.contents.concat(item)
        })
    }
    render() {
        return (
            <div className="indexAction">
                <LeftBar contents={this.state.contents} onChange={ (item) => {this.updateChange(item)}}/>
                <Basket type={ this.state.type } onChange={(_item) => {this.backFun(_item)}}/>
            </div>
        )
    }
}

export { App };