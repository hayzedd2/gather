// export const formTemplates = [
//   {
//     id:crypto.randomUUID(),
//     title: "Contact Form",
//     description:
//       "Professional contact form for business inquiries and communications.",
//     category: "Business Forms",
//     tags: ["Contact", "Communication", "Basic"],
//     buttonText: "Send Message",
//     formConfig: [
//       {
//         title: "Contact Form",
//         description:
//           "Professional contact form for business inquiries and communications.",
//         category: "Business Forms",
//         tags: ["Contact", "Communication", "Basic"],
//         buttonText: "Send Message",
//         formConfig: [
//           {
//             id: crypto.randomUUID(),
//             type: "text",
//             label: "Full Name",
//             required: true,
//             placeholder: "John Doe",
//           },
//           {
//             id: crypto.randomUUID(),
//             type: "email",
//             label: "Email",
//             required: true,
//             placeholder: "john@example.com",
//           },
//           {
//             id: crypto.randomUUID(),
//             type: "select",
//             label: "Inquiry Type",
//             required: true,
//             options: [
//               { label: "General Inquiry", value: "general" },
//               { label: "Business Proposal", value: "business" },
//               { label: "Support Request", value: "support" },
//               { label: "Other", value: "other" },
//             ],
//           },
//           {
//             id: crypto.randomUUID(),
//             type: "radio-group",
//             label: "Preferred Contact Method",
//             required: true,
//             options: [
//               { label: "Email", value: "email" },
//               { label: "Phone", value: "phone" },
//             ],
//           },
//           {
//             id: crypto.randomUUID(),
//             type: "textarea",
//             label: "Message",
//             required: true,
//             placeholder: "Please describe your inquiry...",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Service Request",
//     id:crypto.randomUUID(),
//     description: "Request form for professional services and consultations.",
//     category: "Business Forms",
//     tags: ["Services", "Business", "Request"],
//     buttonText: "Submit Request",
//     formConfig: [
//       {
//         id: crypto.randomUUID(),
//         type: "text",
//         label: "Full Name",
//         required: true,
//         placeholder: "John Doe",
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "email",
//         label: "Email",
//         required: true,
//         placeholder: "john@example.com",
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "select",
//         label: "Service Type",
//         required: true,
//         options: [
//           { label: "Consultation", value: "consultation" },
//           { label: "Technical Support", value: "technical" },
//           { label: "Quote Request", value: "quote" },
//           { label: "Other Services", value: "other" },
//         ],
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "radio-group",
//         label: "Urgency Level",
//         required: true,
//         options: [
//           { label: "High Priority", value: "high" },
//           { label: "Medium Priority", value: "medium" },
//           { label: "Low Priority", value: "low" },
//         ],
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "textarea",
//         label: "Service Details",
//         required: true,
//         placeholder: "Please describe your service needs...",
//       },
//     ],
//   },

import { Tags } from "lucide-react";

//   {
//     title: "Customer Feedback",
//     id:crypto.randomUUID(),
//     description:
//       "Comprehensive feedback form for product or service evaluation.",
//     category: "Survey Forms",
//     tags: ["Feedback", "Survey", "Customer"],
//     buttonText: "Submit Feedback",
//     formConfig: [
//       {
//         id: crypto.randomUUID(),
//         type: "radio-group",
//         label: "Overall Satisfaction",
//         required: true,
//         options: [
//           { label: "Very Satisfied", value: "5" },
//           { label: "Satisfied", value: "4" },
//           { label: "Neutral", value: "3" },
//           { label: "Dissatisfied", value: "2" },
//           { label: "Very Dissatisfied", value: "1" },
//         ],
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "checkbox-group",
//         label: "Areas to Improve",
//         required: true,
//         options: [
//           { label: "Product Quality", value: "quality" },
//           { label: "Customer Service", value: "service" },
//           { label: "Price", value: "price" },
//           { label: "User Experience", value: "ux" },
//         ],
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "textarea",
//         label: "Additional Comments",
//         required: false,
//         placeholder: "Please share your thoughts...",
//       },
//     ],
//   },

//   {
//     title: "Event Registration",
//     description:
//       "Complete event registration form for conferences and workshops.",
//     category: "Registration Forms",
//     tags: ["Events", "Registration", "Booking"],
//     buttonText: "Register Now",
//     formConfig: [
//       {
//         id: crypto.randomUUID(),
//         type: "text",
//         label: "Full Name",
//         required: true,
//         placeholder: "John Doe",
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "email",
//         label: "Email",
//         required: true,
//         placeholder: "john@example.com",
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "select",
//         label: "Event Type",
//         required: true,
//         options: [
//           { label: "Conference", value: "conference" },
//           { label: "Workshop", value: "workshop" },
//           { label: "Webinar", value: "webinar" },
//         ],
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "checkbox-group",
//         label: "Sessions",
//         required: true,
//         options: [
//           { label: "Morning Session", value: "morning" },
//           { label: "Afternoon Session", value: "afternoon" },
//           { label: "Evening Session", value: "evening" },
//         ],
//       },
//     ],
//   },

//   {
//     title: "Job Application",
//     description: "Comprehensive job application form for candidates.",
//     category: "Application Forms",
//     tags: ["Employment", "Career", "Jobs"],
//     buttonText: "Submit Application",
//     formConfig: [
//       {
//         id: crypto.randomUUID(),
//         type: "text",
//         label: "Full Name",
//         required: true,
//         placeholder: "John Doe",
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "email",
//         label: "Email",
//         required: true,
//         placeholder: "john@example.com",
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "number",
//         label: "Years of Experience",
//         required: true,
//         placeholder: "5",
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "select",
//         label: "Position",
//         required: true,
//         options: [
//           { label: "Software Developer", value: "developer" },
//           { label: "Designer", value: "designer" },
//           { label: "Product Manager", value: "pm" },
//         ],
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "checkbox-group",
//         label: "Skills",
//         required: true,
//         options: [
//           { label: "JavaScript", value: "js" },
//           { label: "Python", value: "python" },
//           { label: "React", value: "react" },
//         ],
//       },
//       {
//         id: crypto.randomUUID(),
//         type: "textarea",
//         label: "Cover Letter",
//         required: true,
//         placeholder: "Tell us about yourself...",
//       },
//     ],
//   },
// ];

