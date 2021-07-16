import Link from 'next/link';

export default function Terimakasih() {
  return (
    <div className="bg-indigo-500 px-10">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl text-white font-bold mb-16">Terimakasih</h1>
        <Link href="/">
          <a className="text-white font-bold border-4 border-white hover:bg-white hover:text-indigo-500 px-6 py-2">Back to Home</a>
        </Link>
      </div>
    </div>
  )
}