import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar/avatar";

interface BrinceAvatarProps {
	className?: string;
}

const BrinceAvatar: React.FC<BrinceAvatarProps> = ({ className }) => {
	const url =
		"https://media.licdn.com/dms/image/v2/D5603AQEjKzwvM_Loaw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718484829498?e=1730332800&v=beta&t=doUMfW0chxXKDP_gPCxgCYCFHScCdWj-gTJfzCcmZZw";

	return (
		<Avatar className={className}>
			<AvatarImage src={url} />
			<AvatarFallback>브린스</AvatarFallback>
		</Avatar>
	);
};

export default BrinceAvatar;
