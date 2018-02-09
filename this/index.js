function identify() {
	return this.name.toUpperCase();
}


function speak() {
	var greeting = "Hello I'm " + identify.call( this );
	log( greeting );
}

var me = {
	name: 'Kyle'
};

var you = {
	name: 'Reader'
}

speak.call( you );

speak.call( me );


function log( things ) {
	var app = document.querySelector('#app');

	app.innerHTML += '<span style="color: '+ color() +' ;">'+ things +'</span>' + '<br>';
}
// 生成随机的16进制颜色值
function color() {
	return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// 
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};
// 硬绑定
var bar = function() {
	return foo.apply( obj, arguments );
}
// 简单的辅助绑定函数
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments )
	}
}
log( bar( 4 ) );


var boo = bind( foo, obj );
log( boo( 4 ) );


var emptyFull = Object.create(null);
console.log( emptyFull );

var empty = {};
console.log( empty );

// 浅拷贝

function mixin( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		if (!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}

	return targetObj;
}

var Vehicle = {
	engnies: 1,
	ignition: function (argument) {
		log("Turning on my engnies");
	},
	drive: function() {
		this.ignition();

		log("Steering and moving forword");
	},
	something: {
		name: 'Joke'
	}
}



var Car = mixin(Vehicle, {
	drive: function() {
		Vehicle.drive.call(this);

		log("Rolling on all " + this.wheels + " wheels!");
	},
	wheels: 4
});

Car.drive();
Car.something.name = 'Loli';
// console.log(Vehicle);
// console.log(Car);


// 设置 getter  和  setter
var book = {};

Object.defineProperty(book, 'a', {
	enumerable: true,
	get: function() {
		return this._a_;
	},
	set: function(val) {
		log('a change')
		this._a_ = val * 2;
	}
});


book.a = 1;

// prototype 
// 
var someObj = {
	a: 2
};

var thisObj = Object.create( someObj );

// console.log(thisObj);

for (var key  in thisObj) {
	log("Found " + key);
}


function Foo( name ) {
	this.name = name;
}

Foo.prototype.sayHi = function() {
	return "My name is " + this.name;
}

var a1 = new Foo();
console.log(a1);
function Bar( name, label ) {
	Foo.call(this, name);
	this.label = label; 
}

Bar.prototype = Object.create( Foo.prototype );

var b = new Bar('Jory', 'label');
console.log( b );
console.log( b.sayHi() );



var Task = {
	setID: function(ID) {
		this.id = ID
	},
	outputID: function() {
		log( this.id );
	}
}


var XYZ = Object.create( Task );
XYZ.prepareTask = function(ID, label) {
	this.setID(ID);
	this.label = label;
}

XYZ.outputTaskDetail = function() {
	this.outputID();

	log( this.label )
}

console.log(XYZ);

// 继承 方式

function Widge(width, height) {
	this.width = width || 50;
	this.height = height || 50;
	this.$ele = null;
}

Widge.prototype.render = function($where) {
	if (this.$ele) {
		this.$ele.css( {
			width: this.width + 'px',
			height: this.height + 'px'
		} ).appendTo( $where );
	}
}

function Button(width, height, label) {
	Widge.call(this, width, height);
	this.label = label || 'Default';
	this.$ele = $('<button></button>').text( this.label );
}

Button.prototype = Object.create( Widge.prototype );


Button.prototype.render = function( $where ) {
	Widge.prototype.render.call( this, $where );

	this.$ele.click( this.onClick.bind( this ) );
}


Button.prototype.onClick = function() {
	log( "Button '" + this.label + "' clicked!");
}

$(document).ready(function() {
	var $body = $( document.body );
	var btn1 = new Button('125', '30', 'Primary')
	var btn2 = new Button('150', '40', 'Ghost');
	btn1.render( $body );
	btn2.render( $body );
});

// 委托对象
// 
var Widge2 = {
	init: function(width, height) {
		this.width = width || 50;
		this.height = height || 50;
		this.$ele = null;
	},
	insert: function($where) {
		if (this.$ele) {
			this.$ele.css( {
				width: this.width + 'px',
				height: this.height + 'px'
			} ).appendTo( $where );
		}
	}
};

var Button2 = Object.create( Widge2 );

Button2.setUp = function(width, height, label) {
	// 委托调用
	this.init( width, height );
	this.label = label || "Default";

	this.$ele = $('<button></button>').text( this.label );

}

Button2.build = function($where) {
	this.insert( $where );

	this.$ele.click( this.onClick.bind( this ));
}

Button2.onClick = function() {
	log( "Button '" + this.label + "' clicked!");
}

$(document).ready(function() {
	var $body = $( document.body );
	var btn1 = Object.create( Button2 );
	btn1.setUp('125', '40', 'Hello');

	var btn2 = Object.create( Button2 );
	btn2.setUp('150', '40', 'World');

	btn1.build( $body );
	btn2.build( $body );
});