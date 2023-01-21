import { marked } from "marked";
import sanitizeHTML from "sanitize-html";

/**
 * Render and sanitize a markdown string
 */
export function md(str) {
  return sanitizeHTML(marked(str));
}

export default {
  id: "mass-email-operation",
  handler: async (
    { body, to, replyTo, type, subject, template },
    { accountability, database, getSchema, services }
  ) => {
    const { MailService } = services;
    const mailService = new MailService({
      schema: await getSchema({ database }),
      accountability,
      knex: database,
    });

		for (const recipient of to) {
			body = body.replace('%%email%%', recipient)
			// If you don't want to specify a template use this.
			if (template == "" || template == null)
				await mailService.send({
					html: type === "wysiwyg" ? body : md(body),
					to: recipient,
					replyTo: replyTo,
					subject: subject,
				});
			// If you want a template => you need to have {{ html }}
			// in your template
			else {
				await mailService.send({
					to: recipient,
					replyTo: replyTo,
					subject: subject,
					template: {
						name: template !== null || template !== undefined ? template : "base",
						data: { html: type === "wysiwyg" ? body : md(body) },
					},
				});
			}
		}
		return {to, replyTo, subject, template, type, body}
  },
};