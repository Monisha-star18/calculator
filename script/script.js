// ===== Elements =====
const display = document.getElementById('display');
const historyBtn = document.getElementById('historyBtn');
const historyPanel = document.getElementById('historyPanel');
const historyItems = document.getElementById('historyItems');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const buttons = document.querySelectorAll('.btn');

// ===== History storage =====
const HISTORY_KEY = 'calcHistory';
const HISTORY_LIMIT = 4;

let history = [];
try 
{
  history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
} 
catch (e)
 {
  history = [];
}

function saveHistory() 
{
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function renderHistory() 
{
  if (history.length === 0) 
  {
    historyItems.innerHTML = '<div class="history-empty">No calculations yet</div>';
    return;
  }
  historyItems.innerHTML = history
    .slice().reverse()
    .map((item, i) => {
      const realIndex = history.length - 1 - i;
      return `<div class="history-item" data-index="${realIndex}">${item.expr} = ${item.result}</div>`;
    }).join('');
}

function addHistory(expr, result) 
{
  history.push({ expr: expr, result: String(result) });
  if (history.length > HISTORY_LIMIT) {
    history = history.slice(history.length - HISTORY_LIMIT);
  }
  saveHistory();
  renderHistory();
}

renderHistory();

// ===== Safe expression evaluation =====
// Only allow digits, operators, parentheses, decimal points and spaces.
function safeEval(expr) {
  if (!/^[0-9+\-*/%.() ]+$/.test(expr)) {
    throw new Error('Invalid characters');
  }
  // eslint-disable-next-line no-new-func
  const result = Function('"use strict"; return (' + expr + ')')();
  if (typeof result !== 'number' || !isFinite(result)) {
    throw new Error('Invalid result');
  }
  return result;
}

// ===== Simple inline error message (no external library) =====
function showError(message) {
  display.value = message;
  display.classList.add('error');
  setTimeout(() => {display.value = '';display.classList.remove('error');}, 1200);
}

// ===== Button handling =====
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === 'clear') {
      display.value = '';
      return;
    }

    if (action === 'backspace') {
      display.value = display.value.slice(0, -1);
      return;
    }

    if (action === 'equals') {
      const expression = display.value.trim();
      if (!expression) return;
      try {
        const result = safeEval(expression);
        display.value = result;
        addHistory(expression, result);
      } catch (e) {
        showError('Error');
      }
      return;
    }

    // number or operator button
    if (value !== undefined) {
      display.value += value;
    }
  });
});

// ===== Keyboard support =====
document.addEventListener('keydown', (e) => {
  if (/^[0-9+\-*/%.()]$/.test(e.key)) {
    display.value += e.key;
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    document.querySelector('[data-action="equals"]').click();
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (e.key === 'Escape') {
    display.value = '';
  }
});

// ===== History panel toggle =====
historyBtn.addEventListener('click', () => {
  historyPanel.style.display =
    historyPanel.style.display === 'block' ? 'none' : 'block';
});

// click a past entry to load its result back into the display
historyItems.addEventListener('click', (e) => {
  const item = e.target.closest('.history-item');
  if (!item) return;
  const idx = Number(item.dataset.index);
  const entry = history[idx];
  if (entry) {
    display.value = entry.result;
  }
});

// clear history
clearHistoryBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  history = [];
  saveHistory();
  renderHistory();
});

// click outside to close the history panel
document.addEventListener('click', (e) => {
  if (
    historyPanel.style.display === 'block' &&
    !historyPanel.contains(e.target) &&
    e.target !== historyBtn
  ) {
    historyPanel.style.display = 'none';
  }
});