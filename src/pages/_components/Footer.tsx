import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer
      className="py-10 border-t border-white/10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <motion.span
              className="text-xl font-extrabold text-white tracking-tight inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              NADOM<span className="text-white/60">.BG</span>
            </motion.span>
            <p className="text-sm text-white/40 mt-1">
              Национална агенция домоуправител
            </p>
          </motion.div>
          <motion.p
            className="text-sm text-white/30"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            &copy; {new Date().getFullYear()} NADOM.BG. Всички права запазени.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}
