import { motion, AnimatePresence } from "framer-motion"

export default function TabContent({ active, children }: any) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="hide-scrollbar flex-1 overflow-y-auto"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
