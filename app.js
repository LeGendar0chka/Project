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
    1: {row: 1, col: 1}, 2: {row: 1, col: 18},
    3: {row: 2, col: 1}, 4: {row: 2, col: 2}, 5: {row: 2, col: 13}, 6: {row: 2, col: 14},
    7: {row: 2, col: 15}, 8: {row: 2, col: 16}, 9: {row: 2, col: 17}, 10: {row: 2, col: 18},
    11: {row: 3, col: 1}, 12: {row: 3, col: 2}, 13: {row: 3, col: 13}, 14: {row: 3, col: 14},
    15: {row: 3, col: 15}, 16: {row: 3, col: 16}, 17: {row: 3, col: 17}, 18: {row: 3, col: 18},
    19: {row: 4, col: 1}, 20: {row: 4, col: 2}, 21: {row: 4, col: 3}, 22: {row: 4, col: 4},
    23: {row: 4, col: 5}, 24: {row: 4, col: 6}, 25: {row: 4, col: 7}, 26: {row: 4, col: 8},
    27: {row: 4, col: 9}, 28: {row: 4, col: 10}, 29: {row: 4, col: 11}, 30: {row: 4, col: 12},
    31: {row: 4, col: 13}, 32: {row: 4, col: 14}, 33: {row: 4, col: 15}, 34: {row: 4, col: 16},
    35: {row: 4, col: 17}, 36: {row: 4, col: 18},
    37: {row: 5, col: 1}, 38: {row: 5, col: 2}, 39: {row: 5, col: 3}, 40: {row: 5, col: 4},
    41: {row: 5, col: 5}, 42: {row: 5, col: 6}, 43: {row: 5, col: 7}, 44: {row: 5, col: 8},
    45: {row: 5, col: 9}, 46: {row: 5, col: 10}, 47: {row: 5, col: 11}, 48: {row: 5, col: 12},
    49: {row: 5, col: 13}, 50: {row: 5, col: 14}, 51: {row: 5, col: 15}, 52: {row: 5, col: 16},
    53: {row: 5, col: 17}, 54: {row: 5, col: 18},
    55: {row: 6, col: 1}, 56: {row: 6, col: 2}, 
    // Лантаноиды (ряд 8)
    57: {row: 8, col: 3}, 58: {row: 8, col: 4}, 59: {row: 8, col: 5}, 60: {row: 8, col: 6},
    61: {row: 8, col: 7}, 62: {row: 8, col: 8}, 63: {row: 8, col: 9}, 64: {row: 8, col: 10},
    65: {row: 8, col: 11}, 66: {row: 8, col: 12}, 67: {row: 8, col: 13}, 68: {row: 8, col: 14},
    69: {row: 8, col: 15}, 70: {row: 8, col: 16}, 71: {row: 8, col: 17},
    // Продолжение 6 периода
    72: {row: 6, col: 4}, 73: {row: 6, col: 5}, 74: {row: 6, col: 6}, 75: {row: 6, col: 7},
    76: {row: 6, col: 8}, 77: {row: 6, col: 9}, 78: {row: 6, col: 10}, 79: {row: 6, col: 11},
    80: {row: 6, col: 12}, 81: {row: 6, col: 13}, 82: {row: 6, col: 14}, 83: {row: 6, col: 15},
    84: {row: 6, col: 16}, 85: {row: 6, col: 17}, 86: {row: 6, col: 18},
    87: {row: 7, col: 1}, 88: {row: 7, col: 2},
    // Актиноиды (ряд 9)
    89: {row: 9, col: 3}, 90: {row: 9, col: 4}, 91: {row: 9, col: 5}, 92: {row: 9, col: 6},
    93: {row: 9, col: 7}, 94: {row: 9, col: 8}, 95: {row: 9, col: 9}, 96: {row: 9, col: 10},
    97: {row: 9, col: 11}, 98: {row: 9, col: 12}, 99: {row: 9, col: 13}, 100: {row: 9, col: 14},
    101: {row: 9, col: 15}, 102: {row: 9, col: 16}, 103: {row: 9, col: 17},
    // Продолжение 7 периода
    104: {row: 7, col: 4}, 105: {row: 7, col: 5}, 106: {row: 7, col: 6}, 107: {row: 7, col: 7},
    108: {row: 7, col: 8}, 109: {row: 7, col: 9}, 110: {row: 7, col: 10}, 111: {row: 7, col: 11},
    112: {row: 7, col: 12}, 113: {row: 7, col: 13}, 114: {row: 7, col: 14}, 115: {row: 7, col: 15},
    116: {row: 7, col: 16}, 117: {row: 7, col: 17}, 118: {row: 7, col: 18}
};

