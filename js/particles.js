// particles.js — LOVII interactive SVG particle cloud
// Создаёт облако частиц, реагирующих на движение мыши/тача
(function () {
  'use strict'

  // ── Config ───────────────────────────────────────────
  var COUNT = 120
  var MIN_R = 4
  var MAX_R = 10
  var AMBIENT = 0.25
  var DAMP = 0.96
  var MOUSE_R = 220
  var MOUSE_FORCE = 1.2

  // ── Container / SVG ──────────────────────────────────
  const container = document.createElement('div')
  container.id = 'particle-cloud'
  container.style.cssText =
    'position:fixed;inset:0;z-index:9999;pointer-events:none;overflow:visible'

  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.style.display = 'block'
  container.appendChild(svg)
  document.body.prepend(container)

  var debugColors = ['#FF0000', '#FF4444', '#FF8800', '#FFAA00']

  // ── Particle ─────────────────────────────────────────
  class Particle {
    constructor() {
      this.x = Math.random() * innerWidth
      this.y = Math.random() * innerHeight
      this.vx = (Math.random() - 0.5) * AMBIENT
      this.vy = (Math.random() - 0.5) * AMBIENT
      this.r = MIN_R + Math.random() * (MAX_R - MIN_R)
      this.op = 0.7 + Math.random() * 0.3
      this.ci = Math.floor(Math.random() * debugColors.length)

      this.el = document.createElementNS(ns, 'circle')
      this.el.setAttribute('fill', debugColors[this.ci])
      this.el.setAttribute('r', this.r)
      this.el.setAttribute('opacity', this.op)
      svg.appendChild(this.el)
    }

    tick(mx, my) {
      // фоновый дрейф
      this.vx += (Math.random() - 0.5) * 0.06
      this.vy += (Math.random() - 0.5) * 0.06

      // затухание (чтобы не разгонялись бесконечно)
      this.vx *= DAMP
      this.vy *= DAMP

      // реакция на мышь (отталкивание)
      const dx = this.x - mx
      const dy = this.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_R) {
        const force = ((MOUSE_R - dist) / MOUSE_R) * MOUSE_FORCE
        const angle = Math.atan2(dy, dx)
        this.vx += Math.cos(angle) * force
        this.vy += Math.sin(angle) * force
      }

      // движение
      this.x += this.vx
      this.y += this.vy

      // wrap по краям
      const w = innerWidth
      const h = innerHeight
      if (this.x < -60) this.x = w + 60
      else if (this.x > w + 60) this.x = -60
      if (this.y < -60) this.y = h + 60
      else if (this.y > h + 60) this.y = -60

      this.el.setAttribute('cx', this.x)
      this.el.setAttribute('cy', this.y)
    }
  }

  // ── Init ─────────────────────────────────────────────
  const particles = Array.from({ length: COUNT }, function () {
    return new Particle()
  })

  // ── Mouse / Touch tracking ───────────────────────────
  let mx = -1000
  let my = -1000
  let idle = true
  let idleTimer

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

  document.addEventListener(
    'touchmove',
    function (e) {
      var t = e.touches[0]
      if (t) onMove(t.clientX, t.clientY)
    },
    { passive: true },
  )

  document.addEventListener('touchstart', function (e) {
    var t = e.touches[0]
    if (t) onMove(t.clientX, t.clientY)
  })

  // ── RAF Loop ─────────────────────────────────────────
  function loop() {
    var ix = idle ? -1000 : mx
    var iy = idle ? -1000 : my
    for (var i = 0; i < particles.length; i++) {
      particles[i].tick(ix, iy)
    }
    requestAnimationFrame(loop)
  }
  loop()

  // ── Resize ───────────────────────────────────────────
  window.addEventListener('resize', function () {
    // particles wrap naturally, no extra work needed
  })
})()
