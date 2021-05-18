/*
	Function thông báo
	Toast bootstrap 4
	Position có 4 class: top-0, left-0, right-0, bottom-0 (vị trí sẽ show thông báo)
	Code mẫu nằm trong phần "Document ready - submit form"
 */
var call_toastr = function (msg, type, time, position, parentElm) {
	if (!position) {
		position = "position-fixed top-0 right-0";
	}
	let classFind = position.replaceAll(" ", ".");
	if (!time) {
		time = 3000;
	}
	let html = "";
	let hasContainer = ($(".toast-container." + classFind).length > 0);
	let icon = "";
	let bg = "";
	let textColor = "";
	if (type == "success") {
		icon = '<i class="fal fa-check-circle"></i>';
		bg = "bg-success bg-gradient";
		textColor = "text-white";
	} else if (type == "info") {
		icon = '<i class="fal fa-info-circle"></i>';
		bg = "bg-info bg-gradient";
		textColor = "text-white";
	} else if (type == "warning") {
		icon = '<i class="fal fa-exclamation-triangle"></i>';
		bg = "bg-warning bg-gradient";
		textColor = "text-white";
	} else if (type == "error") {
		icon = '<i class="fal fa-times-circle"></i>';
		bg = "bg-danger bg-gradient";
		textColor = "text-white";
	}
	if (!hasContainer) {
		html += `<div class="template-4_toast toast-container ${position}">`;
	}
	html += `<div class="toast ${bg} ${textColor}" role="alert" aria-live="assertive" data-delay="${time}"
         aria-atomic="true">
		<div class="toast-body d-flex justify-content-between">
			<div class="toast-text d-flex">
				 <div class="mr-2 toast-icon">
					${icon}
				 </div>
				 ${msg}
			</div>
			<button type="button" class="mb-1 ml-2 close" data-dismiss="toast" aria-label="Close"><i class="fal fa-times"></i></button>
		</div>
    </div>`;
	
	let elmContainer;
	if (!hasContainer) {
		html += `</div>`;
		if (parentElm) {
			parentElm.append(html);
		} else {
			$("body").append(html);
		}
		elmContainer = $(".toast-container." + classFind);
	} else {
		elmContainer = $(".toast-container." + classFind);
		elmContainer.append(html);
	}
	
	elmContainer.find(".toast:not(.fade)")[0].addEventListener('hidden.bs.toast', function (e) {
		e.target.remove();
		if (elmContainer.find(".toast").length == 0) {
			elmContainer.remove();
		}
	});
	
	elmContainer.find(".toast:not(.fade)").toast("show");
};

var formatPrice = function (n, currency) {
	return n.toFixed(0).replace(/./g, function (c, i, a) {
		return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
	}) + ' ' + currency;
}

var fnUpdateInformation = function (form) {
	// form == 0 : form cập nhật thông tin tài hoản
	// form == 1 : form đổi mật khẩu
	$('.template-4_information .card .loading-pure').show();
	setTimeout(function () {
		if (form == 0) {
			$('.template-4_information .card .card-header .card-title').text('Cập nhật thông tin tài khoản');
			$('#informationView').hide();
			$('#informationFrom').show();
		} else if (form == 1) {
			$('.template-4_information .card .card-header .card-title').text('Đổi mật khẩu');
			$('#informationView').hide();
			$('#passwordFrom').show();
		} else {
			$('.template-4_information .card .card-header .card-title').text('Thông tin tài khoản');
			$('#informationFrom').hide();
			$('#passwordFrom').hide();
			$('#informationView').show();
		}
		$('.template-4_information .card .loading-pure').hide();
	}, 1000);
}

function handleTouchMove(ev) {
	ev.preventDefault();
}