export const formTemplates = [
  {
    key: crypto.randomUUID(),
    title: "Job form",
    description: "ffwfw",
    buttonText: "Submit info",
    formConfig: [
      {
        id: "f0cc67de-6c2c-4f0e-8088-eb4c10121884",
        type: "text",
        label: "Name",
        required: true,
        description: "Please tell us your name",
        placeholder: "John doe",
      },
      {
        id: "bc26574e-0951-491f-bdb6-7d2fa3ac6977",
        type: "number",
        label: "Phone number",
        required: true,
        description: "Please tell us your phone number",
        placeholder: "",
      },
      {
        id: "15a969a4-b627-4f41-872c-e51a0283e16d",
        type: "email",
        label: "Email",
        required: false,
        description: "",
        placeholder: "joe@mail.com",
      },
      {
        id: "4c2349bd-5a70-451a-bbcb-1c4839dc426f",
        type: "select",
        label: "Service type",
        options: [
          {
            label: "Massage",
            value: "fbef737f-345b-4bbd-927c-a7ddf36a0bc0",
          },
          {
            label: "Haircut",
            value: "option-de7843d4-33e4-4226-9845-e550173e8c3f",
          },
          {
            label: "new option",
            value: "option-5b16defc-3904-4f41-b4c2-fe194e9e687e",
          },
          {
            label: "Pedicure",
            value: "option-16f94d64-77a8-48b0-b418-9482f7835c0e",
          },
        ],
        required: true,
        description: "",
      },
      {
        id: "b2b757e9-5cb7-4c01-9451-acc97dbb94b2",
        type: "radio-group",
        label: "Price",
        options: [
          {
            label: "15-20",
            value: "3a511f1d-5b80-4834-9daf-f3066b6e13a9",
          },
          {
            label: "20-25",
            value: "option-89e0633e-da51-41e8-af32-477c22251f93",
          },
        ],
        required: true,
        description: "",
      },
      {
        id: "aff38a9d-0d81-4a01-9749-cc9ff2a4a18f",
        type: "checkbox-group",
        label: "Time of the day",
        options: [
          {
            label: "Morning",
            value: "1d8593f0-bc2c-4113-bf8a-836b1c538825",
          },
          {
            label: "Afternoon",
            value: "option-546a0e20-dd49-472a-ad00-f9e0259690e5",
          },
          {
            label: "Night",
            value: "option-e18f52a9-81ff-4ada-bb28-add6359235d1",
          },
        ],
        required: true,
        description:
          "Please select different time of the day that works for you",
      },
    ],
    tags: ["Businss", "Survery"],
    category:"Jobs form"
  },
  {
    key: crypto.randomUUID(),
    title: "Application",
    description: "ffwfw",
    buttonText: "Submit info",
    formConfig: [
      {
        id: "f0cc67de-6c2c-4f0e-8088-eb4c10121884",
        type: "text",
        label: "Name",
        required: true,
        description: "Please tell us your name",
        placeholder: "John doe",
      },
      {
        id: "bc26574e-0951-491f-bdb6-7d2fa3ac6977",
        type: "number",
        label: "Phone number",
        required: true,
        description: "Please tell us your phone number",
        placeholder: "",
      },
      {
        id: "15a969a4-b627-4f41-872c-e51a0283e16d",
        type: "email",
        label: "Email",
        required: false,
        description: "",
        placeholder: "joe@mail.com",
      },
      {
        id: "4c2349bd-5a70-451a-bbcb-1c4839dc426f",
        type: "select",
        label: "Service type",
        options: [
          {
            label: "Massage",
            value: "fbef737f-345b-4bbd-927c-a7ddf36a0bc0",
          },
          {
            label: "Haircut",
            value: "option-de7843d4-33e4-4226-9845-e550173e8c3f",
          },
          {
            label: "new option",
            value: "option-5b16defc-3904-4f41-b4c2-fe194e9e687e",
          },
          {
            label: "Pedicure",
            value: "option-16f94d64-77a8-48b0-b418-9482f7835c0e",
          },
        ],
        required: true,
        description: "",
      },
      {
        id: "b2b757e9-5cb7-4c01-9451-acc97dbb94b2",
        type: "radio-group",
        label: "Price",
        options: [
          {
            label: "15-20",
            value: "3a511f1d-5b80-4834-9daf-f3066b6e13a9",
          },
          {
            label: "20-25",
            value: "option-89e0633e-da51-41e8-af32-477c22251f93",
          },
        ],
        required: true,
        description: "",
      },
      {
        id: "aff38a9d-0d81-4a01-9749-cc9ff2a4a18f",
        type: "checkbox-group",
        label: "Time of the day",
        options: [
          {
            label: "Morning",
            value: "1d8593f0-bc2c-4113-bf8a-836b1c538825",
          },
          {
            label: "Afternoon",
            value: "option-546a0e20-dd49-472a-ad00-f9e0259690e5",
          },
          {
            label: "Night",
            value: "option-e18f52a9-81ff-4ada-bb28-add6359235d1",
          },
        ],
        required: true,
        description:
          "Please select different time of the day that works for you",
      },
    ],
    tags: ["Businss", "Survery"],
    category:"Applications form"
  },
];
