import FeaturedCategory from "@/components/layout/FeaturedCategory";
import PopularProducts from "@/components/layout/PopularProducts";
import StyleShowcase from "@/components/layout/StyleShowcase";
import Image from "next/image";
import OutfitIdeas_1 from "@/assets/images/out-fit-2.png";
import OutFitImageOne from "@/assets/images/out-fit-1.png";
import { Button } from "@/components/ui/button";
import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import GridLayout from "@/components/layout/GridLayout";

export default function Home() {
  return (
    <main>
      <section>
        <Navbar />
      </section>
      <section className="relative overflow-hidden h-[100vh] w-full bg-cover md:bg-[center_top_-2rem] bg-[center_right_-10rem] bg-no-repeat bg-[url('https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/2024/2024-08/dkt_1500.webp')]"></section>
      <div className=" mx-auto px-8">
        <section className="my-20 pt-20">
          <FeaturedCategory />
        </section>
        <section className="">
          <PopularProducts />
        </section>
        <section className="my-20 pt-20">
          <GridLayout />
        </section>
      </div>
      <section>
        <Footer />
      </section>
    </main>
  );
}
