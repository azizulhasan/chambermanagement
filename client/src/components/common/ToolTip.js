export default function ToolTip({ title, classes = '' }) {
    return (
        <span
            className={[
                'group-hover:opacity-100 transition-opacity bg-gray-800 px-4 py-2 text-sm text-gray-100 rounded-sm absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto z-50',
                classes,
            ].join(' ')}
        >
            {title}
        </span>
    );
}
