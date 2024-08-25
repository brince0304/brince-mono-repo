"use client";
import CustomError from "@/components/Error/CustomError/CustomError";

export default function NotFoundError() {
	return (
		<CustomError code={404} message={"페이지를 찾을 수 없어요."} emoji={"😢"} />
	);
}
