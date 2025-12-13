import { useEffect, useState } from "react"
import { motion, type Variants } from "motion/react"
import type { CSSProperties, FormEvent } from "react"
import { Rocket, Mail, Clock, Sparkles } from "lucide-react"

export default function CommingSoon() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 20,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitted(true)
    const t = setTimeout(() => setIsSubmitted(false), 3000)
    setEmail("")

    return () => clearTimeout(t)
  }

  // ✅ Typed variants để khỏi bị lint/ts cà khịa
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // ⚠️ cái này không cần Variants vì mày dùng animate="animate" trực tiếp
  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  }

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  }

  const ringVars = {
    "--tw-ring-color": "#F79009",
    "--tw-ring-opacity": 0.5,
  } as CSSProperties

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-10 top-20 h-72 w-72 rounded-full opacity-20"
          style={{ background: "#F79009" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full opacity-20"
          style={{ background: "#F79009" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.25, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        className="z-10 w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8 flex justify-center"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full opacity-50 blur-xl"
              style={{ background: "#F79009" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "#F79009" }}
            >
              <Rocket className="h-10 w-10 text-white" />
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <motion.div variants={itemVariants} className="mb-4">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4" style={{ color: "#F79009" }} />
              <span style={{ color: "#F79009" }}>
                Something amazing is coming
              </span>
            </motion.div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-6 text-gray-900">
            Sắp Ra Mắt
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-2xl text-gray-600"
          >
            Chúng tôi đang âm thầm chuẩn bị cho một điều mới mẻ. Mọi thứ sẽ sớm
            sẵn sàng.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute left-0 top-1/4 opacity-30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6" style={{ color: "#F79009" }} />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-1/4 right-0 opacity-30">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-8 w-8" style={{ color: "#F79009" }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
