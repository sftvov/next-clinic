export default function SqlQuery({ query, data, title }) {
  if (!data || data.length === 0) {
    return (
      <div className="mb-8">
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{query}</pre>
        </div>
        <p className="text-gray-500">Нет данных</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="mb-12">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

      {/* Отображение SQL-запроса */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap">{query}</pre>
      </div>

      {/* Таблица с результатами */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 text-sm text-gray-600 border-b">
                    {row[col] !== null && row[col] !== undefined ? String(row[col]) : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-500 mt-2">Найдено: {data.length} записей</p>
      </div>
    </div>
  );
}