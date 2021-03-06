$(function () {
	/**
    * Инициализация скриптов
    */
	var relizeScript = {
		// Функиця запуска основных инициализаций
		start: function () {
			this.isMobile();
			this.svgLoad();
			this.documentBind();
			var scrollPos = $(window).scrollTop()
			relizeScript.loadAnimate(scrollPos)
		},
		// Проверка на мобильный
		// Если true запускает слайдер "команда"
		isMobile: function () {
			if ($(window).width() < 575) {
				this.mobileSlider();
				return true;
			}
		},
		// Проверка на таблеты
		// Если true запускает слайдер "работы"
		isTabs: function () {
			if ($(window).width() < 992) {
				this.activateSlider();
				return true;
			}
		},
		// Запуск слайдера работ
		activateSlider: function () {
			$('.workSlider').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		},
		// Ребилд svg из img в <svg>
		svgLoad: function () {
			$('img.svg').each(function () {
				var img = $(this);
				var imgID = img.attr('id');
				var imgClass = img.attr('class');
				var imgURL = img.attr('src');

				jQuery.get(imgURL, function (data) {
					var svg = $(data).find('svg');

					if (typeof imgID !== 'undefined') {
						svg = svg.attr('id', imgID);
					}

					if (typeof imgClass !== 'undefined') {
						svg = svg.attr('class', imgClass + ' replaced-svg');
					}

					svg = svg.removeAttr('xmlns:a');
					img.replaceWith(svg);

				}, 'xml');

			});
		},
		// Анимация при скролле
		loadAnimate: function (scrolledTo) {
			var a = $('.js-scroll')
			var h = $(window).height()
			var thr = parseInt(h * 0.5)
			var s = 0
			a.each(function () {
				var block = $(this),
					blockHeight = block.outerHeight(),
					blockPos = block.offset().top - s;
				if (scrolledTo + h - thr > blockPos - s) {
					if (!block.hasClass('animate-in')) {
						block.addClass('animate-in');
					}
				}
			});
		},
		lazyLoad: function (scrolledTo) {
			if ($('.card-image').hasClass('is-loaded')) {
				return
			}
			var a = $('.teamList')
			var h = $(window).height()
			var thr = parseInt(h * 0.5)
			var s = 0
			a.each(function () {
				var block = $(this),
					blockPos = block.offset().top - s;
				if (scrolledTo + h - thr > blockPos - s) {
					var card_images = document.querySelectorAll('.card-image');

					card_images.forEach(function (card_image) {
						var image_url = card_image.getAttribute('data-image-full');
						var content_image = card_image.querySelector('img');

						content_image.src = image_url;

						content_image.addEventListener('load', function () {
							card_image.style.backgroundImage = 'url(' + image_url + ')';
							card_image.className = card_image.className + ' is-loaded';
						});

					});

				}
			});
		},
		// Запуск слайдера "команда"
		mobileSlider: function () {
			$('.comand-items').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		},
		setMenu: function (p) {
			var a = $('.slide_to');
			a.each(function () {
				var at = $(this),
					ath = at.attr('href'),
					s = $('.section-id');
				s.each(function () {
					var ts = $(this),
						tsi = ts.attr('id');
					if (p + 100 > ts.offset().top) {
						a.removeClass('active');
						$('.slide_to[href="#' + tsi + '"]').addClass('active')
					}
				})
			})
		},
		documentBind: function () {

			// Аккордеон списка услуг
			$('.priceTab__more__link').bind('click', function () {
				$('.priceTab').addClass('show');
			});

			$('.showMore').bind('click', function () {
				$('.works-Slider-item.hidden').removeClass('hidden');
				$('.works-Slider-more').css('display','none');
			});


			$('.morePlan').bind('click', function () {
				if ($('.morePlan').html().trim() === 'дополнительные модули +') {
					$('.Plan-table_lTitle.hidden').removeClass('hidden').addClass('UNhidden');
					$('.Plan-table_inPack.hidden').removeClass('hidden').addClass('UNhidden');
					$('.Plan-table_outPack.hidden').removeClass('hidden').addClass('UNhidden');
					$(".morePlan").text("СКРЫТЬ МОДУЛИ");
				} else {
					$('.Plan-table_lTitle.UNhidden').removeClass('UNhidden').addClass('hidden');
					$('.Plan-table_inPack.UNhidden').removeClass('UNhidden').addClass('hidden');
					$('.Plan-table_outPack.UNhidden').removeClass('UNhidden').addClass('hidden');
					$(".morePlan").text("дополнительные модули +");
				}		
			});		

			// Скрол по якорям
			$('.slide_to').bind('click', function (e) {
				e.preventDefault();
				$('.modalMenu').removeClass('is-opened');

				var i = $(this).attr('href');
				var t = $(i).offset().top;

				TweenMax.killTweensOf(window),
					TweenMax.to(window, 1, {
						scrollTo: {
							y: t,
							autoKill: !1
						},
						ease: Circ.easeInOut
					}),
					1000
			});

			// Табы цикла продукта
			$('.competitions_number').bind('click', function () {
				var data = $(this).attr('data-id');
				$('.competitions_number.active').removeClass('active');
				$('.competitions_number[data-id="' + data + '"]').addClass('active');
				$('.competitions-process').addClass('hidden');
				$('.competitions-process[data-id="' + data + '"]').removeClass('hidden');
			});

			// Табы цен на мобильных
			$('.Plan-table-mobiles_tTitle').bind('click', function () {
				var data = $(this).attr('data-id');
				$('.Plan-table-mobiles_tTitle.active').removeClass('active');
				$('.Plan-table-mobiles_tTitle[data-id="' + data + '"]').addClass('active');
				$('.Plan-table_mobile').addClass('hidden');
				$('.Plan-table_mobile[data-id="' + data + '"]').removeClass('hidden');
			});

			// Бинды для скрола
			$(window).bind('scroll', function (e) {
				var p = $(window).scrollTop()
				relizeScript.loadAnimate(p)
				relizeScript.lazyLoad(p)
				relizeScript.setMenu(p)
			});

			// Фулл-сайз меню
			$('.fa-bars').bind('click', function (e) {
				e.preventDefault();
				$('.modalMenu').toggleClass('is-opened');
			});

		}
	};
	// Запуск js
	relizeScript.start();

});


