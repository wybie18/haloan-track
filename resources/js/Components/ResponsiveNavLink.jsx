import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-[hsl(190,75%,45%)] bg-[hsl(195,60%,96%)] text-[hsl(200,30%,15%)] focus:border-[hsl(190,75%,45%)] focus:bg-[hsl(195,60%,96%)] focus:text-[hsl(200,30%,15%)]'
                    : 'border-transparent text-gray-600 hover:border-[hsl(195,60%,96%)] hover:bg-white hover:text-[hsl(200,30%,15%)] focus:border-[hsl(195,60%,96%)] focus:bg-white focus:text-[hsl(200,30%,15%)]'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
