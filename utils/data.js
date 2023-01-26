import { handleChange } from "./helpers/miniFunctions";
import { v4 as uuidv4 } from "uuid";

export const userFields = {
  basic: [
    {
      _id: uuidv4(),
      label: "Full Name",
      name: "name",
      type: "INPUT",
      placeholder: "Enter your full name",
      path: null,
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Username",
      type: "INPUT",
      name: "username",
      placeholder: "Enter your username",
      path: null,
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Email",
      type: "INPUT",
      name: "email",
      disabled: true,
      placeholder: "Email address",
      path: null,
    },
    {
      _id: uuidv4(),
      label: "Profile Tagline",
      type: "INPUT",
      name: "tagline",
      placeholder: "Software Developer @...",
      path: null,
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      name: "profile_photo",
      label: "Profile Photo",
      type: "PHOTO",
      path: null,
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Cover Image",
      type: "PHOTO",
      name: "cover_image",
      path: null,
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Location",
      type: "INPUT",
      placeholder: "London, UK",
      path: null,
      name: "location",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
  ],

  about: [
    {
      _id: uuidv4(),
      label: "Profile Bio (About you)",
      type: "TEXTAREA",
      name: "about",
      placeholder: "I am a developer from …",
      path: "bio",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Tech Stack",
      type: "INPUT",
      name: "skills",
      placeholder: "Search technologies, topics, more…",
      path: null,
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Available for",
      type: "TEXTAREA",
      name: "available",
      placeholder: "I am available for mentoring, …",
      path: "bio",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
  ],

  social: [
    {
      _id: uuidv4(),
      label: "Twitter Profile",
      type: "INPUT",
      placeholder: "https://twitter.com/johndoe",
      path: "social",
      name: "twitter",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Instagram Profile",
      type: "INPUT",
      placeholder: "https://instagram.com/johndoe",
      name: "instagram",
      path: "social",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "GitHub Profile",
      type: "INPUT",
      path: "social",
      placeholder: "https://github.com/hashnode",
      name: "github",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "StackOverflow Profile",
      type: "INPUT",
      placeholder: "https://stackoverflow.com/users/22656/jon-skeet",
      name: "stackoverflow",
      path: "social",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Facebook Profile",
      type: "INPUT",
      placeholder: "Enter https://facebook.com/johndoe",
      name: "facebook",
      path: "social",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "Website URL",
      type: "INPUT",
      placeholder: "https://johndoe.com",
      name: "website",
      path: "social",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "LinkedIn URL",
      type: "INPUT",
      placeholder: "https://www.linkedin.com/in/johndoe",
      name: "linkedin",
      path: "social",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
    {
      _id: uuidv4(),
      label: "YouTube Channel",
      type: "INPUT",
      placeholder: "https://www.youtube.com/channel/channel-name",
      name: "youtube",
      path: "social",
      onChange: (e, details, setDetails) => {
        handleChange(e, details, setDetails);
      },
    },
  ],
};
