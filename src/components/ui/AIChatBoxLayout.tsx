"use client";
import React, { useEffect, useRef } from "react";

interface AIChatBoxLayoutProps {
	children: React.ReactNode;
	className?: string;
}

export const AIChatBoxLayout: React.FC<AIChatBoxLayoutProps> = ({
	children,
	className = "",
}) => {
	const chatContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [children]);
	return (
		<div
			className={`flex justify-center w-full flex-1 overflow-y-auto ${className}`}
			ref={chatContainerRef}
		>
			{children}
		</div>
	);
};
