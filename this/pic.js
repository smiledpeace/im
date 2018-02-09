window.onload = function() {
	var figures = Array.from(document.querySelectorAll('.thumbnails img'));
	var large_photo = document.querySelector('.large_photo');
	figures.forEach(function(dom) {
		dom.addEventListener('click', function (e){
			e.stopPropagation();
			large_photo.style.backgroundImage = `url(${e.target.src})`;
			large_photo.style.backgroundSize = 'cover';
			large_photo.style.backgroundRepeat = 'no-repeat';
		} , false);
	});


}