import { AnimatePresence, motion } from "framer-motion";

function Alert({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          height: 0,
          opacity: 0,
        }}
        animate={{
          height: "auto",
          opacity: 1,
        }}
        exit={{
          height: 0,
          opacity: 0,
        }}
      >
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {children}
          <button
            type="button"
            onClick={onClose}
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
export default Alert;
