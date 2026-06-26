"use client"

import { useState } from "react"

interface Question {
  id: number
  text: string
  options: string[]
  letters: string[]
}

const questions: Question[] = [
  { id: 3,  text: "1 - 3 - 5 - 7 - ___ - 11 - 13", options: ["8","9","10","11"], letters: ["A","B","C","D"] },
  { id: 4,  text: "33 - 34 - 31 - 32 - ___ - 34 - 31 - 32", options: ["31","32","33","34"], letters: ["A","B","C","D"] },
  { id: 5,  text: "5 - 6 - 8 - 11 - ___ - 20 - 26", options: ["13","15","17","19"], letters: ["A","B","C","D"] },
  { id: 6,  text: "25 - 23 - 21 - 20 - 25 - ___ - 21", options: ["20","25","21","23"], letters: ["A","B","C","D"] },
  { id: 7,  text: "1 - 6 - 2 - 7 - 4 - 9 - 7 - ___ - 11", options: ["10","11","12","13"], letters: ["A","B","C","D"] },
  { id: 8,  text: "21 - ___ - 15 - 12 - 9 - 8", options: ["20","19","18","17"], letters: ["A","B","C","D"] },
  { id: 9,  text: "18 - 16 - ___ - 17 - 15 - 15 - 16 - 14", options: ["13","14","15","16"], letters: ["A","B","C","D"] },
  { id: 10, text: "6 - 3 - 5 - 7 - 4 - ___ - 8 - 5 - 7 - 9", options: ["6","5","7","11"], letters: ["A","B","C","D"] },
  { id: 11, text: "1 - 9 - 25 - ___ - 81 - 121", options: ["36","49","64","15"], letters: ["A","B","C","D"] },
  { id: 12, text: "1 - 3 - 3 - 2 - ___ - 8 - 3 - 5 - 15", options: ["3","4","5","6"], letters: ["A","B","C","D"] },
  { id: 13, text: "22 - 17 - 12 - 27 - 23 - ___ - 32 - 29", options: ["7","22","19","18"], letters: ["A","B","C","D"] },
  { id: 14, text: "3 - 4 - 7 - 14 - 7 - 8 - ___ - 30 - 11", options: ["13","14","15","16"], letters: ["A","B","C","D"] },
  { id: 15, text: "45 - 34 - 25 - ___ - 13 - 10 - 9", options: ["20","19","17","18"], letters: ["A","B","C","D"] },
  { id: 16, text: "5 - 3 - 15 - 16 - 7 - 5 - 35 - 36 - ___", options: ["6","9","8","34"], letters: ["A","B","C","D"] },
  { id: 17, text: "___ - 21 - 28 - 74 - 81 - 243", options: ["3","9","6","7"], letters: ["A","B","C","D"] },
  { id: 18, text: "___ - 18 - 9 - 54 - 45 - 270 - 261", options: ["9","18","3","6"], letters: ["A","B","C","D"] },
  { id: 19, text: "13 - 12 - 60 - ___ - 62 - 310 - 313", options: ["61","63","59","300"], letters: ["A","B","C","D"] },
  { id: 20, text: "27 - 9 - 54 - 63 - ___ - 126 - 135 - 45", options: ["21","72","378","19"], letters: ["A","B","C","D"] },
  { id: 21, text: "7 - 16 - 5 - 35 - ___ - 33 - 231 - 240", options: ["245","49","64","22"], letters: ["A","B","C","D"] },
  { id: 22, text: "___ - 11 - 8 - 72 - 65 - 62 - 558 - 551", options: ["9","14","25","18"], letters: ["A","B","C","D"] },
]

const correctAnswers: Record<number, string> = {
  3:  "B", 4:  "A", 5:  "B", 6:  "D", 7:  "C",
  8:  "C", 9:  "C", 10: "A", 11: "B", 12: "B",
  13: "C", 14: "C", 15: "D", 16: "B", 17: "A",
  18: "C", 19: "B", 20: "B", 21: "A", 22: "B",
}

