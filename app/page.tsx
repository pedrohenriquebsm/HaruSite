import Header from "./_components/header/header";
import Hero from "./_components/hero/hero";
import Footer from "./_components/footer/footer";
import ProductsGallery from "./_components/productsGallery/productsGallery";
import HomeContent from "./_components/home/homeContent";

export default function Home() {
  return (
    <>
      <Hero />
      <Header />
      <main id="main" tabIndex={-1}>
        <ProductsGallery />
        <HomeContent />
      </main>
      <Footer />
    </>
  );
}
