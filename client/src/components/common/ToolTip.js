export default function ToolTip({ title, classes = '' }) {
    return (
        <span
            className={[
                'group-hover:ctx-opacity-100 ctx-transition-opacity ctx-bg-gray-800 ctx-px-4 ctx-py-2 ctx-text-sm ctx-text-gray-100 ctx-rounded-sm ctx-absolute ctx-left-1/2 -ctx-translate-x-1/2 ctx-translate-y-full ctx-opacity-0 ctx-mx-auto ctx-z-50',
                classes,
            ].join(' ')}
        >
            {title}
        </span>
    );
}
