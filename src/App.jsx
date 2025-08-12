import React from "react";
import Header from "./components/Header";
import TokenizerSelector from "./components/TokenizerSelector";
import ModelSelector from "./components/ModelSelector";
import ApiKeyManager from "./components/ApiKeyManager";
import CustomLogicInput from "./components/CustomLogicInput";
import TextInput from "./components/TextInput";
import TokensDisplay from "./components/TokensDisplay";
import TokenStats from "./components/TokenStats";
import TokenDecoder from "./components/TokenDecoder";
import { useTokenizer } from "./hooks/useTokenizer";

const App = () => {
    const {
        inputText,
        setInputText,
        tokens,
        tokenizerType,
        setTokenizerType,
        selectedModel,
        setSelectedModel,
        customLogic,
        setCustomLogic,
        generatedCode,
        setGeneratedCode,
        isLoading,
        error,
        apiKey,
        setApiKey,
        handleGenerateCustomTokenizer,
        handleTokenize,
        // Decoder props (simplified)
        showDecoder,
        setShowDecoder,
        tokenInput,
        setTokenInput,
        decodedText,
        decodeError,
        handleDecode,
    } = useTokenizer();

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            <div className="container mx-auto px-6 py-12 max-w-4xl">
                <Header />

                <TokenizerSelector
                    tokenizerType={tokenizerType}
                    setTokenizerType={setTokenizerType}
                />

                <ModelSelector
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                    show={tokenizerType === "tiktoken"}
                />

                <ApiKeyManager
                    apiKey={apiKey}
                    setApiKey={setApiKey}
                    show={tokenizerType === "custom"}
                />

                <CustomLogicInput
                    show={tokenizerType === "custom"}
                    customLogic={customLogic}
                    setCustomLogic={setCustomLogic}
                    generatedCode={generatedCode}
                    setGeneratedCode={setGeneratedCode}
                    onGenerateCode={handleGenerateCustomTokenizer}
                    isLoading={isLoading}
                    hasApiKey={!!apiKey}
                />

                <TextInput
                    inputText={inputText}
                    setInputText={setInputText}
                    onTokenize={handleTokenize}
                    tokenizerType={tokenizerType}
                />

                <TokensDisplay tokens={tokens} error={error} />

                <TokenStats tokens={tokens} inputText={inputText} />

                {/* Toggle Decoder Section */}
                <div className="mb-6 text-center">
                    <button
                        onClick={() => setShowDecoder(!showDecoder)}
                        className="my-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors text-sm"
                    >
                        {showDecoder
                            ? "🔼 Hide Decoder"
                            : "🔽 Show Token Decoder"}
                    </button>
                </div>

                {/* Decoder Section */}
                <TokenDecoder
                    show={showDecoder}
                    tokenizerType={tokenizerType}
                    selectedModel={selectedModel}
                    onDecode={handleDecode}
                    decodedText={decodedText}
                    tokenInput={tokenInput}
                    setTokenInput={setTokenInput}
                    decodeError={decodeError}
                />
            </div>
        </div>
    );
};

export default App;
