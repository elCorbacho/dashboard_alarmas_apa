# Guía Completa para Generar Frontend de Calidad Profesional con IA

Esta guía proporciona un flujo de trabajo estructurado para obtener resultados de frontend consistentes y profesionales cuando se trabaja con agentes de IA. El problema común es que la IA tiende a generarinterfaces con estética genérica, patrones repetitivos y decisiones de diseño inconsistentes. Elsiguiente flujo aborda este problema mediante capas sucesivas de restricción y validación.

## Fase 1: Definición de Arquitectura con AGENTS.md

El primer paso antes de generar cualquier código es establecer la arquitectura del proyecto en un archivo AGENTS.md en la raíz del proyecto. Este archivo define cómo el agente debe construir el proyecto, qué convenciones seguir y qué restricciones aplicar. No sustituye a DESIGN.md, sino que complementa indicando la estructura técnica, patrones de componentes y reglas de implementación.

Si el proyecto ya tiene AGENTS.md, revisar que incluya las secciones necesarias. Si no existe o está incompleto, crearlo o ampliarlo con las siguientes indicationes:

```markdown
# AGENTS.md

## Stack Tecnológico
- Framework: [Next.js/App Router]
- Estilos: [Tailwind CSS]
- Componentes: [shadcn/ui o similar]

## Reglas de Componentes
- Todos los componentes deben seguir el sistema de diseño definido en DESIGN.md
- Usar tokens de diseño del DESIGN.md para colores, tipografía y spacing
- Nunca inventar valores arbitrarios para propiedades visuales

## Restricciones de UI
- Aplicar siempre las reglas de Uncodixfy.md para evitar estética genérica de IA
- Antes de generar código, verificar contra los anti-patrones definidos
- Mantener consistencia visual con el sistema de diseño existente
```

El archivo AGENTS.md actúa como la primera capa de restricción. Indica al agente qué herramientas usar, cómo estructurar el proyecto y qué archivos debe respetar.

## Fase 2: Prototipado Visual con Google Stitch

Google Stitch permite generar interfaces visuales a partir de descripciones en lenguaje natural. En lugar de pedirle al agente que genere código directamente, el flujo recomendado es diseñar primero la interfaz en Stitch para obtener una referencia visual concreta.

El proceso es el siguiente: primero se describe la página o funcionalidad desired en Stitch, se genera el prototipo visual y luego se extraen las reglas de diseño observadas. Stitch no produce código para proyectos existentes, sino un punto de partida visual que permite comunicar ideas de diseño de manera más precisa.

Durante esta fase se debe prestar atención a elementos específicos que después deberán documentarse: el tratamiento de espaciado entre elementos, si los bordes tienen radio y en qué medida, la jerarquía de colores utilizada, qué tipografía se emplea para títulos y cuerpo, cómo se estructuran las tarjetas y contenedores, y qué tipo de sombras o efectos de profundidad aparecen.

Estos elementos observationados se documentan para las fases siguientes. No se busca obtener código de Stitch, sino una referencia visual clara que permita comunicar el resultado desired al agente.

## Fase 3: Generación de DESIGN.md

El archivo DESIGN.md es la fuente de verdad para el diseño visual del proyecto. Define colores, tipografía, spacing, componentes y reglas de consistencia. Es el documento que todo agente debe leer antes de generar código de interfaz.

La forma más práctica es adaptar un archivo existente de awesome-design-md que coincida con el estilo desired o crear uno desde cero basándose en el prototipo de Stitch. El formato Stitch incluye las siguientes secciones:

```markdown
# DESIGN.md

## Tema Visual y Atmósfera
Breve descripción del mood general: apakah es oscuro o claro, minimal o denso, profesional o playful.

## Paleta de Colores
- Primary: [hex] - color principal de marca
- Secondary: [hex] - color secundario
- Background: [hex] - color de fondo
- Surface: [hex] - color de tarjetas/contenedores
- Text: [hex] - color del texto principal
- Muted: [hex] - color del texto secundario
- Error/Success: [hex] - colores de estado

## Tipografía
- Heading: [fuente], peso, tamaño
- Body: [fuente], peso, tamaño
- Monospace: [fuente] para código

## Regla de Componentes
- Buttons: radio 8px máximo, sin gradientes
- Cards: radio 8-12px, bordes sutiles, sombras mínimas
- Inputs: bordes sólidos, focus ring simple
- Navigation: sin badges decorativos
```

Es importante que los colores sean específicos y no genéricos. El error común es usar azul genérico o gradientes cuando el diseño real requiere un color definido.

## Fase 4: Aplicación de Uncodixfy

El archivo Uncodixfy (disponible en cyxzdev/Uncodixfy) contiene las reglas que bloquean los patrones de IA genérica. Se aplica como capa de restricción en todos los prompts de frontend.

Los patrones banned incluyen tarjetas flotantes con sombras pronunciadas, esquinas con radio excesivo (mayor a 12px), efectos glassmorphism o frost en contenedores, gradientes corporativos blandos, hero sections dentro de dashboards sin razón de producto, metric-cards en grid como primerinstinto, y etiquetas decorativas como "live pulse" o "night shift".

