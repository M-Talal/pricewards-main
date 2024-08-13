"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { title } from "process";

export default function CustomAccordion({
  children,
  idx,
  title,
  handleAccordion,
}: {
  children: React.ReactNode;
  idx: string;
  title: string;
  handleAccordion: () => void;
}) {
  console.log(idx);
  return (
    <AccordionItem value={`${idx}`} onClick={handleAccordion}>
      <AccordionTrigger className="hover:no-underline ">
        {title}
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
