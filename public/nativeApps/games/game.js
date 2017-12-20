import React from 'react';
import '../../style/game/game.less';
import { Button } from '../../components/button/index.js';
import { Setting } from './setting.js'
function Repeat(props, key) {

    let items = [];
	for (var i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div className="gameRow" key={key}>{ items }</div>;
}

function Row(props) {
    let items = [];
    let needDivs = [];
    for (let i = 0; i < props.yNum; i++) {
        items.push(
            <Repeat numTimes={props.xNum} key={i}>
                {(index) => <div key={index} ref={(div) => {props.divs.length <= (props.xNum * props.yNum - 1)  && props.divs.push(div)}} className="gameItem" data-x={index} data-y={i} onClick={(e) => props.onClickItem([index, i], e)}>

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
			yNum: 5,
            divs: []
		};
		this.points = [];
        this.count = 0;
        this.clickTimes = 0;
        this.handleClick = this.handleClick.bind(this);
        this.handleItem = this.handleItem.bind(this);
		this.onSetting = this.onSetting.bind(this);
	}

    componentWillMount(nextProps, nextState) {
    }
    init() {
        const arr = [];
        function random(_this) {
            const len1 = Math.min.apply(null, [_this.state.xNum, _this.state.yNum])
            for (var i = 0, len = len1 ; i < len; i++) {
                arr.push(i);
            }
            return arr.map(_item => [Math.floor(Math.random() * _this.state.xNum), Math.floor(Math.random() * _this.state.yNum)]);
        }
        this.points = random(this);
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
        this.setState({
            divs: [] 
        });
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
        if (this.count === Math.min.apply(null, [this.state.xNum, this.state.yNum])) {
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
    }
    onSetting(xNum, yNum) {
        this.setState({
            xNum,
            yNum 
        });
        this.init();
    }
	render() {
        return (
			<div className={`gameBox ${this.props.animation}`}>
                <Setting onSetting={this.onSetting}/>
                <Row xNum={this.state.xNum} divs={this.state.divs} yNum={this.state.yNum} onClickItem={this.handleItem}/>
                <Button onClick={this.handleClick} className="">Play</Button>
			</div>
		);
	}	
}
export { Game };