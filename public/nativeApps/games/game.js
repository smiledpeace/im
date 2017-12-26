import React from 'react';
import '../../style/game/game.less';
import { Button } from '../../components/button/index.js';
import { Setting } from './setting.js';


import { Confirm } from '../../components/confirm/confirm.js'
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
            divs: [],
            showConfirm: false,
            content: ''
		};
		this.points = [];
        this.count = 0;
        this.clickTimes = 0;
        this.handleClick = this.handleClick.bind(this);
        this.handleItem = this.handleItem.bind(this);
        this.onSetting = this.onSetting.bind(this);
        this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

    componentWillMount(nextProps, nextState) {
    }
    init() {
        Array.prototype.findArr = function(arr) {
            return !!this.filter(function(_item) {
                return _item[0] == arr[0] && _item[1] == _item[1];
            }).length;
        }
        const len1 = Math.min.apply(null, [this.state.xNum, this.state.yNum]);
        function random(_this) {
            const outerArr = [];
            while (outerArr.length < len1) {
                let x = Math.floor(Math.random() * _this.state.xNum),
                    y = Math.floor(Math.random() * _this.state.yNum);
                let arr = outerArr.findArr([x, y]);
                arr ? outerArr.pop() : outerArr.push([x, y]);
            }
            return outerArr;
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
                this.setState({
                    showConfirm: true,
                    content: 'You win'
                });
                this.handleClick();
            }, 300)
        }else if (this.clickTimes > 2) {
            setTimeout(() => {
                this.setState({
                    showConfirm: true
                });
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
    handleCancel(e) {
        this.setState({
            showConfirm: false
        });
    }
    handleOk(e) {
        this.setState({
            showConfirm: false
        });
    }
	render() {
        return (
			<div className={`gameBox ${this.props.animation}`}>
                <Setting onSetting={this.onSetting}/>
                <Row xNum={this.state.xNum} divs={this.state.divs} yNum={this.state.yNum} onClickItem={this.handleItem}/>
                <Button onClick={this.handleClick} className="">Play</Button>

                <Confirm showConfirm={this.state.showConfirm} onCancel={this.handleCancel} onOk={this.handleOk}>
                    <p>{this.state.content}</p>
                </Confirm>
			</div>
		);
	}	
}
export { Game };