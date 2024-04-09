import { ContentDisplay } from "@/components/ContentDisplay";

export default function subContentPage({ params: { subContentId } }) {
  return <ContentDisplay contentId={subContentId} />;
}
