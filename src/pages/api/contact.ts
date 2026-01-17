import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const { name, email, subject, message } = body;

		// Validate input
		if (!name || !email || !subject || !message) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Todos los campos son requeridos'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Por favor ingresa un email válido'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Check if Resend API key is configured
		const resendApiKey = import.meta.env.RESEND_API_KEY;
		if (!resendApiKey) {
			console.error('RESEND_API_KEY is not configured in environment variables');
			return new Response(
				JSON.stringify({
					success: false,
					message: 'El servicio de email no está configurado. Por favor contacta al administrador.'
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Decode the contact email from environment variable
		const encodedEmail = import.meta.env.CONTACT_EMAIL_ENCODED || 'Y29udGFjdG9AYWxlamFuZHJhYmFsYm9udGluLmNs';
		const contactEmail = atob(encodedEmail);

		// Get the verified sender email from environment (Resend requires verified domain)
		const fromEmail = import.meta.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

		// Initialize Resend
		const resend = new Resend(resendApiKey);

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: fromEmail,
			to: contactEmail,
			replyTo: email,
			subject: `Contacto Web: ${subject}`,
			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<style>
						body {
							font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
							line-height: 1.6;
							color: #333;
							max-width: 600px;
							margin: 0 auto;
							padding: 20px;
						}
						.header {
							background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
							color: white;
							padding: 30px;
							border-radius: 10px 10px 0 0;
							text-align: center;
						}
						.content {
							background: #f9f9f9;
							padding: 30px;
							border-radius: 0 0 10px 10px;
						}
						.field {
							margin-bottom: 20px;
							padding: 15px;
							background: white;
							border-radius: 5px;
							border-left: 4px solid #667eea;
						}
						.field strong {
							color: #667eea;
							display: block;
							margin-bottom: 5px;
						}
						.message-content {
							white-space: pre-wrap;
							word-wrap: break-word;
						}
					</style>
				</head>
				<body>
					<div class="header">
						<h1>Nuevo Mensaje de Contacto</h1>
					</div>
					<div class="content">
						<div class="field">
							<strong>Nombre:</strong>
							${name}
						</div>
						<div class="field">
							<strong>Email:</strong>
							<a href="mailto:${email}">${email}</a>
						</div>
						<div class="field">
							<strong>Asunto:</strong>
							${subject}
						</div>
						<div class="field">
							<strong>Mensaje:</strong>
							<div class="message-content">${message.replace(/\n/g, '<br>')}</div>
						</div>
					</div>
				</body>
				</html>
			`
		});

		if (error) {
			console.error('Resend error:', error);
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Error al enviar el mensaje. Por favor intenta nuevamente.'
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		console.log('Email sent successfully:', data);

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.'
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);

	} catch (error) {
		console.error('Error processing contact form:', error);
		return new Response(
			JSON.stringify({
				success: false,
				message: 'Error al procesar el formulario. Por favor intenta nuevamente.'
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
