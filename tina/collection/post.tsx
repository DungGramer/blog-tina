import React from "react";
import { videoBlockSchema } from "@/components/blocks/video";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Collection } from "tinacms";

const Post: Collection = {
  label: "Blog Posts",
  name: "post",
  path: "content/posts",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const documentInfo = document._sys;
      const [fileName, locale] = documentInfo.breadcrumbs;

      return `/${locale}/posts/${fileName}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "lang",
      label: "Language",
      options: [
        { label: "Vietnamese", value: "vi" },
        { label: "English", value: "en" },
      ],
      ui: {
        component: "select",
      },
    },
    {
      type: "object",
      name: "translations",
      label: "Translations",
      list: true,
      fields: [
        {
          type: "string",
          name: "lang",
          label: "Language",
          options: [
            { label: "Vietnamese", value: "vi" },
            { label: "English", value: "en" },
          ],
          ui: {
            component: "select",
          },
        },
        {
          type: "string",
          name: "slug",
          label: "Translation Slug",
          description: "Slug of the post in this language",
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: `[${item.lang}] ${item.slug}` };
        },
      },
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      name: "heroImg",
      label: "Hero Image",
      // @ts-ignore
      uploadDir: () => "posts",
    },
    {
      type: "rich-text",
      label: "Excerpt",
      name: "excerpt",
      overrides: {
        toolbar: ["bold", "italic", "link"],
      },
    },
    {
      type: "reference",
      label: "Author",
      name: "author",
      collections: ["author"],
      ui: {
        optionComponent: (
          props: { name?: string; avatar: string },
          _internalSys: { path: string }
        ) => {
          const { name, avatar } = props;
          if (!name) return _internalSys.path;

          return (
            <p className='flex min-h-8 items-center gap-4'>
              <Avatar>
                {avatar && <AvatarImage src={avatar} alt={`${name} Profile`} />}
                <AvatarFallback>
                  {name
                    .split(" ")
                    .map((part) => part[0]?.toUpperCase() || "")
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {name}
            </p>
          );
        },
      },
    },
    {
      type: "datetime",
      label: "Posted Date",
      name: "date",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
    {
      type: "object",
      label: "Tags",
      name: "tags",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Tag",
          name: "tag",
          collections: ["tag"],
          ui: {
            optionComponent: (
              props: { name?: string },
              _internalSys: { path: string }
            ) => props.name || _internalSys.path,
          },
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.tag };
        },
      },
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      parser: { type: "mdx" },
      templates: [
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"],
              },
            },
            {
              name: "authorName",
              label: "Author",
              type: "string",
            },
          ],
        },
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"],
            },
          ],
        },
        {
          name: "NewsletterSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text",
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string",
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string",
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"],
              },
            },
          ],
          ui: {
            defaultItem: {
              placeholder: "Enter your email",
              buttonText: "Notify Me",
            },
          },
        },
        videoBlockSchema,
      ],
      isBody: true,
    },
  ],
};

export default Post;
