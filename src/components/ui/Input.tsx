import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
	return (
		<input
			className={`w-full h-12 px-4 bg-transparent border border-white/40 text-white focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum focus:ring-opacity-20 transition-colors ${className}`}
			{...props}
		/>
	);
};
