"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { EnquiryProvider, useEnquiry } from "./EnquiryContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { openEnquiry } = useEnquiry();

  return (
    <>
      <PageLoader />
      <Navbar onOpenEnquiry={openEnquiry} />
      {children}
      <Footer onOpenEnquiry={openEnquiry} />
    </>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <EnquiryProvider>
      <LayoutContent>{children}</LayoutContent>
    </EnquiryProvider>
  );
}
