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
      <div className="flex flex-col bg-white rounded-xl">
        <h2 className="text-indigo t1 px-4 py-8 xl:px-8  ">{title}</h2>
        <div className="overflow-auto mb-8 xl:mx-4 bg-white border-gray-200 rounded-xl border">
          {/* Таблица */}
          <table className="w-full">
            {/* Заголовки */}
            <thead className="border-b border-gray-200">
              <tr>
                <th className="t3 text-left px-4 py-2">Услуга</th>
                <th className="t3 text-left hidden sm:table-cell px-4 py-2">Код</th>
                <th className="t3 text-right px-4 py-2">Цена</th>
              </tr>
            </thead>
            {/* Основное тело таблицы */}
            <tbody className="divide-y divide-gray-100">
              {prices.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <span className="p1">{item.name}</span> 
                      <span className="text-gray-500 font-mono p1 sm:hidden">{item.code}</span>
                    </div>
                  </td>
                  <td className="text-gray-500 font-mono p1 hidden sm:table-cell p-4">{item.code}</td>
                  <td className="text-burgundy p1 text-right p-4">
                    {item.price.toLocaleString()}&nbsp;₽
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p2 px-6 py-3 border-t border-gray-200">
            Всего услуг: {prices.length}
          </div>
        </div>
      </div>
    </div>
  );
}