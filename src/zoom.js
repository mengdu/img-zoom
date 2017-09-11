
function ImgZoom (body, srcName) {
  this.elem = {
    wrapper: null,
    view: null,
    close: null
  }
  this.bodyCss = null
  this.target = null
  this.box = body || document.body
  this.srcName = srcName || 'src'
  this.init()
}
var html = document.documentElement
ImgZoom.prototype.init = function () {
  var wrapper = document.createElement('DIV')
  wrapper.className = 'zoom-wrap'
  var wrapperBox = document.createElement('DIV')
  wrapperBox.className = 'zoom-box'
  var view = document.createElement('IMG')
  view.className = 'zoom-view'
  var close = document.createElement('div')
  close.className = 'zoom-close'

  wrapper.appendChild(wrapperBox)
  wrapperBox.appendChild(view)
  wrapper.appendChild(close)
  // document.body.appendChild(wrapper)
  this.elem['wrapper'] = wrapper
  this.elem['wrapperBox'] = wrapperBox
  this.elem['view'] = view
  this.elem['close'] = close

  this.box.addEventListener('click', (e) => {
    if (e.target.nodeName === 'IMG') {
      this.elem.view.src = e.target.getAttribute(this.srcName) || e.target.src
      this.target = e.target
    }
  }, false)
  wrapper.addEventListener('click', (e) => {
    this.hide()
    e.stopPropagation()
  })
  view.addEventListener('click', (e) => {
    e.stopPropagation()
    this.hide()
  })
  view.addEventListener('load', () => {
    // console.log(view.width, view.height)
    // console.log(this.target.width, this.target.height)
    var bodyWidth = html.clientWidth
    var bodyHeight = html.clientHeight
    var scale = view.width / this.target.width
    var offsetX = (bodyWidth - this.target.width)/2
    var offsetY = (bodyHeight - this.target.height)/2
    // console.log(offsetX, offsetY)
    viewInit(this.elem.view, this.target)
    var bound = this.target.getBoundingClientRect()
    setTimeout(() => {
      view.style.opacity = 1
      view.style.transform = 'translate3d('+offsetX+'px, '+offsetY+'px, 0px) scale3d('+scale+', '+scale+', 1)'
    })
    this.show()
  })
}

function viewInit (view, target) {
  var bound = target.getBoundingClientRect()
  view.style.width = bound.width + 'px'
  view.style.transform = 'translate3d('+bound.left+'px, '+bound.top+'px, 0px) scale3d(1, 1, 1)'
}

ImgZoom.prototype.show = function (img) {
  document.body.appendChild(this.elem.wrapper)
  this.bodyOverflow = html.style.overflow
  this.bodyMarginRight = html.style.marginRight
  // 当浏览器存在滚动条
  if (html.clientHeight < html.offsetHeight) {
    html.style.overflow = 'hidden'
    html.style.marginRight = '17px'
  }

  setTimeout(() => {
    this.elem.wrapper.classList.add('is-active')
  })
  setTimeout(() => {
    this.elem.wrapperBox.style.overflow = 'auto'
  }, 300)
}
ImgZoom.prototype.hide = function () {
  viewInit(this.elem.view, this.target)
  this.elem.wrapper.classList.remove('is-active')
  this.elem.wrapperBox.style.overflow = ''
  setTimeout(() => {
    html.style.overflow = this.bodyOverflow
    html.style.marginRight = this.bodyMarginRight
    document.body.removeChild(this.elem.wrapper)
  }, 300)
}

export default ImgZoom
