import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const getServerSideQueryClient = cache(() => new QueryClient());
