/*
 * add this to the form page on netlify, next to form.css:
 *   <script src="https://analoguegonedigital.co.uk/embed/form-height.js" defer></script>
 *
 * it tells the parent page how tall the form is, so the iframe on
 * analoguegonedigital.co.uk/contact resizes instead of scrolling inside itself.
 */
;(function () {
  var PARENT_ORIGIN = 'https://analoguegonedigital.co.uk'

  if (window.parent === window) return

  var last = 0

  function report() {
    var height = Math.ceil(document.documentElement.getBoundingClientRect().height)
    if (!height || Math.abs(height - last) < 2) return
    last = height
    window.parent.postMessage({ height: height }, PARENT_ORIGIN)
  }

  report()
  window.addEventListener('load', report)
  window.addEventListener('resize', report)

  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(report).observe(document.documentElement)
  } else {
    setInterval(report, 500)
  }
})()
