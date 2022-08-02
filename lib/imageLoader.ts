type Props = {
  src:string
}

const imageLoader = ({ src }:Props) => `/img/${src}`

export default imageLoader;