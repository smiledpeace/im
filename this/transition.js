var transition = document.querySelector('.transition');
setTimeout(function() {
	transition.classList.add('active');
}, 1000)

setTimeout(function() {
	transition.classList.remove('active');
}, 2400)
console.log(transition);

