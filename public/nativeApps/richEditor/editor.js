import React from 'react';
import { ajaxQuery } from '../../js/util.js';

import '../../style/editor/editor.less'
class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navs: [
				{value: '有序列表', key: 'icon-order'}, 
				{value: '无序列表', key: 'icon-unOrder'}, 
				{value: '粗体', key: 'icon-jiacu'}, 
				{value: '斜体', key: 'icon-qingxie'}, 
				{value: '下划线', key: 'icon-xiahuaxian'}, 
				{value: '删除线', key: 'strikeThrough'}, 
				{value: '分割线', key: 'insertHorizontalRule'},
				{value: '左对齐', key: 'justifyCenter'},
				{value: '右对齐', key: 'justifyRight'},
				{value: '居中对齐', key: 'icon-juzhong'},
				{value: '文本对齐', key: 'justifyFull'},
				{value: '任务列表', key: 'icon-check'},
				{value: '大标题', key: 'H1'},
				{value: '中标题', key: 'H2'},
				{value: '小标题', key: 'H3'},
				{value: '普通', key: 'P'},
				{value: '9', key: 'fontSize9'},
				{value: '11', key: 'fontSize10'},
				{value: '12', key: 'fontSize11'},
				{value: '14', key: 'fontSize12'},
				{value: '18', key: 'fontSize14'},
				{value: '30', key: 'fontSize18'},
				{value: '36', key: 'fontSize24'},
				{value: '增加缩进', key: 'indent'},
				{value: '减少缩进', key: 'outdent'},
				{value: '插入链接', key: 'insertLink'},
				{value: '插入图片', key: 'icon-left-image'},
				{value: '撤销', key: 'icon-unredo'},
				{value: '重做', key: 'redo'},
				{value: '颜色', key: 'foreColor'},
				{value: '背景色', key: 'backColor'},
				{value: '清除格式', key: 'removeFormat'},
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
		document.querySelector('#rich-editor').focus();
		document.querySelector('#rich-editor').addEventListener('keyup', function(e) {
			if (e.keyCode === 13) {
				where = _this.getRange().endContainer;
				_this.adjustList();
				if (where.tagName === 'DIV') {
					let p = _this.createP();
					// console.log(_this.findParentByTagName(where.parentNode, where));;
					where.parentNode.appendChild(p);
	                where.parentNode.removeChild(where);
				}
				if (where.tagName === 'FONT') {
					// _this.resetRange()
					_this.getRange().insertNode(_this.createP());
					// _this.getRange().endContainer.remove();
				}
				let li = where.tagName === 'SPAN' && _this.findParentByTagName(where, 'li');
				li && _this.checkBoxEvent(_this, li);
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
		let range = this.getRange();
		const _this = this;
		let currentendContainer = null, container = document.querySelector('#rich-editor');
		this.setState({
			hrCount: ++this.state.hrCount
		});
		if (range) {
			switch(key) {
				case 'icon-order':
					document.execCommand('insertOrderedList', false, null);
					this.adjustList();
					break;
				case 'icon-unOrder':
					document.execCommand('insertUnorderedList', false, null);
					this.adjustList();
					break;
				case 'icon-jiacu':
					document.execCommand('bold', false, null);
					break;
				case 'icon-qingxie':
					document.execCommand('italic', false, null);
					break;
				case 'icon-xiahuaxian':
					document.execCommand('underline', false, null);
					break;
				case 'strikeThrough':
					document.execCommand('strikeThrough', false, null);
					break;
				case 'insertHorizontalRule': 
					document.execCommand('insertHorizontalRule', false, `id${this.state.hrCount}`);
					setTimeout(() => {
						// 如果hr  是在li标签里面 往后追加 文本节点 否则追加 <p><br /></p>
						let hr = document.querySelector(`#id${this.state.hrCount}`);
						if (hr.parentNode.tagName === 'LI') {
							container.appendChild(document.createTextNode());
						}else {
							let p = this.createP();
							container.appendChild(p);
							this.resetRange(p, 0, p, 0);
						}
					}, 0)
					break;
				case 'justifyLeft': 
					document.execCommand('justifyLeft', false, null);
					break;
				case 'justifyRight': 
					document.execCommand('justifyRight', false, null);
					break;
				case 'icon-juzhong': 
					document.execCommand('justifyCenter', false, null);
					break;
				case 'justifyFull': 
					document.execCommand('justifyFull', false, null);
					break;
				case 'icon-check': 
					currentendContainer = range.endContainer;
					console.log(currentendContainer);
					console.log(currentendContainer.parentNode);
					if ( (currentendContainer.parentNode.tagName === 'SPAN' || currentendContainer.tagName === 'LI' || currentendContainer.parentNode.tagName === 'LI' ) && (currentendContainer.className || currentendContainer.parentNode.className)) {
						let ul = this.findParentByTagName(range.endContainer, 'ul');
						let li = this.findParentByTagName(range.endContainer, 'li');
						let p = this.createP(range.endContainer);
						if (ul.querySelectorAll('li').length === 1) {
							ul.remove();
						}else {
							li.remove();
						}
						range.insertNode(p);
						this.resetRange(p, 1, p, 1);
					}else {
						console.log(currentendContainer);
						let parentNode = currentendContainer.parentNode;
						let checkBox = this.createUL(currentendContainer);
						if(parentNode.tagName === 'P') {
							parentNode.remove();
						}else if(range.endContainer.tagName === 'P') {
							range.endContainer.remove();
						}else if(parentNode.tagName === 'LI'){
							parentNode.remove();
						}
						range.insertNode(checkBox);
						console.log(checkBox.parentNode);
						if (checkBox.parentNode) {
							checkBox.parentNode.insertAdjacentElement('beforeEnd', checkBox);
						}
						this.resetRange(checkBox.firstElementChild.firstElementChild, parentNode.nodeType ? 1 : 0, checkBox.firstElementChild.firstElementChild, parentNode.nodeType ? 1 : 0);
						this.checkBoxEvent(_this); // 事件绑定
					}
					break;
				case "H1":
					document.execCommand('formatBlock', false, 'H1');
					break;
				case "H2":
					document.execCommand('formatBlock', false, 'H2');
					break;
				case "H3":
					document.execCommand('formatBlock', false, 'H3');
					break;
				case "P":
					document.execCommand('formatBlock', false, 'P');
					break;
				case "fontSize9":
					document.execCommand('fontSize', false, 1);
					break;
				case "fontSize10":
					document.execCommand('fontSize', false, 2);
					break;
				case "fontSize11":
					document.execCommand('fontSize', false, 3);
					break;
				case "fontSize12":
					document.execCommand('fontSize', false, 4);
					break;
				case "fontSize14":
					document.execCommand('fontSize', false, 5);
					break;
				case "fontSize18":
					document.execCommand('fontSize', false, 6);
					break;
				case "fontSize24":
					document.execCommand('fontSize', false, 7);
					break;
				case "indent":
					document.execCommand('indent', false, null);
					break;
				case "outdent":
					document.execCommand('outdent', false, null);
					break;
				case "insertLink": 
					this.insertLink('https://www.baidu.com/', '百度');
					break;
				case "icon-left-image": 
					let inputFile = document.createElement('input');
					inputFile.setAttribute('type', 'file');
					inputFile.click();
					inputFile.onchange = function () {
						let formData = new FormData();
						formData.append('files', inputFile.files[0]);
						formData.append('fileName', inputFile.files[0].name);
						ajaxQuery('/users/upload', formData, res => {
							res = res.data;
							document.execCommand('insertImage', false, res.url);
						})
					}
					break;
				case 'redo':
					document.execCommand('redo', false, null);
					break;
				case 'icon-unredo':
					document.execCommand('undo', false, null);
					break;
				case 'foreColor':
					document.execCommand('foreColor', false, '980');
					break;
				case 'backColor':
					document.execCommand('backColor', false, '980');
					break;
				case 'removeFormat':
					document.execCommand('removeFormat', false, null);
					break;
			}
			
		}
	}
	uploadFile(e) {
		let formData = new FormData();
		formData.append('files', e.target.files[0]);
		formData.append('fileName', e.target.files[0].name);
		ajaxQuery('/users/upload', formData, res => {
			res = res.data;
			if (res.result === 'TRUE') {
				this.setState({
					avatar: res.url
				});
			}
		})
	}
	/*
	 *	给任务列表绑定事件 
	 *	@param {Object} this 
	 */
	checkBoxEvent(_this, li) {
		
		if (!li) {
			var lis = Array.prototype.slice.call(document.querySelectorAll('ul.checkBox li'));
			for (let i = 0, len = lis.length; i < len; i++) {
				let _item = lis[i];
				_item.addEventListener('click', function() {
					let range = _this.getRange();
					if (range.endOffset) {
						return false;
					}
					_this.resetRange(this.firstElementChild, 1, this.firstElementChild, 1);
					if (this.classList.contains('icon-check')) {
						this.classList.remove('icon-check')
						this.classList.add('icon-checked');
					}else if(this.classList.contains('icon-checked')) {
						this.classList.add('icon-check')
						this.classList.remove('icon-checked');
					}
				});
				// 阻止事件冒泡 
				_item.firstElementChild && _item.firstElementChild.addEventListener('click', function(e){
					e.stopPropagation();
					return false;
				})
			}
		}else {
			li.className = 'iconfont icon-check';
			li.addEventListener('click', function() {
				let range = _this.getRange();
				if (range.endOffset) {
					return false;
				}
				_this.resetRange(this.firstElementChild, 1, this.firstElementChild, 1);
				if (this.classList.contains('icon-check')) {
					this.classList.remove('icon-check')
					this.classList.add('icon-checked');
				}else if(this.classList.contains('icon-checked')) {
					this.classList.add('icon-check')
					this.classList.remove('icon-checked');
				}
			});
			// 阻止事件冒泡 
			li.firstElementChild && li.firstElementChild.addEventListener('click', function(e){
				e.stopPropagation();
				return false;
			})
		}
	}
	createP(node) {
		// let flag =  document.createDocumentFragment();
		let p = document.createElement('p'), br = document.createElement('br');
		p.appendChild(br);
		if (node && node.nodeValue) {
			p.innerHTML = node.nodeValue;
		}else if(node && node.innerHTML && (typeof node.innerHTML === 'string')) {
			p.innerHTML = node.innerHTML;
		}else if(node && node.insertHTML && node.innerHTML.nodeType) {
			p.innerHTML = node.innerHTML.innerHTML;
		}
		// flag.appendChild(p);
		return p;
	}
	createUL(node) {
		// let flag =  document.createDocumentFragment();
		let ul = document.createElement('ul'), li = document.createElement('li');
		ul.className = 'checkBox';
		li.className = 'iconfont icon-check';
		if (node && node.nodeValue) {
			li.innerHTML += `<span>${node.nodeValue || ' '}</span>`;
		}else if(node && node.innerHTML && (typeof node.innerHTML === 'string')) {
			li.innerHTML += `<span>${node.innerHTML || ' '}</span>`;
		}else if(node && node.insertHTML && node.innerHTML.nodeType) {
			li.innerHTML += `<span>${node.innerHTML.innerHTML || ' '}</span>`;
		}
		ul.appendChild(li);
		// flag.appendChild(ul);
		return ul;
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
	// 插入url
	insertLink(url, title) {
	    let selection = document.getSelection(),
	        range = selection.getRangeAt(0);
	    if(range.collapsed) {
	        let start = range.startContainer,
	            parent = this.findParentByTagName(start, 'a');
	        if(parent) {
	            parent.setAttribute('src', url);
	        }else {
	            this.insertHTML(`<a href="javascript:void(0);" onclick="window.open('${url}','_blank');" target="_blank">${title}</a>`);
	        }
	    }else {
	        document.execCommand('createLink', false, url);
	    }
	} 
	insertHTML(html) {
		document.execCommand('insertHTML', false, html)
	}
	/**
	 * 查找父元素
	 * @param {HTMLElement} root 
	 * @param {String | Array} name 
	 */
	findParentByTagName(root, name) {
	    let parent = root;
	    if (!parent) {
	    	return false;
	    }
	    console.log(parent.nodeName);
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
							<li key={index} ><button className={`iconfont ${_nav.key}`} onClick={e => this.handleItem(e, _nav.key)}></button> </li>
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