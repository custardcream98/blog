import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { PrevNextPosts } from '../interfaces/post'

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

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    else if (field === 'content') {
      items[field] = content
    }
    else if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (new Date(post2.date).getTime() - new Date(post1.date).getTime()));
  return posts
}

export function getPrevNextPosts(slug: string):PrevNextPosts {
  const posts = getAllPosts(["title", "slug", "excerpt", "date"]);

  const index = posts.findIndex((p) => p.slug === slug);

  const next = index !== 0 ? {
    title: posts[index - 1].title,
    slug: posts[index - 1].slug,
    excerpt: posts[index - 1].excerpt
  } : null;
  const prev = posts.length - 1 !== index ? {
    title: posts[index + 1].title,
    slug: posts[index + 1].slug,
    excerpt: posts[index + 1].excerpt
  } : null;

  return {
    prevTitle: prev?.title,
    prevSlug: prev?.slug,
    prevExcerpt: prev?.excerpt,
    nextTitle:next?.title,
    nextSlug:next?.slug,
    nextExcerpt:next?.excerpt
  }
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

  const { created: fileName } = await fetch(`https://og-img-generator-server.herokuapp.com/og/개발자 시우의 블로그/${title}`, { mode: "no-cors" }).then((res) => res.json())

  return fileName;
}