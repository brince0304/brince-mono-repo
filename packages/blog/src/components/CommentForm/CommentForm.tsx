'use client';
import Button from '@/components/common/Button/Button';
import Text from '@/components/common/Text/Text';
import usePostComment from '@/hooks/comment/usePostComment';
import type React from 'react';
import { useState } from 'react';

interface CommentFormProps {
  pageId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ pageId }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const { mutate: postComment } = usePostComment(pageId);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setAuthor('');
    setText('');
    postComment({ author, text });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-md transition-colors duration-200">
      <Text variant="h3" className="mb-4">
        댓글 작성
      </Text>
      <div className="mb-4">
        <label htmlFor="nickname" className="block mb-2">
          <Text variant="body-small">닉네임</Text>
        </label>
        <input
          type="text"
          id="nickname"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          placeholder="닉네임을 입력하세요"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2">
          <Text variant="body-small">내용</Text>
        </label>
        <textarea
          id="content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          placeholder="댓글 내용을 입력하세요"
          rows={4}
          required
        />
      </div>
      <Button variant={'primary'} onClick={handleSubmit}>
        <Text variant="body" className={'text-white dark:text-gray-900'}>
          작성하기
        </Text>
      </Button>
    </div>
  );
};

export default CommentForm;
