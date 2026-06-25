"use client"

import { useState } from "react"

type QuestionType = "series" | "analogy" | "coding" | "logic"

interface Question {
  id: number
  type: QuestionType
  text: string
  options: string[]
  letters: string[]
}

const questions: Question[] = [
  { id: 25, type: "series",  text: "123 — 234 — 345 — ___", options: ["567","354","465","456"], letters: ["A","B","C","D"] },
  { id: 26, type: "analogy", text: "duro — rudo;  rabos — ___", options: ["colar","parar","sobar","durar"], letters: ["A","B","C","D"] },
  { id: 27, type: "series",  text: "A — B — D — G — K — ___ — ___", options: ["O — U","P — V","P — U","R — W"], letters: ["A","B","C","D"] },
  { id: 28, type: "analogy", text: "VINO es a VIÑA como VIRUTA es a ___", options: ["SIERRA","GARLOPA","ARPITERO","MADERA"], letters: ["A","B","C","D"] },
  { id: 29, type: "coding",  text: "lenguado — 1235678;  752163 — ___", options: ["duelo","legado","dogal","duelan"], letters: ["A","B","C","D"] },
  { id: 30, type: "series",  text: "13542 — 24653 — 35764 — ___", options: ["48576","46875","57864","47588"], letters: ["A","B","C","D"] },
  { id: 31, type: "series",  text: "a — m — c — o — r — q — g — ___", options: ["s — e","i — l","s — l","h — u"], letters: ["A","B","C","D"] },
  { id: 32, type: "analogy", text: "POCO es a MUCHO como BREVE es a ___", options: ["ALTO","CORTO","EXTENSO","GRANDE"], letters: ["A","B","C","D"] },
  { id: 33, type: "coding",  text: "cicuta — cita;  radioyente — trae;  ascensor — ___", options: ["cosa","seno","casa","raso"], letters: ["A","B","C","D"] },
  { id: 34, type: "series",  text: "BACAB — FEGEF — JIKIJ — ___", options: ["NMOMM","MONOM","ONPNO","NOMON"], letters: ["A","B","C","D"] },
  { id: 35, type: "logic",   text: "Una ilusionista saca de una caja cuatro cajitas: una blanca, una azul, una verde, una anaranjada; de la blanca, saca tres nuevas cajas; de la azul, cuatro cajas; de la verde, una paloma; de la anaranjada, un pañuelo rojo. ¿Cuántas cajas usa en total?", options: ["11","12","14","9"], letters: ["A","B","C","D"] },
  { id: 36, type: "coding",  text: "8 — negligir;  7 — notario;  4 — azul;  ___ — negligente", options: ["3","11","19","10"], letters: ["A","B","C","D"] },
  { id: 37, type: "series",  text: "d — c — b — e — d — c — f — e — ___ — ___", options: ["f — h","g — k","d — h","d — g"], letters: ["A","B","C","D"] },
  { id: 38, type: "analogy", text: "OJO es a VISTA como OREJA es a ___", options: ["SONIDO","OIDO","AUDICION","SERENATA"], letters: ["A","B","C","D"] },
  { id: 39, type: "series",  text: "limitado — reducido — lacónico — resumido — ___", options: ["acortado","disminuido","restringido","aminorado"], letters: ["A","B","C","D"] },
  { id: 40, type: "series",  text: "103, 102, 109, 104, 101, 106, 105, 108, 100 — ___", options: ["106","110","107","111"], letters: ["A","B","C","D"] },
  { id: 41, type: "series",  text: "JLK — NPO — RTS — ___", options: ["VXW","UWV","VWX","XVW"], letters: ["A","B","C","D"] },
  { id: 42, type: "analogy", text: "PEZ es a MAR como TOPO es a ___", options: ["PRADO","AIRE","HIERRA","TIERRA"], letters: ["A","B","C","D"] },
  { id: 43, type: "coding",  text: "química — máquina;  nimedgo — ___", options: ["ODIEN","MENDIGO","DIMERA","GOMIFERO"], letters: ["A","B","C","D"] },
  { id: 44, type: "coding",  text: "312 — BAC;  571 — ___", options: ["ERE","AGE","LAC","AIR"], letters: ["A","B","C","D"] },
  { id: 45, type: "logic",   text: "Si un paracaídas de 1 metro de diámetro puede sostener una carga de 5 kilogramos, un paracaídas de 3 metros de diámetro puede sostener:", options: ["15 kilogramos","30 kilogramos","45 kilogramos","60 kilogramos"], letters: ["A","B","C","D"] },
  { id: 46, type: "series",  text: "91 — 73 — 55 — ___", options: ["28","64","37","46"], letters: ["A","B","C","D"] },
  { id: 47, type: "coding",  text: "P2S1 — SP;  S31E5N2E4 — ___", options: ["INEES","INSEE","ENSIE","USINE"], letters: ["A","B","C","D"] },
  { id: 48, type: "analogy", text: "HOY es a AYER como CRUCERO es a ___", options: ["BALSA","ACORAZADO","VELERO","BUQUE DE CARGA"], letters: ["A","B","C","D"] },
  { id: 49, type: "coding",  text: "bol — óbolo;  ion — ilusionista;  su — ___", options: ["presumir","usurpar","sumar","usurero"], letters: ["A","B","C","D"] },
  { id: 50, type: "series",  text: "I — 1;  XIV — 5;  XII — 4;  VI — ___", options: ["6","8","3","2"], letters: ["A","B","C","D"] },
  { id: 51, type: "series",  text: "ABC, KOT, AJT — ___", options: ["POK","ABT","CQJ","OQP"], letters: ["A","B","C","D"] },
  { id: 52, type: "analogy", text: "MINISTRO es a GOBIERNO como LADO es a ___", options: ["RECTA","HEXAGONO","CIRCULO","PARABOLA"], letters: ["A","B","C","D"] },
  { id: 53, type: "coding",  text: "valla — 122;  serenas — 22111;  codiciada — ___", options: ["11222","22211","21222","22122"], letters: ["A","B","C","D"] },
  { id: 54, type: "series",  text: "10 — diezmar;  100 — ciencia;  1000 — ___", options: ["mímica","milagro","migaja","migración"], letters: ["A","B","C","D"] },
  { id: 55, type: "logic",   text: "Pedro posee ciento noventa y dos bolas; da la mitad a Santiago; de las que quedan da la tercera parte a Francisco; después da la cuarta parte de las que le quedan a Juan y finalmente de las que le quedan da las tres cuartas partes a Marcos. ¿Cuántas bolas le quedan?", options: ["12","2","36","6"], letters: ["A","B","C","D"] },
]

