import { Hydrate, HydrateProps } from "@tanstack/react-query";

export function HydrateQueryClient(props: HydrateProps) {
  return <Hydrate {...props} />;
}