// Категории элементов для классификации
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
    if (number >= 89 && number <= 103) return 'actinide';
    
    // Переходные металлы
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
    if (number === 1) return {group: 1, period: 1};
    if (number === 2) return {group: 18, period: 1};
    if (number <= 10) return {group: number - 2, period: 2};
    if (number <= 18) return {group: number - 10, period: 3};
    if (number <= 36) {
        if (number <= 20) return {group: number - 18, period: 4};
        if (number <= 30) return {group: number - 20 + 3, period: 4};
        return {group: number - 28 + 12, period: 4};
    }
    return {group: 0, period: Math.ceil(number / 18)};
}

// Инициализация
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Документ загружен, начинаем инициализацию...');
    
    // Показываем загрузку
    showLoading(true);
    
    try {
        // Загружаем данные
        await loadElements();
        
        // Инициализируем таблицу
        initializeTable();
        setupEventListeners();
        updateStats();
        
        // Скрываем загрузку, показываем таблицу
        showLoading(false);
        document.getElementById('periodic-table').style.display = 'grid';
        
        console.log('Таблица Менделеева успешно загружена! Элементов:', state.elements.length);
    } catch (error) {
        console.error('Ошибка при загрузке:', error);
        document.getElementById('loading').innerHTML = `
            <div style="color: #ff6b6b; text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>
                <h3>Ошибка загрузки данных</h3>
                <p>${error.message}</p>
                <button onclick="location.reload()" class="action-btn" style="margin-top: 20px;">
                    <i class="fas fa-redo"></i> Попробовать снова
                </button>
            </div>
        `;
    }
});

// Загрузка данных
async function loadElements() {
    console.log('Начинаем загрузку элементов...');
    
    try {
        const response = await fetch('elements1.json');
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('JSON загружен, элементов:', jsonData.length);
        
        // Преобразуем JSON данные в нужный формат
        state.elements = jsonData.map(item => {
            const number = parseInt(item.atomic_number);
            
            if (isNaN(number)) {
                console.warn('Некорректный атомный номер:', item.atomic_number);
                return null;
            }
            
            const categoryInfo = getElementCategory({atomic_number: number});
            const {group, period} = getGroupAndPeriod(number);
            
            // Извлекаем атомную массу из fundamental
            let mass = 0;
            if (item.fundamental) {
                const massMatch = item.fundamental.match(/Атомная масса:\s*([^\n]+)/);
                if (massMatch) {
                    const massStr = massMatch[1].replace(',', '.').replace(/\[|\]/g, '');
                    mass = parseFloat(massStr) || 0;
                }
            }
            
            return {
                number: number,
                symbol: item.symbol || '',
                name: item.russian_name || item.name_en || '',
                name_en: item.name_en || '',
                category: categoryInfo.split(' ')[0],
                group: group || 0,
                period: period || 0,
                mass: mass,
                fundamental: item.fundamental || '',
                properties: item.properties || '',
                reactions: item.reactions || '',
                history: item.history || '',
                applications: item.applications || '',
                isRadioactive: categoryInfo.includes('actinide') || number >= 84
            };
        }).filter(el => el !== null); // Убираем null элементы
        
        console.log('Элементы обработаны:', state.elements.length);
        
        // Проверяем, что элементы загружены
        if (state.elements.length === 0) {
            throw new Error('Не удалось загрузить элементы из JSON файла');
        }
        
        return true;
    } catch (error) {
        console.error('Ошибка загрузки элементов:', error);
        throw error;
    }
}

