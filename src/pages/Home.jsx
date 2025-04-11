import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Code, BookOpen, Award } from 'lucide-react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('learn');
  
  const tabs = [
    { id: 'learn', label: 'Learn', icon: <BookOpen size={18} /> },
    { id: 'practice', label: 'Practice', icon: <Code size={18} /> },
    { id: 'progress', label: 'Progress', icon: <Award size={18} /> }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="mb-4 font-bold">
            Begin Your Coding Journey with <span className="text-gradient">Hello World</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
            Learn programming fundamentals through interactive tutorials, starting with the classic first program every developer writes.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#get-started"
              className="btn btn-primary flex items-center gap-2"
            >
              Get Started <ChevronRight size={16} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#languages"
              className="btn btn-outline"
            >
              Explore Languages
            </motion.a>
          </div>
        </motion.div>
      </section>

      <section id="get-started" className="mb-16">
        <div className="card-neu overflow-hidden">
          <div className="flex border-b border-surface-200 dark:border-surface-700 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative
                  ${activeTab === tab.id 
                    ? 'text-primary dark:text-primary-light' 
                    : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                  }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                  />
                )}
              </button>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'learn' && (
                <div className="px-6 pb-6">
                  <MainFeature />
                </div>
              )}
              
              {activeTab === 'practice' && (
                <div className="px-6 pb-6">
                  <div className="text-center py-12">
                    <h3 className="mb-4">Practice Mode</h3>
                    <p className="text-surface-500 dark:text-surface-400 mb-4">
                      Complete the "Hello World" tutorial first to unlock practice exercises.
                    </p>
                    <button 
                      onClick={() => setActiveTab('learn')}
                      className="btn btn-outline"
                    >
                      Go to Tutorial
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'progress' && (
                <div className="px-6 pb-6">
                  <div className="text-center py-12">
                    <h3 className="mb-4">Your Progress</h3>
                    <p className="text-surface-500 dark:text-surface-400 mb-4">
                      Complete tutorials to track your progress and earn achievements.
                    </p>
                    <div className="w-full max-w-md mx-auto bg-surface-100 dark:bg-surface-800 rounded-full h-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-secondary h-full w-0"></div>
                    </div>
                    <p className="mt-2 text-sm text-surface-500">0% Complete</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="languages" className="mb-16">
        <h2 className="text-center mb-8">Available Languages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['JavaScript', 'Python', 'Java'].map((language, index) => (
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card hover:shadow-soft transition-shadow"
            >
              <h3 className="mb-3">{language}</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-4">
                Learn how to write your first "Hello World" program in {language}.
              </p>
              <button 
                onClick={() => setActiveTab('learn')}
                className="btn btn-outline w-full"
              >
                Start Learning
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;