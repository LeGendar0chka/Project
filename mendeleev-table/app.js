// Инициализация Telegram Web App
Telegram.WebApp.ready();
Telegram.WebApp.expand();

// Состояние приложения
const state = {
    elements: [],
    selectedElement: null,
    currentFilter: 'all',
    searchTerm: '',
    zoom: 1,
    theme: 'light',
    isLoading: true
};

// Координаты элементов в таблице (row, column)
const elementPositions = {
    1: { row: 1, col: 1 }, 2: { row: 1, col: 18 },
    3: { row: 2, col: 1 }, 4: { row: 2, col: 2 }, 5: { row: 2, col: 13 }, 6: { row: 2, col: 14 },
    7: { row: 2, col: 15 }, 8: { row: 2, col: 16 }, 9: { row: 2, col: 17 }, 10: { row: 2, col: 18 },
    11: { row: 3, col: 1 }, 12: { row: 3, col: 2 }, 13: { row: 3, col: 13 }, 14: { row: 3, col: 14 },
    15: { row: 3, col: 15 }, 16: { row: 3, col: 16 }, 17: { row: 3, col: 17 }, 18: { row: 3, col: 18 },
    19: { row: 4, col: 1 }, 20: { row: 4, col: 2 }, 21: { row: 4, col: 3 }, 22: { row: 4, col: 4 },
    23: { row: 4, col: 5 }, 24: { row: 4, col: 6 }, 25: { row: 4, col: 7 }, 26: { row: 4, col: 8 },
    27: { row: 4, col: 9 }, 28: { row: 4, col: 10 }, 29: { row: 4, col: 11 }, 30: { row: 4, col: 12 },
    31: { row: 4, col: 13 }, 32: { row: 4, col: 14 }, 33: { row: 4, col: 15 }, 34: { row: 4, col: 16 },
    35: { row: 4, col: 17 }, 36: { row: 4, col: 18 },
    37: { row: 5, col: 1 }, 38: { row: 5, col: 2 }, 39: { row: 5, col: 3 }, 40: { row: 5, col: 4 },
    41: { row: 5, col: 5 }, 42: { row: 5, col: 6 }, 43: { row: 5, col: 7 }, 44: { row: 5, col: 8 },
    45: { row: 5, col: 9 }, 46: { row: 5, col: 10 }, 47: { row: 5, col: 11 }, 48: { row: 5, col: 12 },
    49: { row: 5, col: 13 }, 50: { row: 5, col: 14 }, 51: { row: 5, col: 15 }, 52: { row: 5, col: 16 },
    53: { row: 5, col: 17 }, 54: { row: 5, col: 18 },
    55: { row: 6, col: 1 }, 56: { row: 6, col: 2 },
    // Лантаноиды (ряд 8)
    57: { row: 8, col: 3 }, 58: { row: 8, col: 4 }, 59: { row: 8, col: 5 }, 60: { row: 8, col: 6 },
    61: { row: 8, col: 7 }, 62: { row: 8, col: 8 }, 63: { row: 8, col: 9 }, 64: { row: 8, col: 10 },
    65: { row: 8, col: 11 }, 66: { row: 8, col: 12 }, 67: { row: 8, col: 13 }, 68: { row: 8, col: 14 },
    69: { row: 8, col: 15 }, 70: { row: 8, col: 16 }, 71: { row: 8, col: 17 },
    // Продолжение 6 периода
    72: { row: 6, col: 4 }, 73: { row: 6, col: 5 }, 74: { row: 6, col: 6 }, 75: { row: 6, col: 7 },
    76: { row: 6, col: 8 }, 77: { row: 6, col: 9 }, 78: { row: 6, col: 10 }, 79: { row: 6, col: 11 },
    80: { row: 6, col: 12 }, 81: { row: 6, col: 13 }, 82: { row: 6, col: 14 }, 83: { row: 6, col: 15 },
    84: { row: 6, col: 16 }, 85: { row: 6, col: 17 }, 86: { row: 6, col: 18 },
    87: { row: 7, col: 1 }, 88: { row: 7, col: 2 },
    // Актиноиды (ряд 9)
    89: { row: 9, col: 3 }, 90: { row: 9, col: 4 }, 91: { row: 9, col: 5 }, 92: { row: 9, col: 6 },
    93: { row: 9, col: 7 }, 94: { row: 9, col: 8 }, 95: { row: 9, col: 9 }, 96: { row: 9, col: 10 },
    97: { row: 9, col: 11 }, 98: { row: 9, col: 12 }, 99: { row: 9, col: 13 }, 100: { row: 9, col: 14 },
    101: { row: 9, col: 15 }, 102: { row: 9, col: 16 }, 103: { row: 9, col: 17 },
    // Продолжение 7 периода
    104: { row: 7, col: 4 }, 105: { row: 7, col: 5 }, 106: { row: 7, col: 6 }, 107: { row: 7, col: 7 },
    108: { row: 7, col: 8 }, 109: { row: 7, col: 9 }, 110: { row: 7, col: 10 }, 111: { row: 7, col: 11 },
    112: { row: 7, col: 12 }, 113: { row: 7, col: 13 }, 114: { row: 7, col: 14 }, 115: { row: 7, col: 15 },
    116: { row: 7, col: 16 }, 117: { row: 7, col: 17 }, 118: { row: 7, col: 18 }
};