Las implementaciones correctas según Uncodixfy son las siguientes: sidebars de 240-260px con borde derecho sólido, headers simples sin "eyebrows", botones sólidos o con borde simple de máximo 10px de radio, inputs con bordes sólidos y focus ringsimple, y transiciones de 100-200ms sin animaciones transform.

Para aplicar, incluir referencia en todos los prompts de frontend: "Antes de generar UI, leer Uncodixfy.md y aplicar las reglas de implementación correcta. Evitar todos los patrones banned".

## Fase 5: Diseño Inteligente con UI-UX-Pro-Max

UI-UX-Pro-Max es un skill que proporciona inteligencia de diseño con 161 reglas específicas por industria, 67 estilos de UI, paletas de colores y combinaciones tipográficas. Se activa automáticamente cuando se solicitan tareas de UI/UX.

Para proyectos existentes, se puede generar un sistema de diseño específico:

```bash
npx uipro init --ai opencode
```

O usar el generador de sistema de diseño directamente:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "tu industria" --design-system -p "TuProducto"
```

Esto genera un archivo con las recommendationes específicas para el tipo de producto: patrón de landing page, estilo recomendado, paleta de colores apropiada, tipografía y efectos clave.

Para usarlo manualmente en prompts: "Usar las reglas de UI-UX-Pro-Max para determinar el estilo apropiado según [tipo de producto]. Aplicar la paleta de colores y tipografía recomendada".

## Fase 6: Validación y Refinamiento

La validación con Playwright o herramientas similares no es suficiente porque puede confirmar que el código funciona pero no que el diseño es correcto. Es necesario revisar manualmente aspectos que las pruebas automatizadas no detectan.

Revisar manualmente los siguientes puntos después de cada generación:

- Espaciado consistente: verificar que margins y paddings siguen una escala predecible
- Jerarquía tipográfica: títulos con mayor peso y tamaño que el cuerpo, sin texto intermedio que parezca perdido
- Color coherente: primario usado consistentemente, acentos solo donde needed
- Radio de bordes uniforme: máximo 12px, idealmente menor, sin mezclar radios diferentes
- Sin floating cards: las tarjetas deben integrarse con el fondo, no flotar con sombras pronunciadas
- Formularios limpios: labels sobre los inputs, no floating labels
- Navegación funcional: sin badges decorativoscount-only
- Responsive funcional: no stacking arbitrario en móvil, mantener jerarquía

Si algo se ve raro, probablemente违��了 alguna regla de Uncodixfy. Revisar el archivo y corregir.

## Plantilla de Prompt para Frontend

Para obtener mejores resultados, usar una plantilla de prompt estructurada que incluya todas las referencias necesarias:

```plaintext
Estoy generando [tipo de página/componente] para [proyecto].

Requisitos funcionales:
- [describe la funcionalidad]

Restricciones de diseño:
- Leer DESIGN.md y aplicar los colores, tipografía y spacing definidos
- Antes de generar, verificar contra Uncodixfy.md para evitar estética genérica de IA
- No usar floating cards, gradients, glassmorphism, oversized rounded corners
- Mantener radio de bordes máximo 12px
- Usar sistema de spacing consistente del DESIGN.md
- Navegación sin badges decorativos

Validación:
- Verificar contraste de colores (mínimo 4.5:1 para texto)
- Verificar que todos los elementos clickeables tienen cursor-pointer
- Verificar estados hover con transiciones suaves (150-300ms)
- Revisar responsive en 375px, 768px, 1024px
```

Esta plantilla aseguracontinuidad en todas las iteraciones y reduce la posibilidad de que el agente genere código con problemas visuales.

## Resumen del Flujo

El flujo completo para obtener frontend de calidad con IA consiste en las siguientes fases en orden:

Primera fase: AGENTS.md para arquitectura técnica. Definir cómo construir el proyecto antes de escribir código.

Segunda fase: Stitch para prototipado visual. Obtener referencia visual concreta antes de solicitar código.

Tercera fase: DESIGN.md como fuente de verdad visual. Documentar colores, tipografía, spacing y reglas de componentes.

Cuarta fase: Uncodixfy como restricción anti-patrón. Bloquear estética genérica de IA en cada prompt.

Quinta fase: UI-UX-Pro-Max para inteligencia de diseño. Aplicar reglas específicas por industria cuando sea necesario.

Sexta fase: Validación manual. Revisar spacing, tipografía, colores, radio de bordes y responsive.

Siguiendo este flujo estructurado, los resultados de frontend serán significativamente mejores que generando código directamente sin contexto de diseño. La clave está en múltiples capas de restricción en lugar de confiar en un solo prompt.

## Archivos de Referencia

Para mantener consistencia en el proyecto, asegurar que los siguientes archivos existan y estén actualizados:

- AGENTS.md: arquitectura y reglas de construcción
- DESIGN.md: sistema de diseño visual
- Uncodixfy.md: restricción de anti-patrones
- ui-ux-pro-max: skill de inteligencia de diseño

Estos archivos deben mantenerse en el proyecto y actualizarse cuando el diseño evoluciona.