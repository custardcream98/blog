import { HeroPostsSection, Intro } from "./_components";

type HomePageProps = {
  searchParams: {
    page?: string;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <>
      <Intro />
      <HeroPostsSection page={searchParams.page} />
    </>
  );
}
