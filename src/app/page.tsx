import Header from "@/components/landing/header"
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import CTA from "@/components/landing/cta"
import Footer from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main style={{ width: "100%", overflowX: "hidden" }}>
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}