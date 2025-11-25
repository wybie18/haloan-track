import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[hsl(190,75%,45%)] text-[hsl(200,30%,15%)] focus:border-[hsl(190,75%,45%)]'
                    : 'border-transparent text-gray-600 hover:border-[hsl(195,60%,96%)] hover:text-[hsl(200,30%,15%)] focus:border-[hsl(195,60%,96%)] focus:text-[hsl(200,30%,15%)]') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
