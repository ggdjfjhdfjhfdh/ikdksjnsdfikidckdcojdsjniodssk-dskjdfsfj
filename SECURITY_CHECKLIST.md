# Checklist de Seguridad para Producción

Este checklist está pensado para revisar los puntos críticos de seguridad antes de desplegar una aplicación Next.js/React en producción.

## 1. Seguridad en el Frontend
- [ ] **No exponer datos sensibles**: Nunca incluir claves, tokens o secretos en el código frontend ni en variables públicas.
- [ ] **Evitar XSS**: No usar `dangerouslySetInnerHTML` salvo que el contenido esté sanitizado. Renderizar datos externos solo como texto.
- [ ] **Validación de entradas**: Validar y sanear todos los datos recibidos desde el usuario antes de enviarlos al backend.
- [ ] **Enlaces externos seguros**: Usar `rel="noopener noreferrer"` en `<a target="_blank">`.
- [ ] **Cargar solo recursos de confianza**: Limitar imágenes, scripts y fuentes a dominios de confianza mediante Content Security Policy (CSP).
- [ ] **Dependencias actualizadas**: Mantener todas las librerías y frameworks al día.
- [ ] **Desactivar debug/logs en producción**: No mostrar información sensible en consola ni en errores.

## 2. Seguridad en el Backend/API
- [ ] **Autenticación robusta**: Usar JWT, OAuth o similar. No permitir endpoints abiertos innecesarios.
- [ ] **Autorización granular**: Verificar permisos para cada recurso/salida.
- [ ] **Validación y sanitización**: Validar todos los parámetros recibidos, incluso si provienen del frontend.
- [ ] **Protección ante inyección**: Usar ORMs y consultas parametrizadas para evitar SQL/NoSQL Injection.
- [ ] **Rate limiting y protección anti-DDoS**: Limitar peticiones por IP/usuario.
- [ ] **CORS restringido**: Configurar CORS solo para orígenes necesarios.

## 3. Seguridad en la Entrega y el Entorno
- [ ] **HTTPS obligatorio**: Redirigir todo el tráfico a HTTPS.
- [ ] **Content Security Policy (CSP)**: Definir una política estricta.
- [ ] **HTTP Headers seguros**: Usar headers como `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, etc.
- [ ] **Protección contra clickjacking**: Usar `X-Frame-Options: DENY` o `SAMEORIGIN`.
- [ ] **Deshabilitar directory listing**: No permitir listar archivos en producción.
- [ ] **Backups y monitorización**: Configurar backups automáticos y monitorización de logs/errores.

## 4. Accesibilidad y UX
- [ ] **Aria-labels y roles**: Mejorar accesibilidad para usuarios y lectores de pantalla.
- [ ] **Gestión de errores amigable**: Mostrar mensajes claros sin exponer detalles internos.

---

> _Este checklist es una base. Adáptalo según el contexto y los requisitos de tu proyecto._
