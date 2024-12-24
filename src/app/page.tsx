import { Container } from "src/components"

import { HeroPostItem } from "./_components/HeroPostsListItem"
import { Paging } from "./_components/Paging"
import { Intro } from "./_components"
import { POSTS_SECTION_ID } from "./constants"

import PostByPageArr from "cache/postByPageArr.json"
import { utld } from "utility-class-components"

type HomePageProps = {
  searchParams: Promise<{
    page?: string
  }>
}

const PAGE_SCALE = PostByPageArr.length

export default async function HomePage(props: HomePageProps) {
  const searchParams = await props.searchParams;

  const {
    page = "1"
  } = searchParams;

  const parsedPage = parseInt(page, 10)
  const validPage = isNaN(parsedPage) ? 1 : Math.min(Math.max(parsedPage, 1), PAGE_SCALE)
  const pageIndex = validPage - 1
  const posts = PostByPageArr[pageIndex]

  return (
    <>
      <Intro />
      <Container id={POSTS_SECTION_ID}>
        <h2 className='sr-only'>Posts</h2>
        <HeroPostList>
          {posts.map((post) => (
            <HeroPostItem key={post.slug} {...post} />
          ))}
        </HeroPostList>
        <Paging currentPage={validPage} />
      </Container>
    </>
  )
}

const HeroPostList = utld.ol`
  pb-24
`
