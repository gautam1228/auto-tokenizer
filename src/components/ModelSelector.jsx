const ModelSelector = ({ selectedModel, setSelectedModel, show }) => {
    const models = [
        "gpt-4",
        "gpt-3.5-turbo",
        "text-davinci-003",
        "text-embedding-ada-002",
        "gpt-4-32k",
    ];

    if (!show) return null;

    return (
        <div className="mb-8">
            <label className="block text-sm font-medium mb-3 text-gray-300">
                Model
            </label>
            <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
            >
                {models.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModelSelector;