export default function TestRazonamientoFormaA() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)

  const handleSelect = (qId: number, letter: string) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: letter }))
  }

  const handleSubmit = async () => {
    const unanswered = questions.filter((q) => !answers[q.id])
    if (unanswered.length > 0) {
      const idx = questions.findIndex((q) => q.id === unanswered[0].id)
      setCurrent(idx)
      alert(`Aún tienes ${unanswered.length} pregunta(s) sin responder. Te llevamos a la primera.`)
      return
    }

    const score = questions.filter((q) => answers[q.id] === correctAnswers[q.id]).length
    const total = questions.length
    const porcentaje = Math.round((score / total) * 100)

    const detalles = questions.map((q) => ({
      preguntaId: q.id,
      respuestaDada: answers[q.id],
      respuestaCorrecta: correctAnswers[q.id],
      esCorrecta: answers[q.id] === correctAnswers[q.id],
    }))

    try {
      await fetch("/api/guardar-resultado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testNombre: "Razonamiento Forma A", puntaje: score, total, porcentaje, detalles }),
      })
    } catch (e) {
      console.error("Error al guardar resultado:", e)
    }

    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setCurrent(0)
  }

  const answered = Object.keys(answers).length
  const total = questions.length
  const progress = Math.round((answered / total) * 100)
  const score = submitted ? questions.filter((q) => answers[q.id] === correctAnswers[q.id]).length : 0
  const pct = submitted ? Math.round((score / total) * 100) : 0

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 780, margin: "0 auto", padding: "24px 16px", color: "#1a1a2e" }}>

      {/* Header */}
      <div style={{ textAlign: "center", borderBottom: "3px solid #1a6b3c", paddingBottom: 18, marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#1a6b3c", textTransform: "uppercase", marginBottom: 4 }}>Test Psicotécnico</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "4px 0", color: "#1a1a2e" }}>RAZONAMIENTO</h1>
        <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>Forma A — {total} ejercicios — 10 minutos</div>
      </div>

      {/* Instrucciones */}
      {!submitted && (
        <div style={{ background: "#f0fff4", border: "1px solid #9ae6b4", borderRadius: 8, padding: "14px 18px", marginBottom: 28, fontSize: 13, color: "#276749", lineHeight: 1.6 }}>
          <strong>Instrucciones:</strong> Cada ejercicio presenta una serie numérica incompleta con cuatro opciones (A, B, C, D). Selecciona el número que completa lógicamente la serie. Solo hay una respuesta correcta por ejercicio.
        </div>
      )}

      {/* Resultado global */}
      {submitted && (
        <div style={{
          background: pct >= 70 ? "#f0fff4" : pct >= 50 ? "#fffbeb" : "#fff5f5",
          border: `2px solid ${pct >= 70 ? "#38a169" : pct >= 50 ? "#d97706" : "#e53e3e"}`,
          borderRadius: 12, padding: "22px 24px", marginBottom: 28, textAlign: "center"
        }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: pct >= 70 ? "#38a169" : pct >= 50 ? "#d97706" : "#e53e3e" }}>
            {score} / {total}
          </div>
          <div style={{ fontSize: 15, color: "#444", marginTop: 4 }}>{pct}% de respuestas correctas</div>
          <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
            {pct >= 70 ? "¡Buen resultado!" : pct >= 50 ? "Resultado aceptable, sigue practicando." : "Necesitas más práctica."}
          </div>
          <button onClick={handleReset} style={{ marginTop: 16, padding: "9px 24px", borderRadius: 7, border: "2px solid #1a6b3c", background: "#fff", color: "#1a6b3c", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Reiniciar prueba
          </button>
        </div>
      )}

      {/* Barra de progreso */}
      {!submitted && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginBottom: 6 }}>
            <span>Progreso</span>
            <span>{answered} / {total} respondidas</span>
          </div>
          <div style={{ background: "#c6f6d5", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, background: "#1a6b3c", height: "100%", borderRadius: 99, transition: "width 0.3s" }} />
          </div>
        </div>
      )}

      {/* Navegación rápida */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
        {questions.map((q, i) => {
          const isCorrect = submitted && answers[q.id] === correctAnswers[q.id]
          const isWrong   = submitted && answers[q.id] !== correctAnswers[q.id]
          return (
            <button key={q.id} onClick={() => setCurrent(i)} style={{
              width: 34, height: 34, borderRadius: 6, border: "1.5px solid",
              borderColor: current === i ? "#1a6b3c" : isCorrect ? "#38a169" : isWrong ? "#e53e3e" : answers[q.id] ? "#1a6b3c" : "#ccc",
              background: current === i ? "#1a6b3c" : isCorrect ? "#f0fff4" : isWrong ? "#fff5f5" : answers[q.id] ? "#c6f6d5" : "#fff",
              color: current === i ? "#fff" : isCorrect ? "#38a169" : isWrong ? "#e53e3e" : answers[q.id] ? "#1a6b3c" : "#888",
              fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
            }}>
              {q.id}
            </button>
          )
        })}
      </div>

      {/* Pregunta actual */}
      {(() => {
        const q = questions[current]
        return (
          <div style={{ background: "#fff", border: "1.5px solid #c6f6d5", borderRadius: 12, padding: "24px 24px 20px", marginBottom: 24, boxShadow: "0 2px 12px rgba(26,107,60,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ background: "#1a6b3c", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{q.id}</span>
              <span style={{ fontSize: 11, color: "#888", background: "#f3f4f6", borderRadius: 4, padding: "2px 8px" }}>Serie numérica</span>
              {submitted && (
                <span style={{
                  fontSize: 11, fontWeight: 700, borderRadius: 4, padding: "2px 10px",
                  background: answers[q.id] === correctAnswers[q.id] ? "#f0fff4" : "#fff5f5",
                  color: answers[q.id] === correctAnswers[q.id] ? "#38a169" : "#e53e3e",
                  border: `1px solid ${answers[q.id] === correctAnswers[q.id] ? "#38a169" : "#e53e3e"}`,
                }}>
                  {answers[q.id] === correctAnswers[q.id] ? "✓ Correcta" : "✗ Incorrecta"}
                </span>
              )}
            </div>

            <p style={{ fontSize: 17, fontWeight: 600, marginBottom: 20, lineHeight: 1.6, color: "#1a1a2e", fontVariantNumeric: "tabular-nums", letterSpacing: 0.3 }}>
              {q.text}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {q.options.map((opt, i) => {
                const letter = q.letters[i]
                const selected  = answers[q.id] === letter
                const isCorrect = correctAnswers[q.id] === letter
                const isWrong   = submitted && selected && !isCorrect

                let bg = "#fafbff", borderColor = "#e0e4ef", circleColor = "#e8eaf0", circleText = "#555", textColor = "#1a1a2e"
                if (submitted) {
                  if (isCorrect) { bg="#f0fff4"; borderColor="#38a169"; circleColor="#38a169"; circleText="#fff"; textColor="#276749" }
                  else if (isWrong) { bg="#fff5f5"; borderColor="#e53e3e"; circleColor="#e53e3e"; circleText="#fff"; textColor="#9b2c2c" }
                } else if (selected) {
                  bg="#e6fff0"; borderColor="#1a6b3c"; circleColor="#1a6b3c"; circleText="#fff"
                }

                return (
                  <button key={letter} onClick={() => handleSelect(q.id, letter)} disabled={submitted} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", borderRadius: 8,
                    border: `${submitted && isCorrect || selected ? "2px" : "1.5px"} solid ${borderColor}`,
                    background: bg, cursor: submitted ? "default" : "pointer",
                    textAlign: "left", transition: "all 0.15s", fontSize: 16, fontWeight: 600, color: textColor,
                  }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0, background: circleColor, color: circleText }}>
                      {letter}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {submitted && isCorrect && <span>✓</span>}
                    {submitted && isWrong  && <span>✗</span>}
                  </button>
                )
              })}
            </div>

            {submitted && answers[q.id] !== correctAnswers[q.id] && (
              <div style={{ marginTop: 14, padding: "10px 14px", background: "#f0fff4", border: "1px solid #38a169", borderRadius: 8, fontSize: 13, color: "#276749" }}>
                <strong>Respuesta correcta:</strong> {correctAnswers[q.id]} — {q.options[q.letters.indexOf(correctAnswers[q.id])]}
              </div>
            )}
          </div>
        )
      })()}

      {/* Navegación */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
          style={{ padding: "9px 20px", borderRadius: 7, border: "1.5px solid #ccd", background: "#fff", cursor: current === 0 ? "not-allowed" : "pointer", color: "#555", fontSize: 13 }}>
          ← Anterior
        </button>
        <button onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))} disabled={current === total - 1}
          style={{ padding: "9px 20px", borderRadius: 7, border: "1.5px solid #ccd", background: "#fff", cursor: current === total - 1 ? "not-allowed" : "pointer", color: "#555", fontSize: 13 }}>
          Siguiente →
        </button>
      </div>

      {/* Botón enviar */}
      {!submitted && (
        <button onClick={handleSubmit} style={{
          width: "100%", padding: "14px", borderRadius: 9, border: "none",
          background: answered === total ? "#1a6b3c" : "#a0aec0",
          color: "#fff", fontSize: 16, fontWeight: 700,
          cursor: answered === total ? "pointer" : "not-allowed",
          letterSpacing: 0.5, transition: "background 0.2s",
        }}>
          {answered === total ? "Enviar y ver resultados" : `Faltan ${total - answered} respuestas`}
        </button>
      )}
    </div>
  )
}
