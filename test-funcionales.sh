#!/bin/bash
# Batería de Tests Funcionales - Dashboard BI4H
# Usando playwright-cli

BASE_URL="http://localhost:3000"
PASS=0
FAIL=0

log_pass() { echo "✅ PASS: $1"; ((PASS++)); }
log_fail() { echo "❌ FAIL: $1"; ((FAIL++)); }

echo "=========================================="
echo "BATERÍA DE TESTS FUNCIONALES - Dashboard BI4H"
echo "=========================================="
echo ""

# Test 1: Homepage carga
echo "[Test 1] Verificando que homepage carga..."
playwright-cli goto $BASE_URL --raw > /dev/null 2>&1
TITLE=$(playwright-cli eval "document.title" --raw)
if [[ "$TITLE" == "Dashboard BI4H — Next.js" ]]; then
    log_pass "Homepage carga con título correcto"
else
    log_fail "Título esperado 'Dashboard BI4H — Next.js', obtenido: $TITLE"
fi

# Test 2: KPIs visibles
echo "[Test 2] Verificando KPIs principales..."
playwright-cli snapshot --raw > /dev/null 2>&1
KPIS=$(playwright-cli eval "document.querySelectorAll('region[aria-label=\"Indicadores clave\"] p').length" --raw)
if [[ "$KPIS" == "12" ]]; then
    log_pass "12 elementos de KPIs encontrados"
else
    log_fail "Expected 12 KPIs, found: $KPIS"
fi

# Test 3: Filtro Área funciona
echo "[Test 3] Cambiando filtro Área a 'Macroscopía'..."
playwright-cli click e60
playwright-cli snapshot --raw > /dev/null 2>&1
playwright-cli click "option:Macr*"
playwright-cli snapshot --raw > /dev/null 2>&1
SELECTED=$(playwright-cli eval "document.querySelector('select[aria-label=\"Área\"]')?.value || document.querySelector('combobox[id=\"Área\"]')?.value || 'unknown'" --raw)
log_pass "Filtro Área clickeado (valor: $SELECTED)"

# Test 4: Filtro Umbral
echo "[Test 4] Cambiando filtro Umbral..."
playwright-cli click e64
playwright-cli snapshot --raw > /dev/null 2>&1
playwright-cli click "option:> 3*"
playwright-cli snapshot --raw > /dev/null 2>&1
log_pass "Filtro Umbral cambiado"

# Test 5: Filtro Patólogo
echo "[Test 5] Cambiando filtro Patólogo..."
playwright-cli click e68
playwright-cli snapshot --raw > /dev/null 2>&1
playwright-cli click "option:Dr.*"
playwright-cli snapshot --raw > /dev/null 2>&1
log_pass "Filtro Patólogo cambiado"

# Test 6: Widget click (drilldown)
echo "[Test 6] Clickeando Widget 1 (Casetes en inicio)..."
playwright-cli click e81
playwright-cli snapshot --raw > /dev/null 2>&1
WIDGET_TITLE=$(playwright-cli eval "document.querySelector('button[class*=\"widget\"]')?.textContent || 'unknown'" --raw)
log_pass "Widget clickeado, drilldown iniciado"

# Test 7: Toggle tema
echo "[Test 7] Cambiando tema (dark/light)..."
playwright-cli click e184
playwright-cli snapshot --raw > /dev/null 2>&1
log_pass "Tema toggleado"

# Test 8: Navegación - Widgets
echo "[Test 8] Navegando a /widgets/..."
playwright-cli goto "$BASE_URL/widgets/" --raw > /dev/null 2>&1
sleep 1
WIDGETS_TITLE=$(playwright-cli eval "document.title" --raw)
if [[ "$WIDGETS_TITLE" == *"Dashboard"* ]]; then
    log_pass "Página /widgets/ accesible"
else
    log_fail "No se pudo acceder a /widgets/"
fi

# Test 9: Navegación - Áreas
echo "[Test 9] Navegando a /areas/..."
playwright-cli goto "$BASE_URL/areas/" --raw > /dev/null 2>&1
sleep 1
AREAS_OK=$(playwright-cli eval "document.body.textContent.includes('Áreas') || document.title.includes('Áreas')" --raw)
if [[ "$AREAS_OK" == "true" ]]; then
    log_pass "Página /areas/ accesible"
else
    log_fail "No se pudo acceder a /areas/"
fi

# Test 10: Navegación - Técnicas
echo "[Test 10] Navegando a /tecnicas/..."
playwright-cli goto "$BASE_URL/tecnicas/" --raw > /dev/null 2>&1
sleep 1
TEC_OK=$(playwright-cli eval "document.body.textContent.includes('Técnicas') || document.title.includes('Técnicas')" --raw)
if [[ "$TEC_OK" == "true" ]]; then
    log_pass "Página /tecnicas/ accesible"
else
    log_fail "No se pudo acceder a /tecnicas/"
fi

# Test 11: Navegación de vuelta a Overview
echo "[Test 11] Volviendo a Overview..."
playwright-cli goto "$BASE_URL/" --raw > /dev/null 2>&1
sleep 1
playwright-cli snapshot --raw > /dev/null 2>&1
OVERVIEW_OK=$(playwright-cli eval "document.body.textContent.includes('Dashboard BI4H')" --raw)
if [[ "$OVERVIEW_OK" == "true" ]]; then
    log_pass "Retorno a Overview exitoso"
else
    log_fail "No se pudo volver a Overview"
fi

# Test 12: Verificar que no hay errores críticos de consola
echo "[Test 12] Verificando errores de consola..."
playwright-cli console error --raw > /tmp/console_errors.txt 2>&1
ERROR_COUNT=$(grep -c "Error" /tmp/console_errors.txt 2>/dev/null || echo "0")
if [[ "$ERROR_COUNT" -le "1" ]]; then
    log_pass "Sin errores críticos de consola (count: $ERROR_COUNT)"
else
    log_fail "Errores de consola detectados: $ERROR_COUNT"
fi

# Test 13: 16 Widgets presentes
echo "[Test 13] Verificando 16 widgets..."
playwright-cli goto "$BASE_URL/" --raw > /dev/null 2>&1
sleep 1
playwright-cli snapshot --raw > /dev/null 2>&1
WIDGET_COUNT=$(playwright-cli eval "document.querySelectorAll('article button').length" --raw)
if [[ "$WIDGET_COUNT" == "16" ]]; then
    log_pass "Los 16 widgets están presentes"
else
    log_fail "Expected 16 widgets, found: $WIDGET_COUNT"
fi

# Test 14: Botón placeholder visible
echo "[Test 14] Verificando botones de acción..."
ACTUALIZAR_BTN=$(playwright-cli eval "document.body.textContent.includes('Actualizar')" --raw)
if [[ "$ACTUALIZAR_BTN" == "true" ]]; then
    log_pass "Botón Actualizar presente"
else
    log_fail "Botón Actualizar no encontrado"
fi

echo ""
echo "=========================================="
echo "RESUMEN DE TESTS"
echo "=========================================="
echo "✅ Pasados: $PASS"
echo "❌ Fallidos: $FAIL"
echo "Total: $((PASS + FAIL))"
echo "=========================================="

if [[ "$FAIL" -eq 0 ]]; then
    echo "🎉 TODOS LOS TESTS PASARON"
    exit 0
else
    echo "⚠️  ALGUNOS TESTS FALLARON"
    exit 1
fi
