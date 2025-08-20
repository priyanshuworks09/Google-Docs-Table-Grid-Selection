import React, { useState } from 'react';
import './TableCreator.css';

const TableCreator = () => {
  const [hoveredRow, setHoveredRow] = useState(-1);
  const [hoveredCol, setHoveredCol] = useState(-1);
  const [selectedTable, setSelectedTable] = useState(null);

  const GRID_ROWS = 8;
  const GRID_COLS = 10;

  const handleCellHover = (row, col) => {
    setHoveredRow(row);
    setHoveredCol(col);
  };

  const handleGridLeave = () => {
    setHoveredRow(-1);
    setHoveredCol(-1);
  };

  const handleTableCreate = () => {
    if (hoveredRow >= 0 && hoveredCol >= 0) {
      setSelectedTable({
        rows: hoveredRow + 1,
        cols: hoveredCol + 1
      });
    }
  };

  const handleReset = () => {
    setSelectedTable(null);
    setHoveredRow(-1);
    setHoveredCol(-1);
  };

  const isCellHighlighted = (row, col) => {
    return row <= hoveredRow && col <= hoveredCol && hoveredRow >= 0 && hoveredCol >= 0;
  };

  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`table-cell ${isCellHighlighted(row, col) ? 'highlighted' : ''}`}
            onMouseEnter={() => handleCellHover(row, col)}
          />
        );
      }
    }
    return cells;
  };

  const renderTablePreview = () => {
    if (!selectedTable) return null;
    
    const rows = [];
    for (let row = 0; row < selectedTable.rows; row++) {
      const cells = [];
      for (let col = 0; col < selectedTable.cols; col++) {
        cells.push(
          <div key={col} className="preview-cell">
            Cell
          </div>
        );
      }
      rows.push(
        <div key={row} className="preview-row">
          {cells}
        </div>
      );
    }
    return (
      <div className="created-table-preview">
        {rows}
      </div>
    );
  };

  return (
    <div className="table-creator">
      <h2>Create Table</h2>
      
      {selectedTable && (
        <div className="table-result">
          <h3>Table Created!</h3>
          <p>Selected: {selectedTable.cols} × {selectedTable.rows} table</p>
          {renderTablePreview()}
        </div>
      )}

      <div className="table-interface">
        <div 
          className="table-grid"
          onMouseLeave={handleGridLeave}
          onClick={handleTableCreate}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleTableCreate();
            }
          }}
        >
          {renderGrid()}
        </div>

        <div className="table-info">
          {hoveredRow >= 0 && hoveredCol >= 0 ? (
            <span className="selection-text">
              {hoveredCol + 1} × {hoveredRow + 1} Table
            </span>
          ) : (
            <span className="hint-text">Hover to select table size</span>
          )}
        </div>
      </div>

      <div className="controls">
        <button 
          className="reset-btn" 
          onClick={handleReset}
          disabled={!selectedTable && hoveredRow < 0}
        >
          Reset Selection
        </button>
      </div>
    </div>
  );
};

export default TableCreator;
