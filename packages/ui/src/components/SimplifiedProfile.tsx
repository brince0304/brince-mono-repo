'use client';

import React from 'react';
import { BrinceAvatar } from './BrinceAvatar';
import { Card, CardContent } from './ui/card';

const SimplifiedProfile = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center space-x-4 p-4">
        <BrinceAvatar className="h-12 w-12" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">백석현 (Brince)</p>
          <p className="text-sm text-gray-500">
            Frontend Developer | 코드로 뭔가를 만드는 것을 좋아해요 🚀
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { SimplifiedProfile };
