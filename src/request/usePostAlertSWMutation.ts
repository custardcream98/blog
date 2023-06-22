import { postAlertSW } from "./postAlertSW";

import { useMutation } from "@tanstack/react-query";

const USE_POST_ALERT_SW_MUTATION_KEY = ["postAlertSW"];
export const usePostAlertSWMutation = () => {
  return useMutation({
    mutationFn: postAlertSW,
    mutationKey: USE_POST_ALERT_SW_MUTATION_KEY,
  });
};
