package com.yourcompany.yourapp.controller;

import com.yourcompany.yourapp.model.TestRazonamiento;
import com.yourcompany.yourapp.repository.TestRazonamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/test-razonamiento")
@CrossOrigin(origins = "*")
public class TestRazonamientoController {

    @Autowired
    private TestRazonamientoRepository repository;

    @PostMapping
    public Map<String, Object> guardar(@RequestBody Map<String, Object> body) {
        TestRazonamiento t = new TestRazonamiento();
        t.setForma((String) body.get("forma"));
        t.setPuntaje((int) body.get("puntaje"));
        t.setTotal((int) body.get("total"));
        t.setCandidatoId(Long.valueOf(body.get("candidatoId").toString()));
        t.setRespuestas(body.get("respuestas").toString());
        t.setFecha(LocalDateTime.now());
        repository.save(t);
        return Map.of("ok", true);
    }
}