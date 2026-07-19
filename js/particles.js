// particles.js — LOVII interactive SVG particle cloud
(function () {
  'use strict'

  var COUNT = 90
  var MIN_R = 2
  var MAX_R = 7
  var AMBIENT = 0.08
  var DAMP = 0.94
  var ATTRACT_R = 300
  var ATTRACT_FORCE = 0.012
  var SCATTER_FORCE = 8
  var SCATTER_DURATION = 600

  var container = document.createElement('div')
  container.id = 'particle-cloud'
  container.style.cssText =
    'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:visible'

  var ns = 'http://www.w3.org/2000/svg'
  var svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.style.display = 'block'
  container.appendChild(svg)
  document.body.prepend(container)

  function getColors() {
    var style = getComputedStyle(document.documentElement)
    var c1 = style.getPropertyValue('--accent-color').trim() || '#0D9488'
    var c2 = style.getPropertyValue('--accent-secondary').trim() || '#14B8A6'
    var c3 = style.getPropertyValue('--accent-light').trim() || '#5EEAD4'
    return [c1, c2, c3]
  }

  var colors = getColors()

  var mo = new MutationObserver(function () {
    colors = getColors()
    for (var i = 0; i < particles.length; i++) {
      particles[i].updateColor()
    }
  })
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  function Particle() {
    this.x = Math.random() * innerWidth
    this.y = Math.random() * innerHeight
    this.vx = (Math.random() - 0.5) * AMBIENT
    this.vy = (Math.random() - 0.5) * AMBIENT
    this.r = MIN_R + Math.random() * (MAX_R - MIN_R)
    this.op = 0.35 + Math.random() * 0.45
    this.ci = Math.floor(Math.random() * colors.length)

    this.el = document.createElementNS(ns, 'circle')
    this.el.setAttribute('r', this.r)
    this.el.setAttribute('opacity', this.op)
    this.updateColor()
    svg.appendChild(this.el)
  }

  Particle.prototype.updateColor = function () {
    this.el.setAttribute('fill', colors[this.ci])
  }

  Particle.prototype.tick = function (mx, my, isScattering, sx, sy) {
    this.vx += (Math.random() - 0.5) * 0.04
    this.vy += (Math.random() - 0.5) * 0.04

    if (isScattering) {
      var sdx = this.x - sx
      var sdy = this.y - sy
      var sdist = Math.sqrt(sdx * sdx + sdy * sdy)
      if (sdist < 1) sdist = 1
      var sForce = SCATTER_FORCE / Math.max(sdist * 0.3, 1)
      this.vx += (sdx / sdist) * sForce
      this.vy += (sdy / sdist) * sForce
    } else if (mx >= 0) {
      var adx = mx - this.x
      var ady = my - this.y
      var adist = Math.sqrt(adx * adx + ady * ady)
      if (adist < ATTRACT_R) {
        this.vx += (adx / Math.max(adist, 1)) * ATTRACT_FORCE
        this.vy += (ady / Math.max(adist, 1)) * ATTRACT_FORCE
      }
    }

    this.vx *= DAMP
    this.vy *= DAMP

    var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
    if (speed > 15) {
      this.vx = (this.vx / speed) * 15
      this.vy = (this.vy / speed) * 15
    }

    this.x += this.vx
    this.y += this.vy

    var w = innerWidth
    var h = innerHeight
    var margin = 100
    if (this.x < -margin) this.x = w + margin
    else if (this.x > w + margin) this.x = -margin
    if (this.y < -margin) this.y = h + margin
    else if (this.y > h + margin) this.y = -margin

    this.el.setAttribute('cx', this.x)
    this.el.setAttribute('cy', this.y)
  }

  var particles = []
  for (var i = 0; i < COUNT; i++) {
    particles.push(new Particle())
  }

  var mx = -1000
  var my = -1000
  var isScattering = false
  var scatterX = 0
  var scatterY = 0
  var scatterTimer = null

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX
    my = e.clientY
  })

  document.addEventListener('mousedown', function (e) {
    isScattering = true
    scatterX = e.clientX
    scatterY = e.clientY
    clearTimeout(scatterTimer)
    scatterTimer = setTimeout(function () {
      isScattering = false
    }, SCATTER_DURATION)
  })

  document.addEventListener('touchmove', function (e) {
    var t = e.touches[0]
    if (t) {
      mx = t.clientX
      my = t.clientY
    }
  }, { passive: true })

  document.addEventListener('touchstart', function (e) {
    var t = e.touches[0]
    if (t) {
      mx = t.clientX
      my = t.clientY
      isScattering = true
      scatterX = t.clientX
      scatterY = t.clientY
      clearTimeout(scatterTimer)
      scatterTimer = setTimeout(function () {
        isScattering = false
      }, SCATTER_DURATION)
    }
  })

  function loop() {
    for (var i = 0; i < particles.length; i++) {
      particles[i].tick(mx, my, isScattering, scatterX, scatterY)
    }
    requestAnimationFrame(loop)
  }
  loop()
})()
