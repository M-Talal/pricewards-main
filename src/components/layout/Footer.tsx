import Image from "next/image";
import Link from "next/link";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Github,
  Instagram,
  Linkedin,
  Package2,
  Twitter,
  Youtube,
} from "lucide-react";

const FooterServices = [
  {
    title: "About Pricewards",
    services: [
      // {
      //   text: "Information",
      //   link: "/information",
      // },
      {
        text: "Return & Exchange Policy",
        link: "/return-policy",
      },
      {
        text: "Legal Terms",
        link: "/legal-terms",
      },
      {
        text: "Measurements",
        link: "/measurement-guide",
      },
    ],
  },
  {
    title: "About Pricewards",
    services: [
      {
        text: "FAQ",
        link: "/faq",
      },
      {
        text: "Return & Exchange Policy",
        link: "/return-policy",
      },
      {
        text: "Privacy Policy",
        link: "/privacy-policy",
      },
      // {
      //   text: "Accessibility",
      //   link: "/accessibility",
      // },
      // {
      //   text: "Contact Us",
      //   link: "/contact-us",
      // },
    ],
  },
  // {
  //   title: "Account",
  //   services: [
  //     {
  //       text: "Membership",
  //       link: "/membership",
  //     },
  //     {
  //       text: "Address",
  //       link: "/address",
  //     },
  //     {
  //       text: "Coupons",
  //       link: "/coupons",
  //     },
  //   ],
  // },
  {
    title: "Contact Us",
    services: [
      {
        text: "For Pricewards Consumer Complaint Services",
        link: "",
      },
      {
        text: "(684) 555-0102 and curtis.weaver@example.com",
        link: "tel:+16845550102",
      },
      {
        text: "Customers Complaint Service",
        link: "",
      },
      {
        text: "Directorate Generate of the Republic of Indonesia",
        link: "",
      },
      {
        text: "(480) 555-0103",
        link: "tel:+14805550103",
      },
    ],
  },
];

const socials = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/bilalsaddique09/?hl=en",
    icon: <Instagram />,
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/muhammad-bilal-9b6b9a1b3/",
    icon: <Linkedin />,
  },
  {
    name: "Github",
    link: "https://github.com/muhammadbilal10",
    icon: <Github />,
  },
  {
    name: "Twitter",
    link: "",
    icon: <Twitter />,
  },
  {
    name: "Youtube",
    link: "",
    icon: <Youtube />,
  },
];

const Footer = () => {
  return (
    <footer className="pt-16 bg-gray-100">
  <div className="px-4 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
    <div className="col-span-1 md:col-span-3">
      {/* Uncomment and use this if you have an image */}
      {/* <Image
        src="/images/zameenVisit2.png"
        alt="Company Logo"
        className="h-16 w-auto"
        width={100}
        height={100}
      /> */}
      <div className="flex space-x-2 items-center">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Pricewards</span>
        </Link>
        <h1 className="text-2xl font-bold text-black-500">Pricewards</h1>
      </div>
      <p className="text-black-500 pt-6 w-56">
        The biggest marketplace managed by Ideologist corp, which provides
        various kinds of daily needs and hobbies.
      </p>
    </div>
    <div className="md:col-span-9 flex flex-col sm:flex-row flex-wrap justify-between gap-10">
      {FooterServices.map((service, index) => (
        <div key={index}>
          <h5 className="font-bold mb-2.5">{service.title}</h5>
          <ul className="text-customeWhite-600">
            {service.services.map((service, index) => (
              <li key={index} className="mb-2 max-w-[200px]">
                <Link href={service.link} className="text-sm hover:text-primary">
                  {service.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>

  <div className="mt-8 py-4 bg-gray-200">
    <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center flex-wrap">
      <p className="text-black-500 text-sm mb-4 sm:mb-0">
        COPYRIGHT © Pricewards CO., LTD. ALL RIGHTS RESERVED.
      </p>
      <div className="flex items-center space-x-4">
        {/* Uncomment and use this if you have social links */}
        {/* {socials.map((social) => (
          <Link
            href={social.link}
            className="hover:text-primary"
            key={social.name}
          >
            {social.icon}
          </Link>
        ))} */}
        <Link href="/legal-terms" className="hover:text-primary font-bold">
          Term of use
        </Link>
        <Link href="/privacy-policy" className="hover:text-primary font-bold">
          Privacy Policy
        </Link>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
