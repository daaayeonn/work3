window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const lenis = new Lenis()

lenis.on('scroll', (e) => {
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// 스크롤 방향 판단으로 header 숨겼다 나타나게 하기
let prevSt = 0;
$(window).on('scroll', function () {
  let st = $(this).scrollTop();

  if (prevSt < st) {
    $('#header').addClass('hide');
  } else {
    $('#header').removeClass('hide');
  }

  prevSt = st;

  // 스크롤값이 100이상일 때 header에 background 색상 추가
  if (st > 100) {
    $('#header').addClass('on');
  } else {
    $('#header').removeClass('on');
  }

  // 스크롤값이 0 이상일 때 scroll-btn 안 보이게 하기
  if (st > 0) {
    $('.sc-visual .scroll-btn').addClass('hide');
  } else {
    $('.sc-visual .scroll-btn').removeClass('hide');
  }
}).trigger('scroll');


// loading
// 페이지 로딩 시 스크롤 막기
$('body').css('overflow', 'hidden');

const loading = gsap.timeline({
  onComplete: function() {
    setTimeout(function() {
      visual.play();
      // 스크롤 활성화
      $('body').css('overflow', 'auto');
    }, 1200);
    gsap.to($('.loading'), {visibility: 'hidden'})
  }
})
gsap.to($('.loading .loading-bg'), {
  height: 0,
  ease: "circ.inOut",
  duration: 7,
})
gsap.fromTo($('.loading .content .simbol'),
  {opacity: 1, delay: 1},
  {opacity: 0, delay: 5.5}
)
$('.loading .content .text-wrap .text').each(function(i, el) {
  loading
    .to($(el), {
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .to($(el), {
      y: "-100%",
      duration: 0.6,
      delay: 0.3,
      ease: "power3.in"
    });
});



// sc-visual
const visual = gsap.timeline({
  paused: true,
})
visual.from($('#header'), {
  y: '-100%',
  duration: 1,
  ease: 'power1.inOut',

  // 애니메이션이 끝난 후 transform 속성 제거
  onComplete: () => {
    gsap.set("#header", { clearProps: "transform" });
  }
}, 'visual')
visual.to($('.sc-visual .headline .split-text'), {
  y: 0,
  stagger: 0.2,
  duration: 0.9,
  ease: 'power1.inOut'
}, 'visual')
visual.to($('.sc-visual .bg-wrap'), {
  y: 0,
  scaleY: 1,
  duration: 0.8,
  ease: 'power1.inOut',
}, 'visual')

const visualBg = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-visual',
    start: '0% 0%',
    end: '100% 0%',
    scrub: 0,
  },
})
visualBg.to($('.sc-visual .bg-wrap'), {
  yPercent: -10,
}, 'visualBg')
visualBg.to($('.sc-visual .bg-wrap .visual-bg'), {
  yPercent: 10,
}, 'visualBg')


// sc-intro
totalImg = 299;
let imgEl = ``;

for (let i = 0; i < totalImg + 1; i++) {
  first = (i === 0) ? "curr":"";

  imgEl += `<img src="/assets/images/i_${i.toString().padStart(3, '0')}.png" alt class="${first}"></img>`
}

$('.sc-intro .sequence .sequence-images').html(imgEl);

ScrollTrigger.create({
  trigger: '.sc-intro .sequence-wrapper',
  start: "0% 30%",
  end: "100% 100%",
  scrub: 0,
  // markers: true,
  onUpdate: function(self) {
    idx = Math.floor(self.progress * 299);

    $('.sc-intro .sequence .sequence-images img').eq(idx).addClass('curr').siblings().removeClass('curr');

    let xMove = -37 * self.progress
    gsap.to($('.sc-intro .sequence .sequence-images'), {
      x: xMove+ '%',
      duration: 0.1,
    })
  }
})

gsap.to($('.sc-intro .content .text-wrap .intro-split-text'), {
  scrollTrigger: {
    trigger: ".sc-intro .content",
    start: "0% 100%",
    end: "100% 0%",
    onEnter: () => {
      gsap.to($('.sc-intro .content .text-wrap .intro-split-text'), {
        y: 0,
        stagger: 0.2,
      });
    },
    onLeaveBack: () => {
      gsap.to($('.sc-intro .content .text-wrap .intro-split-text'), {
        y: "100%",
      });
    },
    onLeave: () => {
      // 트리거가 화면을 벗어날 때
      gsap.to($('.sc-intro .content .text-wrap .intro-split-text'), {
        y: "-100%",
      });
    },
    onEnterBack: () => {
      // 스크롤을 다시 위로 올려 트리거가 화면에 들어올 때
      gsap.to($('.sc-intro .content .text-wrap .intro-split-text'), {
        y: 0,
        stagger: -0.2
      });
    }
  },
  y: 0,
  stagger: 0.2
})
gsap.to($('.sc-intro .content .text-wrap .desc'), {
  scrollTrigger: {
    trigger: '.sc-intro .content',
    start: "0% 100%",
    end: "100% 0%",
    toggleActions: "restart reset restart reset",
  },
  opacity: 1
})


gsap.to($('.sc-intro .content .img-wrap .hand-img'), {
  scrollTrigger: {
    trigger: ".sc-intro .content",
    start: "0% 100%",
    end: "100% 100%",
    scrub: 0,
  },
  transform: "scale(1)",
  ease: "power1.inOut"
})


gsap.to('.sc-intro', {
  scrollTrigger: {
    trigger: '.sc-intro',
    start: 'bottom bottom',
    end: 'bottom top',
    pin: true,
    pinSpacing: false,
  }
});


// sc-reason
$('.sc-reason .content .btn-more').on('click', function () {
  const reasonTextWrap = $('.sc-reason .content .text-wrap');

  reasonTextWrap.toggleClass('on');

  if (reasonTextWrap.hasClass('on')) {
    $(this).find('.text').text('See less');
    $(this).siblings('.more-text').slideDown();
  } else {
    $(this).find('.text').text('Explore details');
    $(this).siblings('.more-text').slideUp();
  }
});


// sc-player
gsap.to($('.sc-player .video-wrap .player-video'), {
  scrollTrigger: {
    trigger: '.sc-player .video-wrap',
    start: "0% 100%",
    end: "100% 0%",
    scrub: 0,
  },
  y: "30%",
  ease: 'power1.inOut'
})
const $btnPlay = $('.sc-player .btn-play');
$('.sc-player .video-wrap').on('mousemove', function(e) {
  
  let offset = $(this).offset();
  let x = e.pageX - offset.left;
  let y = e.pageY - offset.top;

  $btnPlay.css({
    'top':y + 'px', 'left':x + 'px', 'transform': 'translate(-50%, -50%)'+'scale(1)'
  });
}).on('mouseleave', function() {
  $btnPlay.css({
    'transform': 'translate(-50%, -50%)'+'scale(0)'
  })
});

$('.sc-player .video-wrap .btn-play').on('click', function() {
  $('.sc-player .video-wrap .video-control').addClass('active');

  const videoControl = $('.sc-player .video-wrap .player-video-control')[0]; // jQuery 객체를 DOM 요소로 변환
  videoControl.play();
})


// sc-photo
gsap.to($('.sc-photo .img-wrap .photo-img'), {
  scrollTrigger: {
    trigger: '.sc-photo .img-wrap',
    start: '0% 100%',
    end: '100% 0%',
    scrub: 0,
  },
  y: '30%',
  ease: 'power1.inOut'
})


// sc-review
gsap.to($('.sc-review .review-list .review-item.full'), {
  scrollTrigger: {
    trigger: ".sc-review .review-list",
    start: "0% 100%",
    end: "0% 100%",
  },
  y: 0,
  stagger: -0.2,
})


// sc-client
gsap.to($('.sc-client .client-list .client-item.move'), {
  scrollTrigger: {
    trigger: '.sc-client .client-list',
    start: '0% 100%',
    end: '100% 0%',
    scrub: 0,
  },
  y: '-20%',
  ease: 'power1.inOut',
})


// sc-ready
gsap.to($('.sc-ready .img-wrap .ready-img'), {
  scrollTrigger: {
    trigger: '.sc-ready .img-wrap',
    start: '0% 100%',
    end: '100% 0%',
    scrub: 0,
  },
  y: '30%',
  ease: 'power1.inOut',
})


// footer 
var footerLottieAni = lottie.loadAnimation({
  container: $('#footer-lottie')[0],
  path: './assets/data/lottie_motion.json',
  renderer: 'svg',
  loop: false,
  autoplay: false
});

const footerLink = document.getElementById('sign-link');

// hover 시 재생
footerLink.addEventListener('mouseenter', () => {
  footerLottieAni.play();
  footerLottieAni.setSpeed(2);
});
// hover 해제 시 애니메이션 멈춤
footerLink.addEventListener('mouseleave', () => {
  footerLottieAni.stop();
});


// 공통
$('.split-wrap').each(function (i, el) {
  gsap.from($(el).find('.split-text'), {
    scrollTrigger: {
      trigger: el,
      start: '0% 100%',
      end: "100% 100%",
    },
    y: "100%",
    stagger: 0.2,
  })
})