// Показать/скрыть загрузку
function showLoading(show) {
    const loading = document.getElementById('loading');
    const table = document.getElementById('periodic-table');
    
    if (show) {
        loading.style.display = 'block';
        if (table) table.style.display = 'none';
    } else {
        loading.style.display = 'none';
        if (table) table.style.display = 'grid';
    }
}

// Создание таблицы
function initializeTable() {
    console.log('Инициализация таблицы...');
    const table = document.getElementById('periodic-table');
    if (!table) {
        console.error('Элемент #periodic-table не найден!');
        return;
    }
    
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
    let addedElements = 0;
    state.elements.forEach(element => {
        const pos = elementPositions[element.number];
        if (pos) {
            const elementDiv = createElementDiv(element, pos);
            table.appendChild(elementDiv);
            addedElements++;
        } else {
            console.warn(`Не найдены координаты для элемента ${element.number} (${element.symbol})`);
        }
    });
    
    console.log(`Добавлено элементов в таблицу: ${addedElements}`);
    
    // Добавляем метки
    addRowLabels();
}

// Создание элемента таблицы
function createElementDiv(element, position) {
    const div = document.createElement('div');
    div.className = `element ${element.category} ${element.isRadioactive ? 'radioactive' : ''}`;
    div.dataset.number = element.number;
    div.dataset.symbol = element.symbol;
    div.dataset.category = element.category;
    
    div.style.gridRow = position.row;
    div.style.gridColumn = position.col;
    
    div.innerHTML = `
        <div class="element-number">${element.number}</div>
        <div class="element-symbol">${element.symbol}</div>
        <div class="element-name">${element.name}</div>
    `;
    
    div.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(element);
    });
    
    // Добавляем hover эффект
    div.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        highlightElement(element);
    });
    
    div.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        removeHighlight();
    });
    
    return div;
}

// Подсветка элемента при наведении
function highlightElement(element) {
    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('highlighted');
    });
    
    const targetElement = document.querySelector(`.element[data-number="${element.number}"]`);
    if (targetElement) {
        targetElement.classList.add('highlighted');
    }
}

// Убрать подсветку
function removeHighlight() {
    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('highlighted');
    });
}

// Добавление меток рядов
function addRowLabels() {
    const table = document.getElementById('periodic-table');
    if (!table) return;
    
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
    lanthanideLabel.style.color = '#748ffc';
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
    actinideLabel.style.color = '#f783ac';
    actinideLabel.style.cursor = 'help';
    table.appendChild(actinideLabel);
}

