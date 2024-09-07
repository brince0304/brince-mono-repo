import type React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar/avatar';

interface BrinceAvatarProps {
  className?: string;
}

const BrinceAvatar: React.FC<BrinceAvatarProps> = ({ className }) => {
  const url =
    'https://avatars.githubusercontent.com/u/110673427?s=400&u=b32c9bbb7d88e6c54f4e7dca4a3c2a2ec24c721c&v=4';

  return (
    <Avatar className={className}>
      <AvatarImage src={url} alt={'Brince'} />
      <AvatarFallback>B</AvatarFallback>
    </Avatar>
  );
};

export default BrinceAvatar;
