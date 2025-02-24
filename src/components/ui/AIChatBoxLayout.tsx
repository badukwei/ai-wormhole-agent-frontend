import React from "react";

interface AIChatBoxLayoutProps {
	children: React.ReactNode;
	className?: string;
}

export const AIChatBoxLayout: React.FC<AIChatBoxLayoutProps> = ({
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
