import React, { useState } from 'react';

const SnakeTimeline = ({ events = [], columns = 3, rowGap = 80, columnGap = 120, dotRadius = 8 }) => {
  const rowsCount = Math.ceil(events.length / columns);
  const width = columnGap * (columns - 1) + dotRadius * 2 + 20;
  const height = rowsCount * rowGap + dotRadius * 4;

  const xOffset = dotRadius + 10;
  const yOffset = dotRadius + 10;

  // State для модалки
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Функция-обработчик клика
  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  // Координаты для пути
  const pathPoints = [];
  for (let row = 0; row < rowsCount; row++) {
    const y = yOffset + row * rowGap;
    const order = row % 2 === 0 ? [...Array(columns).keys()] : [...Array(columns).keys()].reverse();

    order.forEach((colIdx) => {
      const idx = row * columns + colIdx;
      if (idx >= events.length) return;
      const x = xOffset + colIdx * columnGap;
      pathPoints.push([x, y]);
    });

    if (row < rowsCount - 1) {
      const lastIdx = order[order.length - 1];
      const xLast = xOffset + lastIdx * columnGap;
      const yNext = yOffset + (row + 1) * rowGap;
      pathPoints.push([xLast, y]);
      pathPoints.push([xLast, yNext]);
    }
  }

  const d = pathPoints.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(' ');

  return (
    <div style={{ position: 'relative', width, height: height + 100 }}>
      {/* SVG с линией */}
      <svg width={width} height={height}>
        <path d={d} stroke="#bbb" fill="none" strokeWidth={2} />
        {/* Точки и подписи */}
        {events.map((evt, i) => {
          const row = Math.floor(i / columns);
          const col = i % columns;
          const x = xOffset + col * columnGap;
          const y = yOffset + row * rowGap;

          return (
            <g key={i} style={{ cursor: 'pointer' }} onClick={() => handleClick(i)}>
              <circle cx={x} cy={y} r={dotRadius} fill="#333" />
              <text x={x} y={y + dotRadius + 16} textAnchor="middle" fontSize={12} fill="#333">
                {evt.date}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Модалка */}
      {selectedIndex !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setSelectedIndex(null)}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '90%',
              maxHeight: '90%',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {events[selectedIndex].content}
            <div style={{ textAlign: 'right', marginTop: '12px' }}>
              <button onClick={() => setSelectedIndex(null)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeTimeline;
