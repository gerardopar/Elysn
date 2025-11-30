import { motion } from "motion/react";

export const MessageTypingBubble = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="inline-flex items-center px-3 py-2 rounded-2xl bg-secondary-dark/60 backdrop-blur-sm shadow-sm"
      >
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-white/70 rounded-full"
              animate={{
                y: ["0%", "-35%", "0%"],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 0.9,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MessageTypingBubble;
