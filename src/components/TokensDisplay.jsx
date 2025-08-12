import { useState } from "react";

const TokensDisplay = ({ tokens, error }) => {
    const [copied, setCopied] = useState(false);

    const copyTokens = async () => {
        if (tokens.length === 0) return;

        try {
            const tokenString = tokens.join(",");
            await navigator.clipboard.writeText(tokenString);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy tokens:", err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = tokens.join(",");
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="mb-8">
            {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400">
                    {error}
                </div>
            )}

            <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-300">
                    Tokens
                </label>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">
                        Count: {tokens.length}
                    </span>
                    {tokens.length > 0 && (
                        <button
                            onClick={copyTokens}
                            className={`px-3 py-1 text-xs rounded-lg transition-all duration-200 flex items-center gap-1 ${
                                copied
                                    ? "bg-green-600/20 border border-green-500/40 text-green-300"
                                    : "bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 hover:border-blue-500/60"
                            }`}
                            title="Copy tokens as comma-separated values"
                        >
                            {copied ? (
                                <>
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            <div className="min-h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg">
                {tokens.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {tokens.map((token, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm"
                            >
                                {token}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 text-center py-8">
                        Tokens will appear here...
                    </div>
                )}
            </div>

            {tokens.length > 0 && (
                <p className="mt-2 text-xs text-gray-400">
                    💡 Use the copy button above to copy tokens as
                    comma-separated values for the decoder
                </p>
            )}
        </div>
    );
};

export default TokensDisplay;
