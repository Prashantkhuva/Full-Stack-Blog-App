# MegaBlog

> A modern SaaS-style blog platform built with React and Appwrite

## Overview
MegaBlog is a full-stack blogging platform designed to give writers a clean, premium reading and writing experience. Users can easily create, read, edit, and delete their own posts. By integrating a powerful rich text editor (TinyMCE) wrapped inside a beautiful, highly responsive UI, MegaBlog makes publishing and sharing stories simple.

## Features
- **Secure Authentication:** Easy login and signup flows to protect user data.
- **Full Article Management:** Create, edit, and delete your posts dynamically.
- **Rich Text Editor:** Fully featured text formatting utilizing TinyMCE.
- **Responsive Design:** Flawless layouts across mobile, tablet, and desktop devices.
- **SEO Optimized:** Dynamic meta tags, clean URLs, and automatic sitemap generation.
- **Fast Performance:** Optimized assets and code splitting ensure rapid load times.

## Tech Stack
- **Frontend:** React (Vite)
- **Backend / Database:** Appwrite
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Editor:** TinyMCE

## Installation

Follow these simple steps to run the project locally on your machine:

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd Blog-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## Environment Variables

To connect the application to the backend, you need to set up your environment variables. Create a `.env` file in the root of your project directory and add the following keys with your Appwrite project details:

```env
VITE_APPWRITE_ENDPOINT=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

## Screenshots
*(Add screenshots of your application here to showcase the UI)*
- Homepage View
- Add / Edit Post View
- Article View

## Future Improvements
- Add a comments section for reader interaction
- Add a post like or bookmarking system
- Improve SEO features further

## Author
**Prashant Khuva**  
*Full Stack Developer*
