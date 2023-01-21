export default {
	id: 'mass-email-operation',
	name: 'Mass Email Operation',
	icon: 'mail',
	description: 'Send email to multiple recipients, one-by-one',
	overview: ({ body, to, replyTo, type, subject, template }) => [
    {
      label: "Subject",
      text: subject,
    },
    {
      label: "To",
      text: Array.isArray(to) ? to.join(", ") : to,
    },
    {
      label: "Reply to",
      text: replyTo,
    },
    {
      label: "Type",
      text: type || "markdown",
    },
    {
      label: "Body",
      text: body,
    },
    {
      label: "Template",
      text: template,
    },
  ],
  options: (panel) => {
    return [
      {
        field: "to",
        name: "To",
        type: "csv",
        meta: {
          width: "full",
          interface: "tags",
          options: {
            iconRight: "alternate_email",
          },
        },
      },
      {
        field: "replyTo",
        name: "Reply To",
        type: "string",
        meta: {
          width: "full",
          interface: "input",
          options: {
            iconRight: "alternate_email",
          },
        },
      },
      {
        field: "subject",
        name: "Subject",
        type: "string",
        meta: {
          width: "full",
          interface: "input",
          options: {
            iconRight: "title",
          },
        },
      },
      {
        field: "template",
        name: "Template",
        type: "string",
        meta: {
          width: "full",
          interface: "input",
          options: {
            iconRight: "title",
          },
        },
      },
      {
        field: "type",
        name: "Type",
        type: "string",
        schema: {
          default_value: "markdown",
        },
        meta: {
          interface: "select-dropdown",
          width: "half",
          options: {
            choices: [
              {
                text: "markdown",
                value: "markdown",
              },
              {
                text: "wysiwyg",
                value: "wysiwyg",
              },
            ],
          },
        },
      },
      {
        field: "body",
        name: "Body",
        type: "text",
        meta: {
          width: "full",
          interface:
            panel.type === "wysiwyg"
              ? "input-rich-text-html"
              : "input-rich-text-md",
        },
      },
    ];
  },
};
