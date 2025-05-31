import CopyIcon from '../assets/copy.svg';
import { useState } from 'react';

export default function CopyLink({ link, onReset }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 9000); // re-enable after 2s (optional)
        });
    }
    return (
        <div className="border-2 border-dashed border-olive p-4 rounded-lg w-80 sm:w-full max-w-md mx-auto">
            <div className="flex items-center border border-orange bg-peach text-orange rounded px-4 py-2 w-full overflow-hidden">
                <span className="flex-1 truncate">
                    {link}
                </span>
                <button
                    onClick={handleCopy}
                    disabled={copied}
                    aria-label="Copy link to clipboard"
                    className={`ml-4 px-3 py-1 border border-orange bg-transparent text-orange text-sm rounded 
              transition flex items-center justify-center
              ${copied ? "opacity-50 cursor-not-allowed bg-orange" : "hover:bg-orange hover:text-peach"}`}
                    title={copied ? "Copied!" : "Copy to clipboard"}
                >
                    <img
                        src={CopyIcon}
                        alt="Copy Icon"
                        className="mx-auto my-2 h-4 w-4"
                    />
                </button>
            </div>

            <button
                onClick={onReset}
                className="mt-4 px-4 py-2 text-orange border border-orange rounded hover:bg-orange hover:text-peach transition w-full"
            >
                &lt; Generate another
            </button>
        </div>

    )
}