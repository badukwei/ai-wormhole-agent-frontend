import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<button
			className={`flex select-none cursor-pointer uppercase border border-white/50 px-6 py-3 font-caption text-sm justify-center items-center rounded-12 bg-plum text-black user-select-none hover:opacity-80 transition-opacity duration-300 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};
