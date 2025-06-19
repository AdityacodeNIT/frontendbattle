import React from 'react'
import ParallaxConnectionSection from './ParallaxConnectionSection'

const Parallax = () => {
  return (
<ParallaxConnectionSection
  videoSrc="sandbox:/mnt/data/dummy_video.mp4"
  posterImage="sandbox:/mnt/data/dummy_image.jpg"
  onLearnMore={() => alert('Learn more clicked')}
/>

  )
}

export default Parallax;
