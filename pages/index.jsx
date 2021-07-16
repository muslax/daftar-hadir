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
    <div className="max-w-4xl mx-auto font-bold p-6">
      {projects.map(p => (
        <div key={p._id} className="mb-5">
          <h2 className="text-2xl">{p.Title}</h2>
          <Link href={getFormPath(p)}>
            <a className="text-blue-500">Form entry</a>
          </Link>
          <div className="">
            <button onClick={e => {
                if (vStack.includes(p._id)) {
                  setVStack(vStack.filter(id => id != p._id))
                } else {
                  setVStack(prev => ([...prev, p._id]))
                }
              }}
              className="text-xs font-bold uppercase bg-gray-600 text-white px-3 py-1">
              Show/Hide
            </button>
            {vStack.includes(p._id) && (
              <div className="">
                {p.attendees.length == 0 && <p className="text-red-500">EMPTY</p>}
                {p.attendees.length > 0 && <div>
                  {p.attendees.map(a => <p>{a.Fullname}, {a.Organization}</p>)}
                </div>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
