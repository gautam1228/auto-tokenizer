import axios from "axios";
import { encodingForModel } from "js-tiktoken";

export const asciiTokenize = (text) => {
    return text.split("").map((char) => char.charCodeAt(0));
};

export const tikTokenize = async (text, model) => {
    try {
        const encoding = encodingForModel(model);
        const tokens = encoding.encode(text);
        return Array.from(tokens);
    } catch (err) {
        console.error("js-tiktoken error:", err);
        return [];
    }
};

export const executeCustomTokenizer = (text, code) => {
    try {
        if (!code || typeof code !== "string") {
            throw new Error("Invalid code provided");
        }

        const func = new Function(
            "text",
            `
      try {
        ${code}
      } catch (e) {
        throw new Error('Runtime error in tokenizer: ' + e.message);
      }
    `
        );

        const result = func(text);

        if (!Array.isArray(result)) {
            throw new Error("Tokenizer must return an array");
        }

        if (!result.every((item) => typeof item === "number" && !isNaN(item))) {
            throw new Error("Tokenizer must return an array of valid numbers");
        }

        return result;
    } catch (err) {
        throw new Error(`Invalid tokenizer code: ${err.message}`);
    }
};

export const generateCustomTokenizer = async (logic, apiKey) => {
    if (!apiKey) {
        throw new Error("API key is required for AI code generation");
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a JavaScript code generator. Create a function body that tokenizes text based on the given logic and return the text of the javascript logic you generate.

                                STRICT REQUIREMENTS:
                                1. Return ONLY the function body (no function declaration)
                                2. Always use 'const' or 'let' for variable declarations
                                3. Never reassign the 'text' parameter
                                4. Must return an array of numbers
                                5. Handle empty inputs gracefully
                                6. Use clear, descriptive variable name
                                7. Return only the text of the function
                                8. The output shouldn't be wrapped in '''javascript

                                EXAMPLES:

                                INPUT: "word lengths as tokens"
                                OUTPUT:
                                "const words = text.toLowerCase().split(/\\s+/).filter(word => word.trim() !== '');
                                const tokens = words.map(word => word.replace(/[^a-zA-Z0-9]/g, '').length);
                                return tokens;"

                                INPUT: "sentence count as tokens"
                                OUTPUT:
                                "const sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '');
                                const tokens = sentences.map((sentence, index) => sentence.length + index);
                                return tokens;"

                                Now create code for this logic: "${logic}"

                                Remember: Only return the function body as text, use proper variable declarations, and ensure it returns an array of numbers.`,
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 15000,
            }
        );

        const data = response.data;

        // Updated validation for the actual response structure
        if (
            !data.candidates ||
            !data.candidates[0]?.content?.parts?.[0]?.text
        ) {
            throw new Error("Invalid response from Gemini API");
        }

        let code = data.candidates[0].content.parts[0].text.trim();

        code = code.replace(/```\n?/g, "").trim();
        code = code
            .replace(/^function\s*\([^)]*\)\s*\{/, "")
            .replace(/\}$/, "")
            .trim();

        code = code.replace(/\\\\s\+/g, "\\s+");
        code = code.replace(/\\\\w\+/g, "\\w+");
        code = code.replace(/\\\\d\+/g, "\\d+");

        if (!code.includes("return")) {
            throw new Error("Generated code must include a return statement");
        }

        // Testing the generated code
        try {
            const testFunc = new Function("text", code);
            const testResult = testFunc("test input");
            if (
                !Array.isArray(testResult) ||
                !testResult.every((item) => typeof item === "number")
            ) {
                throw new Error(
                    "Generated code does not return valid token array"
                );
            }
        } catch (testErr) {
            throw new Error(
                `Generated code failed validation: ${testErr.message}`
            );
        }

        return code;
    } catch (err) {
        if (err.response) {
            throw new Error(
                `API Error: ${
                    err.response.data?.error?.message ||
                    "Failed to generate code"
                }`
            );
        } else if (err.request) {
            throw new Error(
                "Network error: Unable to reach Gemini API. Check your internet connection."
            );
        } else {
            throw new Error(
                `Failed to generate tokenizer code: ${err.message}`
            );
        }
    }
};

// DECODER FUNCTIONS
export const asciiDecode = (tokens) => {
    try {
        return tokens
            .map((token) => {
                if (token < 0 || token > 127) {
                    throw new Error(
                        `Invalid ASCII code: ${token} (must be 0-127)`
                    );
                }
                return String.fromCharCode(token);
            })
            .join("");
    } catch (err) {
        throw new Error("Invalid ASCII codes provided: " + err.message);
    }
};

export const tikTokenDecode = async (tokens, model) => {
    try {
        const encoding = encodingForModel(model);
        const decoded = encoding.decode(tokens);
        return decoded;
    } catch (err) {
        console.error("js-tiktoken decode error:", err);
        throw new Error(
            "Failed to decode tokens. Please check your token format and selected model."
        );
    }
};

export const parseTokenInput = (input) => {
    try {
        const tokens = input.split(",").map((token) => {
            const trimmed = token.trim();
            const num = parseInt(trimmed);
            if (isNaN(num)) {
                throw new Error(`"${trimmed}" is not a valid number`);
            }
            return num;
        });

        if (tokens.length === 0) {
            throw new Error("Please provide at least one token");
        }

        return tokens;
    } catch (err) {
        throw new Error("Invalid token format. " + err.message);
    }
};
