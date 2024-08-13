export interface CONST {
  readonly APP_NAME: string;
  readonly APP_LOGO: string;
  readonly DEFAULT_USER_IMAGE: string;

  readonly ENCRYPT_KEY: string;

  readonly RUN_MODE: {
    readonly PRODUCTION: string;
    readonly STAGING: string;
    readonly DEVELOPMENT: string;
  };
  readonly APP_ROUTES: {
    readonly BASE: string;
    // readonly DEFAULT: string;
  };
}

export interface ENDPOINTS {
  readonly hero_picture: string;
}

export const CONST: CONST = {
  APP_NAME: "Zameen Visit",
  APP_LOGO: "",
  DEFAULT_USER_IMAGE:
    "https://chatapp-storage-2022.s3.us-west-2.amazonaws.com/user_pic.jpg",
  ENCRYPT_KEY: "ZAMEEN_VISIT_2024",
  RUN_MODE: {
    PRODUCTION: "PRODUCTION",
    STAGING: "STAGING",
    DEVELOPMENT: "DEVELOPMENT",
  },
  APP_ROUTES: {
    BASE: "https://pricewards-server.vercel.app", // ! for non-null assertion
    // DEFAULT: "/user/login",
  },
};

export const ENDPOINTS: ENDPOINTS = {
  hero_picture: `https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/2024/2024-08/dkt_1500.webp`,
};

export const SLIDER_SETTINGS = {
  setting: {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
};

export const categories = [
  {
    name: "Custom Suit",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/suit_2.jpg",
    link: "/custom-clothing/suits/66b67495254a79bac4516a23",
  },
  {
    name: "Custom Shirt",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/shirt_1.webp",
    link: "/custom-clothing/shirts/66a916c01f4e97196a54e62d",
  },
  {
    name: "Blazer",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/blazer_2.jpg",
    link: "/search",
  },
  {
    name: "Wedding",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/wedding_2.jpg",
    link: "/search",
  },
  {
    name: "Polo shirts",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/polo_2.jpg",
    link: "/custom-clothing/Polo%20Shirts/66ae819ac8511a93dabc76ca",
  },
  {
    name: "Tuxedos",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/tuxedo_2.jpg",
    link: "/search",
  },
  {
    name: "Vests",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/vest_2.jpg",
    link: "/search",
  },
  {
    name: "Shoes",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/shoes_loafers_2.jpg",
    link: "/search",
  },
  {
    name: "Jeans",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/jeans_2.jpg",
    link: "/custom-clothing/Custom%20Jeans/66ae8457c8511a93dabc76e4",
  },
  {
    name: "Field Jackets",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/field_2.jpg",
    link: "/search",
  },
  {
    name: "Trenchcoats",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/trench_2.jpg",
    link: "/search",
  },
  {
    name: "Wool Coats",
    products: "8.2k",
    imageUrl:
      "https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/home/main_products_block_firma/coat_2.jpg",
    link: "/search",
  },
];

// https://pricewardsserver.onrender.com
