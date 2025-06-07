(() => {
  const progressBar = (steps, heightSection, stepsItems, progress) => {
    let scrollTop = window.scrollY + window.innerHeight / 2;
    let topSteps = window.scrollY + steps.getBoundingClientRect().top;

    let heightProgress;
    if (scrollTop < topSteps)
      heightProgress = 0;
    else if (scrollTop > heightSection + topSteps)
      heightProgress = 100;
    else
      heightProgress = (scrollTop - topSteps)/heightSection * 100;
    progress.style.height = heightProgress + '%';

    for (let step of stepsItems) {
      let number = step.querySelector('.step__number');
      let topNumber = window.scrollY + number.getBoundingClientRect().top;
      if (topNumber < scrollTop) 
        number.classList.add('active')
      else 
        number.classList.remove('active')
    }
  }

  const collapsibleSteps = () => {
    $(".step__toggle").unbind("click").on("click", function () {
			const parent = $(this).parent();
      const i = parent.index();

			if (!parent.hasClass("active")) {
				parent
					.siblings(".step.active")
					.removeClass("active");
        $(this).
          closest(".steps__wrapper").
          find(".step__image:not(.step__image-mobile).active")
          .removeClass("active");
				parent.addClass("active");
        if ($(this).closest(".steps__wrapper").find(".step__image:not(.step__image-mobile)")[i]) 
          $(this).
            closest(".steps__wrapper").
            find(".step__image:not(.step__image-mobile)")[i]
            .classList.add("active");
				$(this)
					.closest(".steps__wrapper")
					.find(".step__toggle-content")
					.stop()
					.slideUp(300);
				$(this).next().stop().slideDown(300);
			}
		});
  }

  const initSlider = (sectionSteps) => {
    const stepsThumbs = sectionSteps.querySelector('.steps__thumbs');
    const stepsSlider = sectionSteps.querySelector('.steps__swiper');
    const navigation = sectionSteps.querySelector('.steps__navigation');
    const pagination = sectionSteps.querySelector('.steps__pagination');
    
    let stepsThumbsSwiper;
    if (stepsThumbs) {
      let swiperParamsThumbs = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        watchSlidesVisibility: true,
				watchSlidesProgress: true,
				//slideToClickedSlide: true,
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 32
          },
          750: {
            slidesPerView: 2,
            spaceBetween: 64
          },
          990: {
            slidesPerView: 3,
            spaceBetween: 129
          }
        },
        on: {
          click: function (swiper, event) {
            if (!event.target.classList.contains('swiper-wrapper')) {
              if (swiper.clickedIndex != 0 && swiper.clickedIndex != swiper.slides.length - 1) {
                if (swiper.clickedIndex == swiper.visibleSlidesIndexes[swiper.visibleSlidesIndexes.length - 1]) {
                  swiper.slideNext();
                }
                  
                if (swiper.clickedIndex == swiper.visibleSlidesIndexes[0])
                  swiper.slidePrev()
              }
            }
          },
        }
      }

      stepsThumbsSwiper = new Swiper(stepsThumbs, swiperParamsThumbs);
    }

    let stepsSwiper;
    if (stepsSlider) {
      let swiperParams = {
        slidesPerView: 1,
        navigation: {
          nextEl: navigation.querySelector('.swiper-button-next'),
          prevEl: navigation.querySelector('.swiper-button-prev')
        },
        pagination: {
          el: pagination,
          type: "bullets",
          clickable: true,
        },
        thumbs: {
          swiper: stepsThumbsSwiper
        }
      }

      stepsSwiper = new Swiper(stepsSlider, swiperParams);
    }
  }

  const initSection = (section) => {
    let sectionSteps;
    if (document.currentScript) {
      sectionSteps = document.currentScript.parentElement.querySelector(".steps");
    }
    else {
      sectionSteps = section.querySelector(".steps");
    }

    if (sectionSteps) {
      initSlider(sectionSteps);

      const sectionResizeObserver = new ResizeObserver((entries) => {
        const [entry] = entries; 

        const progress = sectionSteps.querySelector(".steps__progress");
        const steps = sectionSteps.querySelector(".steps__content--scroll");
        let stepsItems, heightSection;
        if (steps) {
          stepsItems = sectionSteps.querySelectorAll(".steps__content--scroll .step");
          heightSection = steps.clientHeight;
        }

        if (progress) {
          progressBar(steps, heightSection, stepsItems, progress);
          window.addEventListener("scroll", () => {
            progressBar(steps, heightSection, stepsItems, progress)
          });
        }

        const slider = sectionSteps.querySelector('.steps__swiper');
        const thumbs = sectionSteps.querySelector('.steps__thumbs');
        if (slider && slider.swiper) {
          if (entry.contentRect.width < 576) {
            slider.swiper.thumbs= {
              swiper: ''
            }
            if (thumbs && thumbs.swiper) {
              thumbs.swiper.controller.control = slider.swiper;
              slider.swiper.controller.control = thumbs.swiper;
              thumbs.swiper.update();
            }
            slider.swiper.update();
          }
          else {
            slider.swiper.thumbs= {
              swiper:  thumbs.swiper
            }
            if (thumbs && thumbs.swiper) {
              thumbs.swiper.controller.control = thumbs.swiper;
              slider.swiper.controller.control = slider.swiper;
              thumbs.swiper.update();
            }
            slider.swiper.update();
          }
        }
      })

      sectionResizeObserver.observe(sectionSteps);

      collapsibleSteps();
    }
  }

  initSection();

  document.addEventListener("shopify:section:load", function (section) {
    initSection(section.target);
  })
})()