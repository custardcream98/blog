type PostType = {
  slug: string
  title: string
  date: string
  category: string[]
  coverImage: string
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

export default PostType
