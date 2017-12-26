import React from 'react';

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navs: [
				{value: '有序列表', key: 'OL'}, 
				{value: '无序列表', key: 'UL'}, 
				{value: '粗体', key: 'B'}, 
				{value: '下划线', key: 'HR'},
				{value: '左对齐', key: 'LEFT'},
				{value: '右对齐', key: 'RIGHT'},
				{value: '居中对齐', key: 'CENTER'},
				{value: '文本对齐', key: 'FULL'},
				{value: '任务列表', key: 'CHECKBOX'}
			],
			editor: null,
			where: null,
			range: null,
			hrCount: 0
		}
	}
	componentDidMount() {
		this.init();
	}
	init() {
		var where = null;
		const _this = this;
		this.setState({
			editor: document.querySelector('#rich-editor')
		});
		document.querySelector('#rich-editor').innerHTML = '<p><br /></p>';
		document.querySelector('#rich-editor').addEventListener('keyup', function(e) {
			if (e.keyCode === 13) {
				where = _this.getRange().endContainer;
				console.log(where);
				if (where.tagName === 'DIV') {
					let p = _this.createP();
					// console.log(_this.findParentByTagName(where.parentNode, where));;
					where.parentNode.appendChild(p);
	                where.parentNode.removeChild(where);
				}
			}
		});
		document.querySelector('#rich-editor').addEventListener('keyup', function(e) {
			if (e.keyCode === 8) {
				if (!this.innerHTML) {
					this.innerHTML = '<p><br /></p>';
				}
			}
		});
	}
	handleItem(e, key) {
		console.log(key);
		const range = this.getRange();
		let currentendContainer = null;
		this.setState({
			hrCount: ++this.state.hrCount
		});
		if (range) {
			switch(key) {
				case 'UL':
					document.execCommand('insertUnorderedList', false, null);
					this.adjustList();
					break;
				case 'OL':
					document.execCommand('insertOrderedList', false, null);
					this.adjustList();
					break;
				case 'B':
					document.execCommand('bold', false, null);
					break;
				case 'HR': 
					document.execCommand('insertHorizontalRule', false, `id${this.state.hrCount}`);
					setTimeout(() => {
						// 如果hr  是在li标签里面 往后追加 文本节点 否则追加 <p><br /></p>
						let hr = document.querySelector(`#id${this.state.hrCount}`), container = document.querySelector('#rich-editor');
						if (hr.parentNode.tagName === 'LI') {
							container.appendChild(document.createTextNode());
						}else {
							let p = this.createP;
							container.appendChild(p);
							this.resetRange(p, 0, p, 0);
						}
					}, 0)
					break;
				case 'LEFT': 
					document.execCommand('justifyLeft', false, null);
					break;
				case 'RIGHT': 
					document.execCommand('justifyRight', false, null);
					break;
				case 'CENTER': 
					document.execCommand('justifyCenter', false, null);
					break;
				case 'FULL': 
					document.execCommand('justifyFull', false, null);
					break;
				case 'CHECKBOX': 
					document.execCommand('insertUnorderedList', false, 'className');
					currentendContainer = range.endContainer;
					console.log(currentendContainer);
					this.adjustList();
					// document.execCommand('justifyFull', false, null);
					break;
			}

		}
	}
	createP() {
		let p = document.createElement('p'), br = document.createElement('br');
		p.appendChild(br);
		return p;
	}
	createElement(targeName) {
		return document.createElement(targeName);
	}
	// ul ol 不被包裹在div 标签里面
	adjustList() {
 	    let lists = this.state.editor.querySelectorAll("ol, ul");
	     for (let i = 0; i < lists.length; i++) {
	        let ele = lists[i]; // ol
	        let parentNode = ele.parentNode;
	        if (parentNode.tagName === 'P' && parentNode.lastChild === parentNode.firstChild) {
	                parentNode.insertAdjacentElement('beforebegin', ele);
	                parentNode.remove()
	        }
	    }
	}
	/**
	 * 查找父元素
	 * @param {HTMLElement} root 
	 * @param {String | Array} name 
	 */
	findParentByTagName(root, name) {
	    let parent = root;
	    if (typeof name === "string") {
	        name = [name];
	    }
	    while (name.indexOf(parent.nodeName.toLowerCase() : '') === -1 && parent.nodeName !== "BODY" && parent.nodeName !== "HTML") {
	        parent = parent.parentNode;
	    }
	    return parent.nodeName === "BODY" || parent.nodeName === "HTML" ? null : parent;
	}
	/**
	 * 获取range 
	 */
	getRange() {
		var userSelection, range = null;
	    if (window.getSelection) { //现代浏览器
	        userSelection = window.getSelection();
	    } else if (document.selection) { //IE浏览器 考虑到Opera，应该放在后面
	        userSelection = document.selection.createRange();
	    }
	    if (userSelection.getRangeAt && userSelection.rangeCount) {
	        range = userSelection.getRangeAt(0);
	    } 
	    return range;
	}
	/**
	 * 设置光标位置
	 */
	resetRange(startContainer, startOffset, endContainer, endOffset) {
	    let selection = window.getSelection();
	        selection.removeAllRanges();
	    let range = document.createRange();
	    range.setStart(startContainer, startOffset);
	    range.setEnd(endContainer, endOffset);
	    selection.addRange(range);
	}
	render() {
		return (
			<div className="editor-box">
				<ul className="nav">
					{
						this.state.navs.map(( _nav , index ) => 
							<li key={index} ><button onClick={e => this.handleItem(e, _nav.key)}>{_nav.value}</button> </li>
						)	
					}
				</ul>

				<div id="rich-editor" contentEditable="true">

				</div>
			</div>
		)
	}
}

export { Editor }