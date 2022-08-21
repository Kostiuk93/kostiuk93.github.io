const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  
$(document).ready(function(){

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    function toggleSlide(item) {
        $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('.advantages__btn').on('click', function() {
        $('.overlay, #consultation').fadeIn(500);
    });
    $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn(500);
    });
    $('[data-modal=thanks]').on('click', function() {
        $('.overlay, #thanks').fadeIn(500);
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut(500);
    });
    
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        
        $('.button_mini').on('click', function() {
            $('.overlay, #order').fadeIn(500);
        });
        });
    });


    function validateForms (form) {
        $(form).validate({
        rules: {
            name: {
            required: true,
            minlength: 2
            },
            phone: "required",
            email: {
            required: true,
            email: true
            }
        },
        messages: {
            name: {
            required: "Пожалуйста, веедите свое имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
            },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
            required: "Пожалуйста, введите свой E-mail",
            email: "Указан не верный формат электронной почты"
            }
        }
        });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
        }).done(function () {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.ovelay, #thanks').fadeIn(600);

        $('form').trigger('reset');
        });
        return false;
    });
});

