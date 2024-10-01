'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
  likes?: number;
  imageUrl?: string;
  comments: number;
  priority?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  excerpt,
  slug,
  date,
  tags,
  imageUrl,
  comments,
  likes = 0,
  priority = false,
}) => {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  return (
    <Link href={`/posts/${slug}`} className="block w-full max-w-md mx-auto">
      <motion.div transition={{ duration: 0.2 }} whileHover={{ scale: 1.02 }}>
        <Card className="group overflow-hidden">
          {imageUrl && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                title={title}
                layout="fill"
                objectFit="cover"
                priority={priority}
              />
            </div>
          )}
          <CardContent className="p-5">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{formatDate(date)}</p>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <motion.div key={tag} whileHover={{ scale: 1.1 }}>
                  <Badge variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center px-5 py-3 bg-muted/50">
            <div className={'flex items-center space-x-4'}>
              <div className="flex items-center">
                <Heart className="mr-1 h-4 w-4" />
                <span className="text-xs">{likes}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="mr-1 h-4 w-4" />
                <span className="text-xs">{comments}</span>
              </div>
            </div>
            <motion.div whileHover={{ x: 5 }}>
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold group-hover:text-primary transition-colors"
              >
                Read more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export { PostCard };
