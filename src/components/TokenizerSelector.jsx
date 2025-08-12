const TokenizerSelector = ({ tokenizerType, setTokenizerType }) => {
    const strategies = [
        {
            id: "ascii",
            name: "ASCII",
            description: "Character codes",
            icon: "🔤",
        },
        {
            id: "tiktoken",
            name: "TikToken",
            description: "OpenAI models",
            icon: "🤖",
        },
        {
            id: "custom",
            name: "Custom AI",
            description: "AI-powered logic",
            icon: "✨",
            isSpecial: true,
        },
    ];

    return (
        <div className="mb-8">
            <label className="block text-sm font-medium mb-3 text-gray-300">
                Tokenization Strategy
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategies.map((strategy) => (
                    <button
                        key={strategy.id}
                        onClick={() => setTokenizerType(strategy.id)}
                        className={`relative p-4 rounded-lg border-2 transition-all duration-300 overflow-hidden ${
                            tokenizerType === strategy.id
                                ? strategy.isSpecial
                                    ? "border-purple-400 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 text-purple-300 shadow-lg shadow-purple-500/25"
                                    : "border-blue-500 bg-blue-500/10 text-blue-400"
                                : strategy.isSpecial
                                ? "border-purple-600/50 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20 hover:border-purple-500/70 hover:shadow-md hover:shadow-purple-500/20"
                                : "border-gray-700 hover:border-gray-600"
                        }`}
                    >
                        {/* sparkle animation */}
                        {strategy.isSpecial && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                                <div
                                    className="absolute top-4 right-6 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping"
                                    style={{ animationDelay: "0.5s" }}
                                ></div>
                                <div
                                    className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"
                                    style={{ animationDelay: "1s" }}
                                ></div>
                                <div
                                    className="absolute bottom-6 left-6 w-1 h-1 bg-purple-300 rounded-full animate-ping"
                                    style={{ animationDelay: "1.5s" }}
                                ></div>
                            </div>
                        )}

                        <div className="relative z-10">
                            <div className="flex items-center justify-center mb-2">
                                <span className="text-2xl mr-2">
                                    {strategy.icon}
                                </span>
                                <div className="font-semibold">
                                    {strategy.name}
                                </div>
                                {strategy.isSpecial && (
                                    <div className="ml-2 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-xs rounded-full text-white font-bold animate-pulse">
                                        AI
                                    </div>
                                )}
                            </div>
                            <div
                                className={`text-sm ${
                                    strategy.isSpecial
                                        ? tokenizerType === strategy.id
                                            ? "text-purple-200"
                                            : "text-purple-300/70"
                                        : "text-gray-400"
                                }`}
                            >
                                {strategy.description}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TokenizerSelector;