const typeLabels: Record<QuestionType, string> = {
  series: "Serie",
  analogy: "Analogía",
  coding: "Cifrado",
  logic: "Razonamiento",
}

const correctAnswers: Record<number, string> = {
  25: "D", 26: "C", 27: "B", 28: "D", 29: "D",
  30: "B", 31: "A", 32: "C", 33: "D", 34: "D",
  35: "B", 36: "D", 37: "D", 38: "B", 39: "A",
  40: "C", 41: "A", 42: "D", 43: "B", 44: "B",
  45: "C", 46: "C", 47: "B", 48: "C", 49: "B",
  50: "D", 51: "A", 52: "B", 53: "C", 54: "B",
  55: "A",
}

export default function TestRazonamientoFormaB() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)

  const handleSelect = (qId: number, letter: string) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: letter }))
  }

  const handleSubmit = () => {
    const unanswered = questions.filter((q) => !answers[q.id])
    if (unanswered.length > 0) {
      const idx = questions.findIndex((q) => q.id === unanswered[0].id)
      setCurrent(idx)
      alert(`Aún tienes ${unanswered.length} pregunta(s) sin responder. Te llevamos a la primera.`)
      return
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

  const score = submitted
    ? questions.filter((q) => answers[q.id] === correctAnswers[q.id]).length
    : 0

  const pct = submitted ? Math.round((score / total) * 100) : 0

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 780, margin: "0 auto", padding: "24px 16px", color: "#1a1a2e" }}>

      {/* Header */}
      <div style={{ textAlign: "center", borderBottom: "3px solid #2d4a8a", paddingBottom: 18, marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#2d4a8a", textTransform: "uppercase", marginBottom: 4 }}>Test Psicotécnico</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "4px 0", color: "#1a1a2e" }}>RAZONAMIENTO</h1>
        <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>Forma B — {total} ejercicios — 12 minutos</div>
      </div>

      {/* Instrucciones */}
      {!submitted && (
        <div style={{ background: "#f0f4ff", border: "1px solid #c5d3f0", borderRadius: 8, padding: "14px 18px", marginBottom: 28, fontSize: 13, color: "#2d4a8a", lineHeight: 1.6 }}>
          <strong>Instrucciones:</strong> Cada ejercicio tiene una serie incompleta y cuatro opciones (A, B, C, D). Selecciona la opción que completa lógicamente la serie. Solo hay una respuesta correcta por ejercicio.
        </div>
      )}

      {/* Resultado global tras enviar */}
      {submitted && (
        <div style={{
          background: pct >= 70 ? "#f0fff4" : pct >= 50 ? "#fffbeb" : "#fff5f5",
          border: `2px solid ${pct >= 70 ? "#38a169" : pct >= 50 ? "#d97706" : "#e53e3e"}`,
          borderRadius: 12, padding: "22px 24px", marginBottom: 28, textAlign: "center"
        }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: pct >= 70 ? "#38a169" : pct >= 50 ? "#d97706" : "#e53e3e" }}>
            {score} / {total}
          </div>
          <div style={{ fontSize: 15, color: "#444", marginTop: 4 }}>
            {pct}% de respuestas correctas
          </div>
          <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
            {pct >= 70 ? "¡Buen resultado!" : pct >= 50 ? "Resultado aceptable, sigue practicando." : "Necesitas más práctica."}
          </div>
          <button
            onClick={handleReset}
            style={{ marginTop: 16, padding: "9px 24px", borderRadius: 7, border: "2px solid #2d4a8a", background: "#fff", color: "#2d4a8a", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            Reiniciar prueba
          </button>
        </div>
      )}

      {/* Barra de progreso (solo antes de enviar) */}
      {!submitted && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginBottom: 6 }}>
            <span>Progreso</span>
            <span>{answered} / {total} respondidas</span>
          </div>
          <div style={{ background: "#e0e7ff", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, background: "#2d4a8a", height: "100%", borderRadius: 99, transition: "width 0.3s" }} />
          </div>
        </div>
      )}

      {/* Navegación rápida */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
        {questions.map((q, i) => {
          const isCorrect = submitted && answers[q.id] === correctAnswers[q.id]
          const isWrong   = submitted && answers[q.id] !== correctAnswers[q.id]
          return (
            <button
              key={q.id}
              onClick={() => setCurrent(i)}
              style={{
                width: 34, height: 34, borderRadius: 6, border: "1.5px solid",
                borderColor: current === i ? "#2d4a8a" : isCorrect ? "#38a169" : isWrong ? "#e53e3e" : answers[q.id] ? "#2d4a8a" : "#ccc",
                background: current === i ? "#2d4a8a" : isCorrect ? "#f0fff4" : isWrong ? "#fff5f5" : answers[q.id] ? "#e0e7ff" : "#fff",
                color: current === i ? "#fff" : isCorrect ? "#38a169" : isWrong ? "#e53e3e" : answers[q.id] ? "#2d4a8a" : "#888",
                fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {q.id}
            </button>
          )
        })}
      </div>

      {/* Pregunta actual */}
      {(() => {
        const q = questions[current]
        return (
          <div style={{ background: "#fff", border: "1.5px solid #dde3f5", borderRadius: 12, padding: "24px 24px 20px", marginBottom: 24, boxShadow: "0 2px 12px rgba(45,74,138,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ background: "#2d4a8a", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{q.id}</span>
              <span style={{ fontSize: 11, color: "#888", background: "#f3f4f6", borderRadius: 4, padding: "2px 8px" }}>{typeLabels[q.type]}</span>
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

            <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20, lineHeight: 1.6, color: "#1a1a2e" }}>{q.text}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((opt, i) => {
                const letter = q.letters[i]
                const selected  = answers[q.id] === letter
                const isCorrect = correctAnswers[q.id] === letter
                const isWrong   = submitted && selected && !isCorrect

                let bg = "#fafbff"
                let borderColor = "#e0e4ef"
                let circleColor = "#e8eaf0"
                let circleText  = "#555"
                let textColor   = "#1a1a2e"

                if (submitted) {
                  if (isCorrect) {
                    bg = "#f0fff4"; borderColor = "#38a169"
                    circleColor = "#38a169"; circleText = "#fff"; textColor = "#276749"
                  } else if (isWrong) {
                    bg = "#fff5f5"; borderColor = "#e53e3e"
                    circleColor = "#e53e3e"; circleText = "#fff"; textColor = "#9b2c2c"
                  }
                } else if (selected) {
                  bg = "#e8eeff"; borderColor = "#2d4a8a"
                  circleColor = "#2d4a8a"; circleText = "#fff"
                }

                return (
                  <button
                    key={letter}
                    onClick={() => handleSelect(q.id, letter)}
                    disabled={submitted}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "11px 16px", borderRadius: 8,
                      border: `${submitted && isCorrect ? "2px" : selected ? "2px" : "1.5px"} solid ${borderColor}`,
                      background: bg, cursor: submitted ? "default" : "pointer",
                      textAlign: "left", transition: "all 0.15s",
                      fontSize: 14, color: textColor,
                    }}
                  >
                    <span style={{
                      width: 26, height: 26, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 13, flexShrink: 0,
                      background: circleColor, color: circleText,
                    }}>
                      {letter}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {submitted && isCorrect && <span style={{ fontSize: 16 }}>✓</span>}
                    {submitted && isWrong  && <span style={{ fontSize: 16 }}>✗</span>}
                  </button>
                )
              })}
            </div>

            {/* Respuesta correcta si falló */}
            {submitted && answers[q.id] !== correctAnswers[q.id] && (
              <div style={{ marginTop: 14, padding: "10px 14px", background: "#f0fff4", border: "1px solid #38a169", borderRadius: 8, fontSize: 13, color: "#276749" }}>
                <strong>Respuesta correcta:</strong> {correctAnswers[q.id]} — {q.options[q.letters.indexOf(correctAnswers[q.id])]}
              </div>
            )}
          </div>
        )
      })()}

      {/* Navegación entre preguntas */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{ padding: "9px 20px", borderRadius: 7, border: "1.5px solid #ccd", background: "#fff", cursor: current === 0 ? "not-allowed" : "pointer", color: "#555", fontSize: 13 }}
        >
          ← Anterior
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
          disabled={current === total - 1}
          style={{ padding: "9px 20px", borderRadius: 7, border: "1.5px solid #ccd", background: "#fff", cursor: current === total - 1 ? "not-allowed" : "pointer", color: "#555", fontSize: 13 }}
        >
          Siguiente →
        </button>
      </div>

      {/* Botón enviar */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          style={{
            width: "100%", padding: "14px", borderRadius: 9, border: "none",
            background: answered === total ? "#2d4a8a" : "#a0aec0",
            color: "#fff", fontSize: 16, fontWeight: 700,
            cursor: answered === total ? "pointer" : "not-allowed",
            letterSpacing: 0.5, transition: "background 0.2s",
          }}
        >
          {answered === total ? "Enviar y ver resultados" : `Faltan ${total - answered} respuestas`}
        </button>
      )}
    </div>
  )
}
