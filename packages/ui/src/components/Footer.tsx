'use client';

import { Card, CardContent } from './ui/card';

const Footer = () => {
  return (
    <Card className="mt-8 border-0 rounded-none shadow-none">
      <CardContent className="pt-6">
        <div className="container mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col space-y-4">
              <p className="text-2xl font-bold">BRIN&lt;/&gt;E</p>
              <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { Footer };
