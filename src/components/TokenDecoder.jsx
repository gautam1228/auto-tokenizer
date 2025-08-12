const TokenDecoder = ({
    show,
    tokenizerType,
    onDecode,
    decodedText,
    tokenInput,
    setTokenInput,
    decodeError,
}) => {
    if (!show) return null;

    const getPlaceholderText = () => {
        switch (tokenizerType) {
            case "ascii":
                return "Enter ASCII codes separated by commas (e.g., 72,101,108,108,111)";
            case "tiktoken":
                return "Enter token IDs separated by commas (e.g., 9906,1917)";
            case "custom":
                return "Custom decoder not available yet...";
            default:
                return "Enter tokens separated by commas...";
        }
    };

    const handleKeyPress = (e) => {
        if (
            e.key === "Enter" &&
            (e.ctrlKey || e.metaKey) &&
            tokenizerType !== "custom"
        ) {
            onDecode();
        }
    };

    const isCustom = tokenizerType === "custom";

    return (
        <div className="mb-8 p-4 bg-gray-900/30 border border-gray-600 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-200">
                    🔄 Token Decoder
                </h3>
                <span
                    className={`px-2 py-1 text-xs rounded-full ${
                        isCustom
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-blue-500/20 text-blue-300"
                    }`}
                >
                    {tokenizerType === "custom"
                        ? "Custom"
                        : tokenizerType.toUpperCase()}
                </span>
                {isCustom && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                        🚧 WIP
                    </span>
                )}
            </div>

            {isCustom && (
                <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400 text-lg">🚧</span>
                        <h4 className="text-yellow-300 font-medium">
                            Work in Progress
                        </h4>
                    </div>
                    <p className="text-yellow-200 text-sm">
                        Custom AI-powered token decoding is currently under
                        development. This feature will automatically generate
                        reverse logic to convert your custom tokens back to
                        text.
                    </p>
                    <p className="text-yellow-300 text-xs mt-2">
                        💡 Coming soon: AI-generated decoder functions for
                        custom tokenization strategies!
                    </p>
                </div>
            )}

            {decodeError && !isCustom && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
                    {decodeError}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                        Token Input
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={tokenInput}
                            onChange={(e) => setTokenInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isCustom}
                            className={`flex-1 p-3 border rounded-lg text-sm font-mono focus:outline-none transition-colors ${
                                isCustom
                                    ? "bg-gray-800/50 border-gray-600/50 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                            }`}
                            placeholder={getPlaceholderText()}
                        />
                        <button
                            onClick={onDecode}
                            disabled={!tokenInput.trim() || isCustom}
                            className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                                isCustom
                                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                    : tokenizerType === "tiktoken"
                                    ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white"
                                    : "bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white"
                            } disabled:cursor-not-allowed`}
                        >
                            {isCustom ? "🚧 Coming Soon" : "Decode"}
                        </button>
                    </div>
                    {!isCustom && (
                        <p className="mt-2 text-xs text-gray-400">
                            Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to decode
                            quickly
                        </p>
                    )}
                </div>

                {decodedText !== null && !isCustom && (
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Decoded Text
                        </label>
                        <div className="min-h-20 p-4 bg-gray-800 border border-gray-600 rounded-lg">
                            {decodedText ? (
                                <div className="text-green-300 font-mono text-sm whitespace-pre-wrap">
                                    "{decodedText}"
                                </div>
                            ) : (
                                <div className="text-gray-500 text-center py-4">
                                    No decoded text available
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TokenDecoder;
