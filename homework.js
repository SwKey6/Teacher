// Homework page logic
let currentCodeData = null;
let generatedProblems = [];

// Code input modal
function showCodeInput() {
    const modal = document.createElement('div');
    modal.id = 'codeModal';
    modal.className = 'code-modal';
    modal.innerHTML = `
        <div class="code-modal-content" onclick="event.stopPropagation()">
            <h2>Введите код доступа</h2>
            <p>Для доступа к домашнему заданию введите код, полученный от преподавателя.</p>
            <input type="text" id="codeInput" placeholder="Введите код" class="code-input" autocomplete="off">
            <div id="codeError" class="code-error hidden"></div>
            <div class="code-modal-buttons">
                <button class="btn btn-primary" onclick="checkCode()">Продолжить</button>
                <button class="btn btn-secondary" onclick="closeCodeModal()">Отмена</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCodeModal();
        }
    });
    
    // Focus on input
    setTimeout(() => {
        const input = document.getElementById('codeInput');
        if (input) {
            input.focus();
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkCode();
                }
            });
        }
    }, 100);
}

function checkCode() {
    const codeInput = document.getElementById('codeInput');
    const errorDiv = document.getElementById('codeError');
    const code = codeInput.value.trim().toUpperCase();
    
    if (!code) {
        errorDiv.textContent = 'Пожалуйста, введите код';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    if (homeworkCodes[code]) {
        currentCodeData = homeworkCodes[code];
        closeCodeModal();
        showHomeworkContent();
    } else {
        errorDiv.textContent = 'Неверный код доступа. Проверьте правильность ввода.';
        errorDiv.classList.remove('hidden');
        codeInput.value = '';
        codeInput.focus();
    }
}

function closeCodeModal() {
    const modal = document.getElementById('codeModal');
    if (modal) {
        modal.remove();
    }
}

function showHomeworkContent() {
    const container = document.querySelector('.homework-wrapper .container');
    container.innerHTML = `
        <div class="homework-header fade-in">
            <div class="homework-header-top">
                <a href="index.html" class="homework-back-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 20px; height: 20px;">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Вернуться на главную
                </a>
            </div>
            <h1 class="page-title gradient-text">Домашнее задание</h1>
            <div class="homework-info">
                <p><strong>Тема:</strong> ${currentCodeData.topicName}</p>
                <p><strong>Предмет:</strong> ${currentCodeData.subject === 'math' ? 'Математика' : 'Физика'}</p>
                <p><strong>Класс:</strong> ${currentCodeData.grade}</p>
            </div>
        </div>
        
        <div class="homework-main">
            <div class="homework-main-content">
                <div class="homework-instructions">
                    <h2>Инструкция</h2>
                    <p>Решите все 10 задач. Запишите ответы на листе бумаги или в тетради.</p>
                    <p>После решения вы можете проверить ответы, нажав кнопку "Показать ответы" ниже.</p>
                </div>
                
                <div class="homework-actions">
                    <button class="btn btn-primary" onclick="generateHomework()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 20px; height: 20px;">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 1 1 10-10"></path>
                        </svg>
                        Сгенерировать домашнее задание
                    </button>
                    <button class="btn btn-secondary" onclick="showAnswers()" id="showAnswersBtn" style="display: none;">
                        Показать ответы
                    </button>
                    <button class="btn btn-secondary" onclick="hideAnswers()" id="hideAnswersBtn" style="display: none;">
                        Скрыть ответы
                    </button>
                </div>
                
                <div id="homeworkProblems" class="homework-problems"></div>
            </div>
            
            <div class="homework-sidebar">
                <div class="homework-board-container">
                    <div class="lesson-board-header">
                        <h3>Доска для решения</h3>
                    </div>
                    <div class="lesson-board-toolbar">
                        <div class="toolbar-group">
                            <button class="tool-btn active" id="homeworkPencilBtn" onclick="setHomeworkTool('pencil')" title="Карандаш">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </button>
                            <button class="tool-btn" id="homeworkEraserBtn" onclick="setHomeworkTool('eraser')" title="Ластик">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 12H3M17 8l4 4-4 4M7 8l-4 4 4 4"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="toolbar-group">
                            <div class="colors-grid">
                                <button class="color-btn" style="background: #d4af37" onclick="setHomeworkColor('#d4af37')" title="Золотой"></button>
                                <button class="color-btn active" style="background: #ffffff" onclick="setHomeworkColor('#ffffff')" title="Белый"></button>
                                <button class="color-btn" style="background: #ff0000" onclick="setHomeworkColor('#ff0000')" title="Красный"></button>
                                <button class="color-btn" style="background: #00ff00" onclick="setHomeworkColor('#00ff00')" title="Зеленый"></button>
                                <button class="color-btn" style="background: #0000ff" onclick="setHomeworkColor('#0000ff')" title="Синий"></button>
                            </div>
                        </div>
                        <div class="toolbar-group">
                            <label class="toolbar-label">Толщина:</label>
                            <input type="range" id="homeworkLineWidth" min="1" max="20" value="3" oninput="setHomeworkLineWidth(this.value)">
                            <span class="toolbar-value" id="homeworkLineWidthValue">3</span>
                        </div>
                        <div class="toolbar-group">
                            <button class="tool-btn danger" onclick="clearHomeworkBoard()" title="Очистить">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="lesson-canvas-wrapper">
                        <canvas id="homeworkCanvas"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize board after content is loaded
    setTimeout(() => {
        initHomeworkBoard();
    }, 100);
}

