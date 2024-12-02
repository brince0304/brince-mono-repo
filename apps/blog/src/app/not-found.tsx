'use client';
import CustomError from '@/components/Error/CustomError/CustomError';

export default function NotFoundError() {
  const handleClick = () => {
    const path = window.location.pathname;
    const redirectPath = path.includes('posts') ? '/posts' : '/';
    window.location.href = redirectPath;
  };

  return (
    <CustomError
      code={404}
      message={'페이지를 찾을 수 없어요.'}
      emoji={'😢'}
      onClick={handleClick}
    />
  );
}
