import { marked } from "marked";
import sanitizeHTML from "sanitize-html";

const batchSize = 50
const sleepDuration = 60 * 1000 // 1 min

/**
 * Render and sanitize a markdown string
 */
function md(str) {
  return sanitizeHTML(marked(str));
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  id: "mass-email-operation",
  handler: async (
    { body, to, replyTo, type, subject, template },
    { accountability, database, getSchema, services }
  ) => {
		let counter = 0
    const { MailService } = services;
    const mailService = new MailService({
      schema: await getSchema({ database }),
      accountability,
      knex: database,
    });
		
		for (const recipient of to) {
			const editedBody = body.replace('%%email%%', recipient)
			// If you don't want to specify a template use this.
			if (template == "" || template == null)
				await mailService.send({
					html: type === "wysiwyg" ? editedBody : md(editedBody),
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
						data: { html: type === "wysiwyg" ? editedBody : md(editedBody) },
					},
				});
			}
			counter++
			if (counter >= batchSize) {
				counter = 0
				sleep(sleepDuration) // Pause 1 min
			}
		}
		return {to, replyTo, subject, template, type, body}
  },
};