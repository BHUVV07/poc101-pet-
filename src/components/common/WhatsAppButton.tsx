'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '919876543210';
  const text = encodeURIComponent('Hello Manasa Vet Pharma Support! I would like to inquire about your veterinary consultations and pharmacy supplies.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20ba5a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      title="Chat with Pharma Support"
      id="whatsapp-sticky-btn"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
      
      {/* Subtle glowing ring to attract premium attention */}
      <span className="absolute -inset-1 rounded-full border border-[#25D366] opacity-30 animate-ping pointer-events-none" />
    </motion.a>
  );
}
