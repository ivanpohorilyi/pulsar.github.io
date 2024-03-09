$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 300,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>',
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 425,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this)
                .index()).addClass('catalog__content_active');
    });

    function toggleSlidesItem(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlidesItem('.catalog-item__link');
    toggleSlidesItem('.catalog-item__back');

    //modals

    $('[data-model="consultaion"]').on('click', function () {
        $('.overlay, #consultaion').fadeIn();
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultaion, #order, #done').fadeOut();
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    })

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                name: {
                    required: "Бовдуре, ім'я забув...",
                    minlength: jQuery.validator.format("Як мінімум давай {0} символи козаче, не вийо!")
                },
                phone: "черкнами цифри, дядь",
                email: {
                    required: "Давай сюда мило!",
                    email: "Не Миша, всэ х№йня, давай по новой"
                }

            }
        });
    };

    valideForms('#consultaion-form');
    valideForms('#consultaion form');
    valideForms('#order form');

    $('input[name=phone]').mask("+38 (999) 999-9999");

    $('form').submit(function (e) {
        e.preventDefault();

        // if (!$(this).valid()) {
        //     return;
        // }

        $.ajax({
            type: "POST",
            //IF ERROR, CHECK THIS BELOW!!!!
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consultaion, #order').fadeOut;
            $('.overlay, #done').fadeIn;
            $('form').trigger('reset');
        });
        return false;
    });

});