function generateHomework() {
    const problemsContainer = document.getElementById('homeworkProblems');
    const showAnswersBtn = document.getElementById('showAnswersBtn');
    const hideAnswersBtn = document.getElementById('hideAnswersBtn');
    
    if (currentCodeData.topic === 'fractions') {
        generatedProblems = generateFractionsProblems(10);
    } else if (currentCodeData.topic === 'equations6') {
        generatedProblems = generateEquations6Problems(10);
    } else if (currentCodeData.topic === 'equations7') {
        generatedProblems = generateEquations7Problems(10);
    } else {
        problemsContainer.innerHTML = '<p>Домашнее задание для этой темы пока не готово.</p>';
        return;
    }
    
    let html = '<div class="problems-list">';
    generatedProblems.forEach((problem, index) => {
        html += `
            <div class="homework-problem">
                <div class="problem-number">Задача ${index + 1}</div>
                <div class="problem-text">${problem.text}</div>
                <div class="problem-answer hidden" id="answer-${index}">
                    <strong>Ответ:</strong> ${problem.answer}
                    ${problem.solution ? `<div class="problem-solution">${problem.solution}</div>` : ''}
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    problemsContainer.innerHTML = html;
    showAnswersBtn.style.display = 'inline-flex';
    hideAnswersBtn.style.display = 'none';
    
    // Scroll to problems
    problemsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showAnswers() {
    generatedProblems.forEach((_, index) => {
        const answerEl = document.getElementById(`answer-${index}`);
        if (answerEl) {
            answerEl.classList.remove('hidden');
        }
    });
    document.getElementById('showAnswersBtn').style.display = 'none';
    document.getElementById('hideAnswersBtn').style.display = 'inline-flex';
}

function hideAnswers() {
    generatedProblems.forEach((_, index) => {
        const answerEl = document.getElementById(`answer-${index}`);
        if (answerEl) {
            answerEl.classList.add('hidden');
        }
    });
    document.getElementById('showAnswersBtn').style.display = 'inline-flex';
    document.getElementById('hideAnswersBtn').style.display = 'none';
}

// Генератор задач по дробям - 10 разнообразных задач
function generateFractionsProblems(count) {
    const problems = [];
    const usedTypes = new Set();
    
    // Функции для генерации задач разных типов
    const generators = [
        // 1. Сложение с одинаковыми знаменателями
        () => {
            const denom = [4, 5, 6, 8, 10, 12][Math.floor(Math.random() * 6)];
            const num1 = Math.floor(Math.random() * (denom - 1)) + 1;
            const num2 = Math.floor(Math.random() * (denom - num1)) + 1;
            const sum = num1 + num2;
            const gcd = findGCD(sum, denom);
            const simplified = `${sum / gcd}/${denom / gcd}`;
            return {
                text: `Вычислите: ${num1}/${denom} + ${num2}/${denom}`,
                answer: simplified === `${sum}/${denom}` ? simplified : `${sum}/${denom} = ${simplified}`,
                solution: `${num1}/${denom} + ${num2}/${denom} = ${sum}/${denom}${simplified !== `${sum}/${denom}` ? ` = ${simplified}` : ''}`
            };
        },
        
        // 2. Вычитание с одинаковыми знаменателями
        () => {
            const denom = [4, 5, 6, 8, 10, 12][Math.floor(Math.random() * 6)];
            const num1 = Math.floor(Math.random() * (denom - 2)) + 3;
            const num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
            const diff = num1 - num2;
            const gcd = findGCD(diff, denom);
            const simplified = `${diff / gcd}/${denom / gcd}`;
            return {
                text: `Вычислите: ${num1}/${denom} - ${num2}/${denom}`,
                answer: simplified === `${diff}/${denom}` ? simplified : `${diff}/${denom} = ${simplified}`,
                solution: `${num1}/${denom} - ${num2}/${denom} = ${diff}/${denom}${simplified !== `${diff}/${denom}` ? ` = ${simplified}` : ''}`
            };
        },
        
        // 3. Сложение с разными знаменателями (простой НОК)
        () => {
            const denoms = [[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7]][Math.floor(Math.random() * 6)];
            const [d1, d2] = denoms;
            const lcm = findLCM(d1, d2);
            const num1 = Math.floor(Math.random() * (d1 - 1)) + 1;
            const num2 = Math.floor(Math.random() * (d2 - 1)) + 1;
            const sum = (num1 * lcm / d1) + (num2 * lcm / d2);
            const gcd = findGCD(sum, lcm);
            const simplified = `${sum / gcd}/${lcm / gcd}`;
            return {
                text: `Вычислите: ${num1}/${d1} + ${num2}/${d2}`,
                answer: simplified === `${sum}/${lcm}` ? simplified : `${sum}/${lcm} = ${simplified}`,
                solution: `НОК(${d1}, ${d2}) = ${lcm}<br>${num1}/${d1} = ${num1 * lcm / d1}/${lcm}, ${num2}/${d2} = ${num2 * lcm / d2}/${lcm}<br>${num1 * lcm / d1}/${lcm} + ${num2 * lcm / d2}/${lcm} = ${sum}/${lcm}${simplified !== `${sum}/${lcm}` ? ` = ${simplified}` : ''}`
            };
        },
        
        // 4. Вычитание с разными знаменателями
        () => {
            let attempts = 0;
            while (attempts < 10) {
                const denoms = [[2, 3], [3, 4], [3, 5], [4, 5], [5, 6], [2, 5]][Math.floor(Math.random() * 6)];
                const [d1, d2] = denoms;
                const lcm = findLCM(d1, d2);
                const num1 = Math.floor(Math.random() * (d1 - 1)) + 2;
                const num2 = Math.floor(Math.random() * (d2 - 1)) + 1;
                const n1Converted = num1 * lcm / d1;
                const n2Converted = num2 * lcm / d2;
                if (n1Converted > n2Converted) {
                    const diff = n1Converted - n2Converted;
                    const gcd = findGCD(diff, lcm);
                    const simplified = `${diff / gcd}/${lcm / gcd}`;
                    return {
                        text: `Вычислите: ${num1}/${d1} - ${num2}/${d2}`,
                        answer: simplified === `${diff}/${lcm}` ? simplified : `${diff}/${lcm} = ${simplified}`,
                        solution: `НОК(${d1}, ${d2}) = ${lcm}<br>${num1}/${d1} = ${n1Converted}/${lcm}, ${num2}/${d2} = ${n2Converted}/${lcm}<br>${n1Converted}/${lcm} - ${n2Converted}/${lcm} = ${diff}/${lcm}${simplified !== `${diff}/${lcm}` ? ` = ${simplified}` : ''}`
                    };
                }
                attempts++;
            }
            // Fallback - простое вычитание
            return {
                text: `Вычислите: 3/4 - 1/4`,
                answer: `1/2`,
                solution: `3/4 - 1/4 = 2/4 = 1/2`
            };
        },
        
        // 5. Неправильная дробь в смешанное число
        () => {
            const denom = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
            const whole = Math.floor(Math.random() * 3) + 1;
            const remainder = Math.floor(Math.random() * (denom - 1)) + 1;
            const num = whole * denom + remainder;
            return {
                text: `Представьте неправильную дробь ${num}/${denom} в виде смешанного числа`,
                answer: `${whole} ${remainder}/${denom}`,
                solution: `${num}/${denom} = ${whole} целых и ${remainder}/${denom} (${num} ÷ ${denom} = ${whole} целых, остаток ${remainder})`
            };
        },
        
        // 6. Смешанное число в неправильную дробь
        () => {
            const denom = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
            const whole = Math.floor(Math.random() * 3) + 1;
            const num = Math.floor(Math.random() * (denom - 1)) + 1;
            const improper = whole * denom + num;
            return {
                text: `Представьте смешанное число ${whole} ${num}/${denom} в виде неправильной дроби`,
                answer: `${improper}/${denom}`,
                solution: `${whole} ${num}/${denom} = ${whole} × ${denom} + ${num} = ${improper}, значит ${improper}/${denom}`
            };
        },
        
        // 7. Сложение смешанных чисел
        () => {
            const denom = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
            const whole1 = Math.floor(Math.random() * 2) + 1;
            const num1 = Math.floor(Math.random() * (denom - 1)) + 1;
            const whole2 = Math.floor(Math.random() * 2) + 1;
            const num2 = Math.floor(Math.random() * (denom - 1)) + 1;
            const sumNum = num1 + num2;
            const extraWhole = Math.floor(sumNum / denom);
            const finalWhole = whole1 + whole2 + extraWhole;
            const finalNum = sumNum % denom;
            return {
                text: `Вычислите: ${whole1} ${num1}/${denom} + ${whole2} ${num2}/${denom}`,
                answer: finalNum === 0 ? `${finalWhole}` : `${finalWhole} ${finalNum}/${denom}`,
                solution: `Складываем целые части: ${whole1} + ${whole2} = ${whole1 + whole2}<br>Складываем дроби: ${num1}/${denom} + ${num2}/${denom} = ${sumNum}/${denom}${extraWhole > 0 ? ` = ${extraWhole} целых и ${finalNum}/${denom}` : ''}<br>Итого: ${finalWhole}${finalNum > 0 ? ` ${finalNum}/${denom}` : ''}`
            };
        },
        
        // 8. Вычитание смешанных чисел
        () => {
            let attempts = 0;
            while (attempts < 10) {
                const denom = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
                const whole1 = Math.floor(Math.random() * 2) + 2;
                const num1 = Math.floor(Math.random() * denom);
                const whole2 = Math.floor(Math.random() * (whole1 - 1)) + 1;
                const num2 = Math.floor(Math.random() * denom);
                let n1 = whole1 * denom + num1;
                let n2 = whole2 * denom + num2;
                if (n1 > n2) {
                    const diff = n1 - n2;
                    const finalWhole = Math.floor(diff / denom);
                    const finalNum = diff % denom;
                    return {
                        text: `Вычислите: ${whole1} ${num1}/${denom} - ${whole2} ${num2}/${denom}`,
                        answer: finalNum === 0 ? `${finalWhole}` : `${finalWhole} ${finalNum}/${denom}`,
                        solution: `Преобразуем в неправильные дроби: ${whole1} ${num1}/${denom} = ${n1}/${denom}, ${whole2} ${num2}/${denom} = ${n2}/${denom}<br>${n1}/${denom} - ${n2}/${denom} = ${diff}/${denom} = ${finalWhole}${finalNum > 0 ? ` ${finalNum}/${denom}` : ''}`
                    };
                }
                attempts++;
            }
            // Fallback
            return {
                text: `Вычислите: 2 3/4 - 1 1/4`,
                answer: `1 1/2`,
                solution: `2 3/4 - 1 1/4 = 11/4 - 5/4 = 6/4 = 1 1/2`
            };
        },
        
        // 9. Задача с текстом (сложение)
        () => {
            const denom = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
            const num1 = Math.floor(Math.random() * (denom - 1)) + 1;
            const num2 = Math.floor(Math.random() * (denom - num1)) + 1;
            const foods = ['пиццы', 'торта', 'шоколадки', 'пирога'];
            const food = foods[Math.floor(Math.random() * foods.length)];
            const sum = num1 + num2;
            const gcd = findGCD(sum, denom);
            const simplified = `${sum / gcd}/${denom / gcd}`;
            return {
                text: `Маша съела ${num1}/${denom} ${food}, а Петя съел ${num2}/${denom} ${food}. Какую часть ${food} съели они вместе?`,
                answer: simplified === `${sum}/${denom}` ? `${sum}/${denom}` : `${sum}/${denom} = ${simplified}`,
                solution: `${num1}/${denom} + ${num2}/${denom} = ${sum}/${denom}${simplified !== `${sum}/${denom}` ? ` = ${simplified}` : ''}`
            };
        },
        
        // 10. Задача с текстом (вычитание)
        () => {
            const denom = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
            const num1 = Math.floor(Math.random() * (denom - 1)) + 3;
            const num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
            const foods = ['пиццы', 'торта', 'шоколадки', 'пирога'];
            const food = foods[Math.floor(Math.random() * foods.length)];
            const diff = num1 - num2;
            const gcd = findGCD(diff, denom);
            const simplified = `${diff / gcd}/${denom / gcd}`;
            return {
                text: `У Коли было ${num1}/${denom} ${food}. Он отдал ${num2}/${denom} ${food} другу. Сколько ${food} осталось у Коли?`,
                answer: simplified === `${diff}/${denom}` ? `${diff}/${denom}` : `${diff}/${denom} = ${simplified}`,
                solution: `${num1}/${denom} - ${num2}/${denom} = ${diff}/${denom}${simplified !== `${diff}/${denom}` ? ` = ${simplified}` : ''}`
            };
        }
    ];
    
    // Генерируем задачи, избегая дубликатов типов
    while (problems.length < count && problems.length < generators.length) {
        const typeIndex = problems.length % generators.length;
        try {
            const problem = generators[typeIndex]();
            problems.push(problem);
        } catch (e) {
            // Если генератор вернул ошибку, пробуем другой тип
            const fallbackIndex = (problems.length + 1) % generators.length;
            const problem = generators[fallbackIndex]();
            problems.push(problem);
        }
    }
    
    // Если нужно больше задач, чем типов, повторяем типы
    while (problems.length < count) {
        const typeIndex = problems.length % generators.length;
        try {
            const problem = generators[typeIndex]();
            problems.push(problem);
        } catch (e) {
            // Пропускаем проблемные задачи
            continue;
        }
    }
    
    return problems.slice(0, count);
}

// Вспомогательные функции для работы с дробями
function findGCD(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function findLCM(a, b) {
    return (a * b) / findGCD(a, b);
}

// Домашка: Уравнения для 6 класса (простейшие линейные)
function generateEquations6Problems(count) {
    const templates = [
        () => {
            const a = Math.floor(Math.random() * 9) + 6; // 6..14
            const b = Math.floor(Math.random() * 10) + 10; // 10..19
            return { text: `Решите уравнение: x + ${a} = ${b}`, answer: `${b - a}` };
        },
        () => {
            const a = Math.floor(Math.random() * 9) + 6;
            const b = Math.floor(Math.random() * 7) + 3;
            return { text: `Решите уравнение: x − ${a} = ${b}`, answer: `${b + a}` };
        },
        () => {
            const a = [2,3,4,5,6,7,8,9][Math.floor(Math.random()*8)];
            const x = Math.floor(Math.random() * 9) + 2; // 2..10
            return { text: `Решите уравнение: ${a}x = ${a * x}`, answer: `${x}` };
        },
        () => {
            const a = [2,3,4,5,6,7,8,9][Math.floor(Math.random()*8)];
            const x = Math.floor(Math.random() * 9) + 2;
            return { text: `Решите уравнение: x / ${a} = ${x}`, answer: `${a * x}` };
        },
        () => {
            const s = Math.floor(Math.random() * 9) + 11; // сумма
            const a = Math.floor(Math.random() * (s - 2)) + 1;
            return { text: `Решите уравнение: ${a} + x = ${s}`, answer: `${s - a}` };
        },
        () => {
            const left = Math.floor(Math.random() * 10) + 10;
            const x = Math.floor(Math.random() * 8) + 2;
            return { text: `Решите уравнение: ${left} − x = ${left - x}` , answer: `${x}` };
        }
    ];
    const problems = [];
    while (problems.length < count) {
        const p = templates[problems.length % templates.length]();
        problems.push({ text: p.text, answer: p.answer });
    }
    return problems;
}

// Домашка: Уравнения для 7 класса (скобки, обе стороны, дроби)
function generateEquations7Problems(count) {
    const problems = [];
    const push = (text, answer, solution) => problems.push({ text, answer, solution });
    const rand = (arr) => arr[Math.floor(Math.random()*arr.length)];

    while (problems.length < count) {
        const type = problems.length % 6;
        if (type === 0) {
            // Скобки
            const a = rand([2,3,4,5]);
            const b = rand([2,3,4]);
            const p = rand([1,2,3,4]);
            const q = rand([1,2,3]);
            // a(x - p) = b(x + q)
            // ax - ap = bx + bq -> (a-b)x = ap + bq
            const leftCoef = a - b;
            if (leftCoef === 0) { continue; }
            const rhs = a*p + b*q;
            const x = rhs / leftCoef;
            push(`Решите уравнение: ${a}(x − ${p}) = ${b}(x + ${q})`, `x = ${x}`, `${a}x − ${a*p} = ${b}x + ${b*q} → ${(a-b)}x = ${rhs} → x = ${x}`);
        } else if (type === 1) {
            // x по обе стороны
            const m = rand([4,5,6,7,8]);
            const n = rand([1,2,3,4]);
            const p = rand([2,3,4,5]);
            const q = rand([1,2,3]);
            // m x - n = p x + q -> (m-p)x = n + q
            const left = m - p; if (left === 0) continue;
            const rhs = n + q;
            const x = rhs / left;
            push(`Решите уравнение: ${m}x − ${n} = ${p}x + ${q}`, `x = ${x}`, `${(m-p)}x = ${n}+${q} = ${rhs} → x = ${x}`);
        } else if (type === 2) {
            // Дробные коэффициенты (общий знаменатель)
            const d1 = rand([2,3,4,5,6]);
            const d2 = rand([2,3,4,5,6]);
            const L = d1*d2;
            const a = rand([1,2,3,4,5]);
            const b = rand([1,2,3,4,5]);
            // x/d1 + a/d2 = b/d2
            const x = (b - a) * (L / d1) / (L / d1); // simplifies to (b-a)
            push(`Решите уравнение: x/${d1} + ${a}/${d2} = ${b}/${d2}`, `x = ${(b - a)}`, `× ${L}: ${(L/d1)}x + ${a*(L/d2)} = ${b*(L/d2)} → ${(L/d1)}x = ${(b-a)*(L/d2)} → x = ${b-a}`);
        } else if (type === 3) {
            // Пропорция
            const a = rand([2,3,4,5,6]);
            const b = rand([6,8,9,10,12]);
            const c = rand([1,2,3,4,5]);
            // x/a = c/b -> bx = ac -> x = ac/b
            const num = a*c;
            const den = b;
            const val = num/den;
            push(`Решите уравнение: x/${a} = ${c}/${b}`, `x = ${val}`, `${b}x = ${a}·${c} → x = ${num}/${den} = ${val}`);
        } else if (type === 4) {
            // Скобки обе стороны, целочисленный ответ
            const a = 2, b = 1, p = 3, q = 1;
            // 2(x-3) = (x+1) -> 2x-6 = x+1 -> x=7
            push(`Решите уравнение: 2(x − 3) = x + 1`, `x = 7`, `2x − 6 = x + 1 → x = 7`);
        } else {
            // Дроби с переносом
            // (x+1)/5 = 4 -> x+1 = 20 -> x=19
            push(`Решите уравнение: (x + 1)/5 = 4`, `x = 19`, `x + 1 = 20 → x = 19`);
        }
    }
    return problems.slice(0, count);
}
// Homework Board Logic
let homeworkCanvas = null;
let homeworkCtx = null;
let homeworkIsDrawing = false;
let homeworkCurrentTool = 'pencil';
let homeworkCurrentColor = '#ffffff';
let homeworkCurrentLineWidth = 3;

function initHomeworkBoard() {
    homeworkCanvas = document.getElementById('homeworkCanvas');
    if (!homeworkCanvas) return;
    
    homeworkCtx = homeworkCanvas.getContext('2d');
    if (!homeworkCtx) return;
    
    function resizeHomeworkCanvas() {
        const container = homeworkCanvas.parentElement;
        homeworkCanvas.width = container.offsetWidth;
        homeworkCanvas.height = container.offsetHeight;
        homeworkCtx.lineCap = 'round';
        homeworkCtx.lineJoin = 'round';
        homeworkCtx.strokeStyle = homeworkCurrentColor;
        homeworkCtx.lineWidth = homeworkCurrentLineWidth;
    }
    
    resizeHomeworkCanvas();
    window.addEventListener('resize', resizeHomeworkCanvas);
    
    // Mouse events
    homeworkCanvas.addEventListener('mousedown', startHomeworkDrawing);
    homeworkCanvas.addEventListener('mousemove', drawHomework);
    homeworkCanvas.addEventListener('mouseup', stopHomeworkDrawing);
    homeworkCanvas.addEventListener('mouseleave', stopHomeworkDrawing);
    
    // Touch events
    homeworkCanvas.addEventListener('touchstart', handleHomeworkTouch);
    homeworkCanvas.addEventListener('touchmove', handleHomeworkTouch);
    homeworkCanvas.addEventListener('touchend', stopHomeworkDrawing);
    
    // Set initial color
    setHomeworkColor('#ffffff');
}

function startHomeworkDrawing(e) {
    if (!homeworkCtx) return;
    homeworkIsDrawing = true;
    
    const rect = homeworkCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    homeworkCtx.beginPath();
    homeworkCtx.moveTo(x, y);
}

function drawHomework(e) {
    if (!homeworkIsDrawing || !homeworkCtx) return;
    
    const rect = homeworkCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    homeworkCtx.lineTo(x, y);
    homeworkCtx.stroke();
}

function handleHomeworkTouch(e) {
    if (!homeworkCtx) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = homeworkCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (e.type === 'touchstart') {
        homeworkIsDrawing = true;
        homeworkCtx.beginPath();
        homeworkCtx.moveTo(x, y);
    } else if (e.type === 'touchmove' && homeworkIsDrawing) {
        homeworkCtx.lineTo(x, y);
        homeworkCtx.stroke();
    }
}

function stopHomeworkDrawing() {
    homeworkIsDrawing = false;
}

function setHomeworkTool(tool) {
    homeworkCurrentTool = tool;
    
    if (!homeworkCtx) return;
    
    document.getElementById('homeworkPencilBtn').classList.remove('active');
    document.getElementById('homeworkEraserBtn').classList.remove('active');
    
    if (tool === 'pencil') {
        document.getElementById('homeworkPencilBtn').classList.add('active');
        homeworkCtx.globalCompositeOperation = 'source-over';
        homeworkCtx.strokeStyle = homeworkCurrentColor;
    } else {
        document.getElementById('homeworkEraserBtn').classList.add('active');
        homeworkCtx.globalCompositeOperation = 'destination-out';
    }
}

function setHomeworkColor(color) {
    homeworkCurrentColor = color;
    if (homeworkCtx) {
        homeworkCtx.strokeStyle = color;
        homeworkCtx.globalCompositeOperation = 'source-over';
    }
    
    // Update active color button
    const toolbar = document.querySelector('.homework-board-container .lesson-board-toolbar');
    if (toolbar) {
        toolbar.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.remove('active');
            const btnColor = btn.style.backgroundColor;
            const rgbToHex = (rgb) => {
                const result = rgb.match(/\d+/g);
                if (!result) return '';
                return '#' + result.map(x => {
                    const hex = parseInt(x).toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');
            };
            
            if (btnColor === color || 
                (color === '#ffffff' && (btnColor === 'rgb(255, 255, 255)' || btnColor === 'white')) ||
                (btnColor && rgbToHex(btnColor) === color)) {
                btn.classList.add('active');
            }
        });
    }
}

function setHomeworkLineWidth(width) {
    homeworkCurrentLineWidth = parseInt(width);
    if (homeworkCtx) {
        homeworkCtx.lineWidth = homeworkCurrentLineWidth;
    }
    const widthValueEl = document.getElementById('homeworkLineWidthValue');
    if (widthValueEl) {
        widthValueEl.textContent = width;
    }
}

function clearHomeworkBoard() {
    if (!homeworkCanvas || !homeworkCtx) return;
    if (confirm('Вы уверены, что хотите очистить доску?')) {
        homeworkCtx.clearRect(0, 0, homeworkCanvas.width, homeworkCanvas.height);
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    showCodeInput();
});
