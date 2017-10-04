//START
var start = {
    //FUNCTIONS
    functions : {
        boxTop: function (idBox) {
            // o .offset() retorna os valores de left e top dentro do
            // elemento que selecionarmos em $(idBox). Como queremos
            // o topo usamos ao final o .top
            var box__offset = $(idBox).offset().top;
            return box__offset;
        },
        animeScroll: function () {
            var $target = $('.animation'),
                animation__class = 'animation-init',
                window__height = $(window).height(), 
                offset = window__height - (window__height / 5),
                document__top = $(document).scrollTop();
                
            $target.each(function() {
                if (document__top > start.functions.boxTop(this) - offset) {
                    $(this).addClass(animation__class);
                } else {
                    $(this).removeClass(animation__class);
                }
            });
        },
        changeActive : function( object, value ){
            object.attr( 'data-active', value );
        },
        checkScrollWindow : function( action, object, position, minPosition ){
            var checkScroll = position > minPosition;
            action( object, checkScroll );
        }
    },
    
    //EVENTS
    events : {
        init : function() {
            start.functions.animeScroll();
                start.functions.checkScrollWindow( start.functions.changeActive, $( ".goTop" ),  $(window).scrollTop() + ($(window).height() / 3), ($(document).outerHeight() / 3));
            
            //OPEN MENU
            $('.open-menu').on('click', function(event) {
                event.stopPropagation();
                var openmenu__content = $(this).attr("data-open");
                var active = $(openmenu__content).attr( "data-active" );
                
                if( active !== "true") {
                    $(openmenu__content).attr( "data-active", "true" );
                    $( this ).attr( "data-active", "true" );
                }
                else {
                    $(openmenu__content).attr( "data-active", "false" );
                    $( this ).attr( "data-active", "false" );
                }
            });
            
            //CLOSE MENU ITEM
            $('.nav__item').on('click', function(event) {
                event.stopPropagation();
                var openmenu__content = $(".open-menu").attr("data-open");
                var active = $(openmenu__content).attr( "data-active" );
                
                if( active == "true") {
                    $(openmenu__content).attr("data-active", "false" );
                    $(".open-menu").attr( "data-active", "false" );
                }
            });

            //GO TOP
            $('.goTop').on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 500); 
            });
            
            //SCROLL ANIMATE
            $(window).on('scroll', function() {
                start.functions.animeScroll();
                start.functions.checkScrollWindow( start.functions.changeActive, $( ".goTop" ),  $(window).scrollTop() + ($(window).height() / 3), ($(document).outerHeight() / 3));
            });
        }
    },
    
    //PLUGINS
    plugins : {
        init: function() {
            $(function() {
                //SWIPER HOME
                var swiperHome = new Swiper('.swiper__home', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true, 
                    autoplay: 7000
                });
            });
        }
    },
    
    //INIT OBJECT
    init : function() {
        start.events.init();
        start.plugins.init();
    }
}

//INIT OBJECTS
start.init();