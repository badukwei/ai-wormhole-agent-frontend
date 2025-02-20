import React from "react";

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
	className = "",
	...props
}) => {
	return (
		<textarea
			className={`w-full h-32 px-4 py-2 text-white ${className}`}
			{...props}
		/>
	);
};
