import { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";

import { DB_PROJECT } from "../../../libs/constants";
import { connect } from "../../../libs/database";
import fetchJson from '../../../libs/fetchJson';
import { generatePOSTData, getDate } from '../../../libs/utils';

const NewAttendee = ({ project }) => {
  const router = useRouter();

  const message = "Mohon isikan data pribadi ANDA dengan benar. Seluruh kolom wajib diisi.";

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [fullname, setFullname] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");


  const color1 = "indigo";
  const color2 = "pink";

  const twInput = `peer w-full py-2 border-b-2 rounded-none text-xl font-bold
  border-${color2}-500 focus:border-${color1}-500 text-gray-700 
  placeholder-transparent 
  focus:outline-none`;

  const twLabel = `absolute left-0 top-0 --top-3.5 text-${color1}-500 text-sm transition-all 
  peer-placeholder-shown:text-xl 
  peer-placeholder-shown:text-${color1}-500 
  peer-placeholder-shown:font-bold 
  peer-placeholder-shown:top-6 
  peer-focus:top-0 peer-focus:--top-3.5 
  peer-focus:font-regular
  peer-focus:text-${color2}-500 
  peer-focus:text-sm`;

  const btnReady = `w-full py-5 bg-${color1}-500 rounded-lg
  text-xl text-white font-bold tracking-wide focus:outline-none
  hover:bg-${color1}-600 focus:bg-${color1}-600 active:bg-${color1}-700`

  const btnNotReady = `w-full py-5 border-2 border-${color1}-500 rounded-lg
  text-xl text-${color1}-500 font-bold tracking-wide focus:outline-none`

  const isReady = (
    fullname &&
    organization &&
    email &&
    phone &&
    gender
  )

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

  return (
    <div>
      <Head>
        <title>Formulir Dafar Hadir {project.Title}</title>
      </Head>

      <div className="hidden">
        <Link href="/terimakasih">
          <a>Terimakasih</a>
        </Link>
      </div>
      
      {/* Body */}
      <div className="px-6">
        <div className="min-h-screen mx-auto max-w-4xl">
          {/* Masthead */}
          <div className="pt-10 pb-5">
            <label className={`text-lg text-${color2}-500 font-bold uppercase`}>
              Daftar Hadir
            </label>
            <div className={`text-4xl text-${color1}-500 font-bold mb-2`}>
              {project.Title}
            </div>
            <div className={`text-2xl text-${color1}-500 font-bold`}>
              {getDate(project.Date)}
            </div>
          </div>

          {/* Submitting */}
          {submitting && (
          <div 
            className={`text-center bg-${color1}-500 text-white font-bold pt-8 pb-10 px-4`}
            onClick={e => setSubmitting(false)}
          >
            <div className="text-2xl">Menyimpan data</div>
            <div className="w-40 h-32 mx-auto my-5 bg-white"></div>
            <div className="text-xl">Mohon tunggu sampai selesai.</div>
          </div>
          )}

          {!submitting && (<div>
            {/* Message */}
            <div className={`text-xl text-${color2}-500 font-bold border-t-8 border-b-8 border-${color1}-500 py-4`}>
              {project.Message || message}
            </div>

            {/* HeroImg 1 */}
            <div className="max-w-xl mx-auto p-4">
              <div className="w-3/5 mx-auto lg:hidden">
                <img className="" style={{ width: '100%'}} src="/illstration-01.png" />
              </div>
            </div>
            
            {/* Main */}
            <div className="flex flex-col-reverse lg:flex-row space-x-0 lg:space-x-8 lg:space-y-0">
              <div className="lg:w-6/12">
                <div className="max-w-xl mx-auto">
                  {/* <ATForm /> */}
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
                        text-gray-700 focus:text-${color1}-500 
                        rounded-none border-b-2 border-${color2}-500 focus:border-${color1}-500
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
                      <div className="w-80 lg:w-full mx-auto">
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
              </div>
              <div className="hidden lg:block flex-grow py-5 lg:py-0">
                <div className="h-56 lg:h-full mb-2 lg:mb-0 flex items-center justify-center max-w-xl mx-auto">
                  <div className="w-3/5 lg:w-5/6 p-3 lg:p-0">
                    <img className="" style={{ width: '100%'}} src="/illstration-01.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>)}

          
          {/* Padding */}
          <div className="h-32 lg:h-48">
            {/* <pre className="text-xs">
              {response && <span>RESP: {JSON.stringify(response, null, 2)}</span>}
              <br/>
              Nama: {fullname}<br/>
              Gender: {gender}<br/>
              Organization: {organization}<br/>
              Email: {email}<br/>
              Phone: {phone}<br/>
              {JSON.stringify(project, null, 2)}
            </pre> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-36 bg-gray-400"></div>

      <style jsx>{`
      select {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
        -webkit-print-color-adjust: exact;
        color-adjust:exact
      }
      `}</style>
    </div>
  )
}

export default NewAttendee;

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
    fallback: false,
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

  console.log("PROJECT", project);

  return {
    props: {
      project,
    },
    revalidate: 30, // In 30 seconds
  }
}
