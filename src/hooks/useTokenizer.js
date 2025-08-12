import { useState, useEffect } from "react";
import {
    asciiTokenize,
    tikTokenize,
    executeCustomTokenizer,
    generateCustomTokenizer,
    asciiDecode,
    tikTokenDecode,
    parseTokenInput,
} from "../utils/tokenizers";

const API_KEY_STORAGE = "tokenizer_gemini_api_key";

export const useTokenizer = () => {
    const [inputText, setInputText] = useState("");
    const [tokens, setTokens] = useState([]);
    const [tokenizerType, setTokenizerType] = useState("ascii");
    const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
    const [customLogic, setCustomLogic] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [apiKey, setApiKey] = useState("");

    const [showDecoder, setShowDecoder] = useState(false);
    const [tokenInput, setTokenInput] = useState("");
    const [decodedText, setDecodedText] = useState(null);
    const [decodeError, setDecodeError] = useState("");

    // Loading API key from localStorage
    useEffect(() => {
        const savedKey = localStorage.getItem(API_KEY_STORAGE);
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    useEffect(() => {
        if (apiKey) {
            localStorage.setItem(API_KEY_STORAGE, apiKey);
        } else {
            localStorage.removeItem(API_KEY_STORAGE);
        }
    }, [apiKey]);

    // Clearing input and tokens when tokenizer type changes
    useEffect(() => {
        setInputText("");
        setTokens([]);
        setError("");

        if (tokenizerType === "custom") {
            setCustomLogic("");
            setGeneratedCode("");
        }
    }, [tokenizerType]);

    useEffect(() => {
        if (tokenizerType === "tiktoken" && inputText.trim()) {
            handleTokenize();
        }
    }, [selectedModel]);

    useEffect(() => {
        setTokenInput("");
        setDecodedText(null);
        setDecodeError("");
    }, [tokenizerType]);

    const handleGenerateCustomTokenizer = async () => {
        if (!apiKey) {
            setError(
                "Please provide your Gemini API key to use AI code generation"
            );
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const code = await generateCustomTokenizer(customLogic, apiKey);
            setGeneratedCode(code);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTokenize = async () => {
        if (!inputText.trim()) {
            setTokens([]);
            return;
        }

        setError("");

        try {
            let result = [];

            switch (tokenizerType) {
                case "ascii":
                    result = asciiTokenize(inputText);
                    break;

                case "tiktoken":
                    result = await tikTokenize(inputText, selectedModel);
                    break;

                case "custom":
                    if (!generatedCode.trim()) {
                        setError(
                            "Please provide custom tokenizer code or generate it using AI"
                        );
                        return;
                    }
                    result = executeCustomTokenizer(inputText, generatedCode);
                    break;

                default:
                    result = asciiTokenize(inputText);
            }

            setTokens(result);
        } catch (err) {
            setError(err.message);
            setTokens([]);
        }
    };

    const handleDecode = async () => {
        if (!tokenInput.trim()) {
            setDecodedText(null);
            return;
        }

        // Don't decode for custom tokenizers
        if (tokenizerType === "custom") {
            setDecodeError("Custom decoder not implemented yet");
            return;
        }

        setDecodeError("");

        try {
            const tokens = parseTokenInput(tokenInput);
            let result = "";

            switch (tokenizerType) {
                case "ascii":
                    result = asciiDecode(tokens);
                    break;

                case "tiktoken":
                    result = await tikTokenDecode(tokens, selectedModel);
                    break;

                default:
                    throw new Error(
                        "Decoder not available for this tokenizer type"
                    );
            }

            setDecodedText(result);
        } catch (err) {
            setDecodeError(err.message);
            setDecodedText(null);
        }
    };

    return {
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
        showDecoder,
        setShowDecoder,
        tokenInput,
        setTokenInput,
        decodedText,
        decodeError,
        handleDecode
    };
};
