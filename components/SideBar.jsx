"use client";

import {
  getDocumentsByAuthor,
  getDocumentsByCategory,
  getDocumentsByTag,
} from "@/utils/doc-util";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CustomLink from "./CustomLink";

export default function SideBar({ docs }) {
  const pathName = usePathname();
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodes, setNonRootNodes] = useState({});

  useEffect(() => {
    let matchedDocs = docs;
    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchedDocs = getDocumentsByTag(docs, tag);
    } else if (pathName.includes("/authors")) {
      const author = pathName.split("/")[2];
      matchedDocs = getDocumentsByAuthor(docs, author);
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/")[2];

      matchedDocs = getDocumentsByCategory(docs, category);
    }

    const roots = matchedDocs.filter((doc) => !doc.parent);
    const nonRoots = Object.groupBy(
      matchedDocs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nonRootsKeys = Reflect.ownKeys(nonRoots);
    nonRootsKeys.forEach((key) => {
      const foundInRoots = roots.find((root) => root.id === key);

      if (!foundInRoots) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        roots.push(foundInDocs);
      }
    });

    roots.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    });

    setRootNodes(roots);
    setNonRootNodes(nonRoots);
  }, [pathName, docs]);

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul
        role="list"
        className="space-y-6 lg:space-y-2 border-l border-slate-100 dark:border-slate-800"
      >
        {rootNodes.map((rootNode) => (
          <li key={rootNode.id} className="relative">
            <CustomLink
              aria-current="page"
              className="flex justify-between gap-1 border-l-2 pl-4 -ml-px hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
              href={`/docs/${rootNode.id}`}
            >
              <span className="truncate">{rootNode.title}</span>
            </CustomLink>
            {nonRootNodes[rootNode.id] && (
              <ul role="list" style={{ opacity: "1" }}>
                {nonRootNodes[rootNode.id].map((subRoot) => (
                  <li key={subRoot.id} dir="ltr" className="mt-1">
                    <CustomLink
                      className="flex justify-between gap-1 pl-7 pr-3 text-sm -ml-px border-l-2 text-zinc-600 transition hover:border-slate-400 dark:hover:border-slate-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      href={`/docs/${rootNode.id}/${subRoot.id}`}
                    >
                      <span className="truncate">{subRoot.title}</span>
                    </CustomLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
