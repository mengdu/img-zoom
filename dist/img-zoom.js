(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ImgZoom = factory());
}(this, (function () { 'use strict';

function ImgZoom(body, srcName) {
  this.elem = {
    wrapper: null,
    view: null,
    close: null
  };
  this.bodyCss = null;
  this.target = null;
  this.box = body || document.body;
  this.srcName = srcName || 'src';
  this.init();
}
var html = document.documentElement;
ImgZoom.prototype.init = function () {
  var _this = this;

  var wrapper = document.createElement('DIV');
  wrapper.className = 'zoom-wrap';
  var wrapperBox = document.createElement('DIV');
  wrapperBox.className = 'zoom-box';
  var view = document.createElement('IMG');
  view.className = 'zoom-view';
  var close = document.createElement('div');
  close.className = 'zoom-close';

  wrapper.appendChild(wrapperBox);
  wrapperBox.appendChild(view);
  wrapper.appendChild(close);
  // document.body.appendChild(wrapper)
  this.elem['wrapper'] = wrapper;
  this.elem['wrapperBox'] = wrapperBox;
  this.elem['view'] = view;
  this.elem['close'] = close;

  this.box.addEventListener('click', function (e) {
    if (e.target.nodeName === 'IMG') {
      _this.elem.view.src = e.target.getAttribute(_this.srcName) || e.target.src;
      _this.target = e.target;
    }
  }, false);
  wrapper.addEventListener('click', function (e) {
    _this.hide();
    e.stopPropagation();
  });
  view.addEventListener('click', function (e) {
    e.stopPropagation();
    _this.hide();
  });
  view.addEventListener('load', function () {
    // console.log(view.width, view.height)
    // console.log(this.target.width, this.target.height)
    var bodyWidth = html.clientWidth;
    var bodyHeight = html.clientHeight;
    var scale = view.width / _this.target.width;
    var offsetX = (bodyWidth - _this.target.width) / 2;
    var offsetY = (bodyHeight - _this.target.height) / 2;
    // console.log(offsetX, offsetY)
    viewInit(_this.elem.view, _this.target);
    var bound = _this.target.getBoundingClientRect();
    setTimeout(function () {
      view.style.opacity = 1;
      view.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0px) scale3d(' + scale + ', ' + scale + ', 1)';
    });
    _this.show();
  });
};

function viewInit(view, target) {
  var bound = target.getBoundingClientRect();
  view.style.width = bound.width + 'px';
  view.style.transform = 'translate3d(' + bound.left + 'px, ' + bound.top + 'px, 0px) scale3d(1, 1, 1)';
}

ImgZoom.prototype.show = function (img) {
  var _this2 = this;

  document.body.appendChild(this.elem.wrapper);
  this.bodyOverflow = html.style.overflow;
  this.bodyMarginRight = html.style.marginRight;
  // 当浏览器存在滚动条
  if (html.clientHeight < html.offsetHeight) {
    html.style.overflow = 'hidden';
    html.style.marginRight = '17px';
  }

  setTimeout(function () {
    _this2.elem.wrapper.classList.add('is-active');
  });
  setTimeout(function () {
    _this2.elem.wrapperBox.style.overflow = 'auto';
  }, 300);
};
ImgZoom.prototype.hide = function () {
  var _this3 = this;

  viewInit(this.elem.view, this.target);
  this.elem.wrapper.classList.remove('is-active');
  this.elem.wrapperBox.style.overflow = '';
  setTimeout(function () {
    html.style.overflow = _this3.bodyOverflow;
    html.style.marginRight = _this3.bodyMarginRight;
    document.body.removeChild(_this3.elem.wrapper);
  }, 300);
};

return ImgZoom;

})));
