export default function Mock() {
  const color1 = "blue";
  const color2 = "pink";

  const twInput = `peer w-full py-2 border-b-2 rounded-none text-xl font-bold
  border-${color2}-500 text-gray-700 
  placeholder-transparent 
  focus:outline-none focus:border-${color1}-500`;

  const twLabel = `absolute left-0 top-0 --top-3.5 text-${color1}-500 text-sm transition-all 
  peer-placeholder-shown:text-xl 
  peer-placeholder-shown:text-${color1}-500 
  peer-placeholder-shown:font-bold 
  peer-placeholder-shown:top-6 
  peer-focus:top-0 peer-focus:--top-3.5 
  peer-focus:font-regular
  peer-focus:text-${color2}-500 
  peer-focus:text-sm`;

  return (
    <div>
      <div className="px-6">
        <div className="min-h-screen mx-auto max-w-4xl">
          {/* Masthead */}
          <div className="pt-10 pb-5">
            <label className={`text-lg text-${color2}-500 font-bold uppercase`}>
              Daftar Hadir
            </label>
            <div className={`text-4xl text-${color1}-500 font-bold mb-2`}>
              Seminar Sehari Penangkalan Lebah Madu
            </div>
            <div className={`text-2xl text-${color1}-500 font-bold`}>
              22 November 2021
            </div>
          </div>

          {/* Message */}
          {/* <div className={`text-xl text-${color2}-500 font-bold border-t-8 border-b-8 border-${color1}-500 py-4`}>
            Mohon isikan data pribadi Anda dengan benar. Seluruh kolom wajib diisi.
          </div> */}

          {/* <div className={`border-8 border-${color1}-500 text-4xl text-center text-${color2}-500 font-bold py-16 px-5`}>
            Menyimpan data<br/>...
          </div> */}
          <div className={`bg-${color1}-500 text-4xl text-center text-white font-bold py-24 px-5`}>
            Menyimpan data<br/>...
          </div>
          
          {/* HeroImg */}
          <div className="max-w-xl mx-auto p-4">
            <div className="w-3/5 mx-auto lg:hidden">
              <img className="" style={{ width: '100%'}} src="/illstration-01.png" />
            </div>
          </div>

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
                      autoComplete={false}
                      autoFocus={true}
                      className={twInput} 
                      placeholder="nama@domain.com" 
                    />
                    <label for="Fullname" className={twLabel}
                    >Nama Lengkap</label>
                  </div>

                  <div className="relative py-4">
                    <select
                      className={`w-full appearance-none focus:outline-none
                      text-xl font-bold bg--white pl-0 pr-9 py-2
                      text-gray-700 focus:text-${color1}-500 
                      rounded-none border-b-2 border-${color2}-500 focus:border-${color1}-500
                      `}
                    >
                      <option>- Pilih</option>
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    <label for="Gender" className={twLabel}
                    >Jenis Kelamin</label>
                  </div>

                  <div className="relative py-4">
                    <input 
                      id="Organization" 
                      name="Organization" 
                      type="text" 
                      className={twInput} 
                      autoComplete={false}
                      placeholder="nama@domain.com" 
                    />
                    <label for="Organization" className={twLabel}
                    >Instansi / Organisasi</label>
                  </div>

                  <div className="relative py-4">
                    <input 
                      id="Email" 
                      name="Email" 
                      type="text" 
                      className={twInput} 
                      autoComplete={false}
                      placeholder="nama@domain.com" 
                    />
                    <label for="Email" className={twLabel}
                    >Alamat Email</label>
                  </div>

                  <div className="relative py-4">
                    <input 
                      id="Phone" 
                      name="Phone" 
                      type="text" 
                      className={twInput} 
                      autoComplete={false}
                      placeholder="nama@domain.com" 
                    />
                    <label for="Phone" className={twLabel}
                    >Telepon / HP</label>
                  </div>

                  <div className="py-4 mt-4">
                    <div className="w-80 lg:w-full mx-auto">
                      <button
                        className={`w-full py-5 bg-${color1}-400 rounded-lg
                          text-xl text-white font-bold tracking-wide focus:outline-none
                          hover:bg-${color1}-500 focus:bg-${color1}-600 active:bg-${color1}-700
                        `}
                      >Submit</button>
                    </div>
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
        
          {/* Padding */}
          <div className="h-32 lg:h-48"></div>
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
