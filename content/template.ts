export const formTemplates = [
  {
    title: "Contact Form",
    description:
      "A versatile contact form template for collecting user inquiries, feedback, and communication preferences efficiently.",
    tags: ["Contact", "Business", "Basic"],
    formConfig: [
      {
        id: "1",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "John Doe",
      },
      {
        id: "2",
        type: "email",
        label: "Email",
        required: true,
        placeholder: "john@email.com",
      },
      {
        id: "3",
        type: "textarea",
        label: "Message",
        required: true,
        placeholder: "Enter your message...",
      },
    ],
    buttonText:"Submit info"
  },
  {
    title: "Job Application Form",
    description:
      "Comprehensive job application template to gather candidate information, work experience, and qualifications for hiring processes.",
    tags: ["Employment", "HR", "Recruitment"],
     buttonText:"Submit application",
    formConfig: [
      {
        id: "4",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "John Doe",
      },
      {
        id: "5",
        type: "email",
        label: "Email",
        required: true,
        placeholder: "john@email.com",
      },
      {
        id: "6",
        type: "number",
        label: "Years of Experience",
        required: true,
        placeholder: "5",
      },
      {
        id: "7",
        type: "textarea",
        label: "Why should we hire you?",
        required: true,
        placeholder: "Your response...",
      },
      {
        id: "8",
        type: "radio-group",
        label: "Are you willing to relocate?",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Event Registration Form",
    description:
      "Streamline event registrations with fields for attendee information, preferences, and session selection.",
    tags: ["Events", "Registration", "Booking"],
    buttonText:"Register for event",
    formConfig: [
      {
        id: "9",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "John Doe",
      },
      {
        id: "10",
        type: "email",
        label: "Email",
        required: true,
        placeholder: "john@email.com",
      },
      {
        id: crypto.randomUUID(),
        type: "select",
        label: "Session Preference",
        options: [
          { label: "Morning", value: "morning" },
          { label: "Afternoon", value: "afternoon" },
          { label: "Evening", value: "evening" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Customer Feedback Survey",
    description:
      "Collect valuable customer feedback with a structured survey template including rating scales and open-ended questions.",
    tags: ["Feedback", "Survey", "Customer Service"],
    formConfig: [
      {
        id: "12",
        type: "text",
        label: "Full Name",
        required: false,
        placeholder: "John Doe",
      },
      {
        id: "13",
        type: "email",
        label: "Email",
        required: false,
        placeholder: "john@email.com",
      },
      {
        id: "14",
        type: "radio-group",
        label: "How satisfied are you?",
        options: [
          { label: "Very Satisfied", value: "5" },
          { label: "Satisfied", value: "4" },
          { label: "Neutral", value: "3" },
          { label: "Dissatisfied", value: "2" },
          { label: "Very Dissatisfied", value: "1" },
        ],
        required: true,
      },
      {
        id: "15",
        type: "textarea",
        label: "Additional Comments",
        required: false,
        placeholder: "Your thoughts...",
      },
    ],
    buttonText:"Submit feedback",
  },
  {
    title: "Product Order Form",
    description:
      "Enable smooth product ordering with fields for item selection, quantity, shipping details, and payment information.",
    tags: ["E-commerce", "Orders", "Sales"],
    formConfig: [
      {
        id: "16",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "John Doe",
      },
      {
        id: "17",
        type: "email",
        label: "Email",
        required: true,
        placeholder: "john@email.com",
      },
      {
        id: "18",
        type: "select",
        label: "Product",
        options: [
          { label: "Laptop", value: "laptop" },
          { label: "Phone", value: "phone" },
          { label: "Tablet", value: "tablet" },
        ],
        required: true,
      },
      {
        id: "19",
        type: "number",
        label: "Quantity",
        required: true,
        placeholder: "1",
      },
      {
        id: "20",
        type: "textarea",
        label: "Delivery Address",
        required: true,
        placeholder: "Enter your address...",
      },
    ],
    buttonText:"Submit info",
  },
];
