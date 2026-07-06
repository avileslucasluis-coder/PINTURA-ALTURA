"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "593988743184"; 
  const message = "Hola TUPINTOR LUIS, quisiera solicitar una cotización para un trabajo en altura.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#0F4C5C] text-white p-4 rounded-full shadow-[0_16px_40px_rgba(15,76,92,0.22)] hover:shadow-[0_18px_45px_rgba(201,75,58,0.22)] hover:bg-[#C94B3A] transition-all flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={32} />
    </motion.a>
  );
}
