'use client';

export default function LoadMoreButton({ onLoadMore, step, total, visible, loading, containerClass, wrapperClass}) {
  if (visible >= total) return null;

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <button
          onClick={() => onLoadMore(step)}
          disabled={loading}
          className="disabled:opacity-50  btn-solid btn w-full"
        >
          {loading ? 'Загрузка...' : `Показать ещё (${total - visible})`}
        </button>
      </div>
    </div>
  );
}