"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import EnquiryModal from "@/components/Enquiry/EnquiryModal";

interface EnquiryContextType {
  openEnquiry: (service?: unknown, quote?: unknown) => void;
  closeEnquiry: () => void;
  isOpen: boolean;
  initialService?: string;
  initialQuote?: number;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>(undefined);
  const [initialQuote, setInitialQuote] = useState<number | undefined>(undefined);

  // Stable function references — won't cause unnecessary re-renders in consumers
  const openEnquiry = useCallback((service?: unknown, quote?: unknown) => {
    const validService = typeof service === "string" ? service : undefined;
    const validQuote = typeof quote === "number" ? quote : undefined;
    setInitialService(validService);
    setInitialQuote(validQuote);
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Stable context value — only re-creates when state changes
  const contextValue = useMemo(
    () => ({ openEnquiry, closeEnquiry, isOpen, initialService, initialQuote }),
    [openEnquiry, closeEnquiry, isOpen, initialService, initialQuote]
  );

  return (
    <EnquiryContext.Provider value={contextValue}>
      {children}
      <EnquiryModal
        isOpen={isOpen}
        onClose={closeEnquiry}
        initialService={initialService}
        initialQuote={initialQuote}
      />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    return {
      openEnquiry: () => {},
      closeEnquiry: () => {},
      isOpen: false,
    };
  }
  return context;
}
