import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import PostType from '../interfaces/post'
import { PrevNextPosts } from '../interfaces/post'

import { renderToString } from "react-dom/server"
import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import { createHash } from "crypto"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage, adminBucket } from './firebaseSetup/firebaseAdmin';
import Thumbnail from '../components/Thumbnail'


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

  const hashedName = createHash('md5').update(`개발자 시우의 블로그${title}`).digest('hex')
  const fileName = `thumbnails/${hashedName}.png`
  const file = adminBucket.file(fileName);
  const storageRef = ref(firebaseStorage, fileName);

  await file.exists().then(
  ).catch(async () => {
    const htmlString = renderToString(Thumbnail({ title:"개발자 시우의 블로그", subtitle: title }))

    const content = `
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      h1, p {
        margin: 0;
        padding: 0;
      }
      </style>
      <body>
      ${htmlString}
      </body>
    `
    
    const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      }
    : {
        args: [],
        executablePath:
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      };
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage();
    await page.setViewport({
      width: 1200,
      height: 630,
    });
    await page.setContent(content, { waitUntil: "domcontentloaded" });  
    const image = await page.screenshot({ omitBackground: true, type:'png'});  
    await browser.close();
    
    await uploadBytes(storageRef, (image as Buffer).buffer)
  })

  return await getDownloadURL(storageRef);
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