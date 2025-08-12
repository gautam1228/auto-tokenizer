import { useState } from "react";
import { InfoIcon, EyeIcon, EyeOffIcon } from "./Icons";

const ApiKeyManager = ({ apiKey, setApiKey, show }) => {
    const [showKey, setShowKey] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const handleDeleteApiKey = () => {
        if (
            window.confirm(
                "Are you sure you want to delete your saved API key? You'll need to enter it again to use AI generation."
            )
        ) {
            setApiKey("");
            localStorage.removeItem("tokenizer_gemini_api_key");
        }
    };

    if (!show) return null;

    return (
        <div className="mb-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium text-gray-300">
                    Gemini API Key
                </label>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    title="API Key Information"
                >
                    <InfoIcon />
                </button>
            </div>

            {showInfo && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded text-sm text-blue-200">
                    <p className="mb-2">
                        <strong>🔒 Your API key is secure:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Stored only in your browser's local storage</li>
                        <li>Never sent to our servers</li>
                        <li>
                            Used only for direct calls to Google's Gemini API
                        </li>
                        <li>We're open source - you can verify our code</li>
                    </ul>
                    <p className="mt-2 text-xs">
                        Get your free API key from:{" "}
                        <span className="text-blue-300">ai.google.dev</span>
                    </p>
                </div>
            )}

            <div className="space-y-3">
                <div className="relative">
                    <input
                        type={showKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API key (optional)"
                        className="w-full pr-10 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                        {showKey ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>

                {/* Delete button */}
                {apiKey && (
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-green-400">
                            ✓ API key saved in local storage
                        </p>
                        <button
                            onClick={handleDeleteApiKey}
                            className="px-3 py-1 text-xs bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30 hover:border-red-500/60 rounded transition-colors"
                            title="Delete saved API key"
                        >
                            🗑️ Delete Key
                        </button>
                    </div>
                )}

                {!apiKey && (
                    <p className="text-xs text-gray-400">
                        Without an API key, you'll need to write custom
                        tokenizer code manually
                    </p>
                )}
            </div>
        </div>
    );
};

export default ApiKeyManager;
