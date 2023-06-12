import { METADATA_DEFAULT_TITLE, METADATA_DEFAULT_URL, sharedMetadata } from "./sharedMetadata";

import { type Metadata } from "next";

export const metadata: Metadata = {
  ...sharedMetadata,

  metadataBase: METADATA_DEFAULT_URL,

  openGraph: {
    ...sharedMetadata.openGraph,
    locale: "ko_KR",
    siteName: METADATA_DEFAULT_TITLE,
    title: {
      default: METADATA_DEFAULT_TITLE,
      template: `${METADATA_DEFAULT_TITLE}: %s`,
    },
  },

  title: {
    default: METADATA_DEFAULT_TITLE,
    template: `${METADATA_DEFAULT_TITLE}: %s`,
  },

  twitter: {
    ...sharedMetadata.twitter,
    card: "summary_large_image",
    creator: "@ova_sw",
    site: "@ova_sw",
    title: {
      default: METADATA_DEFAULT_TITLE,
      template: `${METADATA_DEFAULT_TITLE}: %s`,
    },
  },
};
