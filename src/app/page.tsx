import Link from "next/link";

export default function Home() {
  return (
    <main className="container pt-6">
      <h1 className="font-bold text-3xl">Selecciona uno de los ejemplos</h1>

      <nav className="flex flex-col mt-6 space-y-4">
        <Link className="hover:underline hover:text-primary" href="/chat">
          Asistente de estudiante
        </Link>
        <Link
          className="hover:underline hover:text-primary"
          href="/auto-blocks"
        >
          Generador de temarios
        </Link>
      </nav>
    </main>
  );
}
