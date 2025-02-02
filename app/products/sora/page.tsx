'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { useState } from 'react'
import { Inter } from 'next/font/google'
import { AnimatedGraph } from "@/components/animated-graph"

const inter = Inter({ subsets: ['latin'] })

export default function SoraPage() {
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsExiting(true)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <>
      <SiteHeader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen bg-black"
      >
        <AnimatePresence mode="wait" onExitComplete={() => router.back()}>
          {!isExiting && (
            <motion.article 
              key="article"
              className="container mx-auto max-w-screen-xl px-6 sm:px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-24"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mx-auto max-w-3xl">
                <motion.div
                  variants={itemVariants}
                  className="mb-8"
                >
                  <Button
                    onClick={handleBack}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-full px-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </motion.div>
                <motion.header variants={itemVariants} className="mb-12 md:mb-16 text-center">
                  <motion.time 
                    variants={itemVariants}
                    dateTime="2024-12-09" 
                    className="block text-sm text-white/60 mb-4"
                  >
                    December 9, 2024
                  </motion.time>
                  <motion.h1 
                    variants={itemVariants}
                    className="text-4xl md:text-6xl font-medium text-white mb-6"
                  >
                    Sora is here
                  </motion.h1>
                  <motion.p 
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-white/90 mb-4"
                  >
                    We&apos;re moving our video generation model out of research preview.
                  </motion.p>
                  <motion.div
                    variants={itemVariants}
                    className={`text-sm text-white/60 ${inter.className} font-medium`}
                  >
                    Chirag S J
                  </motion.div>
                </motion.header>
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 rounded-full px-8"
                  >
                    <Link href="#learn-more">Learn more</Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    className="text-white hover:bg-white/10 rounded-full px-8"
                  >
                    <Link href="#system-card" className="flex items-center gap-2">
                      System Card
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="prose prose-invert mx-auto px-2 sm:px-0"
                >
                  <p className="text-lg md:text-xl text-white/90">
                    Our video generation model is rolling out at{" "}
                    <Link href="https://sora.com" className="text-white hover:text-white/90 underline underline-offset-4">
                      sora.com
                    </Link>
                    .
                  </p>
                  <p className="text-lg md:text-xl text-white/90">
                    Earlier this year, we{" "}
                    <Link href="#" className="text-white hover:text-white/90 underline underline-offset-4">
                      introduced Sora
                    </Link>
                    , our model that can create realistic videos from text, and shared{" "}
                    <Link href="#" className="text-white hover:text-white/90 underline underline-offset-4">
                      our initial research
                    </Link>{" "}
                    progress on world simulation. Sora serves as a foundation for AI that understands and simulates reality—an important step towards developing models that can interact with the physical world.
                  </p>
                  <p className="text-lg md:text-xl text-white/90">
                    We&apos;re releasing it today as a standalone product at Sora.com to ChatGPT Plus and Pro users.
                  </p>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="prose prose-invert mx-auto px-2 sm:px-0 mt-16"
                >
                  <h2 className="text-2xl font-semibold mb-4">Sora Performance Metrics</h2>
                  <p className="text-lg md:text-xl text-white/90 mb-4">
                    Our latest metrics show significant improvements in Sora&apos;s performance across various benchmarks.
                    The graph below illustrates the progress we&apos;ve made over the past six months in terms of video quality,
                    generation speed, and model efficiency:
                  </p>
                  <AnimatedGraph />
                  <p className="text-sm text-white/60 mt-2">
                    Note: The values represent a composite score of video quality, generation speed, and model efficiency.
                    Higher values indicate better overall performance.
                  </p>
                </motion.div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

