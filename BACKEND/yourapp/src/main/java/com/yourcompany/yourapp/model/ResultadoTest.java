package com.yourcompany.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.openxava.annotations.*;

@Entity
@Table(name = "resultado_test")
public class ResultadoTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "puntaje", nullable = false)
    private Integer puntaje;

    @Column(name = "total_preguntas", nullable = false)
    private Integer totalPreguntas;

    @Column(name = "porcentaje", precision = 5, scale = 2)
    private BigDecimal porcentaje;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getPuntaje() { return puntaje; }
    public void setPuntaje(Integer puntaje) { this.puntaje = puntaje; }

    public Integer getTotalPreguntas() { return totalPreguntas; }
    public void setTotalPreguntas(Integer totalPreguntas) { this.totalPreguntas = totalPreguntas; }

    public BigDecimal getPorcentaje() { return porcentaje; }
    public void setPorcentaje(BigDecimal porcentaje) { this.porcentaje = porcentaje; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}