// Выбор элемента
function selectElement(element) {
    console.log('Выбран элемент:', element.number, element.symbol, element.name);
    
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
// Показать информацию об элементе
function showElementInfo(element) {
    console.log('Показываем информацию для элемента:', element.symbol, element.number);
    
    const infoPanel = document.getElementById('element-info');
    if (!infoPanel) {
        console.error('Элемент #element-info не найден!');
        return;
    }
    
    // Показываем панель информации
    infoPanel.classList.add('active');
    
    // ВАЖНО: Используем ID или конкретные селекторы для каждого элемента
    // Исправляем селекторы - ищем элементы внутри панели информации
    
    // Обновляем основную информацию в карточке элемента
    const symbolLarge = infoPanel.querySelector('.element-symbol-large');
    const nameElement = infoPanel.querySelector('.element-name'); // В карточке
    const numberElement = infoPanel.querySelector('.element-card-large .element-number'); // В карточке
    const massElement = infoPanel.querySelector('.element-card-large .element-mass'); // В карточке
    const categoryElement = infoPanel.querySelector('.element-card-large .element-category'); // В карточке
    
    console.log('Найденные элементы:', {
        symbolLarge: !!symbolLarge,
        nameElement: !!nameElement,
        numberElement: !!numberElement,
        massElement: !!massElement,
        categoryElement: !!categoryElement
    });
    
    if (symbolLarge) {
        symbolLarge.textContent = element.symbol;
        console.log('Установлен символ:', element.symbol);
    }
    
    if (nameElement) {
        nameElement.textContent = element.name;
        console.log('Установлено название:', element.name);
    }
    
    if (numberElement) {
        numberElement.textContent = `Атомный номер: ${element.number}`;
        console.log('Установлен номер:', element.number);
    }
    
    if (massElement) {
        massElement.textContent = `Атомная масса: ${element.mass || '--'}`;
        console.log('Установлена масса:', element.mass);
    }
    
    if (categoryElement) {
        categoryElement.textContent = `Категория: ${getCategoryName(element.category)}`;
        console.log('Установлена категория:', element.category);
    }
    
    // Обновляем вкладки
    const fundamentalEl = infoPanel.querySelector('#prop-fundamental');
    const propertiesEl = infoPanel.querySelector('#prop-properties');
    const reactionsEl = infoPanel.querySelector('#prop-reactions');
    const historyEl = infoPanel.querySelector('#prop-history');
    const applicationsEl = infoPanel.querySelector('#prop-applications');
    
    if (fundamentalEl) {
        fundamentalEl.textContent = element.fundamental || 'Информация отсутствует';
        console.log('Обновлена фундаментальная информация');
    }
    
    if (propertiesEl) {
        propertiesEl.textContent = element.properties || 'Информация отсутствует';
        console.log('Обновлены свойства');
    }
    
    if (reactionsEl) {
        reactionsEl.textContent = element.reactions || 'Информация отсутствует';
        console.log('Обновлены реакции');
    }
    
    if (historyEl) {
        historyEl.textContent = element.history || 'Информация отсутствует';
        console.log('Обновлена история');
    }
    
    if (applicationsEl) {
        applicationsEl.textContent = element.applications || 'Информация отсутствует';
        console.log('Обновлено применение');
    }
    
    // Обновляем цвет карточки
    const card = infoPanel.querySelector('.element-card-large');
    if (card) {
        // Удаляем все классы категорий
        card.className = 'element-card-large';
        // Добавляем класс текущей категории
        card.classList.add(element.category);
        if (element.isRadioactive) card.classList.add('radioactive');
        console.log('Обновлен цвет карточки:', element.category);
    }
    
    // Активируем первую вкладку
    const firstTab = infoPanel.querySelector('.tab-btn[data-tab="fundamental"]');
    const firstPane = infoPanel.querySelector('#tab-fundamental');
    
    if (firstTab && firstPane) {
        infoPanel.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        infoPanel.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        firstTab.classList.add('active');
        firstPane.classList.add('active');
    }
    
    console.log('Информация об элементе успешно обновлена');
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
    console.log('Настройка обработчиков событий...');
    
    // Поиск
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            state.searchTerm = e.target.value;
            filterElements();
        });
    }
    
    const clearSearchBtn = document.getElementById('clear-search');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('search');
            if (searchInput) searchInput.value = '';
            state.searchTerm = '';
            filterElements();
        });
    }
    
    // Фильтры
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            state.currentFilter = this.dataset.filter;
            filterElements();
        });
    });
    
    // Вкладки
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Деактивируем все кнопки и панели
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            // Активируем выбранные
            this.classList.add('active');
            const tabPane = document.getElementById(`tab-${tabId}`);
            if (tabPane) tabPane.classList.add('active');
        });
    });
    
    // Закрытие информации
    const closeInfoBtn = document.getElementById('close-info');
    if (closeInfoBtn) {
        closeInfoBtn.addEventListener('click', function() {
            const infoPanel = document.getElementById('element-info');
            if (infoPanel) infoPanel.classList.remove('active');
        });
    }
    
    // Копирование информации
    const copyInfoBtn = document.getElementById('copy-info');
    if (copyInfoBtn) {
        copyInfoBtn.addEventListener('click', function() {
            const element = state.selectedElement;
            if (!element) return;
            
            const text = `${element.name} (${element.symbol})
Атомный номер: ${element.number}
Атомная масса: ${element.mass || '--'}
Категория: ${getCategoryName(element.category)}
${element.fundamental}`;
            
            navigator.clipboard.writeText(text).then(() => {
                if (Telegram.WebApp && Telegram.WebApp.showAlert) {
                    Telegram.WebApp.showAlert('Информация скопирована!');
                } else {
                    alert('Информация скопирована!');
                }
            });
        });
    }
    
    // Ссылка на Wikipedia
    const wikiLinkBtn = document.getElementById('wiki-link');
    if (wikiLinkBtn) {
        wikiLinkBtn.addEventListener('click', function() {
            const element = state.selectedElement;
            if (!element) return;
            
            const lang = Telegram.WebApp && Telegram.WebApp.initDataUnsafe && Telegram.WebApp.initDataUnsafe.user?.language_code || 'ru';
            const url = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(element.name)}`;
            
            if (Telegram.WebApp && Telegram.WebApp.openLink) {
                Telegram.WebApp.openLink(url);
            } else {
                window.open(url, '_blank');
            }
        });
    }
    
    // Быстрые действия
    document.getElementById('show-all')?.addEventListener('click', function() {
        state.currentFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.add('active');
        filterElements();
    });
    
    document.getElementById('reset-view')?.addEventListener('click', function() {
        state.zoom = 1;
        state.searchTerm = '';
        state.currentFilter = 'all';
        const searchInput = document.getElementById('search');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.add('active');
        filterElements();
        updateZoom();
    });
    
    document.getElementById('zoom-in')?.addEventListener('click', function() {
        if (state.zoom < 1.5) state.zoom += 0.1;
        updateZoom();
    });
    
    document.getElementById('zoom-out')?.addEventListener('click', function() {
        if (state.zoom > 0.7) state.zoom -= 0.1;
        updateZoom();
    });
    
    // Смена темы
    const themeBtn = document.getElementById('toggle-theme');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            document.body.classList.toggle('dark-theme');
            this.innerHTML = state.theme === 'light' ? 
                '<i class="fas fa-moon"></i>' : 
                '<i class="fas fa-sun"></i>';
        });
    }
    
    // Закрытие по клику вне блока
    document.addEventListener('click', function(e) {
        const infoPanel = document.getElementById('element-info');
        if (infoPanel && infoPanel.classList.contains('active') && 
            !infoPanel.contains(e.target) && 
            !e.target.closest('.element')) {
            infoPanel.classList.remove('active');
        }
    });
    
    console.log('Обработчики событий настроены');
}

// Фильтрация элементов
function filterElements() {
    const elements = document.querySelectorAll('.element');
    let visibleCount = 0;
    
    elements.forEach(el => {
        const number = parseInt(el.dataset.number);
        const element = state.elements.find(e => e.number === number);
        let visible = true;
        
        if (!element) {
            el.style.display = 'none';
            return;
        }
        
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
    updateStats();
}

// Обновление статистики
function updateStats() {
    const total = state.elements.length;
    let filtered = total;
    
    if (state.currentFilter !== 'all' || state.searchTerm) {
        filtered = document.querySelectorAll('.element[style*="display: flex"]').length;
    }
    
    const totalElement = document.getElementById('total-elements');
    const filteredElement = document.getElementById('filtered-count');
    
    if (totalElement) totalElement.textContent = total;
    if (filteredElement) filteredElement.textContent = filtered;
}

// Обновление масштаба
function updateZoom() {
    const table = document.querySelector('.periodic-table');
    if (table) {
        table.style.transform = `scale(${state.zoom})`;
        table.style.transformOrigin = 'center top';
    }
}

// Сообщение о готовности
console.log('Таблица Менделеева инициализирована');
