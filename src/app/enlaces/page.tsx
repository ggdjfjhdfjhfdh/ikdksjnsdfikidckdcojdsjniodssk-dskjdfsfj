import Link from "next/link";
import Image from "next/image";
import ShareButton from "@/components/ShareButton";
import { GlobeAltIcon, PlayCircleIcon, CameraIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: "Enlaces | Se.Sec.Pro",
  description: "Acceso rápido a todos nuestros enlaces de interés."
};

const links = [
  {
    href: "https://sesecpro.es",
    label: "Web",
    icon: <GlobeAltIcon className="w-8 h-8 text-cyan-600" />
  },
  {
    href: "https://youtube.com/@sesecpro",
    label: "YouTube",
    icon: <PlayCircleIcon className="w-8 h-8 text-red-600" />
  },
  {
    href: "https://instagram.com/sesecpro",
    label: "Instagram",
    icon: <CameraIcon className="w-8 h-8 text-pink-500" />
  }
] as const;

export default function EnlacesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <Image src="/logo.svg" alt="Se.Sec.Pro" width={96} height={96} className="mb-4" />
      <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500 drop-shadow-lg text-center">
        Nuestros Enlaces
      </h1>
      <p className="text-base md:text-lg text-gray-600 text-center max-w-md">
        Recursos y canales para mantener tu mundo digital protegido.
      </p>
      <section className="w-full max-w-md flex flex-col gap-5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full bg-white/90 border border-cyan-200 shadow-lg rounded-xl px-6 py-4 hover:bg-cyan-50 transition-colors group"
          >
            <span className="shrink-0 group-hover:scale-110 transition-transform">
              {link.icon}
            </span>
            <span className="flex-1 text-lg font-semibold text-gray-800 group-hover:text-cyan-600">
              {link.label}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-400 group-hover:text-cyan-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L6.75 17.25M6.75 6.75h10.5v10.5"
              />
            </svg>
          </Link>
        ))}
      </section>
      <ShareButton />
    </main>
  );
}