// Определение категории элемента
function getElementCategory(element) {
    const number = element.atomic_number;

    // Благородные газы
    if ([2, 10, 18, 36, 54, 86, 118].includes(number)) return 'noble-gas';

    // Щелочные металлы
    if ([3, 11, 19, 37, 55, 87].includes(number)) return 'alkali';

    // Щёлочноземельные металлы
    if ([4, 12, 20, 38, 56, 88].includes(number)) return 'alkaline-earth';

    // Неметаллы
    if ([1, 6, 7, 8, 9, 15, 16, 17, 34, 35, 53, 85].includes(number)) return 'nonmetal';

    // Полуметаллы
    if ([5, 14, 32, 33, 51, 52, 84].includes(number)) return 'metalloid';

    // Лантаноиды
    if (number >= 57 && number <= 71) return 'lanthanide';

    // Актиноиды
    if (number >= 89 && number <= 103) return 'actinide radioactive';

    // Переходные металлы (остальное)
    if (number >= 21 && number <= 30) return 'transition';
    if (number >= 39 && number <= 48) return 'transition';
    if (number >= 72 && number <= 80) return 'transition';
    if (number >= 104 && number <= 112) return 'transition';

    // Постпереходные металлы
    if ([13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116].includes(number)) return 'post-transition';

    return 'unknown';
}

// Определение группы и периода
function getGroupAndPeriod(number) {
    // Упрощенное определение
    if (number === 1) return { group: 1, period: 1 };
    if (number === 2) return { group: 18, period: 1 };

    // Период 2
    if (number <= 10) return { group: number - 2, period: 2 };

    // Период 3
    if (number <= 18) return { group: number - 10, period: 3 };

    // Период 4
    if (number <= 36) {
        if (number <= 20) return { group: number - 18, period: 4 };
        if (number <= 30) return { group: number - 20 + 3, period: 4 };
        return { group: number - 28 + 12, period: 4 };
    }

    // Упрощенно для остальных
    return { group: 0, period: Math.ceil(number / 18) };
}

