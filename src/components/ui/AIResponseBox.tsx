import React from "react";

interface AIResponseBoxProps {
	children: React.ReactNode;
	className?: string;
}

export const AIResponseBox: React.FC<AIResponseBoxProps> = ({
	children,
	className = "",
}) => {
	return (
		<div
			className={`flex justify-center w-full flex-1 ${className}`}
		>
			{children}
		</div>
	);
};
