import { motion } from "framer-motion";

function WelcomePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center bg-white p-6 rounded-2xl shadow space-y-3"
    >
      <h1 className="text-2xl font-bold text-blue-700">Welcome to PDF Toolbox</h1>
      <p className="text-gray-600 text-sm">
        Edit PDFs directly inside Telegram: merge, compress, lock, and more.
      </p>
      <motion.img
        src="/preview.gif"
        alt="Preview Animation"
        className="mx-auto rounded-xl shadow"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1.05 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
      />
    </motion.div>
  );
}

export default WelcomePreview;
