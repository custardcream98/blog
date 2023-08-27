import { Rings } from "react-loader-spinner";

export function LoadingIndicator() {
  return (
    <Rings
      wrapperClass='[&>svg]:stroke-default-sub-light [&>svg]:dark:stroke-default-sub-dark ml-[0.3rem]'
      width={24}
      height={24}
    />
  );
}
