import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')
const aboutPageDirectory = join(process.cwd(), 'about.md')

type Items = {
    [key: string]: string
  }

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (field === 'category') {
      items[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export const getAboutContent = () => fs.readFileSync(aboutPageDirectory, 'utf8')

export async function getOgImage(title: string) {
  // const ogImageDir = `public/static/img/og`
  // const imagePath = `static/img/og/${title}.png`
  
  // fs.mkdirSync(ogImageDir, { recursive: true });

  // if (!fs.existsSync(`public/${imagePath}`)) {
  //   const image = await fetch(`https://og-img-generator-server.herokuapp.com/api/ogimage/개발자 시우의 블로그/${title}`, { mode: "no-cors" }).then((res) => res.blob())
    
  //   await fs.promises.writeFile(`public/${imagePath}`, image.stream())
  // }
  // return imagePath

  return `https://og-img-generator-server.herokuapp.com/개발자 시우의 블로그/${title}`
}