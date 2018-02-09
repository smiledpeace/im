// 父类
function Controller() {
	this.errors = [];
}

Controller.prototype.showDialog = function(title, msg) {

}

Controller.prototype.success = function(msg) {
	this.showDialog( "Success", msg );
}

Controller.prototype.failure = function(err) {
	this.errors.push( err );
	this.showDialog( "Error", err );
}

// 子类
function LoginController() {
	Controller.call(this);
}

// 把子类关联到父类
LoginController.prototype = Object.create( Controller.prototype );

LoginController.prototype.getUser = function() {
	return document.getElementById(	"login_username" ).value;
}
LoginController.prototype.getPassword = function() {
	return document.getElementById( "login_password" ).value;
}

LoginController.prototype.validateEntry = function(user, pwd) {
	user = user || this.getUser();
	pwd = pwd || this.getPassword();

	if (!(user && pw)) {
		return this.failure("Please enter a username & password!");
	}
	else if (pwd.length < 5) {
		return this.failure("Password must be 5+ charactors!");
	}

	return true;
}

LoginController.prototype.failure = function(err) {
	Controller.prototype.failure.call( this, "Login invalid: " + err);
}

// 子类
function AuthController(login) {
	Controller.call( this );

	this.login = login;
}

// 把子类关联到父类
AuthController.prototype = Object.create( Controller.prototype );
	
AuthController.prototype.server = function(url,data) {
	return $.ajax( {
		url: url,
		data: data
	} );
};

AuthController.prototype.checkAuth = function() {
	var user = this.login.getUser();
	var pwd = this.login.getPassword();

	if (this.login.validateEntry( user, pwd )) {
		this.server('/check-auth', {
			user: user,
			pwd: pwd
		} )
		.then( this.success.bind(this) )
		.fail( this.failure.bind(this) );
	}
}
// 重写基础的success()
AuthController.prototype.success = function() {
	// “super”调用
	Controller.prototype.success.call( this, "Authenticated!" );
};

// 重写基础的failure()
AuthController.prototype.failure = function(err) {
	// “super”调用
	Controller.prototype.failure.call(
		this,
		"Auth Failed: " + err
	);
};


var auth = new AuthController(
	// 除了继承，我们还需要合成
	new LoginController()
);
auth.checkAuth(
	
);



var LoginController2 = {
    errors: [],
    getUser: function() {
        return document.getElementById(
            "login_username"
        ).value;
    },
    getPassword: function() {
        return document.getElementById(
            "login_password"
        ).value;
    },
    validateEntry: function(user, pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();
        if (!(user && pw)) {
            return this.failure(
                "Please enter a username & password!"
            );
        } else if (user.length < 5) {
            return this.failure(
                "Password must be 5+ characters!"
            );
        }
        // 如果执行到这里说明通过验证
        return true;
    },
    showDialog: function(title, msg) {
        // 给用户显示标题和消息
    },
    failure: function(err) {
        this.errors.push(err);
        this.showDialog("Error", "Login invalid: " + err);
    }
};
// 让AuthController 委托LoginController
var AuthController2 = Object.create( LoginController2 );
AuthController2.errors = [];
AuthController2.checkAuth = function() {
    var user = this.getUser();
    var pw = this.getPassword();
    if (this.validateEntry(user, pw)) {
        this.server("/check-auth", {
                user: user,
                pw: pw
            })
            .then(this.accepted.bind(this))
            .fail(this.rejected.bind(this));
    }
};
AuthController2.server = function(url, data) {
    return $.ajax({
        url: url,
        data: data
    });
};
AuthController2.accepted = function() {
    this.showDialog("Success", "Authenticated!")
};
AuthController2.rejected = function(err) {
    this.failure("Auth Failed: " + err);
};

AuthController2.checkAuth();