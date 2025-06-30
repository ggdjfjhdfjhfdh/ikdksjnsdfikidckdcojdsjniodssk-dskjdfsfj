import Link from 'next/link';

export default function LegalIndexNew() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Índice Legal</h1>
      <ul>
        <li><Link href="/legal/privacy" className="text-blue-600 hover:underline">Política de Privacidad</Link></li>
        <li><Link href="/legal/terms" className="text-blue-600 hover:underline">Términos y Condiciones</Link></li>
        <li><Link href="/legal/cookies" className="text-blue-600 hover:underline">Política de Cookies</Link></li>
      </ul>
    </div>
  );
}
