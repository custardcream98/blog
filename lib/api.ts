import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import axios from "axios"
import PostType from '../interfaces/post'
import { PrevNextPosts } from '../interfaces/post'

const postsDirectory = join(process.cwd(), '_posts')
const aboutPageDirectory = join(process.cwd(), 'about.md')

interface Items extends PostType {
  [key: string]: string | string[] | object | undefined;
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Items = {
    slug: '',
    title: '',
    date: '',
    category: [],
    coverImage: '',
    excerpt: '',
    ogImage: {
      url: ''
    },
    content: ''
  }

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
  const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))
  while (true) {
    try {
      const { created: fileName } = await axios
          .post(`http://custardcream.iptime.org:5000/og`, {
            title: "개발자 시우의 블로그",
            subtitle: title,
          }, {timeout:60000})
        .then((res) => res.data);
      return fileName;
    } catch (e) {
      
      console.log(JSON.stringify({title:"개발자 시우의 블로그", subtitle:title}));
      
      console.log('retry getting img');
      await delay(10000);
    }
  }
}

export function getPostByCategory(category: string) {
  const posts = getAllPosts(["title", "slug", "excerpt", "date", "category"]);
  let categoryPosts:Items[] = []

  posts.forEach((post) => {
    post.category.forEach((c) => {
      if (c === category)
        categoryPosts.push(post)
    })
  })

  return categoryPosts
}