// Загрузка данных
async function loadElements() {
    try {
        const response = await fetch('elements1.json');
        if (!response.ok) throw new Error('Не удалось загрузить данные');

        const jsonData = await response.json();

        // Преобразуем JSON данные в нужный формат
        state.elements = jsonData.map(item => {
            const number = item.atomic_number;
            const categoryInfo = getElementCategory(item);
            const { group, period } = getGroupAndPeriod(number);

            // Извлекаем атомную массу из fundamental
            const massMatch = item.fundamental.match(/Атомная масса: ([^\n]+)/);
            const mass = massMatch ? parseFloat(massMatch[1].replace(',', '.')) : 0;

            return {
                number: number,
                symbol: item.symbol,
                name: item.russian_name,
                name_en: item.name_en,
                category: categoryInfo.split(' ')[0], // Берем первую категорию
                group: group,
                period: period,
                mass: mass,
                fundamental: item.fundamental,
                properties: item.properties,
                reactions: item.reactions,
                history: item.history,
                applications: item.applications,
                isRadioactive: categoryInfo.includes('radioactive')
            };
        });

        console.log('Загружено элементов:', state.elements.length);
        return true;
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        return false;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', async function () {
    // Показываем загрузку
    showLoading(true);

    // Загружаем данные
    const loaded = await loadElements();

    if (loaded) {
        // Инициализируем таблицу
        initializeTable();
        setupEventListeners();
        updateStats();

        // Скрываем загрузку, показываем таблицу
        showLoading(false);
        document.getElementById('periodic-table').style.display = 'grid';

        console.log('Таблица Менделеева загружена!');
    } else {
        // Ошибка загрузки
        document.getElementById('loading').innerHTML = `
            <div style="color: var(--metal); text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>
                <h3>Ошибка загрузки данных</h3>
                <p>Не удалось загрузить данные элементов.</p>
                <button onclick="location.reload()" class="action-btn" style="margin-top: 20px;">
                    <i class="fas fa-redo"></i> Попробовать снова
                </button>
            </div>
        `;
    }
});

// Показать/скрыть загрузку
function showLoading(show) {
    const loading = document.getElementById('loading');
    const table = document.getElementById('periodic-table');

    if (show) {
        loading.style.display = 'block';
        table.style.display = 'none';
    } else {
        loading.style.display = 'none';
        table.style.display = 'grid';
    }
}

// Создание таблицы
function initializeTable() {
    const table = document.getElementById('periodic-table');
    table.innerHTML = '';

    // Создаем сетку 9×18
    for (let row = 1; row <= 9; row++) {
        for (let col = 1; col <= 18; col++) {
            const cell = document.createElement('div');
            cell.className = 'table-cell empty';
            cell.style.gridRow = row;
            cell.style.gridColumn = col;
            table.appendChild(cell);
        }
    }

    // Добавляем элементы
    state.elements.forEach(element => {
        const pos = elementPositions[element.number];
        if (pos) {
            const elementDiv = createElementDiv(element, pos);
            table.appendChild(elementDiv);
        }
    });

    // Добавляем метки
    addRowLabels();
}

// Создание элемента таблицы
function createElementDiv(element, position) {
    const div = document.createElement('div');
    div.className = `element ${element.category} ${element.isRadioactive ? 'radioactive' : ''}`;
    div.dataset.number = element.number;
    div.dataset.category = element.category;

    div.style.gridRow = position.row;
    div.style.gridColumn = position.col;

    div.innerHTML = `
        <div class="element-number">${element.number}</div>
        <div class="element-symbol">${element.symbol}</div>
        <div class="element-name">${element.name}</div>
    `;

    div.addEventListener('click', () => selectElement(element));
    return div;
}

// Добавление меток рядов
function addRowLabels() {
    const table = document.getElementById('periodic-table');

    // Лантаноиды
    const lanthanideLabel = document.createElement('div');
    lanthanideLabel.textContent = '*';
    lanthanideLabel.title = 'Лантаноиды';
    lanthanideLabel.style.gridRow = 6;
    lanthanideLabel.style.gridColumn = 2;
    lanthanideLabel.style.display = 'flex';
    lanthanideLabel.style.alignItems = 'center';
    lanthanideLabel.style.justifyContent = 'center';
    lanthanideLabel.style.fontSize = '20px';
    lanthanideLabel.style.color = 'var(--lanthanide)';
    lanthanideLabel.style.cursor = 'help';
    table.appendChild(lanthanideLabel);

    // Актиноиды
    const actinideLabel = document.createElement('div');
    actinideLabel.textContent = '**';
    actinideLabel.title = 'Актиноиды';
    actinideLabel.style.gridRow = 7;
    actinideLabel.style.gridColumn = 2;
    actinideLabel.style.display = 'flex';
    actinideLabel.style.alignItems = 'center';
    actinideLabel.style.justifyContent = 'center';
    actinideLabel.style.fontSize = '20px';
    actinideLabel.style.color = 'var(--actinide)';
    actinideLabel.style.cursor = 'help';
    table.appendChild(actinideLabel);
}