const callMenu = function () {
	if ($('.template-6_header').hasClass('show')) {
		$('.template-6_header').removeClass('show');
		$('body').css("overflow-y", "auto");
		document.removeEventListener('touchmove', handleTouchMove);
	} else {
		$('.template-6_header').addClass('show');
		$('body').css("overflow-y", "hidden");
		document.addEventListener('touchmove', handleTouchMove, {passive: false});
	}
}
$(document).ready(function () {
	let windowWidth = $(window).width();
	if (windowWidth < 992) {
		$(".template-6_header .navigation-area > ul > li > ul").each(function (index) {
			$(this).prev().attr({
				"href": "#subMenu" + index,
				"data-toggle": "collapse"
			});
			$(this).attr({
				"id": "subMenu" + index,
				"class": "collapse " + $(this).attr('class'),
				"data-parent": "#has-navigation"
			});
		})
	}
	
	$('#hamburger, .template-6_header > .overlay-area').click(function () {
		callMenu();
	});
	
	
	$(document).on("click", ".callModal", function () {
		$('.modal').modal('hide');
		$('#' + $(this).data('modal')).modal('show');
		setTimeout(function () {
			$('body').addClass('modal-open');
		}, 500)
	});
	
	$('.form-validated').submit(function (e) {
		e.preventDefault();
		if ($('.form-validated select').val() == -1) {
			call_toastr("Vui lòng chọn ...", 'error', '5000');
		} else {
			call_toastr("Đây là thông báo thành công", 'success', '5000');
		}
	});
	
	$('.updateInformation').click(function () {
		fnUpdateInformation($(this).data('form'));
	});
	
	if ($('#particles-js').length > 0) {
		particlesJS("particles-js", {
			"particles": {
				"number": {"value": 140, "density": {"enable": true, "value_area": 800}},
				"color": {"value": "#ffffff"},
				"shape": {
					"type": "circle",
					"stroke": {"width": 0, "color": "#000000"},
					"polygon": {"nb_sides": 3},
					"image": {"src": "img/github.svg", "width": 100, "height": 100}
				},
				"opacity": {
					"value": 0.5,
					"random": false,
					"anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}
				},
				"size": {
					"value": 3,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 1,
						"size_min": 0.1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": true,
					"distance": 0,
					"color": "#ffffff",
					"opacity": 0.2,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 1,
					"direction": "none",
					"random": false,
					"straight": false,
					"out_mode": "out",
					"bounce": false,
					"attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {"enable": false, "mode": "repulse"},
					"onclick": {"enable": false, "mode": "push"},
					"resize": false
				},
				"modes": {
					"grab": {"distance": 400, "line_linked": {"opacity": 1}},
					"bubble": {"distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3},
					"repulse": {"distance": 200, "duration": 0.4},
					"push": {"particles_nb": 4},
					"remove": {"particles_nb": 2}
				}
			},
			"retina_detect": true
		});
	}
	if ($('#particles-js-2').length > 0) {
		particlesJS("particles-js-2", {
			"particles": {
				"number": {"value": 140, "density": {"enable": true, "value_area": 800}},
				"color": {"value": "#ffffff"},
				"shape": {
					"type": "circle",
					"stroke": {"width": 0, "color": "#000000"},
					"polygon": {"nb_sides": 3},
					"image": {"src": "img/github.svg", "width": 100, "height": 100}
				},
				"opacity": {
					"value": 0.5,
					"random": false,
					"anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}
				},
				"size": {
					"value": 3,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 1,
						"size_min": 0.1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": true,
					"distance": 0,
					"color": "#ffffff",
					"opacity": 0.2,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 1,
					"direction": "none",
					"random": false,
					"straight": false,
					"out_mode": "out",
					"bounce": false,
					"attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {"enable": false, "mode": "repulse"},
					"onclick": {"enable": false, "mode": "push"},
					"resize": false
				},
				"modes": {
					"grab": {"distance": 400, "line_linked": {"opacity": 1}},
					"bubble": {"distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3},
					"repulse": {"distance": 200, "duration": 0.4},
					"push": {"particles_nb": 4},
					"remove": {"particles_nb": 2}
				}
			},
			"retina_detect": true
		});
	}
	
	if ($('#swiper-partner').length > 0) {
		const slidePartner = new Swiper('#swiper-partner', {
			autoplay: {
				delay: 10000,
				disableOnInteraction: false,
			},
			breakpoints: {
				320: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 15,
				},
				1024: {
					slidesPerView: 5,
					spaceBetween: 15,
				},
			}
		});
	}
	
	$('.call-dropdownCoin').click(function () {
		callDropdownCoin($(this));
	});
	
	$('#chooseCoin > ul > li > a').click(function () {
		changeCoin($(this));
	});
	
	$('#swap-coin').click(function () {
		swapCoin($(this));
	});
	
	$(document).on("mouseup", function (e) {
		var o = $(".dropdown-coin.show");
		o.is(e.target) || 0 !== o.has(e.target).length
		|| (o.removeClass('show'))
	});
});


const callDropdownCoin = function (elm) {
	let dropdown_coinElm = elm.parents('.template-6_banner .form-item').find('.dropdown-coin');
	if (dropdown_coinElm.hasClass('show')) {
		dropdown_coinElm.removeClass('show');
	} else {
		$('.template-6_banner .dropdown-coin').removeClass('show');
		dropdown_coinElm.addClass('show');
	}
}

var changeCoin = function (elm) {
	let img = elm.data('image'),
		name = elm.data('name');
	
	elm.parents('.template-6_banner .form-item').find('.circle-coin img').prop('src', img);
	elm.parents('.template-6_banner .form-item').find('.name-coin div').text(name);
	elm.parents('.dropdown-coin').removeClass('show');
}

const swapCoin = function (elm) {
	let from_coinImg = elm.parents('.form-inner').find('.form-item .coin-from .circle-coin img').attr('src'),
		from_coinName = elm.parents('.form-inner').find('.form-item .coin-from .name-coin .text').text(),
		from_coinValue = elm.parents('.form-inner').find('.form-item .coin-from input').val(),
		to_coinImg = elm.parents('.form-inner').find('.form-item .coin-to .circle-coin img').attr('src'),
		to_coinName = elm.parents('.form-inner').find('.form-item .coin-to .name-coin .text').text(),
		to_coinValue = elm.parents('.form-inner').find('.form-item .coin-to input').val();
	
	elm.parents('.form-inner').find('.form-item .coin-from .circle-coin img').attr('src', to_coinImg);
	elm.parents('.form-inner').find('.form-item .coin-from .name-coin .text').text(to_coinName);
	elm.parents('.form-inner').find('.form-item .coin-from  input').val(to_coinValue);
	elm.parents('.form-inner').find('.form-item .coin-to .circle-coin img').attr('src', from_coinImg);
	elm.parents('.form-inner').find('.form-item .coin-to .name-coin .text').text(from_coinName);
	elm.parents('.form-inner').find('.form-item .coin-to input').val(from_coinValue);
}