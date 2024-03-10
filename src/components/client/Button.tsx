import type { ComponentPropsWithoutRef, CSSProperties, MouseEventHandler } from "react";
import { Rings } from "react-loader-spinner";
import { utld } from "utility-class-components";

type Props = ComponentPropsWithoutRef<"button"> & {
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  isLoading: boolean;
};

export function Button({ children, width, height, isLoading, onClick, ...props }: Props) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isLoading) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <StyledButton
      style={{
        height,
        width,
      }}
      $isLoading={isLoading}
      disabled={isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <Rings
          wrapperClass='[&>svg]:stroke-default-sub-light [&>svg]:dark:stroke-default-sub-dark'
          width={width}
          height={width}
        />
      ) : (
        children
      )}
    </StyledButton>
  );
}

const StyledButton = utld.button<{
  $isLoading: boolean;
}>`
  rounded-[5px]

  overflow-hidden

  inline-flex
  justify-center
  items-center

  transition-all
  transition-ease
  duration-200

  font-sans
  bg-default-light
  dark:bg-default-dark
  text-bg-light
  dark:text-bg-dark

  hover:(
    text-accent-light
    dark:text-accent-dark
    scale-[1.05]
  )

  focus:(
    text-accent-light
    dark:text-accent-dark
    scale-[1.05]
  )

  ${({ $isLoading }) => $isLoading && "pointer-events-none"}
`;
