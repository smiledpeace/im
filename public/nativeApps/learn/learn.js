import React from 'react';

class Learn extends React.Component {
	constructor(props) {
		super(props);
	}
	/**
	 * arryA = ['a', 'b', 'c']
	 * arrtB = [{key: 'a', num1: '1'}, {key: 'b'}]
	 * 1、如果arryA中有a，arryB中没有，那么在arryB中增加一个key值为a的boj，且其他属性值可均为'0';如下： {key:'a',num1:'0',num2:'0',num3:'0',tot':0'}
	 * 2、如果arryA中有a，arryB中也有key值为a的obj,那么arryB则不改变，并且该obj里的其他属性和属性值均不变;
	 * 3、如果在arryA中删除了a，那么arryB中key值为a的obj整个删掉。
	 * @return {new arr} [description]
	 */
	compareArr(arr1 , arr2) {
		var result = [], arr;
		console.log(1231);
		Array.prototype.findKey = function(key) {
			return this.filter(function(_item, index, arr) {
				return _item.key === key 
			})[0];
		}
		for (var i = 0 , len = arr1.length; i < len; i++) {
			arr = arr2.findKey(arr1[i]);
			arr ? result.push(arr) : result.push({key: arr1[i],num1:'0',num2:'0',num3:'0', tot:'0'});
		}
		console.log(result);
		return result;
	}
	reg() {
		/**
		 * 检查 HH:mm
		 *  var re = /^(?:[01]\d|2[0-3])(?::[0-5]\d)$/;
		 *
		 * 检查 HH:mm:ss
		 * re = /^(?:[01]\d|2[0-3])(?::[0-5]\d){2}$/;
		 */
	}
	render() {
		let result = JSON.stringify(this.compareArr(['b', 'c'], [{key: 'a'}]));
		return (
			<div style={{color: '#f9f9f9'}}>
				<pre>
					{result}
				</pre>
			</div>
		)
	}
}

export { Learn }