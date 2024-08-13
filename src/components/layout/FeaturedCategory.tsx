"use client";
import React from "react";
import { Button } from "../ui/button";
import CategoryCard from "../card/CategoryCard";
import Link from "next/link";
import { categories, SLIDER_SETTINGS } from "@/utils/constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function FeaturedCategory() {
  return (
    <div>
  <div className="flex flex-wrap gap-5 justify-between mb-5">
    <h1 className="text-3xl font-bold text-center sm:text-left">Featured Category</h1>
  </div>
  <div>
    <Slider {...SLIDER_SETTINGS.setting} autoplay>
      {categories.map((category, index) => (
        <CategoryCard key={index} {...category} />
      ))}
    </Slider>
  </div>
</div>
  );
}
