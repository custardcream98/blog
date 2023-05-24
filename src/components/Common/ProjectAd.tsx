import styled, { css } from "styled-components";
import { useCallback, useState } from "react";
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";

import useIsMounted from "src/lib/hook/useIsMounted";
import IconButton from "src/components/Common/IconButton";
import LinkIcon from "src/components/Common/LinkIcon";

import type { StaticImageData } from "next/image";
import useWindowSize from "src/lib/hook/useWindowSize";

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

const ProjectAd = ({
  projectName,
  projectLink,
  repositoryLink,
  projectImage,
}: NoticeProps) => {
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
      <div className="project-ad-content">
        <strong className="project-ad-title">
          제가 개발한 서비스 구경하고 가세요!
        </strong>
        <p className="project-ad-name">{projectName}</p>
      </div>
      <ClickablesWrapper>
        {!isMobile && (
          <IconButton
            className="project-ad-github"
            icon={BsGithub}
            title="레포지토리 링크"
            size={iconSize}
            buttonAs="a"
            href={repositoryLink}
            target="_blank"
          />
        )}
        <ProjectLink href={projectLink} target="_blank">
          <LinkIcon
            id="project-ad-link"
            title="프로젝트 링크"
            size={iconSize}
          />
        </ProjectLink>
        <CloseButton
          icon={RiCloseFill}
          title="프로젝트 광고 닫기"
          size="20px"
          onClick={handleClose}
          type="button"
        />
      </ClickablesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.aside<WrapperProps>`
  display: flex;
  align-items: center;

  position: fixed;
  bottom: 20px;
  right: 20px;
  left: 20px;
  z-index: 1000;

  max-width: 900px;
  margin: 0 auto;

  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) =>
    theme.postElementBackgroundColor + "22"};

  box-shadow: ${({ theme }) => theme.darkmodeShadow};

  transition: all 1.5s ease;
  transform: translateY(200%);
  opacity: 0;

  backdrop-filter: blur(10px);

  @media (max-width: 500px) {
    padding: 10px;
  }

  ${({ isMounted, isClosed }) =>
    isMounted &&
    (!isClosed
      ? css`
          transform: translateY(0);
          opacity: 1;
        `
      : css`
          transform: translateY(200%);
          opacity: 0;
        `)}

  .project-ad-content {
    margin-left: 20px;

    @media (max-width: 500px) {
      margin-left: 10px;
    }
  }

  strong.project-ad-title {
    display: block;
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.subTextColor};

    @media (max-width: 500px) {
      font-size: 0.5rem;
    }
  }
  p.project-ad-name {
    @media (max-width: 500px) {
      font-size: 0.9rem;
    }
  }

  @media only print {
    display: none;
  }
`;

const ProjectAdImage = styled(Image)`
  object-fit: cover;
`;

const ProjectLink = styled.a`
  margin-right: 20px;
  > svg {
    transition: stroke 0.3s ease, fill 0.3s ease;
  }

  @media (max-width: 500px) {
    margin-right: 0;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 12px;

  @media (max-width: 500px) {
    position: static;
    margin-bottom: 6px;
  }
`;

const ClickablesWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  a.project-ad-github > svg {
    transition: stroke 0.3s ease, fill 0.3s ease;
  }

  a.project-ad-github {
    margin-left: auto;
    margin-right: 20px;

    > svg:hover {
      fill: ${({ theme }) => theme.accentColor};
    }

    @media (max-width: 500px) {
      display: none;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

export default ProjectAd;
