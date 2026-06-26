package com.yourcompany.yourapp.servlet;

import javax.servlet.http.*;
import javax.servlet.*;
import javax.naming.*;
import javax.sql.DataSource;
import java.io.*;
import java.sql.*;
import org.json.*;

public class GuardarResultadoServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setContentType("application/json");

        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) sb.append(line);
        }

        try {
            JSONObject body = new JSONObject(sb.toString());
            String testNombre = body.getString("testNombre");
            int puntaje = body.getInt("puntaje");
            int total = body.getInt("total");
            double porcentaje = body.getDouble("porcentaje");
            JSONArray detalles = body.getJSONArray("detalles");

            Context ctx = new InitialContext();
            DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/yourappDS");

            try (Connection conn = ds.getConnection()) {
                PreparedStatement ps1 = conn.prepareStatement(
                    "INSERT INTO resultado_test (puntaje, total_preguntas, porcentaje) VALUES (?,?,?) RETURNING id"
                );
                ps1.setInt(1, puntaje);
                ps1.setInt(2, total);
                ps1.setDouble(3, porcentaje);
                ResultSet rs = ps1.executeQuery();
                rs.next();
                int resultadoId = rs.getInt(1);

                PreparedStatement ps2 = conn.prepareStatement(
                    "INSERT INTO respuesta_detalle (resultado_id, pregunta_id, respuesta_dada, respuesta_correcta, es_correcta) VALUES (?,?,?,?,?)"
                );
                for (int i = 0; i < detalles.length(); i++) {
                    JSONObject d = detalles.getJSONObject(i);
                    ps2.setInt(1, resultadoId);
                    ps2.setInt(2, d.getInt("preguntaId"));
                    ps2.setString(3, d.getString("respuestaDada"));
                    ps2.setString(4, d.getString("respuestaCorrecta"));
                    ps2.setBoolean(5, d.getBoolean("esCorrecta"));
                    ps2.addBatch();
                }
                ps2.executeBatch();
            }

            res.getWriter().write("{\"ok\": true}");

        } catch (Exception e) {
            res.setStatus(500);
            res.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse res) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setStatus(200);
    }
}