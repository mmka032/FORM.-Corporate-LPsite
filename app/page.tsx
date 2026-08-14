"use client"

import ContactForm from "@/components/sections/ContactForm";
// import FormButton from "@/components/ui/FormButton";
// import FormField from "@/components/ui/FormField";
import HeaderCTA from "@/components/ui/HeaderCTA";

// import SectionHeading from "@/components/ui/SectionHeading";
import { useState } from "react";

export default function Home() {

  return (
    <>
    {/* <SectionHeading
      en="About"
      ja="美しいだけでは、終わらせない。"
      jaSp={{
        first: "美しいだけでは、",
        second: "終わらせない。",
      }}
    /> */}

    <HeaderCTA/>


    <ContactForm/>
    </>
    );
}
