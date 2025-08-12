const CustomLogicInput = ({
    show,
    customLogic,
    setCustomLogic,
    generatedCode,
    setGeneratedCode,
    onGenerateCode,
    isLoading,
    hasApiKey,
}) => {
    if (!show) return null;

    return (
        <div className="mb-8 space-y-4">
            <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                    Describe your tokenization logic
                </label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={customLogic}
                        onChange={(e) => setCustomLogic(e.target.value)}
                        placeholder="e.g., Split by words and use word length as token"
                        className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={onGenerateCode}
                        disabled={
                            isLoading || !customLogic.trim() || !hasApiKey
                        }
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors"
                        title={
                            !hasApiKey
                                ? "API key required for AI generation"
                                : ""
                        }
                    >
                        {isLoading ? "Generating..." : "Generate"}
                    </button>
                </div>
                {!hasApiKey && customLogic.trim() && (
                    <p className="mt-2 text-xs text-amber-400">
                        💡 Add your Gemini API key above to use AI code generation
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                    Custom Encoder Code
                </label>
                <textarea
                    value={generatedCode}
                    onChange={(e) => setGeneratedCode(e.target.value)}
                    className="w-full h-32 p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none font-mono text-sm"
                    placeholder="Write your custom tokenizer code here, or use AI generation above..."
                />
                <p className="mt-2 text-xs text-gray-400">
                    Function should return an array of numbers. Example:{" "}
                    <code className="bg-gray-800 px-1 rounded">
                        {"return text.split('').map(c => c.charCodeAt(0));"}
                    </code>
                </p>
            </div>
        </div>
    );
};

export default CustomLogicInput;
