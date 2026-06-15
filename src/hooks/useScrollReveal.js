import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const children = el.querySelectorAll('[data-reveal]')
      const targets = children.length > 0 ? children : [el]

      targets.forEach((target, i) => {
        const direction = target.dataset.reveal || 'up'
        const delay = parseFloat(target.dataset.revealDelay || 0)

        const from = {
          opacity: 0,
          y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
          x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
          scale: direction === 'scale' ? 0.9 : 1,
        }

        gsap.set(target, from)

        gsap.to(target, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: options.duration || 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: options.start || 'top 90%',
            once: true,
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
