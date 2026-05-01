import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const phoneNumber = "5561995957461"; // Updated with user's real number
  const message = encodeURIComponent("Olá Márcio! Vi seu portfolio BEEND.TECH e gostaria de conversar.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-brand-bg border border-brand-primary flex items-center justify-center text-brand-primary shadow-[0_0_15px_rgba(255,176,0,0.4)] hover:shadow-[0_0_25px_rgba(255,176,0,0.6)] transition-shadow group overflow-hidden"
      title="WhatsApp"
    >
      {/* Scanline effect inside the button */}
      <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-colors pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-primary/20 animate-[scanline_4s_linear_infinite]" />
      
      <svg 
        viewBox="0 0 24 24" 
        className="w-7 h-7 relative z-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.006 12.039c0 2.12.54 4.19 1.566 6.04L0 24l6.102-1.6c1.785.973 3.791 1.487 5.868 1.487h.005c6.632 0 12.037-5.404 12.04-12.04a11.801 11.801 0 00-3.418-8.525"/>
      </svg>
      
      {/* Glow dot */}
      <div className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(255,176,0,1)]" />
    </motion.a>
  );
}
