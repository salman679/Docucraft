import { getDocumentContent } from "@/lib/doc";
import Link from "next/link";
import Tag from "./Tag";

export async function ContentDisplay({ contentId }) {
  const documentContent = await getDocumentContent(contentId);

  return (
    <article className="prose dark:prose-invert">
      <h1>{documentContent.title}</h1>
      <div>
        <span>Published on: {documentContent.date}</span> by{" "}
        <Link href={`/authors/${documentContent.author}`}>
          {documentContent.author}
        </Link>{" "}
        under the{" "}
        <Link href={`/categories/${documentContent.category}`}>
          {documentContent.category}
        </Link>{" "}
        category.
      </div>
      <div>
        {documentContent.tags &&
          documentContent.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
      <div
        className="lead"
        dangerouslySetInnerHTML={{ __html: documentContent.contentHtml }}
      />
    </article>
  );
}
