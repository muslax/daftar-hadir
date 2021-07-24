/**
 * Manage projects
 */
import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";

import { DB_ATTENDEE, DB_PROJECT } from "../libs/constants";
import { connect } from "../libs/database";
import fetchJson from "../libs/fetchJson";
import useProjects from '../hooks/useProjects';
import { generatePOSTData } from "../libs/utils";

function string_to_slug (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

const ManageProjects = ({ projects }) => {
  const { projects: swrProjects, isLoading, mutate } = useProjects()

  const [pageProjects, setPageProjects] = useState(projects)
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10))
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [message, setMessage] = useState("")
  const [colors, setColors] = useState("indigo pink")

  const [dView, setDView] = useState(null)

  useEffect(() => {
    if (swrProjects) setPageProjects(swrProjects)
  }, [swrProjects])

  async function saveProject(e) {
    const url = "/api/new-project"
    // const slug = title.trim().toLocaleLowerCase().split(" ").join("-")
    const resp = await fetchJson(url, generatePOSTData({
      title, slug, date, message, colors
    }))

    mutate()
    setShowForm(false)
  }

  const inputClass = `rounded-none px-3 py-2 font-bold 
  focus:outline-none focus:ring-2 focus:ring-amber-400`

  return <div className="min-h-screen px-5 bg-amber-200">
    <Head>
      <title>Manage Daftar Hadir</title>
    </Head>
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center pt-12 pb-10">
        <h1 className="flex-grow text-4xl md:text-5xl pr-8 text-white leading-snug font-extrabold overflow-hidden truncate">
          {/* <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">Manage Daftar Hadir</span> */}
          Manage Daftar Hadir
        </h1>
        <button 
          className="bg-white px-3 sm:px-5 py-2 font-bold text-amber-600 hover:text-amber-700"
          onClick={e => setShowForm(true)}
        >Add Project</button>
      </div>

      {/* Form */}
      {showForm && (
      <div className="border-t-2 border-b-2 border-amber-800 font-bold sm:px-8 py-6">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-36 p-2 text-right">Tanggal</td>
              <td className="p-2">
                <input
                  type="date"
                  value={date}
                  className={`w-48 ${inputClass}`}
                  onChange={e => setDate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="w-36 p-2 text-right">Judul</td>
              <td className="p-2">
                <input
                  type="text"
                  value={title}
                  className={`w-full ${inputClass}`}
                  onChange={e => {
                    setTitle(e.target.value)
                    setSlug(string_to_slug(e.target.value))
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="w-36 p-2 text-right">Slug</td>
              <td className="p-2">
                <input
                  type="text"
                  value={slug}
                  className={`w-full ${inputClass}`}
                  onChange={e => setSlug(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="w-36 p-2 text-right">Pesan</td>
              <td className="p-2">
                <input
                  type="text"
                  value={message}
                  className={`w-full ${inputClass}`}
                  onChange={e => setMessage(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="w-36 p-2 text-right">Colors</td>
              <td className="p-2">
                <select
                  className={`appearance-none w-full ${inputClass}`}
                  defaultValue={colors}
                  onChange={e => setColors(e.target.value)}
                >
                  <option value="indigo pink">indigo - pink</option>
                  <option value="indigo amber">indigo - amber</option>
                  <option value="purple red">purple - red</option>
                  <option value="purple pink">purple - pink</option>
                  <option value="blue rose">blue - rose</option>
                  <option value="green red">green red</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-36 p-2 pt-6 text-right">&nbsp;</td>
              <td className="p-2 pt-6">
                <button 
                  className="bg-amber-400 hover:bg-amber-500 mr-5 px-3 sm:px-6 h-10 font-bold text-amber-600 hover:text-white"
                  onClick={saveProject}
                >Save Project</button>
                <button 
                  className="border-2 border-amber-400 hover:border-amber-400 hover:bg-amber-400 px-3 sm:px-5 h-10 font-bold text-amber-600 hover:text-amber-700"
                  onClick={e => setShowForm(false)}
                >Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      )}

      {/* Daftar */}
      {!showForm && (
      <table className="w-full border-t-2 border-amber-800">
      {pageProjects.map((p, index) => (
        <tbody key={p._id}>
          <tr className="border-b-2 border-amber-800 font-medium cursor-pointer hover:bg-amber-100 hover:bg-opacity-40"
            onClick={e => {
              if (dView == p._id) setDView(null)
              else setDView(p._id)
            }}
          >
            <td className="py-2 w-10 text-center">{index + 1}</td>
            <td className="p-2 w-24 whitespace-nowrap">{p.Date}</td>
            <td className="p-2 text-lg text-amber-900 font-extrabold">{p.Title}</td>
          </tr>
          {dView == p._id && <>
          <tr className="border-b border-amber-600">
            <td colSpan="2" className="p-2 w-24 text-right whitespace-nowrap">Slug:</td>
            <td className="p-2 font-semibold">
              <Link href={`/${p.Date.split("-").join("")}/${p.Slug}`}>
                <a className="text-rose-500 hover:underline">{`/${p.Date.split("-").join("")}/${p.Slug}`}</a>
              </Link>
            </td>
          </tr>
          <tr className="border-b border-amber-600">
            <td colSpan="2" className="p-2 w-24 text-right whitespace-nowrap">Colors:</td>
            <td className="p-2 font-semibold">{`${p.Colors.join(" - ")}`}</td>
          </tr>
          <tr className="border-b-2 border-amber-800">
            <td colSpan="2" className="p-2 w-24 text-right whitespace-nowrap">Signee:</td>
            <td className="p-2 font-semibold">{p.attendees}</td>
          </tr>
          </>}
        </tbody>
      ))}
      </table>
      )}

      {showForm && <div>
        <p className="py-2">{`https://undangan.gaianets.com/${date.replaceAll('-', '')}/${slug}`}</p>
        
        <pre className="bg-white px-3 py-2 text-xs overflow-x-scroll my-8">
          Date:    {date}<br/>
          Title:   {title}<br/>
          Slug:    {slug}<br/>
          Message: {message}<br/>
          Colors:  {colors}<br/>
        </pre>
      </div>}

      {/* Padding */}
      <div className="h-32"></div>
    </div>
  </div>
}

export default ManageProjects

export async function getStaticProps() {
  const { db } = await connect()

  // const projects = await db.collection(DB_PROJECT).find({}).toArray()
  const projects = await db.collection(DB_PROJECT).aggregate([
    { $lookup: {
      from: DB_ATTENDEE,
      localField: "_id",
      foreignField: "eventId",
      as: "attendees",
    }},
    { $project: {
      Title: 1,
      Slug: 1,
      Date: 1,
      Message: 1,
      Colors: 1,
      Created: 1,
      Updated: 1,
      "attendees": { $size: "$attendees" },
    }}
  ]).sort({ Date: -1 }).toArray()

  return {
    props: {
      projects,
    },
    revalidate: 30, // In 30 seconds
  }
}
