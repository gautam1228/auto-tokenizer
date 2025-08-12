const TokenStats = ({ tokens, inputText }) => {
  if (tokens.length === 0) return null;

  const ratio = inputText.length > 0 ? (tokens.length / inputText.length).toFixed(2) : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
        <div className="text-2xl font-bold text-blue-400">{tokens.length}</div>
        <div className="text-sm text-gray-400">Total Tokens</div>
      </div>
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
        <div className="text-2xl font-bold text-green-400">{inputText.length}</div>
        <div className="text-sm text-gray-400">Characters</div>
      </div>
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
        <div className="text-2xl font-bold text-purple-400">{ratio}</div>
        <div className="text-sm text-gray-400">Tokens/Char Ratio</div>
      </div>
    </div>
  );
};

export default TokenStats;
