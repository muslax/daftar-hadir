import Head from 'next/head'
import Link from 'next/link';
import { useState } from 'react';
import useProjects from '../hooks/useProjects'

export default function Home() {
  const { projects, isError, isLoading, mutate } = useProjects();

  const [vStack, setVStack] = useState([]);

  if (isLoading) return <></>;
  if (isError) return <>ERROR</>;

  function getFormPath(project) {
    const date = project.Date.split("-").join("");
    const slug = project.Slug;
    return `/${date}/${slug}`;
  }

  return (
    <div className="bg-coolgray-500 min-h-screen font-bold p-6">
    </div>
  )
}
