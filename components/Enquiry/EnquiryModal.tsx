"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Send,
  Camera,
  Frame,
  Info,
  Ruler,
  Layers,
} from "lucide-react";
import {
  STUDIO_INFO,
  SHOOT_TYPES,
  FRAMING_MATERIALS,
  ENQUIRY_FRAME_SIZES,
} from "@/data/portfolioData";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialQuote?: number;
}

// ── Shared class constants ────────────────────────────────────────────────────

const INPUT_BASE =
  "w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pr-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400";
const LABEL_CLASS = "text-xs font-semibold text-zinc-300 uppercase block mb-1";
const SUBMIT_BTN_CLASS =
  "w-full py-3.5 rounded-xl bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2";

// ── FormField: reusable label + optional icon + input/select/textarea ─────────

interface FormFieldProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function FormField({ label, icon, children }: FormFieldProps) {
  return (
    <div>
      <label className={LABEL_CLASS}>{label}</label>
      {icon ? (
        <div className="relative">
          <span className="absolute left-3 top-3 text-zinc-500">{icon}</span>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

// ── IconInput: standard text/date/tel/email input with left icon ──────────────

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

function IconInput({ icon: _icon, ...props }: IconInputProps) {
  return <input {...props} className={`${INPUT_BASE} pl-9`} />;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function EnquiryModal({
  isOpen,
  onClose,
  initialService,
  initialQuote,
}: EnquiryModalProps) {
  const [activeFormTab, setActiveFormTab] = useState<"photoshoot" | "framing">("photoshoot");
  const [submitted, setSubmitted] = useState(false);

  // Photoshoot form state
  const [photoshootData, setPhotoshootData] = useState({
    name: "",
    phone: "",
    email: "",
    shootType: SHOOT_TYPES[0],
    eventDate: "",
    location: "",
    message: "",
  });

  // Framing form state
  const [framingData, setFramingData] = useState({
    name: "",
    phone: "",
    email: "",
    frameMaterial: FRAMING_MATERIALS[0],
    frameSize: ENQUIRY_FRAME_SIZES[7], // default: 12x18
    deliveryAddress: "",
    notes: "",
  });

  const [refId, setRefId] = useState("");

  // Derive active tab safely from initialService on open (guarded against non-string event objects)
  useEffect(() => {
    if (!isOpen) return;
    const isFraming =
      typeof initialService === "string" && initialService.toLowerCase().includes("framing");
    setActiveFormTab(isFraming ? "framing" : "photoshoot");
  }, [isOpen, initialService]);

  // Lock background scroll on both documentElement and body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRefId(`${STUDIO_INFO.helplinePrefix}-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
  };

  const updatePhotoshoot = (patch: Partial<typeof photoshootData>) =>
    setPhotoshootData((prev) => ({ ...prev, ...patch }));

  const updateFraming = (patch: Partial<typeof framingData>) =>
    setFramingData((prev) => ({ ...prev, ...patch }));

  const activeTabName = activeFormTab === "photoshoot" ? photoshootData.name : framingData.name;
  const activeTabService =
    activeFormTab === "photoshoot" ? photoshootData.shootType : framingData.frameMaterial;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 h-dvh w-screen z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto overscroll-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-xl w-full my-auto glass-panel rounded-3xl p-6 sm:p-8 border-amber-500/30 shadow-2xl overflow-hidden"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="sticky top-0 float-right z-30 p-2.5 rounded-full bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-700 hover:border-amber-500/50 shadow-md transition-colors -mt-1 -mr-1 cursor-pointer"
            title="Close form"
          >
            <X className="size-5" />
          </button>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-2 p-1.5 bg-zinc-900/90 rounded-2xl border border-zinc-800 max-w-xs sm:max-w-sm mx-auto mt-12 mb-6 clear-both">
            {(["photoshoot", "framing"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFormTab(tab)}
                className={`flex-1 py-2 px-3 sm:px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeFormTab === tab
                    ? "bg-amber-400 text-black shadow-md shadow-amber-500/20 font-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab === "photoshoot" ? (
                  <>
                    <Camera className="size-3.5" />
                    <span>Photoshoot</span>
                  </>
                ) : (
                  <>
                    <Frame className="size-3.5" />
                    <span>Frame</span>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Form Body */}
          <div>
            {!submitted ? (
              <div>
                {/* Estimated Quote Banner */}
                {initialQuote && (
                  <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">
                      Estimated Package / Order Value:
                    </span>
                    <span className="text-amber-300 font-extrabold text-base">
                      ₹{initialQuote.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {/* ── PHOTOSHOOT FORM ── */}
                {activeFormTab === "photoshoot" && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        Book Photoshoot <span className="text-amber-400">Consultation</span>
                      </h3>
                      <p className="text-xs text-zinc-400 font-light mt-0.5">
                        Wedding, pre-wedding, beach photoshoot, baby shower &amp; bridal portraits.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Full Name *" icon={<User className="size-4" />}>
                        <IconInput
                          icon={<User className="size-4" />}
                          type="text"
                          required
                          placeholder="e.g. Ramesh & Ananya"
                          value={photoshootData.name}
                          onChange={(e) => updatePhotoshoot({ name: e.target.value })}
                        />
                      </FormField>
                      <FormField label="Phone / WhatsApp *" icon={<Phone className="size-4" />}>
                        <IconInput
                          icon={<Phone className="size-4" />}
                          type="tel"
                          required
                          placeholder="+91 9876543210"
                          value={photoshootData.phone}
                          onChange={(e) => updatePhotoshoot({ phone: e.target.value })}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Photoshoot Category *">
                        <select
                          value={photoshootData.shootType}
                          onChange={(e) => updatePhotoshoot({ shootType: e.target.value })}
                          className={`${INPUT_BASE} px-3`}
                        >
                          {SHOOT_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </FormField>
                      <FormField label="Event Date *" icon={<Calendar className="size-4" />}>
                        <IconInput
                          icon={<Calendar className="size-4" />}
                          type="date"
                          required
                          value={photoshootData.eventDate}
                          onChange={(e) => updatePhotoshoot({ eventDate: e.target.value })}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Email Address" icon={<Mail className="size-4" />}>
                        <IconInput
                          icon={<Mail className="size-4" />}
                          type="email"
                          placeholder="name@gmail.com"
                          value={photoshootData.email}
                          onChange={(e) => updatePhotoshoot({ email: e.target.value })}
                        />
                      </FormField>
                      <FormField
                        label="Shoot Location / Venue"
                        icon={<MapPin className="size-4" />}
                      >
                        <IconInput
                          icon={<MapPin className="size-4" />}
                          type="text"
                          placeholder="e.g. Virudhunagar, Madurai, Resort, Beach"
                          value={photoshootData.location}
                          onChange={(e) => updatePhotoshoot({ location: e.target.value })}
                        />
                      </FormField>
                    </div>

                    <FormField label="Event Notes & Special Requests">
                      <textarea
                        rows={3}
                        placeholder="Share details about wedding rituals, outdoor locations, or budget preferences..."
                        value={photoshootData.message}
                        onChange={(e) => updatePhotoshoot({ message: e.target.value })}
                        className={`${INPUT_BASE} p-3`}
                      />
                    </FormField>

                    <button type="submit" className={`${SUBMIT_BTN_CLASS} cursor-pointer`}>
                      <Send className="size-4" />
                      <span>Submit Enquiry</span>
                    </button>
                  </form>
                )}

                {/* ── FRAMING FORM ── */}
                {activeFormTab === "framing" && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        Custom Photo Frame <span className="text-amber-400">Order</span>
                      </h3>
                      <p className="text-xs text-zinc-400 font-light mt-0.5">
                        Acrylic, Teak Wood, Museum Canvas &amp; Flush Mount Albums.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Full Name *" icon={<User className="size-4" />}>
                        <IconInput
                          icon={<User className="size-4" />}
                          type="text"
                          required
                          placeholder="Your Name"
                          value={framingData.name}
                          onChange={(e) => updateFraming({ name: e.target.value })}
                        />
                      </FormField>
                      <FormField label="Phone / WhatsApp *" icon={<Phone className="size-4" />}>
                        <IconInput
                          icon={<Phone className="size-4" />}
                          type="tel"
                          required
                          placeholder="+91 9876543210"
                          value={framingData.phone}
                          onChange={(e) => updateFraming({ phone: e.target.value })}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label="Frame Material / Style *"
                        icon={<Layers className="size-4" />}
                      >
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-zinc-500">
                            <Layers className="size-4" />
                          </span>
                          <select
                            value={framingData.frameMaterial}
                            onChange={(e) => updateFraming({ frameMaterial: e.target.value })}
                            className={`${INPUT_BASE} pl-9`}
                          >
                            {FRAMING_MATERIALS.map((mat) => (
                              <option key={mat} value={mat}>
                                {mat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </FormField>
                      <FormField
                        label="Frame Dimension / Size *"
                        icon={<Ruler className="size-4" />}
                      >
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-zinc-500">
                            <Ruler className="size-4" />
                          </span>
                          <select
                            value={framingData.frameSize}
                            onChange={(e) => updateFraming({ frameSize: e.target.value })}
                            className={`${INPUT_BASE} pl-9`}
                          >
                            {ENQUIRY_FRAME_SIZES.map((sz) => (
                              <option key={sz} value={sz}>
                                {sz}
                              </option>
                            ))}
                          </select>
                        </div>
                      </FormField>
                    </div>

                    <FormField
                      label="Delivery Address & City *"
                      icon={<MapPin className="size-4" />}
                    >
                      <IconInput
                        icon={<MapPin className="size-4" />}
                        type="text"
                        required
                        placeholder="Street Address, City, Pincode (e.g. Virudhunagar, Madurai, Chennai)"
                        value={framingData.deliveryAddress}
                        onChange={(e) => updateFraming({ deliveryAddress: e.target.value })}
                      />
                    </FormField>

                    <FormField label="Custom Framing Notes / Photo Upload Details">
                      <textarea
                        rows={3}
                        placeholder="Specify matting border colors, quantity needed, or photo softcopy link..."
                        value={framingData.notes}
                        onChange={(e) => updateFraming({ notes: e.target.value })}
                        className={`${INPUT_BASE} p-3`}
                      />
                    </FormField>

                    <p className="text-xs text-zinc-400 font-light italic flex items-center gap-1.5 pt-1">
                      <Info className="size-3.5 text-amber-400 shrink-0" />
                      <span>
                        <strong className="text-amber-300 not-italic font-semibold">* Note:</strong>{" "}
                        Prices are variable depending on custom finish &amp; bulk order
                        requirements.
                      </span>
                    </p>

                    <button type="submit" className={`${SUBMIT_BTN_CLASS} cursor-pointer`}>
                      <Send className="size-4" />
                      <span>Submit Enquiry</span>
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* ── Success State ── */
              <div className="text-center py-8 space-y-4">
                <div className="size-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {activeFormTab === "photoshoot"
                    ? "Photoshoot Enquiry Received!"
                    : "Frame Order Enquiry Received!"}
                </h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you{" "}
                  <span className="text-amber-300 font-bold">{activeTabName || "Customer"}</span>.
                  Your enquiry for{" "}
                  <span className="text-amber-300 font-bold">{activeTabService}</span> has been
                  received by {STUDIO_INFO.name}.
                </p>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
                  <p>
                    Reference ID:{" "}
                    <span className="text-white font-mono font-bold">
                      {refId || `${STUDIO_INFO.helplinePrefix}-8842`}
                    </span>
                  </p>
                  <p className="mt-1">
                    {STUDIO_INFO.city} Studio Helpline:{" "}
                    <span className="text-amber-400 font-bold">{STUDIO_INFO.phone}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Back to Portfolio
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
