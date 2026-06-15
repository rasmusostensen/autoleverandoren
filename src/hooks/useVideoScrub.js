import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useVideoScrub() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    let ready = false

    const onLoaded = () => {
      ready = true

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          if (ready && video.duration) {
            video.currentTime = self.progress * video.duration
          }
        },
      })
    }

    video.addEventListener('loadedmetadata', onLoaded)
    if (video.readyState >= 1) onLoaded()

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return { videoRef, containerRef }
}
