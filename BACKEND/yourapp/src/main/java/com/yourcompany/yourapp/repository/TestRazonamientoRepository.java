package com.yourcompany.yourapp.repository;

import com.yourcompany.yourapp.model.TestRazonamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRazonamientoRepository extends JpaRepository<TestRazonamiento, Long> {
}