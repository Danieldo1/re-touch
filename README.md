
# [Re-Touch 🔗](https://re-touch-it.vercel.app/)  
**Re-Touch** is a cutting-edge web application that provides a suite of image manipulation services as a SaaS (Software as a Service). This application leverages the powerful Cloudinary API to perform various transformations and enhancements on user-uploaded images.

## Screenshots
<img src="/public/screenshots/s1.png" width="400" />
<img src="/public/screenshots/s2.png" width="400" />
<img src="/public/screenshots/s3.png" width="400" />
<img src="/public/screenshots/s4.png" width="400" />


## Key Features  🔑
-  **User Authentication**: Secure login and account creation through Clerk. 
-   **Credit System**: Users can purchase credits for services using Stripe's reliable checkout system. 
-  **Image Manipulation**: Offers five distinct image manipulation options:
  -  **Image Restoration**: Enhances the quality of images by removing noise and imperfections.
  -  **Generative Fill**: Expands the image based on its aspect ratio using AI technology.
  -  **Object Remove**: Allows users to selectively remove objects from their images.
  -  **Object Recolor**: Users can recolor specific objects within their images.
  -  **Background Remove**: Removes the background from images, typically replacing it with a white backdrop. -
  -  **Community Gallery**: Users can view manipulated pictures from all users on the home screen. 
  -  **Personal Gallery**: Users can access their profile to view, edit, or remove their own manipulated images. 
  
## Technologies in Use 📠
-  **Cloudinary API**: For robust image manipulation capabilities. 
-  **Clerk**: To provide user authentication and management. 
-   **Stripe**: Integrated as a payment gateway for purchasing credits. 
-  **Tailwind CSS & Shadcn**: For modern, responsive styling. 
-   **TypeScript**: Ensuring type safety throughout the project. 
- **Next.js**: Using route functionality on latest nextjs.
- **ShadCn**: Using their incredible UI libabry for consistent styles.
-  **MongoDB & Mongoose**: To store user information, images, and credit data persistently. 
-  **Lucid React**: For incorporating beautiful, ready-to-use icons. 
-  **Zod and React Hook Form**: To validate and manage form submissions effectively. 

## Getting Started 🏃🏻
To run Re-Touch locally, you'll need to have Node.js installed. After cloning the repository, follow these steps:

1. Install the dependencies: 
   ```shell
   npm install`
2.  Set up your environment variables by creating a  `.env`  file based on this

   -   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
-   `CLERK_SECRET_KEY`
-   `CLERK_WEBHOOK_SECRET`
-   `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
-   `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
-   `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
-   `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
-   `MONGODB_URI`
-   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
-   `CLOUDINARY_API_KEY`
-   `CLOUDINARY_SECRET_KEY`
-   `CLOUDINARY_API_ENV`
-   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
-   `STRIPE_SECRET_KEY`
-   `STRIPE_WEBHOOK_SECRET`
-   `NEXT_PUBLIC_URL`
    
3.  Start the development server:
    
   **Insert in Terminal**
    
    `npm run dev`
    

Visit  `http://localhost:3000`  in your browser to see Re-Touch in action.

## Contributing 📚

If you'd like to contribute to the project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Licensing 💿

Re-Touch is licensed under the  [MIT license](https://file+.vscode-resource.vscode-cdn.net/Users/Daniel/.vscode/extensions/codeium.codeium-1.6.39/dist/LICENSE).

## Acknowledgments 👨🏻‍🏫

This project would not be possible without the open-source libraries and APIs we use. A big thank you to the developers and contributors of these tools.

