# About The Project

haiku-app is a platform to create yourself haiku cards with any preferred image which if cannot fit the aspect ratio would get generative filled with the help of `cloudinary AI`.

`haiku is a Japanese poetic form that consists of three lines, with five syllables in the first line, seven in the second, and five in the third**.`

## Built With

- Next.js
- Varcel
- Tailwind CSS
- daisyUI

## Getting Started

To run the project locally just follow these steps.

First clone the repository locally and then run this command to install all the dependencies

```
npm install
```

After the dependencies are installed, setup your environment variables, the format is like this

```
CONNECTIONSTRING = <your mongo atlas cluster connection string>

JWTSECRET = <your jwt secret key>  

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = <cloudinary cloud key>
NEXT_PUBLIC_CLOUDINARY_API_KEY = <cloudinary api key>
CLOUDINARY_API_SECRET = <cloudinary api secret>
```

Once the `.env` file is setup, you can run the deployment by using this command

```
npm run dev
```

