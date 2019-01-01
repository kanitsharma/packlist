import React from 'react'
import Loader from './loader.gif'

setImmediate(() => {
  const image = new Image()
  image.src = Loader
})

const GifLoader: React.FunctionComponent = (props) => (
  <img src={Loader} />
)

export default GifLoader