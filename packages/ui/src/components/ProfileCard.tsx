'use client';

import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from 'lucide-react';
import React from 'react';
import { BrinceAvatar } from './BrinceAvatar';
import { Card } from './ui/card';
import {
  BLOG_OWNER,
  BLOG_OWNER_JOB,
  BLOG_OWNER_JOB_DESCRIPTION,
  GITHUB_URL,
  LINKEDIN_URL,
} from '../lib/constants';

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full mx-auto p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <BrinceAvatar className="w-40 h-40" />
          </motion.div>
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100"
            >
              {BLOG_OWNER}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-4"
            >
              {BLOG_OWNER_JOB}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl leading-relaxed"
            >
              {BLOG_OWNER_JOB_DESCRIPTION}
            </motion.p>
            <div className="flex justify-center md:justify-start space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <GithubIcon size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <LinkedinIcon size={24} />
              </motion.a>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export { ProfileCard };
