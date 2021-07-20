import { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router"

import { DB_PROJECT } from "../../../libs/constants"
import { connect } from "../../../libs/database"
import fetchJson from '../../../libs/fetchJson'
import { generatePOSTData, getDate, validateEmail } from '../../../libs/utils'



export default function Draft({ project }) {
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [fullname, setFullname] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const color1 = project.Colors[0] || "indigo"
  const color2 = project.Colors[1] || "pink"

  async function submit(e) {
    window.scrollTo(0, 0);
    setSubmitting(true);

    const url = "/api/new-entry";
    const resp = await fetchJson(url, generatePOSTData({
      id: project._id,
      fullname: fullname,
      gender: gender,
      organization: organization,
      email: email,
      phone: phone,
    }))

    if (resp) {
      setResponse(resp);
      router.push("/terimakasih")
    }
  }

  const isReady = (
    fullname &&
    organization &&
    validateEmail(email) &&
    phone &&
    gender
  )

  const twInput = `peer w-full py-2 border-b-2 rounded-none text-xl font-bold
  border-${color1}-500 focus:border-${color2}-500 text-${color1}-700 
  placeholder-transparent 
  focus:outline-none`;

  const twLabel = `absolute left-0 top-0 --top-3.5 text-${color2}-500 text-sm font-bold transition-all 
  peer-placeholder-shown:text-xl 
  peer-placeholder-shown:text-${color1}-500 
  peer-placeholder-shown:font-bold 
  peer-placeholder-shown:top-6 
  peer-focus:top-0 peer-focus:--top-3.5 
  peer-focus:font--regular
  peer-focus:text-${color2}-500 
  peer-focus:text-sm`;

  const btnReady = `w-full py-5 bg-${color1}-500 rounded--lg
  text-xl text-white font-bold tracking-wide focus:outline-none
  hover:bg-${color1}-600 focus:bg-${color1}-600 active:bg-${color1}-700`

  const btnNotReady = `w-full py-5 border-2 border-${color1}-500 rounded--lg
  text-xl text-${color1}-500 font-bold tracking-wide focus:outline-none`

  const imgUrl = `url(${project.heroImg})`

  return <>
    <Head>
      <title>Formulir Dafar Hadir XXX</title>
    </Head>

    <div className="hidden">
      <Link href="/terimakasih">
        <a>Terimakasih</a>
      </Link>
    </div>

    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        {/* Masthead */}
        <div className="max-w-xl pt-5 pb-5">
          <label className={`text-lg text-${color2}-500 font-bold uppercase`}>
            Daftar Hadir
          </label>
          <div className={`text-4xl text-${color1}-500 font-bold my-4`}>
            {project.Title}
          </div>
          <div className={`flex items-center space-x-2 text-2xl text-${color1}-500 font-bold`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="">
              {getDate(project.Date)}
            </span>
          </div>
        </div>
      </div>

      {/* Hero bg-${color1}-700 */}
      <div className={``}>
        <div className="max-w-6xl mx-auto">
          <div className="bg-yellow-300 xs:bg-yellow-200 sm:bg-yellow-100 border-t--8 border-indigo-500">
            <div id="hero" className={`hero ${submitting ? 'submitting' : ''} h-72`}
            style={{ 
              backgroundImage: imgUrl,
              backgroundSize: 'cover'
            }}
            >
              {submitting && (
              <div 
                className="h-full max-w-3xl mx-auto flex items-center px-6"
                
              >
                <div 
                  className={`w-full bg-${color1}-800 bg-opacity-70 text-xl text-white font-bold p-5`}
                  onClick={e => setSubmitting(false)}
                >
                  Mohon tunggu, sedang menyimpan data ...
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!submitting && (
      <div className="max-w-3xl mx-auto px-6">
        <div className="border-t--2 border-b--2 border-indigo-500 py-5 mb-">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 text-${color2}-500`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="flex-grow text-lg text-indigo-500 font-bold">
              Semua kolom harus diisi dengan benar.
            </p>
          </div>
        </div>

        {/* Main */}
        <div className="max-w-xl">
          <div className="">
            <div className="relative py-4">
              <input 
                id="Fullname" 
                name="Fullname" 
                type="text" 
                value={fullname}
                onChange={e => setFullname(e.target.value)}
                autoComplete="false"
                autoFocus={true}
                className={twInput} 
                placeholder="Nama Lengkap" 
              />
              <label htmlFor="Fullname" className={twLabel}
              >Nama Lengkap</label>
            </div>

            <div className="relative py-4">
              <select
                className={`w-full appearance-none focus:outline-none
                text-xl font-bold bg--white pl-0 pr-9 py-2
                text-${color1}-700 focus:text-${color1}-500 
                rounded-none border-b-2 border-${color1}-500 focus:border-${color2}-500
                `}
                onChange={e => setGender(e.target.value)}
              >
                <option value="">- Pilih</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <label htmlFor="Gender" className={twLabel}
              >Jenis Kelamin</label>
            </div>

            <div className="relative py-4">
              <input 
                id="Organization" 
                name="Organization" 
                type="text" 
                value={organization}
                onChange={e => setOrganization(e.target.value)}
                className={twInput} 
                autoComplete="false"
                placeholder="nama@domain.com" 
              />
              <label htmlFor="Organization" className={twLabel}
              >Instansi / Organisasi</label>
            </div>

            <div className="relative py-4">
              <input 
                id="Email" 
                name="Email" 
                type="text" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={twInput} 
                autoComplete="false"
                placeholder="nama@domain.com" 
              />
              <label htmlFor="Email" className={twLabel}
              >Alamat Email</label>
            </div>

            <div className="relative py-4">
              <input 
                id="Phone" 
                name="Phone" 
                type="text" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={twInput} 
                autoComplete="false"
                placeholder="nama@domain.com" 
              />
              <label htmlFor="Phone" className={twLabel}
              >Telepon / HP</label>
            </div>

            <div className="py-4 mt-4">
              <div className="">
                {!isReady && <button
                  className={btnNotReady}
                >Belum Komplit</button>}
                {isReady && <button
                  className={btnReady}
                  onClick={submit}
                >
                  Submit
                </button>}
              </div>
              {/* <div>
                N: {fullname} G: {gender} O: {organization} E: {email} P: {phone}
              </div> */}
            </div>
          </div>
        </div>
        
        {/* Padding */}
        <div className="h-64"></div>
      </div>
      )}
    </div>
    {/* <pre>PROJECT: {JSON.stringify(project, null, 2)}</pre> */}
    <style jsx>{`
    #hero.hero {
      height: 50vw;
      background-position: 50%;
    }
    @media screen and (min-width: 769px) {
      #hero.hero {
        height: 385px;
      }
    }
    #hero.hero.submitting {
      height: calc(100vh - 212px);
    }
    `}</style>
  </>
}


export async function getStaticPaths() {
  const { db } = await connect();
  const rs = await db.collection(DB_PROJECT).find({}).toArray();
  console.log(rs);

  const paths = rs.map((obj) => ({
    params: {
      date: `${obj.Date.split("-")[0]}${obj.Date.split("-")[1]}${obj.Date.split("-")[2]}`,
      slug: obj.Slug,
    }
  }));
  console.log("PATHS", paths);
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { db } = await connect();
  const y = params.date.substr(0, 4);
  const m = params.date.substr(4, 2);
  const d = params.date.substr(6);

  const project = await db.collection(DB_PROJECT).findOne({
    Slug: params.slug,
    Date: `${y}-${m}-${d}`,
  });

  const pictures = [
    'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/3484061/pexels-photo-3484061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/273935/pexels-photo-273935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/839462/pexels-photo-839462.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    'https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  ]

  pictures.sort(() => Math.random() - 0.5)

  console.log("PROJECT", project);

  return {
    props: {
      project: { ...project, heroImg: pictures[0] },
    },
    revalidate: 10, // In 30 seconds
  }
}
