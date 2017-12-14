import React from 'react';
import '../../style/game/game.less';
import { Button } from '../../components/button/index.js';
function Repeat(props, key) {

    let items = [];
	for (var i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div className="gameRow" key={key}>{ items }</div>;
}

function Row(props) {
    let items = [];
    for (let i = 0; i < props.yNum; i++) {
        items.push(
            <Repeat numTimes={props.xNum} key={i}>
                {(index) => <div key={index} ref={(div) => {props.divs.push(div)}} className="gameItem" data-x={index} data-y={i} onClick={(e) => props.onClickItem([index, i], e)}>

                </div>}
            </Repeat>
        )
    }
    return <div>{ items }</div>
}

function findPoint(points, point) {
    let find = false;
    points.forEach((item, index, arr) => {
        if (item[0] == point[0] && item[1] == point[1]) {
            find = true;
            return;
        }
    });
    return find;
}
class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			xNum: 5,
            divs: []
		};
		this.points = [];
        this.count = 0;
        this.clickTimes = 0;
        this.handleClick = this.handleClick.bind(this);
		this.handleItem = this.handleItem.bind(this);
	}

    componentWillMount(nextProps, nextState) {
        if (this.props.xNum) {
			this.setState({
				xNum: this.props.xNum,
			});
		}
    }
    componentDidMount() {
        this.init();
    }
    init() {
        const arr = [];
        for (var i = 0; i < this.props.numGames; i++) {
            arr.push(i);
        }
        this.points = arr.map(_item => [Math.floor(Math.random() * this.state.xNum), Math.floor(Math.random() * this.state.xNum)]);
        console.log(this.points);
        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            for (let j = 0; j < this.state.divs.length; j++) {
                let div = this.state.divs[j];
                if (point[0] == div.getAttribute('data-x') && point[1] == div.getAttribute('data-y')) {
                    div.className += ' active';
                    break;
                }
            }
        }
        setTimeout(() => {
            this.state.divs.forEach(div => {
                if (div.classList.contains('active')) {
                    div.classList.remove('active');
                }
            })
        }, 800);
    }
    handleClick() {
        this.count = 0;
        this.clickTimes = 0;
        this.state.divs.forEach(div => {
            if (div.classList.contains('checked')) {
                div.classList.remove('checked');
            }
            if (div.classList.contains('active')) {
                div.classList.remove('active');
            }
        });
        this.init();
    }
    handleItem(point, e) {
        const div = e.target;
        div.classList.add('checked');
        if (findPoint(this.points, point)) {
            if (div.classList.contains('checked')) {
                ++this.count;
            }
        }else {
            this.clickTimes++;
        }
        if (this.count === this.props.numGames) {
            setTimeout(() => {
                alert('You Win');
                this.handleClick();
            }, 300)
        }else if (this.clickTimes > 2) {
            setTimeout(() => {
                alert('You Lost'); 
                for (let i = 0; i < this.points.length; i++) {
                let point = this.points[i];
                for (let j = 0; j < this.state.divs.length; j++) {
                        let div = this.state.divs[j];
                        if (point[0] == div.getAttribute('data-x') && point[1] == div.getAttribute('data-y')) {
                            div.className += ' active';
                            break;
                        }
                    }
                }
            }, 300)
        }
        console.log(this.count);
    }
	render() {
        return (
			<div className="gameBox">
                <Row xNum={this.state.xNum} divs={this.state.divs} yNum={this.state.xNum} onClickItem={this.handleItem}/>
                <Button onClick={this.handleClick} className="">Play</Button>
			</div>
		);
	}	
}
Game.defaultProps = {
    numGames: 5        
}
export { Game };