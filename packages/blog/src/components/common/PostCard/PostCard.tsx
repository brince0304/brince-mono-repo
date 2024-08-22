import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

export interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[] | [];
  likes?: number | null;
  imageUrl?: string | null;
  comments: number;
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
}) => {
  return (
    <Link href={`/posts/${slug}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        {imageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 hover:opacity-80"
            />
          </div>
        )}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <span>{date}</span>
              <div className="flex items-center mr-4 ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.09C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                    fill="currentColor"
                  />
                </svg>
                <span>{likes}</span>
              </div>
              <div className="flex items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"
                    fill="currentColor"
                  />
                </svg>
                <span>{comments}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="flex items-center justify-center ml-4">
                관심주기
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
