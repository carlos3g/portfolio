import OpengraphImage, {
  size as ogSize,
  contentType as ogContentType,
  alt as ogAlt,
} from "./opengraph-image";
import { routing } from "@/i18n/routing";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = ogAlt;
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default OpengraphImage;
