# Apuntes Curso Practical Prompt Engineering (Frontend Masters)

Fuente del curso: https://frontendmasters.com/courses/prompt-engineering

---

## 1. Limitaciones y comportamiento de los LLMs

### Cutoff date

Los modelos de lenguaje tienen una fecha de corte de entrenamiento
(cutoff date). Si se les pregunta por eventos o informacion posterior a
esa fecha, las respuestas pueden ser menos confiables o directamente
incorrectas.

### No determinismo

Los LLMs no son deterministas: con el mismo input pueden generar outputs
diferentes en cada ejecucion, dependiendo de los parametros de
generacion (como temperature o top-p).

---

## 2. Parametros de generacion

### Temperature

Controla el nivel de aleatoriedad en las respuestas.

- 0 -> comportamiento casi determinista
- 2 -> respuestas mucho mas caoticas y creativas

Recomendaciones de uso:

- Temperature baja -> datos, codigo, respuestas tecnicas
- Temperature alta -> escritura creativa, brainstorming, ideacion

### Top-P (Nucleus Sampling)

Parametro similar a temperature, con valores entre 0 y 1.

- Limita los tokens posibles a un porcentaje de probabilidad acumulada
- Ejemplo:
  - Top-P = 0.5 -> el modelo solo considera el 50% de las opciones mas
    probables

Se puede usar como alternativa o complemento a temperature.

---

## 3. Tokens y contexto

### Que es un token?

- Un token no equivale exactamente a una palabra
- De media: 1 token ~= 0.75 palabras
- Cada palabra o fragmento se convierte en un ID numerico que el LLM
  procesa

### Tokens acumulativos y contexto

- Los LLMs trabajan con una ventana de contexto (context window)
- En cada prompt se envia:
  - El mensaje actual
  - Parte del historial de la conversacion
- Los tokens se acumulan a lo largo de la conversacion

Cuando se alcanza el limite del context window:

- Los tokens mas antiguos se eliminan
- Se prioriza el contenido mas reciente

---

## 4. System Message

El system message:

- Lo define el proveedor de la IA
- Es una especie de personalidad invisible del modelo en esa interaccion
- Define como debe comportarse la IA (rol, tono, reglas)

Caracteristicas clave:

- Consume parte del context window
- Tiene prioridad sobre el user message
- Permite que el mismo modelo actue de formas muy diferentes segun el
  contexto o herramienta

---

## 5. Tipos de prompts

### Standard Prompt

Es una pregunta directa a la IA.

Principios clave:

- La calidad de la respuesta es proporcional a la calidad de la pregunta
- Para mejorar consistencia, se puede indicar:

  "Si tienes alguna duda o necesitas mas informacion para realizar la
  tarea, preguntame primero"

### Zero-Shot Prompt

- Se pide una tarea sin proporcionar ejemplos
- Depende totalmente del pre-training del modelo
- Funciona bien para tareas:
  - Comunes
  - Sencillas
  - Bien definidas

Buenas practicas:

- No tener miedo de crear nuevos chats
- Se puede pedir a la IA que genere contexto inicial para el nuevo chat

### One-Shot Prompt

- Se proporciona exactamente un ejemplo
- El modelo imita:
  - Formato
  - Estilo
  - Estructura del ejemplo

Util cuando queremos:

- Respuestas consistentes
- Un formato concreto

### Few-Shot Prompt

- Se proporcionan dos o mas ejemplos
- El modelo aprende de:
  - Similitudes
  - Diferencias
  - Patrones entre los ejemplos

Cuanto mas complejo es el modelo:

- Mejor aprovecha el few-shot learning
- Mas precision en tareas complejas o especificas

---

## Donde colocar el contexto en un prompt

Orden recomendado:

1. Al principio (mejor opcion)
2. Al final (segunda mejor)
3. En medio (peor opcion)

Por que no conviene ponerlo al final:

En conversaciones largas, el historial crece y ese contexto "final"
acaba quedando en el medio del context window, perdiendo prioridad y
claridad.

Regla practica:

Si el contexto es importante para la tarea, ponlo lo mas arriba posible
(antes de la instruccion principal o justo despues).

---

## Structured Outputs (salidas estructuradas)

Objetivo: conseguir formatos consistentes y faciles de reutilizar.

Buenas practicas:

- Decir explicitamente el formato exacto que quieres.
- Usar plantillas, ejemplos o schemas (por ejemplo, una estructura fija
  de secciones).
- Especificar constraints: orden, campos obligatorios, longitud, etc.

---

## Chain of Thought (razonamiento paso a paso)

Idea general:

- Pedir que el modelo razone paso a paso puede ayudar a resolver
  problemas complejos.
- Util para dividir problemas grandes en piezas pequenas y avanzar por
  etapas.

Nota practica:

Aunque "pensar paso a paso" puede mejorar el resultado, en entornos
reales muchas veces es mejor pedir:

- Un plan breve
- Los pasos
- La solucion final

en vez de exigir todo el razonamiento interno (depende de la herramienta
y de si quieres explicaciones o solo el resultado).

---

## Prompts emocionales

A veces, anadir una coletilla emocional o de urgencia puede aumentar la
atencion del modelo a ciertas partes del prompt.

Ejemplos de enfoque (sin dramatizar):

- "Es importante que esto quede claro porque lo tengo que compartir con
  el equipo."
- "Por favor, se especialmente cuidadoso con los detalles."
- "Necesito que la respuesta sea precisa y sin inventar."

Util sobre todo cuando quieres:

- Mas cuidado
- Mas claridad
- Menos relleno

---

## Delimitadores y etiquetas (XML tags)

Sirven para separar partes del prompt y evitar ambiguedad,
especialmente en prompts largos o complejos.

Ejemplo de uso semantico:

- <requisitos>...</requisitos>
- <ejemplo>...</ejemplo>
- <formato_salida>...</formato_salida>

Consejos:

- Usa nombres semanticos claros.
- Apoyate en listas (puntos, numeracion) y comillas para valores exactos.
- Muy recomendables para prompts complejos (varios requisitos, entradas
  y salidas).

Nota comparativa (segun los apuntes):

- JSON puede funcionar bien en ChatGPT
- XML suele ir especialmente bien en Claude porque se ha entrenado mucho
  con ese estilo

---

## Personas (roles)

Consiste en asignar un rol al modelo para orientar tono, vocabulario y
enfoque.

Ejemplo:

- "Ahora eres un software engineer senior y..."

Por que funciona:

- Le da una perspectiva concreta al modelo.
- Tiende a adoptar conocimiento y vocabulario asociados a ese rol.
- Ayuda a dirigir la respuesta hacia un "rumbo" (mas tecnico, mas
  didactico, mas ejecutivo, etc.).
