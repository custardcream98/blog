import IconButton from "src/components/Common/IconButton";
import LinkIcon from "src/components/Common/LinkIcon";
import useIsMounted from "src/hook/useIsMounted";
import useWindowSize from "src/hook/useWindowSize";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { ud, utld } from "utility-class-components";

type NoticeProps = {
  projectName: string;
  projectLink: string;
  repositoryLink: string;
  projectImage: StaticImageData;
};

type WrapperProps = {
  isMounted: boolean;
  isClosed: boolean;
};

export default function ProjectAd({
  projectName,
  projectLink,
  repositoryLink,
  projectImage,
}: NoticeProps) {
  const isMounted = useIsMounted();
  const [isClosed, setIsClosed] = useState(false);
  const { width } = useWindowSize();

  const iconSize = width > 500 ? "25px" : "20px";
  const isMobile = width <= 500;

  const handleClose = useCallback(() => {
    setIsClosed(true);
  }, []);

  return (
    <Wrapper isMounted={isMounted} isClosed={isClosed}>
      <ProjectAdImage
        src={projectImage}
        alt={projectName + " 아이콘 이미지"}
        width={50}
        height={50}
      />
      <ProjectAdContent>
        <ProjectAdTitle>제가 개발한 서비스 구경하고 가세요!</ProjectAdTitle>
        <ProjectAdName>{projectName}</ProjectAdName>
      </ProjectAdContent>
      <ClickablesWrapper>
        {!isMobile && (
          <ProjectAdGithub
            icon={BsGithub}
            title='레포지토리 링크'
            size={iconSize}
            buttonAs='a'
            href={repositoryLink}
            target='_blank'
          />
        )}
        <ProjectLink href={projectLink} target='_blank'>
          <LinkIcon id='project-ad-link' title='프로젝트 링크' size={iconSize} />
        </ProjectLink>
        <CloseButton
          icon={RiCloseFill}
          title='프로젝트 광고 닫기'
          size='20px'
          onClick={handleClose}
          type='button'
        />
      </ClickablesWrapper>
    </Wrapper>
  );
}

const Wrapper = utld.aside<WrapperProps>`
  flex
  items-center

  fixed
  bottom-5
  right-5
  left-5
  z-50

  max-w-[56.25rem]
  mx-auto

  p-5
  rounded-[0.625rem]

  shadow-sm
  shadow-black
  dark:shadow-white

  transition-all
  duration-[1.5s]

  backdrop-blur-[0.625rem]

  ad:p-[0.625rem]

  print:hidden

  ${({ isMounted, isClosed }) =>
    isMounted &&
    (!isClosed
      ? ud`
          translate-y-0
          opacity-100
        `
      : ud`
          translate-y-[200%]
          opacity-0
        `)}
`;

const ProjectAdContent = utld.div`
  ml-5
  ad:ml-[0.625rem]
`;

const ProjectAdTitle = utld.strong`
  block
  mb-1

  text-[0.9rem]

  text-default-sub-light
  dark:text-default-sub-dark

  ad:text-[0.6rem]
`;

const ProjectAdName = utld.p`
  text-[1.1rem]
  ad:text-[0.9rem]
`;

const ProjectAdImage = utld(Image)`
  object-cover
`;

const ProjectLink = utld.a`
  mr-5

  [&>svg]:transition-[stroke,fill]
  [&>svg]:duration-300

  ad:mr-0
`;

const CloseButton = utld(IconButton)`
  absolute
  top-3
  right-3

  ad:(
    static
    mb-[0.375rem]
  )
`;

const ClickablesWrapper = utld.div`
  flex
  items-center
  ml-auto

  ad:flex-col-reverse
`;

const ProjectAdGithub = utld(IconButton)`
  mr-5
  ml-auto

  [&>svg]:(
    transition-[stroke,fill]
    duration-300
  )

  hover:[&>svg]:(
    fill-accent-light
    dark:fill-accent-dark
  )

  ad:hidden
`;
