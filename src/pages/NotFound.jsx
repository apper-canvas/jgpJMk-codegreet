import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="text-9xl font-bold text-gradient mb-4">404</div>
          <h1 className="mb-4">Page Not Found</h1>
          <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="btn btn-primary flex items-center gap-2">
              <Home size={18} />
              Back to Home
            </Link>
          </motion.div>
        </div>
        
        <div className="mt-12 p-6 card-neu max-w-md mx-auto">
          <h3 className="mb-4">Did you know?</h3>
          <p className="text-surface-600 dark:text-surface-300">
            The "404 Not Found" error is one of the most common HTTP status codes, indicating that the server couldn't find the requested resource.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;