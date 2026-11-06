import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCampusCareStore } from '../../store/campusCareStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCampusCareStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-floating border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-white/95 border-campus-green/30 text-campus-charcoal'
                : toast.type === 'alert'
                ? 'bg-campus-coral-light/95 border-campus-coral/30 text-campus-charcoal'
                : 'bg-white/95 border-campus-border text-campus-charcoal'
            }`}
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-campus-green shrink-0 mt-0.5" />
            )}
            {toast.type === 'alert' && (
              <AlertCircle className="w-5 h-5 text-campus-coral shrink-0 mt-0.5" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-campus-forest shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-sm font-medium leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-campus-grey hover:text-campus-charcoal p-0.5 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

