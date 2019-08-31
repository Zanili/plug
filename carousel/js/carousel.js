;(function ($) {
  // 1. 有独立的作用域
  // 2. 闭包
  // 3. 执行即销毁

  // 面向对象
  // 构造函数   成员属性    成员方法
  // factory 工厂
  var Carousel = function (options) {
    this.$dom = $(options.dom);
    this.carItems = this.$dom.find('li');
    this.carIndicators = this.$dom.find('i');

    this.autoplay = Boolean(options.autoplay);
    this.speed = options.speed;
    this.timer = null;
    this.curIdx = 0;
  }

  $.extend(Carousel.prototype, {
    init: function () {
	  	this.autoplay && this.autoPlay();
	    this.bindEvent();
	  },

	  bindEvent: function () {
	  	this.$dom.on('mouseover', {event: 'in'}, $.proxy(this.mouseInOut, this));
      this.$dom.on('mouseout', {event: 'out'}, $.proxy(this.mouseInOut, this));
      this.$dom.on('click', $.proxy(this.carClick, this));
	  },

	  autoPlay: function () {
	  	this.timer = setInterval($.proxy(this.run, this), this.speed);
	  },

    run: function () {
    	this._setIndex('next');
  	  this._pageChange(this.curIdx);
    },

    mouseInOut: function (e) {
    	var event = e.data.event;
    
	    switch (event) {
	    	case 'in':
	    	  clearInterval(this.timer);
	    	  break;
	    	case 'out':
	    	  this.autoplay && this.autoPlay();
	    	  break;
	    	default: 
	    	  break;
	    }
    },

    carClick: function (ev) {
    	var e = ev || window.event,
	  	    tar = e.target || e.srcElement,
	  	    tagName = tar.tagName.toLowerCase();

	  	if (tagName === 'button') {
	       var dir = tar.getAttribute('data-dir');

	       this._setIndex(dir);
	       this._pageChange(this.curIdx);
	  	} else if (tagName === 'i') {
	       this.curIdx = $(tar).index();
	       this._pageChange(this.curIdx);
	  	}
    },

    _setIndex: function (dir) {
    	switch (dir) {
	    	case 'next':
	    	  this.curIdx === (this.carItems.length - 1)
	    	                ? this.curIdx = 0
	    	                : this.curIdx ++;
	    	  break;
	    	case 'prev':
	    	  this.curIdx === 0
	    	                ? this.curIdx = (this.carItems.length - 1)
	    	                : this.curIdx --;
	    	  break;
	    	default:
	    	  break;
	    }
    },

    _pageChange: function (index) {
    	this.carItems.eq(index).addClass('active')
                 .siblings('li').removeClass('active');
	    this.carIndicators.eq(index).addClass('active')
	                     .siblings('i').removeClass('active');
    }
  });

  $.fn.extend({
    carousel: function (options) {
    	this.each(function () {
        new Carousel({
          dom: $(this),
          autoplay: options.autoplay,
          speed: options.speed
        }).init();
    	});
    }
  });
})(jQuery);















