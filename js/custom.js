$(function () {

    let counterEvent = false;


    $('#fullpage').fullpage({
        anchors: ['page01', 'page02', 'page03', 'page04', 'page05', 'page06', 'page07', 'page08', 'page09'],
        responsiveWidth: 768,
        afterLoad: function (el, idx) {
            // console.log(idx);

            if (idx >= 2) {
                $('.header').addClass('fixed');
                $('.to_top').addClass('active');
            } else {
                $('.header').removeClass('fixed');
                $('.to_top').removeClass('active');
            }

            if (idx == 2 && counterEvent == false) {

                $('.count_num').each(function () { // .count-num에 각각 적용
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    // $this = 첫번째~세번째 .count-num
                    // countTo = 첫번째~세번째 .count-num의 data-count 속성의 값(777,555,333)

                    $({ countNum: $this.text() }).animate({
                        countNum: countTo
                        // countNum: $this.text() = 0, countNum: countTo = 777, 555, 333
                        // 0에서 countNum이 된다
                    },
                        {
                            duration: 1000, // 애니메이션이 완료될때까지 걸리는 시간
                            easing: 'linear', // 애니메이션 효과 방식
                            step: function () { // 움직임 각 스텝별로 실행될 함수
                                $this.text(Math.floor(this.countNum));
                                // Math.floor -> this.countNum의 값을 정수로 만들어준다
                            },
                            complete: function () { // 움직임이 멈춘 후 실행될 함수
                                $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                                // this.countNum이 $this의 text값이 된다
                                //alert('finished');
                            }
                        });

                });

                counterEvent = true;

            }
        },
    });

    const swiper = new Swiper('.main_slide', {
        loop: true,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<li class="' + className + '">' + '0' + (index + 1) + "<span></span></li>";
            },
        },
        /* ON INIT AUTOPLAY THE FIRST VIDEO */
        on: {
            init: function () {
                // console.log('swiper initialized');
                var currentVideo = $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
                currentVideo.trigger('play');
            },
        },
    });

    /* GET ALL VIDEOS */
    var sliderVideos = $(".swiper-slide video");

    /* SWIPER API - Event will be fired after animation to other slide (next or previous) */
    swiper.on('slideChange', function () {
        // console.log('slide changed');
        /* stop all videos (currentTime buggy without this loop idea) */
        sliderVideos.each(function (index) {
            this.pause();
            this.currentTime = 0;
        });

        /* SWIPER GET CURRENT AND PREV SLIDE (AND VIDEO INSIDE) */
        var prevVideo = $("[data-swiper-slide-index=" + this.previousIndex + "]").find("video");
        var currentVideo = $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
        prevVideo.trigger('stop');
        currentVideo.trigger('play');
        $('.video_control').removeClass('paused');

    });

    $('.visual .arrow .left').on('click', function () {
        swiper.slidePrev();
    });
    $('.visual .arrow .right').on('click', function () {
        swiper.slideNext();
    });

    $('.visual .play').on('click', function () {
        $('.swiper-slide-active video').trigger('play');
        $('.video_control').removeClass('paused');
    });

    $('.visual .pause').on('click', function () {
        $('.swiper-slide-active video').trigger('pause');
        $('.video_control').addClass('paused');
    });


    const swiper2 = new Swiper('.store_slide', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });


    $('.family_link').on('click', function () {
        $(this).toggleClass('active');
    });

    //외부 영역 클릭했을 때 닫기
    $(document).mouseup(function (e) {
        var familyLink = $('.family_link');
        if (familyLink.has(e.target).length === 0) {
            familyLink.removeClass('active');
        }
    });


    $('.mobile_menu').on('click', function () {
        $(this).toggleClass('active');
        $('.header').toggleClass('mobile_open');
        $('body').toggleClass('body_fixed');
    });

    $('.header .gnb>ul>li>a').on('click', function (e) {
        if ($('.header').hasClass('mobile_open')) {
            e.preventDefault();
            $(this).next().stop().slideToggle();
        }
    });

    $(window).on('resize', function () {
        $('.mobile_menu').removeClass('active');
        $('.header').removeClass('mobile_open');
        $('body').removeClass('body_fixed');
        $('.sub_menu').removeAttr('style');
    });

});