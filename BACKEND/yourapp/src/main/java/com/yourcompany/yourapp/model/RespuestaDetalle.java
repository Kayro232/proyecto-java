package com.yourcompany.model;

import javax.persistence.*;
import org.openxava.annotations.*;

@Entity
@Table(name = "respuesta_detalle")
public class RespuestaDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "resultado_id")
    private ResultadoTest resultado;

    @Column(name = "pregunta_id", nullable = false)
    private Integer preguntaId;

    @Column(name = "respuesta_dada", nullable = false, length = 5)
    private String respuestaDada;

    @Column(name = "respuesta_correcta", nullable = false, length = 5)
    private String respuestaCorrecta;

    @Column(name = "es_correcta", nullable = false)
    private Boolean esCorrecta;

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public ResultadoTest getResultado() { return resultado; }
    public void setResultado(ResultadoTest resultado) { this.resultado = resultado; }

    public Integer getPreguntaId() { return preguntaId; }
    public void setPreguntaId(Integer preguntaId) { this.preguntaId = preguntaId; }

    public String getRespuestaDada() { return respuestaDada; }
    public void setRespuestaDada(String respuestaDada) { this.respuestaDada = respuestaDada; }

    public String getRespuestaCorrecta() { return respuestaCorrecta; }
    public void setRespuestaCorrecta(String respuestaCorrecta) { this.respuestaCorrecta = respuestaCorrecta; }

    public Boolean getEsCorrecta() { return esCorrecta; }
    public void setEsCorrecta(Boolean esCorrecta) { this.esCorrecta = esCorrecta; }
}