// Выбор элемента
function selectElement(element) {
    state.selectedElement = element;

    // Обновляем UI
    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('selected');
    });

    const selectedEl = document.querySelector(`.element[data-number="${element.number}"]`);
    if (selectedEl) {
        selectedEl.classList.add('selected');
        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }

    // Показываем информацию
    showElementInfo(element);

    // Обновляем статистику
    document.getElementById('selected-element').textContent = element.symbol;
}

// Показать информацию об элементе
function showElementInfo(element) {
    const infoPanel = document.getElementById('element-info');
    infoPanel.classList.add('active');

    // Обновляем основную информацию
    document.querySelector('.element-symbol-large').textContent = element.symbol;
    document.querySelector('.element-name').textContent = element.name;
    document.querySelector('.element-number').textContent = `Атомный номер: ${element.number}`;
    document.querySelector('.element-mass').textContent = `Атомная масса: ${element.mass || '--'}`;
    document.querySelector('.element-category').textContent = `Категория: ${getCategoryName(element.category)}`;

    // Обновляем вкладки
    document.getElementById('prop-fundamental').textContent = element.fundamental || 'Информация отсутствует';
    document.getElementById('prop-properties').textContent = element.properties || 'Информация отсутствует';
    document.getElementById('prop-reactions').textContent = element.reactions || 'Информация отсутствует';
    document.getElementById('prop-history').textContent = element.history || 'Информация отсутствует';
    document.getElementById('prop-applications').textContent = element.applications || 'Информация отсутствует';

    // Обновляем цвет карточки
    const card = document.querySelector('.element-card-large');
    card.className = `element-card-large ${element.category}`;
    if (element.isRadioactive) card.classList.add('radioactive');
}

// Название категории
function getCategoryName(category) {
    const names = {
        'alkali': 'Щелочной металл',
        'alkaline-earth': 'Щёлочноземельный металл',
        'transition': 'Переходный металл',
        'lanthanide': 'Лантаноид',
        'actinide': 'Актиноид',
        'nonmetal': 'Неметалл',
        'noble-gas': 'Благородный газ',
        'metalloid': 'Полуметалл',
        'post-transition': 'Постпереходный металл',
        'unknown': 'Неизвестно'
    };
    return names[category] || category;
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Поиск
    document.getElementById('search').addEventListener('input', function (e) {
        state.searchTerm = e.target.value;
        filterElements();
    });

    document.getElementById('clear-search').addEventListener('click', function () {
        document.getElementById('search').value = '';
        state.searchTerm = '';
        filterElements();
    });

    // Фильтры
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            state.currentFilter = this.dataset.filter;
            filterElements();
        });
    });

    // Вкладки
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.dataset.tab;

            // Деактивируем все кнопки и панели
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

            // Активируем выбранные
            this.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });

    // Закрытие информации
    document.getElementById('close-info').addEventListener('click', function () {
        document.getElementById('element-info').classList.remove('active');
    });

    // Копирование информации
    document.getElementById('copy-info').addEventListener('click', function () {
        const element = state.selectedElement;
        if (!element) return;

        const text = `${element.name} (${element.symbol})
Атомный номер: ${element.number}
Атомная масса: ${element.mass || '--'}
Категория: ${getCategoryName(element.category)}
${element.fundamental}`;

        navigator.clipboard.writeText(text).then(() => {
            Telegram.WebApp.showAlert('Информация скопирована!');
        });
    });

    // Ссылка на Wikipedia
    document.getElementById('wiki-link').addEventListener('click', function () {
        const element = state.selectedElement;
        if (!element) return;

        const lang = Telegram.WebApp.initDataUnsafe.user?.language_code || 'ru';
        const url = `https://${lang}.wikipedia.org/wiki/${element.name}`;
        Telegram.WebApp.openLink(url);
    });

    // Быстрые действия
    document.getElementById('show-all').addEventListener('click', function () {
        state.currentFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        filterElements();
    });

    document.getElementById('reset-view').addEventListener('click', function () {
        state.zoom = 1;
        state.searchTerm = '';
        state.currentFilter = 'all';
        document.getElementById('search').value = '';
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        filterElements();
        updateZoom();
    });

    document.getElementById('zoom-in').addEventListener('click', function () {
        if (state.zoom < 1.5) state.zoom += 0.1;
        updateZoom();
    });

    document.getElementById('zoom-out').addEventListener('click', function () {
        if (state.zoom > 0.7) state.zoom -= 0.1;
        updateZoom();
    });

    // Смена темы
    document.getElementById('toggle-theme').addEventListener('click', function () {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-theme');
        this.innerHTML = state.theme === 'light' ?
            '<i class="fas fa-moon"></i>' :
            '<i class="fas fa-sun"></i>';
    });

    // Закрытие по клику вне блока
    document.addEventListener('click', function (e) {
        const infoPanel = document.getElementById('element-info');
        if (infoPanel.classList.contains('active') &&
            !infoPanel.contains(e.target) &&
            !e.target.closest('.element')) {
            infoPanel.classList.remove('active');
        }
    });
}

