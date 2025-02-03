"use client";
import { generateZodSchema } from "@/helpers/generateZodSchema";
import React from "react";

const ResponseForm = () => {
  const generatedSchema = generateZodSchema([
    {
      id: "4edc0dca-2ef5-4ef5-8839-0e5401eb5d16",
      type: "text",
      label: "Name",
      required: true,
      description: "Tell us your name",
      placeholder: "john doe",
    },
    {
      id: "1bcaf118-7033-440f-ab1d-7e9633b83c8f",
      type: "email",
      label: "Email",
      required: true,
      description: "",
      placeholder: "johndoe@mail.com",
    },
    {
      id: "6725c6d9-befc-4b95-8853-4c576bc2ba41",
      type: "select",
      label: "Service type",
      options: [
        {
          label: "Haircut",
          value: "option-1",
        },
        {
          label: "Massage",
          value: "option-c77c6096-6b13-42ed-86bb-4e9b4f80f60e",
        },
      ],
      required: true,
      description: "",
    },
    {
      id: "hello",
      type: "checkbox-group",
      label: "Pick fruits",
      options: [
        {
          label: "Pawpaw",
          value: "pawpaw",
        },
      ],
      required: true,
    },
  ]);

  return (
    <div>
      <button
        onClick={() => {
          const formData = {
            "4edc0dca-2ef5-4ef5-8839-0e5401eb5d16": "taiwo",
            "1bcaf118-7033-440f-ab1d-7e9633b83c8f": "mail@test.com",
            "6725c6d9-befc-4b95-8853-4c576bc2ba41": "hello",
            "hello": ["cashew"]
          };
          console.log(generatedSchema.shape);
          const isValidData = generatedSchema.safeParse(formData);
          if (!isValidData.success) {
            console.log(isValidData.error);
          }
        }}
      >
        Generate schema
      </button>
    </div>
  );
};

export default ResponseForm;
