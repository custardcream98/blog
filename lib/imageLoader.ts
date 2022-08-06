type Props = {
  src: string
  width: number
}

const imageLoader = ({ src, width }:Props) => `..${src}?width=${width}`

export default imageLoader;