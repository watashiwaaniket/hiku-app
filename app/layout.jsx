import Footer from "./components/Footer"
import Header from "./components/Header"
import "./global.css"



export const metadata = {
  title: 'HaikuApp',
  description: 'Create your short poems with the help of AI image generation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body>
        <Header />
        <main className="container mx-auto p-10">
          {children}
        </main>
        <Footer />        
        </body>        
    </html>
  )
}
