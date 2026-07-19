// particles.js — LOVII interactive SVG particle cloud
(function () {
  'use strict'

  var COUNT = 90
  var MIN_R = 2
  var MAX_R = 7
  var AMBIENT = 0.15
  var DAMP = 0.97
  var MOUSE_R = 160
  var MOUSE_FORCE = 0.8

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

  // ── Цвета под обе темы ──────────────────────────────
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

  // ── Particle ─────────────────────────────────────────
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

  Particle.prototype.tick = function (mx, my) {
    this.vx += (Math.random() - 0.5) * 0.05
    this.vy += (Math.random() - 0.5) * 0.05
    this.vx *= DAMP
    this.vy *= DAMP

    var dx = this.x - mx
    var dy = this.y - my
    var dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < MOUSE_R) {
      var force = ((MOUSE_R - dist) / MOUSE_R) * MOUSE_FORCE
      var angle = Math.atan2(dy, dx)
      this.vx += Math.cos(angle) * force
      this.vy += Math.sin(angle) * force
    }

    this.x += this.vx
    this.y += this.vy

    var w = innerWidth
    var h = innerHeight
    if (this.x < -60) this.x = w + 60
    else if (this.x > w + 60) this.x = -60
    if (this.y < -60) this.y = h + 60
    else if (this.y > h + 60) this.y = -60

    this.el.setAttribute('cx', this.x)
    this.el.setAttribute('cy', this.y)
  }

  var particles = []
  for (var i = 0; i < COUNT; i++) {
    particles.push(new Particle())
  }

  // ── Mouse / Touch ────────────────────────────────────
  var mx = -1000
  var my = -1000
  var idle = true
  var idleTimer

  function onMove(x, y) {
    mx = x
    my = y
    idle = false
    clearTimeout(idleTimer)
    idleTimer = setTimeout(function () {
      idle = true
    }, 3000)
  }

  document.addEventListener('mousemove', function (e) {
    onMove(e.clientX, e.clientY)
  })
  document.addEventListener('touchmove', function (e) {
    var t = e.touches[0]
    if (t) onMove(t.clientX, t.clientY)
  }, { passive: true })
  document.addEventListener('touchstart', function (e) {
    var t = e.touches[0]
    if (t) onMove(t.clientX, t.clientY)
  })

  // ── RAF ──────────────────────────────────────────────
  function loop() {
    var ix = idle ? -1000 : mx
    var iy = idle ? -1000 : my
    for (var i = 0; i < particles.length; i++) {
      particles[i].tick(ix, iy)
    }
    requestAnimationFrame(loop)
  }
  loop()
})()