// Фильтрация элементов
function filterElements() {
    const elements = document.querySelectorAll('.element');
    let visibleCount = 0;

    elements.forEach(el => {
        const number = parseInt(el.dataset.number);
        const element = state.elements.find(e => e.number === number);
        let visible = true;

        // Поиск
        if (state.searchTerm) {
            const searchIn = `${element.symbol} ${element.name} ${element.name_en} ${number}`.toLowerCase();
            visible = searchIn.includes(state.searchTerm.toLowerCase());
        }

        // Фильтр по категории
        if (visible && state.currentFilter !== 'all') {
            if (state.currentFilter === 'metal') {
                visible = ['alkali', 'alkaline-earth', 'transition', 'post-transition', 'lanthanide', 'actinide'].includes(element.category);
            } else if (state.currentFilter === 'nonmetal') {
                visible = element.category === 'nonmetal';
            } else if (state.currentFilter === 'noble-gas') {
                visible = element.category === 'noble-gas';
            } else if (state.currentFilter === 'alkali') {
                visible = element.category === 'alkali';
            } else if (state.currentFilter === 'alkaline-earth') {
                visible = element.category === 'alkaline-earth';
            } else if (state.currentFilter === 'transition') {
                visible = element.category === 'transition';
            } else if (state.currentFilter === 'metalloid') {
                visible = element.category === 'metalloid';
            } else if (state.currentFilter === 'radioactive') {
                visible = element.isRadioactive;
            }
        }

        if (visible) {
            el.style.display = 'flex';
            visibleCount++;
        } else {
            el.style.display = 'none';
            el.classList.remove('selected');
        }
    });

    // Обновляем статистику
    document.getElementById('filtered-count').textContent = visibleCount;
    updateStats();
}

// Обновление статистики
function updateStats() {
    const total = state.elements.length;
    let filtered = total;

    if (state.currentFilter !== 'all' || state.searchTerm) {
        filtered = document.querySelectorAll('.element[style*="display: flex"]').length;
    }

    document.getElementById('total-elements').textContent = total;
    document.getElementById('filtered-count').textContent = filtered;
}

// Обновление масштаба
function updateZoom() {
    const table = document.querySelector('.periodic-table');
    table.style.transform = `scale(${state.zoom})`;
    table.style.transformOrigin = 'center top';
}

// Сообщение о готовности
console.log('Таблица Менделеева инициализирована');