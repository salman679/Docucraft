import { ContentDisplay } from "@/components/ContentDisplay";

export default function contentPage({ params: { contentId } }) {
  return <ContentDisplay contentId={contentId} />;
}
