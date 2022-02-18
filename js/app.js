$(document).ready(function() {
    // Debounce do Lodash
    debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // Muda tab ao click
    $('[data-group]').each(function() {
        var $allTarget = $(this).find('[data-target]'),
            $allClick = $(this).find('[data-click]'),
            activeClass = 'active';

        $allTarget.first().addClass(activeClass);
        $allClick.first().addClass(activeClass);

        $allClick.click(function(e) {
            e.preventDefault();

            var idData = $(this).data('click'),
                $target = $('[data-target="' + idData + '"]');

            $allClick.removeClass(activeClass);
            $allTarget.removeClass(activeClass);

            $target.addClass(activeClass);
            $(this).addClass(activeClass);

        });
    });

    // Scroll suave para link interno
    $('.menu-nav a[href^="#"]').click(function(e) {
        e.preventDefault();

        var idClick = $(this).attr('href'),
            menuHeight = $('.menu').innerHeight(),
            targetOffset = $(idClick).offset().top;

        $('html, body').animate({
            scrollTop: targetOffset - menuHeight
        }, 500);
    });

    // Scroll suave para o topo
    $('.logo').click(function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Mudar para active o menu de acordo com a área
    $('section').each(function() {
        var heightSection = $(this).height(),
            offsetTop = $(this).offset().top,
            menuHeight = $('.menu').innerHeight(),
            idSection = $(this).attr('id'),
            $itemMenu = $('a[href="#' + idSection + '"]');

        $(window).scroll(debounce(function() {
            var scrollTop = $(window).scrollTop();

            if(offsetTop - menuHeight < scrollTop && offsetTop + heightSection - menuHeight > scrollTop) {
                $itemMenu.addClass('active');
            } else{
                $itemMenu.removeClass('active');
            }
        }, 200));
    });

    // Botão do menu mobile
    $('.mobile-btn').click(function() {
        $(this).toggleClass('active');
        $('.mobile-menu').toggleClass('active');
    });

    // Slide
    (function() {
        function slider(sliderName, velocidade) {
            var sliderClass = '.' + sliderName,
                activeClass = 'active',
                rotate = setInterval(rotateSlide, velocidade);

            $(sliderClass + ' > :first').addClass(activeClass);

            $(sliderClass).hover(function() {
                clearInterval(rotate);
            }, function() {
                rotate = setInterval(rotateSlide, velocidade);
            });

            function rotateSlide() {
                var activeSlide = $(sliderClass + ' > .' + activeClass),
                    nextSlide = activeSlide.next();
        
                if(nextSlide.length == 0) {
                    nextSlide = $(sliderClass + ' > :first');
                }
        
                activeSlide.removeClass(activeClass);
                nextSlide.addClass(activeClass);
            }
        }

        slider('introducao', 2000);
    })();

    // Animação ao scroll
    (function() {
        var $target = $('[data-anime="scroll"]'),
            animationClass = 'animate',
            offset = $(window).height() * 4/5;

        function animeScroll() {
            var documentTop = $(window).scrollTop();
            $target.each(function() {
                var itemTop = $(this).offset().top;

                if(documentTop > itemTop - offset) {
                    $(this).addClass(animationClass);
                } else {
                    $(this).removeClass(animationClass);
                }
            });
        }

        animeScroll();

        $(document).scroll(debounce(function() {
            animeScroll();
        }, 200));
    })();
});