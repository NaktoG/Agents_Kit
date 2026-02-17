# Quality Contract (Definition of Done)

## Purpose
Establecer criterios mínimos de calidad para cualquier entrega basada en AgentOS.

## Clean Architecture Boundaries
- [ ] La capa de dominio no depende de infraestructura.
- [ ] La capa de aplicación depende solo de dominio.
- [ ] I/O (DB, HTTP, colas) se mantiene en infraestructura.

## SOLID / SRP
- [ ] Cada módulo tiene una sola responsabilidad.
- [ ] No hay funciones con múltiples motivos de cambio.
- [ ] Dependencias invertidas hacia interfaces/abstracciones.

## Security (OWASP mínimo)
- [ ] No hay secretos hardcodeados.
- [ ] AuthN/AuthZ explícito en endpoints sensibles.
- [ ] Validación de inputs en bordes (schemas).
- [ ] Logs sin datos sensibles.

## Tests mínimos
- [ ] Tests cubren paths críticos (happy + error).
- [ ] Validación de auth para endpoints expuestos.

## Hardcodes prohibidos
- [ ] No hay IDs, tokens o URLs sensibles hardcodeadas en lógica productiva.

## Agentes (Output Contract)
- [ ] Resumen de cambios.
- [ ] Archivos tocados.
- [ ] Riesgos y mitigaciones.
- [ ] Próximo paso sugerido.
