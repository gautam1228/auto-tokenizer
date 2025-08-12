const TextInput = ({ inputText, setInputText, onTokenize, tokenizerType }) => {
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            onTokenize();
        }
    };

    const getPlaceholderText = () => {
        switch (tokenizerType) {
            case "ascii":
                return "Type your text here to convert each character to ASCII codes...";
            case "tiktoken":
                return "Enter text to tokenize using OpenAI's tokenization method...";
            case "custom":
                return "Enter text to tokenize using your custom AI-generated logic...";
            default:
                return "Type your text here to see it tokenized...";
        }
    };

    return (
        <div className="mb-8">
            <label className="block text-sm font-medium mb-3 text-gray-300">
                Input Text
            </label>
            <div className="space-y-3">
                <div className="relative">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none resize-none transition-all duration-200"
                        placeholder={getPlaceholderText()}
                    />
                    {!inputText && (
                        <div className="absolute top-4 right-4 text-xs text-gray-500 pointer-events-none">
                            {tokenizerType === "custom" && "✨ AI-powered"}
                            {tokenizerType === "tiktoken" && "🤖 OpenAI"}
                            {tokenizerType === "ascii" && "🔤 Character codes"}
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                        Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to tokenize
                        quickly
                    </p>
                    <button
                        onClick={onTokenize}
                        disabled={!inputText.trim()}
                        className={`px-6 py-2 rounded-lg transition-all duration-200 font-medium ${
                            tokenizerType === "custom"
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 shadow-lg shadow-purple-500/25"
                                : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700"
                        } disabled:cursor-not-allowed text-white`}
                    >
                        {tokenizerType === "custom"
                            ? "✨ Tokenize"
                            : "Tokenize"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextInput;
