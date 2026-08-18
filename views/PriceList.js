export default function PriceList({ prices, title = 'Прайс-лист услуг' }) {
  if (!prices || prices.length === 0) {
    return (
      <div className="section">
        <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
          Нет доступных услуг
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Услуга</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Код</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Цена</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prices.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{item.code}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                  {item.price.toLocaleString()} ₽
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          Всего услуг: {prices.length}
        </div>
      </div>
    </div>
  );
}