"use client";

import { useState } from "react";
 const preguntas = [
  {
    numero: 3,
    serie: "1 - 3 - 5 - 7 - ☐ - 11 - 13",
    opciones: [8, 9, 10, 11],
    correcta: 9,
  },
  {
    numero: 4,
    serie: "33 - 34 - 31 - 32 - ☐ - 34 - 31 - 32",
    opciones: [31, 32, 33, 34],
    correcta: 33,
  },
  {
    numero: 5,
    serie: "5 - 6 - 8 - 11 - ☐ - 20 - 26",
    opciones: [13, 15, 17, 19],
    correcta: 15,
  },
  {
    numero: 6,
    serie: "25 - 23 - 21 - 20 - 25 - ☐ - 21",
    opciones: [20, 25, 21, 23],
    correcta: 23,
  },
  {
    numero: 7,
    serie: "1 - 6 - 2 - 7 - 4 - 9 - 7 - ☐ - 11",
    opciones: [10, 11, 12, 13],
    correcta: 12,
  },
  {
    numero: 8,
    serie: "21 - ☐ - 15 - 12 - 9 - 8",
    opciones: [20, 19, 18, 17],
    correcta: 18,
  },
  {
    numero: 9,
    serie: "18 - 16 - ☐ - 17 - 15 - 15 - 16 - 14",
    opciones: [13, 14, 15, 16],
    correcta: 16,
  },
  {
    numero: 10,
    serie: "6 - 3 - 5 - 7 - 4 - ☐ - 8 - 5 - 7 - 9",
    opciones: [6, 5, 7, 11],
    correcta: 6,
  },
  {
    numero: 11,
    serie: "1 - 9 - 25 - ☐ - 81 - 121",
    opciones: [36, 49, 64, 15],
    correcta: 49,
  },
  {
    numero: 12,
    serie: "1 - 3 - 3 - 2 - ☐ - 8 - 3 - 5 - 15",
    opciones: [3, 4, 5, 6],
    correcta: 4,
  },
  {
    numero: 13,
    serie: "22 - 17 - 12 - 27 - 23 - ☐ - 32 - 29",
    opciones: [7, 22, 19, 18],
    correcta: 18,
  },
  {
    numero: 14,
    serie: "3 - 4 - 7 - 14 - 7 - 8 - ☐ - 30 - 11",
    opciones: [13, 14, 15, 16],
    correcta: 15,
  },
  {
    numero: 15,
    serie: "45 - 34 - 25 - ☐ - 13 - 10 - 9",
    opciones: [20, 19, 17, 18],
    correcta: 18,
  },
  {
    numero: 16,
    serie: "5 - 3 - 15 - 16 - 7 - 5 - 35 - 36 - ☐",
    opciones: [6, 9, 8, 34],
    correcta: 9,
  },
  {
    numero: 17,
    serie: "☐ - 21 - 28 - 74 - 81 - 243",
    opciones: [3, 9, 6, 7],
    correcta: 7,
  },
  {
    numero: 18,
    serie: "☐ - 18 - 9 - 54 - 45 - 270 - 261",
    opciones: [9, 18, 3, 6],
    correcta: 6,
  },
  {
    numero: 19,
    serie: "13 - 12 - 60 - ☐ - 62 - 310 - 313",
    opciones: [61, 63, 59, 300],
    correcta: 61,
  },
  {
    numero: 20,
    serie: "27 - 9 - 54 - 63 - ☐ - 126 - 135 - 45",
    opciones: [21, 72, 378, 19],
    correcta: 21,
  },
  {
    numero: 21,
    serie: "7 - 16 - 5 - 35 - ☐ - 33 - 231 - 240",
    opciones: [245, 49, 64, 22],
    correcta: 22,
  },
  {
    numero: 22,
    serie: "☐ - 11 - 8 - 72 - 65 - 62 - 558 - 551",
    opciones: [9, 14, 25, 18],
    correcta: 14,
  },
];
const letras = ["A", "B", "C", "D"];

// PEGA AQUÍ TU const preguntas = [...]

export default function Index() {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [finalizado, setFinalizado] = useState(false);

  const seleccionarRespuesta = (
    numero: number,
    opcion: number
  ) => {
    setRespuestas((prev) => ({
      ...prev,
      [numero]: opcion,
    }));
  };

  const puntaje = preguntas.filter(
    (pregunta) =>
      respuestas[pregunta.numero] === pregunta.correcta
  ).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-6 relative overflow-hidden">

      {/* Fondo */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500 blur-3xl opacity-40"></div>

          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center">
            <h1 className="text-6xl font-extrabold text-white mb-4">
              🧠 Test de Razonamiento
            </h1>

            <p className="text-slate-300 text-lg">
              Responde todos los ejercicios y descubre tu puntuación.
            </p>
          </div>
        </div>

        {/* Progreso */}
        <div className="mb-10">
          <div className="flex justify-between text-slate-300 mb-2">
            <span>Respondidas</span>
            <span>
              {Object.keys(respuestas).length} / {preguntas.length}
            </span>
          </div>

          <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
              style={{
                width: `${(Object.keys(respuestas).length / preguntas.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Preguntas */}
        <div className="space-y-8">
          {preguntas.map((pregunta) => (
            <div
              key={pregunta.numero}
              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-3xl
                shadow-2xl
                p-8
                text-white
              "
            >
              <h2 className="text-2xl font-bold mb-6">
                Ejercicio {pregunta.numero}
              </h2>

              <p className="text-3xl font-mono text-center mb-8">
                {pregunta.serie}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {pregunta.opciones.map((opcion, index) => (
                  <button
                    key={opcion}
                    onClick={() =>
                      seleccionarRespuesta(
                        pregunta.numero,
                        opcion
                      )
                    }
                    className={`
                      p-4
                      rounded-xl
                      font-bold
                      transition-all
                      duration-300
                      ${
                        respuestas[pregunta.numero] === opcion
                          ? "bg-yellow-500 scale-105 ring-4 ring-yellow-300 shadow-lg shadow-yellow-500/50"
                          : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105"
                      }
                    `}
                  >
                    {letras[index]}) {opcion}
                  </button>
                ))}
              </div>

              {finalizado && (
                <div className="mt-6 text-center">
                  {respuestas[pregunta.numero] === pregunta.correcta ? (
                    <span className="text-green-400 text-xl font-bold">
                      ✅ Correcto
                    </span>
                  ) : (
                    <span className="text-red-400 text-xl font-bold">
                      ❌ Incorrecto
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botón Finalizar */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setFinalizado(true)}
            className="
              bg-gradient-to-r
              from-green-500
              to-emerald-600
              px-10
              py-4
              rounded-2xl
              text-xl
              font-bold
              text-white
              hover:scale-105
              transition-all
            "
          >
            Finalizar examen
          </button>
        </div>

        {/* Resultado */}
        {finalizado && (
          <div className="mt-10 bg-white rounded-3xl p-8 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 text-black">
              🏆 Resultado Final
            </h2>

            <p className="text-5xl font-bold text-indigo-600">
              {puntaje} / {preguntas.length}
            </p>

            <p className="text-2xl text-gray-700 mt-4">
              {Math.round((puntaje / preguntas.length) * 100)}%
            </p>
          </div>
        )}

      </div>
    </main>
  );
}