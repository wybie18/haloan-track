import React from "react";

export default function Button({
    variant = "primary",
    size = "md",
    children,
    leftIcon: LeftIcon,
    className = "",
    ...props
}) {
    const base = "inline-flex items-center justify-center gap-2 rounded-full transition duration-200 font-medium";
    const sizes = {
        md: "px-6 py-3 text-base",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
    };
    const variants = {
        primary: "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-600/30",
        secondary: "border border-emerald-100 text-emerald-900 bg-white hover:bg-emerald-50",
        ghost: "text-emerald-600 bg-transparent hover:bg-emerald-50",
        danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30",
    };

    const cls = `${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`;

    return (
        <button className={cls} {...props}>
            {LeftIcon ? <LeftIcon className="w-5 h-5" /> : null}
            <span>{children}</span>
        </button>
    );
}
