"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Link from "next/link";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getNote", id],
    queryFn: () => fetchNoteById(id),
    staleTime: 60 * 1000,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <Link href="/notes" className={css.backLink}>
        ← Back to list
      </Link>

      <article className={css.note}>
        <header className={css.header}>
          <h1 className={css.title}>{note.title}</h1>
          <span className={css.tag}>{note.tag}</span>
        </header>

        <div className={css.content}>
          <p>{note.content}</p>
        </div>

        <footer className={css.footer}>
          <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
        </footer>
      </article>
    </div>
  );
}
