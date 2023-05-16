import { createHash } from "crypto";
import { ref, getDownloadURL } from "firebase/storage";
import { FirebaseServerSideApp } from "./server-side-setup";

type ThumbnailMeta = {
  title: string;
  subtitle: string;
};

export const getThumbnailUrl = async (
  serverSideFirebaseConnection: FirebaseServerSideApp,
  { title, subtitle }: ThumbnailMeta
) => {
  const hashedname = createHash("md5")
    .update(`${title}${subtitle}`)
    .digest("hex");

  const filename = `thumbnails/${hashedname}.webp`;

  return serverSideFirebaseConnection.getDownloadUrl(
    filename
  );
};
