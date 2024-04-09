import { ContentDisplay } from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByCategory } from "@/utils/doc-util";

export default function CategoryPage({ params: { name } }) {
  const docs = getDocuments();
  const matchedDocuments = getDocumentsByCategory(docs, name);

  return <ContentDisplay contentId={matchedDocuments[0].id} />;
}
