// Lessons page logic
let currentSubject = null;
let currentGrade = null;
let currentTopic = null;

// Topics data
const topicsData = {
    math: {
        '5': [
            { id: 'fractions', name: 'Сложение и вычитание дробей. Неправильные дроби и целая часть' }
        ],
        '6': [
            { id: 'fractions', name: 'Сложение и вычитание дробей. Неправильные дроби и целая часть' },
            { id: 'equations', name: 'Уравнения: простейшие линейные уравнения' },
            { id: 'expressions6', name: 'Подстановка и вычисление значения выражения' }
        ],
        '7': [
            { id: 'fractions', name: 'Сложение и вычитание дробей. Неправильные дроби и целая часть' },
            { id: 'equations', name: 'Уравнения: линейные уравнения с скобками и дробями' },
            { id: 'expressions7', name: 'Подстановка и вычисление значения выражения (дроби, скобки)' },
            { id: 'intervals', name: 'Интервалы' },
            { id: 'function-values', name: 'Вычисление значений функции по формуле' }
        ]
    },
    physics: {
        '7': [
            { id: 'mechanics', name: 'Механика' },
            { id: 'speed-basics', name: 'Скорость, путь, время. Средняя и относительная скорость' }
        ]
    }
};

function selectSubject(subject) {
    currentSubject = subject;
    document.getElementById('subjectSelection').classList.add('hidden');
    document.getElementById('gradeSelection').classList.remove('hidden');
}

function selectGrade(grade) {
    currentGrade = grade;
    document.getElementById('gradeSelection').classList.add('hidden');
    document.getElementById('topicSelection').classList.remove('hidden');
    loadTopics();
}

function loadTopics() {
    const topicsGrid = document.getElementById('topicsGrid');
    const topicTitle = document.getElementById('topicTitle');
    const subjectName = currentSubject === 'math' ? 'Математика' : 'Физика';
    
    topicTitle.textContent = `Темы для ${subjectName}, ${currentGrade} класс`;
    
    const topics = topicsData[currentSubject][currentGrade] || [];
    topicsGrid.innerHTML = '';
    
    topics.forEach(topic => {
        const topicCard = document.createElement('div');
        topicCard.className = 'topic-card';
        topicCard.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span style="font-size: 1.125rem;">${topic.name}</span>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
        `;
        topicCard.onclick = () => selectTopic(topic.id, topic.name);
        topicsGrid.appendChild(topicCard);
    });
}

function selectTopic(topicId, topicName) {
    currentTopic = topicId;
    document.getElementById('topicSelection').classList.add('hidden');
    document.getElementById('lessonContent').classList.remove('hidden');
    loadLessonContent(topicId, topicName);
}

function loadLessonContent(topicId, topicName) {
    const theorySection = document.getElementById('theorySection');
    const problemsSection = document.getElementById('problemsSection');
    
    if (topicId === 'fractions') {
        loadFractionsTheory(theorySection, topicName);
        loadFractionsProblems(problemsSection);
    } else if (topicId === 'equations') {
        loadEquationsTheory(theorySection, topicName);
        loadEquationsProblems(problemsSection);
    } else if (topicId === 'expressions6' || topicId === 'expressions7') {
        loadExpressionsTheory(theorySection, topicName);
        loadExpressionsProblems(problemsSection, topicId);
    } else if (topicId === 'speed-basics') {
        loadPhysicsSpeedTheory(theorySection, topicName);
        loadPhysicsSpeedProblems(problemsSection);
    } else if (topicId === 'intervals') {
        loadIntervalsTheory(theorySection, topicName);
        loadIntervalsProblems(problemsSection);
    } else if (topicId === 'function-values') {
        loadFunctionValuesTheory(theorySection, topicName);
        loadFunctionValuesProblems(problemsSection);
    } else {
        theorySection.innerHTML = '<p>Теория будет добавлена позже.</p>';
        problemsSection.innerHTML = '<p>Задачи будут добавлены позже.</p>';
    }
    
    // Initialize board after content is loaded
    setTimeout(() => {
        initLessonBoard();
    }, 100);
}

function loadEquationsTheory(section, topicName) {
    const isGrade6 = currentGrade === '6';
    const isGrade7 = currentGrade === '7';
    const title = isGrade6 ? 'Простейшие линейные уравнения' : 'Линейные уравнения со скобками и дробями';
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Теория: ${topicName}
        </h2>
        <h3>${title}</h3>
        <p><strong>Уравнение</strong> — это равенство с переменной, верное при некоторых значениях переменной. Цель — найти это значение.</p>
        ${isGrade6 ? `
        <h4>1. Уравнения вида x + a = b</h4>
        <p>Чтобы найти x, перенесём a в другую сторону со знаком минус: x = b − a.</p>
        <div class="example-box">
            <p>Пример: x + 7 = 15 → x = 15 − 7 = 8.</p>
        </div>
        <h4>2. Уравнения вида x − a = b</h4>
        <p>Перенесём a вправо со знаком плюс: x = b + a.</p>
        <div class="example-box">
            <p>Пример: x − 9 = 4 → x = 4 + 9 = 13.</p>
        </div>
        <h4>3. Уравнения вида a·x = b</h4>
        <p>Разделим обе части на a: x = b / a (a ≠ 0).</p>
        <div class="example-box">
            <p>Пример: 5x = 35 → x = 35 / 5 = 7.</p>
        </div>
        <h4>4. Уравнения вида x / a = b</h4>
        <p>Умножим обе части на a: x = a·b.</p>
        <div class="example-box">
            <p>Пример: x/4 = 6 → x = 6·4 = 24.</p>
        </div>
        ` : `
        <h4>1. Уравнения со скобками</h4>
        <p>Сначала раскрываем скобки, затем переносим члены с x влево, числа — вправо, делим на коэффициент при x.</p>
        <div class="example-box">
            <p>Пример: 3(x − 2) = 2(x + 1) → 3x − 6 = 2x + 2 → x = 8.</p>
        </div>
        <h4>2. Уравнения с x по обе стороны</h4>
        <p>Переносим выражения с x в одну сторону, числа — в другую.</p>
        <div class="example-box">
            <p>Пример: 7x − 5 = 4x + 10 → 3x = 15 → x = 5.</p>
        </div>
        <h4>3. Дробные коэффициенты</h4>
        <p>Умножаем обе части на общий знаменатель, чтобы убрать дроби.</p>
        <div class="example-box">
            <p>Пример: (x/3) + 1/2 = 5/6 → умножим на 6: 2x + 3 = 5 → 2x = 2 → x = 1.</p>
        </div>
        <h4>4. Пропорции</h4>
        <p>Если a/b = c/d, то ad = bc (перекрёстное умножение).</p>
        <div class="example-box">
            <p>Пример: x/4 = 6/8 → 8x = 24 → x = 3.</p>
        </div>
        `}
        <h4>Важно</h4>
        <ul>
            <li>Делить на ноль нельзя.</li>
            <li>Одинаковые действия выполняются с обеими частями уравнения.</li>
            <li>Проверяйте ответ подстановкой.</li>
        </ul>
    `;
}

function loadEquationsProblems(section) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Генератор задач
        </h2>
        <p>Нажмите кнопку ниже, чтобы сгенерировать задачу по теме «Уравнения»:</p>
        <button class="generate-btn" onclick="generateEquationProblem()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 20px; height: 20px;">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 1 1 10-10"></path>
            </svg>
            Сгенерировать задачу
        </button>
        <div id="problemContainer"></div>
    `;
}

function generateEquationProblem() {
    const container = document.getElementById('problemContainer');
    const grade = currentGrade;
    const problems = grade === '6' ? [
        { p: 'x + 7 = 15', a: 'x = 8' },
        { p: 'x − 9 = 4', a: 'x = 13' },
        { p: '5x = 35', a: 'x = 7' },
        { p: 'x / 4 = 6', a: 'x = 24' },
        { p: 'x + 18 = 27', a: 'x = 9' },
        { p: '12 − x = 5', a: 'x = 7' },
        { p: '3x = 24', a: 'x = 8' },
        { p: 'x/5 = 9', a: 'x = 45' }
    ] : [
        { p: '3(x − 2) = 2(x + 1)', a: 'x = 8' },
        { p: '7x − 5 = 4x + 10', a: 'x = 5' },
        { p: '(x/3) + 1/2 = 5/6', a: 'x = 1' },
        { p: '2(x + 5) = x + 17', a: 'x = 7' },
        { p: '5(x − 1) = 3x + 7', a: 'x = 6' },
        { p: 'x/4 = 6/8', a: 'x = 3' },
        { p: '2x − (x − 3) = 10', a: 'x = 7' },
        { p: '(x + 1)/5 = 4', a: 'x = 19' }
    ];
    const random = problems[Math.floor(Math.random() * problems.length)];
    container.innerHTML = `
        <div class="problem-box">
            <h3>Задача:</h3>
            <p class="problem-text">Решите уравнение: ${random.p}</p>
            <details>
                <summary class="answer-toggle">Показать ответ</summary>
                <div class="answer-content">${random.a}</div>
            </details>
        </div>
    `;
}

function loadFractionsTheory(section, topicName) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Теория: ${topicName}
        </h2>
        
        <h3>1. Что такое дробь?</h3>
        <p>
            Дробь — это число, которое показывает, какую часть целого мы берем. 
            Представьте пиццу, разрезанную на равные куски!
        </p>
        <div class="example-box">
            <h4>🍕 Пример с пиццей:</h4>
            <p>Пицца разрезана на 8 равных кусков (знаменатель = 8).</p>
            <p>Если вы съели 3 куска, то съели <span class="formula">3/8</span> пиццы (числитель = 3).</p>
            <p>Если съели 5 кусков, то <span class="formula">5/8</span> пиццы.</p>
        </div>

        <h3>2. Правильные и неправильные дроби</h3>
        <p><strong>Правильная дробь</strong> — числитель меньше знаменателя:</p>
        <ul>
            <li><span class="formula">3/8</span> — правильная дробь (3 < 8)</li>
            <li><span class="formula">5/12</span> — правильная дробь (5 < 12)</li>
        </ul>
        
        <p><strong>Неправильная дробь</strong> — числитель больше или равен знаменателю:</p>
        <ul>
            <li><span class="formula">7/4</span> — неправильная дробь (7 > 4)</li>
            <li><span class="formula">8/8</span> — неправильная дробь (равна 1 целой)</li>
        </ul>

        <div class="example-box">
            <h4>🍰 Пример с тортом:</h4>
            <p>У вас есть торт, разрезанный на 4 части (знаменатель = 4).</p>
            <p>Если вы съели 7 кусков, то вы съели <span class="formula">7/4</span> торта.</p>
            <p>Это значит: 1 целый торт (4/4) + еще 3 куска (3/4) = <span class="formula">1 целая и 3/4</span> торта!</p>
        </div>

        <h3>3. Смешанные числа (целая часть + дробь)</h3>
        <p>Неправильную дробь можно представить как смешанное число:</p>
        <ul>
            <li><span class="formula">7/4 = 1 целая и 3/4</span> (или 1 3/4)</li>
            <li><span class="formula">11/5 = 2 целые и 1/5</span> (или 2 1/5)</li>
        </ul>

        <div class="example-box">
            <h4>🍫 Пример с шоколадками:</h4>
            <p>У вас есть шоколадки, каждая разделена на 6 долек.</p>
            <p>Если вы съели 13 долек, это <span class="formula">13/6</span> шоколадки.</p>
            <p>13 ÷ 6 = 2 целые шоколадки и еще 1 долька из следующей.</p>
            <p>Ответ: <span class="formula">13/6 = 2 целые и 1/6</span> шоколадки (или 2 1/6).</p>
        </div>

        <h3>4. Сложение дробей с одинаковыми знаменателями</h3>
        <p>Когда знаменатели одинаковые, просто складываем числители:</p>
        <div class="example-box">
            <h4>🍕 Пример:</h4>
            <p>У вас было <span class="formula">3/8</span> пиццы, друг дал еще <span class="formula">2/8</span> пиццы.</p>
            <p>Сколько всего пиццы?</p>
            <p><span class="formula">3/8 + 2/8 = (3 + 2)/8 = 5/8</span></p>
            <p>Ответ: <span class="formula">5/8</span> пиццы.</p>
        </div>

        <h3>5. Вычитание дробей с одинаковыми знаменателями</h3>
        <p>Аналогично, вычитаем числители:</p>
        <div class="example-box">
            <h4>🍰 Пример:</h4>
            <p>У вас было <span class="formula">7/8</span> торта, вы съели <span class="formula">3/8</span>.</p>
            <p>Сколько осталось?</p>
            <p><span class="formula">7/8 - 3/8 = (7 - 3)/8 = 4/8 = 1/2</span></p>
            <p>Ответ: <span class="formula">1/2</span> торта (половина).</p>
        </div>

        <h3>6. Сложение и вычитание дробей с разными знаменателями</h3>
        <p>Нужно привести дроби к общему знаменателю:</p>
        <div class="example-box">
            <h4>🍫 Пример:</h4>
            <p>У вас <span class="formula">1/3</span> шоколадки, получили еще <span class="formula">1/4</span>.</p>
            <p>Сколько всего?</p>
            <p>Находим общий знаменатель: 3 × 4 = 12</p>
            <p><span class="formula">1/3 = 4/12</span> (умножили на 4)</p>
            <p><span class="formula">1/4 = 3/12</span> (умножили на 3)</p>
            <p><span class="formula">4/12 + 3/12 = 7/12</span></p>
            <p>Ответ: <span class="formula">7/12</span> шоколадки.</p>
        </div>

        <h3>7. Важные правила</h3>
        <ul>
            <li>Знаменатель показывает, на сколько частей разделено целое</li>
            <li>Числитель показывает, сколько частей взято</li>
            <li>При сложении/вычитании знаменатель не меняется (если одинаковый)</li>
            <li>Неправильную дробь можно превратить в смешанное число</li>
            <li>Всегда упрощайте результат, если возможно (например, 4/8 = 1/2)</li>
        </ul>
    `;
}

function loadFractionsProblems(section) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Генератор задач
        </h2>
        <p>Нажмите кнопку ниже, чтобы сгенерировать задачу по дробям:</p>
        <button class="generate-btn" onclick="generateFractionProblem()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 20px; height: 20px;">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 1 1 10-10"></path>
            </svg>
            Сгенерировать задачу
        </button>
        <div id="problemContainer"></div>
    `;
}

function generateFractionProblem() {
    const container = document.getElementById('problemContainer');
    const problems = [
        {
            type: 'same_denominator_add',
            problem: 'У Маши было 3/8 пиццы, а мама дала еще 2/8 пиццы. Сколько всего пиццы у Маши?',
            answer: '3/8 + 2/8 = 5/8 пиццы'
        },
        {
            type: 'same_denominator_subtract',
            problem: 'У Пети было 7/8 торта. Он съел 3/8 торта. Сколько торта осталось?',
            answer: '7/8 - 3/8 = 4/8 = 1/2 торта'
        },
        {
            type: 'different_denominator_add',
            problem: 'У Коли было 1/3 шоколадки, а друг дал еще 1/4 шоколадки. Сколько всего шоколадки у Коли?',
            answer: '1/3 + 1/4 = 4/12 + 3/12 = 7/12 шоколадки'
        },
        {
            type: 'different_denominator_subtract',
            problem: 'У Ани было 3/4 пирога. Она отдала 1/2 пирога подруге. Сколько пирога осталось у Ани?',
            answer: '3/4 - 1/2 = 3/4 - 2/4 = 1/4 пирога'
        },
        {
            type: 'improper_fraction',
            problem: 'Семья съела 13/6 пиццы (каждая пицца разделена на 6 кусков). Представьте это число как смешанное (целая часть + дробь).',
            answer: '13/6 = 2 целые и 1/6 пиццы (или 2 1/6)'
        },
        {
            type: 'mixed_fraction',
            problem: 'В магазине было 2 целые и 3/4 кг конфет. Продали 1 целую и 1/2 кг. Сколько конфет осталось?',
            answer: '2 3/4 - 1 1/2 = 11/4 - 6/4 = 5/4 = 1 целая и 1/4 кг'
        },
        {
            type: 'cake_example',
            problem: 'Торт разрезан на 8 кусков. Сначала съели 3 куска, потом еще 2 куска. Какую часть торта съели?',
            answer: '3/8 + 2/8 = 5/8 торта'
        },
        {
            type: 'chocolate_example',
            problem: 'У вас 1/2 шоколадки, а друг дал 1/3 шоколадки. Сколько всего шоколадки у вас?',
            answer: '1/2 + 1/3 = 3/6 + 2/6 = 5/6 шоколадки'
        }
    ];

    const random = problems[Math.floor(Math.random() * problems.length)];
    
    container.innerHTML = `
        <div class="problem-box">
            <h3>Задача:</h3>
            <p class="problem-text">${random.problem}</p>
            <details>
                <summary class="answer-toggle">Показать ответ</summary>
                <div class="answer-content">${random.answer}</div>
            </details>
        </div>
    `;
}

function loadExpressionsTheory(section, topicName) {
    const isGrade6 = currentGrade === '6';
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Теория: ${topicName}
        </h2>
        <h3>${isGrade6 ? 'Как подставлять значения в выражение' : 'Подстановка значений в сложные алгебраические выражения'}</h3>
        <p>${isGrade6 ? 'Чтобы вычислить значение выражения с переменными, нужно вместо букв подставить их значения и выполнить действия по порядку.' : 'Подставляем значения переменных, аккуратно работаем со скобками и дробями, соблюдаем порядок действий и приводим дроби к общему знаменателю при необходимости.'}</p>
        <h4>Алгоритм</h4>
        <ol>
            <li>Запишите выражение и рядом значения переменных.</li>
            <li>${isGrade6 ? 'Подставьте числа вместо букв.' : 'Подставьте числа вместо букв с учётом знаков и дробей.'}</li>
            <li>Выполняйте действия ${isGrade6 ? 'слева направо с учётом порядка операций (сначала скобки, затем умножение/деление, потом сложение/вычитание).' : 'внутри скобок, затем умножение/деление, далее сложение/вычитание. Для дробей используйте общий знаменатель.'}</li>
            <li>Запишите ответ.</li>
        </ol>
        <div class="example-box">
            <h4>Пример</h4>
            ${isGrade6 ? `
            <p>Вычислите значение выражения <span class="formula">4x + 7y</span>, если <span class="formula">x = 3</span>, <span class="formula">y = 2</span>.</p>
            <p>Подставляем: <span class="formula">4 · 3 + 7 · 2 = 12 + 14 = 26</span>.</p>
            ` : `
            <p>Вычислите значение выражения <span class="formula">2(3x - y) + (5/6)·z</span>, если <span class="formula">x = 1/2</span>, <span class="formula">y = -3</span>, <span class="formula">z = 12</span>.</p>
            <p>Подставляем: <span class="formula">2(3 · 1/2 - (-3)) + (5/6) · 12 = 2(1.5 + 3) + 10 = 2 · 4.5 + 10 = 9 + 10 = 19</span>.</p>
            `}
        </div>
        <h4>Советы</h4>
        <ul>
            <li>Всегда используйте скобки при подстановке отрицательных чисел.</li>
            <li>${isGrade6 ? 'Проверяйте умножение и сложение на черновике.' : 'Для дробей сокращайте результат, если это возможно.'}</li>
            <li>Переписывайте выражение аккуратно, чтобы не потерять знак.</li>
        </ul>
    `;
}

function loadExpressionsProblems(section, topicId) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Генератор задач
        </h2>
        <p>Нажмите кнопку ниже, чтобы потренироваться в подстановке значений:</p>
        <button class="generate-btn" onclick="generateExpressionsProblem('${topicId}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 20px; height: 20px;">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 1 1 10-10"></path>
            </svg>
            Сгенерировать задачу
        </button>
        <div id="expressionsProblemContainer"></div>
    `;
}

function generateExpressionsProblem(topicId) {
    const container = document.getElementById('expressionsProblemContainer');
    const isGrade6 = topicId === 'expressions6';
    const problems = isGrade6 ? generateGrade6ExpressionProblems() : generateGrade7ExpressionProblems();
    const random = problems[Math.floor(Math.random() * problems.length)];
    container.innerHTML = `
        <div class="problem-box">
            <h3>Задача:</h3>
            <p class="problem-text">${random.problem}</p>
            <details>
                <summary class="answer-toggle">Показать решение</summary>
                <div class="answer-content">${random.answer}</div>
            </details>
        </div>
    `;
}

function generateGrade6ExpressionProblems() {
    const randFrom = (array) => array[Math.floor(Math.random() * array.length)];
    const expressions = [];
    for (let i = 0; i < 12; i++) {
        const coefX = Math.floor(Math.random() * 6) + 2; // 2..7
        const coefY = Math.floor(Math.random() * 5) + 1; // 1..5
        const signY = randFrom([1, -1]);
        const xVal = randFrom([2, 3, 4, 5, 6]);
        const yVal = randFrom([1, 2, 3, 4]);
        const extra = Math.floor(Math.random() * 11) - 5; // -5..5
        const useExtra = Math.random() > 0.6;
        const expression = `${coefX}x ${signY === 1 ? '+ ' + coefY : '- ' + coefY}y${useExtra ? (extra >= 0 ? ' + ' + extra : ' - ' + Math.abs(extra)) : ''}`;
        const value = coefX * xVal + (signY * coefY) * yVal + (useExtra ? extra : 0);
        expressions.push({
            problem: `Вычислите значение выражения ${expression}, если x = ${xVal}, y = ${yVal}.`,
            answer: `${coefX} · ${xVal} ${signY === 1 ? '+ ' + coefY + ' · ' + yVal : '- ' + coefY + ' · ' + yVal}${useExtra ? (extra >= 0 ? ' + ' + extra : ' - ' + Math.abs(extra)) : ''} = ${value}`
        });
    }
    expressions.push({
        problem: 'Вычислите значение выражения 3a - 2b + 9, если a = 4, b = 5.',
        answer: '3 · 4 - 2 · 5 + 9 = 12 - 10 + 9 = 11'
    });
    expressions.push({
        problem: 'Найдите значение выражения 6m + 8n, если m = 1, n = 7.',
        answer: '6 · 1 + 8 · 7 = 6 + 56 = 62'
    });
    return expressions;
}

function generateGrade7ExpressionProblems() {
    const randFrom = (array) => array[Math.floor(Math.random() * array.length)];
    const problems = [];
    const formatNumber = (num) => Number.isInteger(num) ? num : Math.round(num * 100) / 100;
    for (let i = 0; i < 10; i++) {
        const xVal = randFrom([1, 2, 3, -2, -1, 0.5]);
        const yVal = randFrom([3, -1, 4, 2]);
        const zVal = randFrom([2, 4, -3, 6]);
        const exprType = i % 3;
        let problemText = '';
        let answerText = '';
        if (exprType === 0) {
            // Сложная линейная комбинация
            const expression = `2(3x - y) + (5/4)·z`;
            const leftPart = 2 * (3 * xVal - yVal);
            const rightPart = (5 / 4) * zVal;
            const result = leftPart + rightPart;
            problemText = `Вычислите значение выражения ${expression}, если x = ${xVal}, y = ${yVal}, z = ${zVal}.`;
            answerText = `2(3 · ${xVal} - ${yVal}) + (5/4) · ${zVal} = 2(${3 * xVal} - ${yVal}) + ${formatNumber(rightPart)} = ${formatNumber(leftPart)} + ${formatNumber(rightPart)} = ${formatNumber(result)}`;
        } else if (exprType === 1) {
            // Дроби со скобками
            const expression = `(1/3)(6x + 9) - (1/2)(y - 4)`;
            const result = (1 / 3) * (6 * xVal + 9) - (1 / 2) * (yVal - 4);
            problemText = `Подставьте значения x = ${xVal}, y = ${yVal} в выражение ${expression} и найдите результат.`;
            answerText = `(1/3)(6 · ${xVal} + 9) - (1/2)(${yVal} - 4) = (1/3)(${6 * xVal + 9}) - (1/2)(${yVal - 4}) = ${formatNumber(result)}`;
        } else {
            // Три переменные и отрицательные числа
            const expression = `4x - 2(y - 5) + (3/2)·z`;
            const result = 4 * xVal - 2 * (yVal - 5) + 1.5 * zVal;
            problemText = `Вычислите значение выражения ${expression}, если x = ${xVal}, y = ${yVal}, z = ${zVal}.`;
            answerText = `4 · ${xVal} - 2(${yVal} - 5) + (3/2) · ${zVal} = ${formatNumber(4 * xVal)} - 2(${yVal - 5}) + ${formatNumber(1.5 * zVal)} = ${formatNumber(result)}`;
        }
        problems.push({
            problem: problemText,
            answer: answerText
        });
    }
    problems.push({
        problem: 'Найдите значение выражения (2/5)x + (3/10)y, если x = 15, y = -20.',
        answer: '(2/5) · 15 + (3/10) · (-20) = 6 - 6 = 0'
    });
    problems.push({
        problem: 'Вычислите 3(x - 2) - 2(y + 4), если x = 7, y = -1.',
        answer: '3(7 - 2) - 2(-1 + 4) = 3 · 5 - 2 · 3 = 15 - 6 = 9'
    });
    return problems;
}

function loadPhysicsSpeedTheory(section, topicName) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Теория: ${topicName}
        </h2>
        <h3>1. Скорость, путь, время</h3>
        <p><strong>Путь (S)</strong> — пройденное расстояние, измеряется в метрах (м) или километрах (км).</p>
        <p><strong>Время (t)</strong> — длительность движения, измеряется в секундах (с) или часах (ч).</p>
        <p><strong>Скорость (v)</strong> — показывает, какой путь проходит тело за единицу времени.</p>
        <div class="example-box">
            <p>Основные формулы:</p>
            <ul>
                <li>v = S / t</li>
                <li>S = v · t</li>
                <li>t = S / v</li>
            </ul>
        </div>
        <h3>2. Средняя скорость</h3>
        <p>Если тело проходит несколько участков, средняя скорость равна отношению общего пути ко всему времени: <span class="formula">v<sub>ср</sub> = S<sub>общ</sub> / t<sub>общ</sub></span>.</p>
        <div class="example-box">
            <p>Автомобиль прошёл 60 км за 1 ч и ещё 40 км за 0.5 ч. Общий путь 100 км, время 1.5 ч, значит v<sub>ср</sub> = 100 / 1.5 ≈ 66.7 км/ч.</p>
        </div>
        <h3>3. Скорость сближения и удаления</h3>
        <p>Если тела движутся навстречу друг другу, скорость сближения равна сумме их скоростей: v<sub>сбл</sub> = v<sub>1</sub> + v<sub>2</sub>.</p>
        <p>Если движутся в одном направлении, скорость удаления (или догоняния) равна разности скоростей: v<sub>дог</sub> = |v<sub>1</sub> − v<sub>2</sub>|.</p>
        <div class="example-box">
            <p>Два велосипедиста выехали навстречу: 12 км/ч и 18 км/ч. Скорость сближения 30 км/ч.</p>
        </div>
        <h4>Полезно помнить</h4>
        <ul>
            <li>Следите за единицами измерения (час/километр, секунда/метр).</li>
            <li>Перевод: 1 ч = 60 мин = 3600 с, 1 км = 1000 м.</li>
            <li>Скорость — величина векторная, но в задачах 7 класса работаем с направлением словами.</li>
        </ul>
    `;
}

function loadPhysicsSpeedProblems(section) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Генератор задач
        </h2>
        <p>Выберите тип задачи и нажмите кнопку, чтобы получить условие:</p>
        <div class="physics-problem-buttons">
            <button class="generate-btn" onclick="generatePhysicsSpeedProblem('basic')">Скорость, путь, время</button>
            <button class="generate-btn" onclick="generatePhysicsSpeedProblem('average')">Средняя скорость</button>
            <button class="generate-btn" onclick="generatePhysicsSpeedProblem('relative')">Скорость сближения</button>
        </div>
        <div id="physicsSpeedProblemContainer"></div>
    `;
}

function generatePhysicsSpeedProblem(type) {
    const container = document.getElementById('physicsSpeedProblemContainer');
    const rand = (array) => array[Math.floor(Math.random() * array.length)];
    const basicTemplates = [
        () => {
            const v = rand([30, 45, 54, 60]);
            const t = rand([2, 3, 4]);
            return {
                problem: `Автомобиль движется со скоростью ${v} км/ч в течение ${t} ч. Какой путь он проедет?`,
                answer: `S = v · t = ${v} · ${t} = ${v * t} км`
            };
        },
        () => {
            const s = rand([120, 150, 200]);
            const v = rand([40, 50, 60]);
            return {
                problem: `Пешеход прошёл ${s} км со скоростью ${v} км/ч. Сколько времени занял путь?`,
                answer: `t = S / v = ${s} / ${v} = ${Math.round((s / v) * 10) / 10} ч`
            };
        },
        () => {
            const s = rand([6000, 8000, 12000]);
            const t = rand([600, 900, 1200]); // секунды
            return {
                problem: `Поезд прошёл ${s} м за ${t} с. Найдите скорость в м/с.`,
                answer: `v = S / t = ${s} / ${t} = ${Math.round((s / t) * 10) / 10} м/с`
            };
        }
    ];
    const averageTemplates = [
        () => {
            const s1 = 40;
            const s2 = 60;
            const v1 = 20;
            const v2 = 30;
            const t1 = s1 / v1;
            const t2 = s2 / v2;
            const vavg = (s1 + s2) / (t1 + t2);
            return {
                problem: `Автобус проехал ${s1} км со скоростью ${v1} км/ч, затем ${s2} км со скоростью ${v2} км/ч. Найдите среднюю скорость на всём пути.`,
                answer: `t₁ = ${s1}/${v1} = ${t1} ч, t₂ = ${s2}/${v2} = ${t2} ч. vₛᵣ = ${s1 + s2} / (${t1} + ${t2}) = ${Math.round(vavg * 10) / 10} км/ч`
            };
        },
        () => {
            const s = 18;
            const t1 = 0.5;
            const t2 = 0.3;
            const vavg = s / (t1 + t2);
            return {
                problem: `Спортсмен пробежал ${s} км: первую часть за ${t1} ч, вторую за ${t2} ч. Какова средняя скорость забега?`,
                answer: `t = ${t1} + ${t2} = ${t1 + t2} ч, vₛᵣ = ${s} / ${t1 + t2} = ${Math.round(vavg * 10) / 10} км/ч`
            };
        },
        () => {
            const segments = [
                { s: 10, v: 5 },
                { s: 14, v: 7 },
                { s: 6, v: 3 }
            ];
            const totalS = segments.reduce((acc, curr) => acc + curr.s, 0);
            const totalT = segments.reduce((acc, curr) => acc + curr.s / curr.v, 0);
            return {
                problem: `Турист прошёл ${segments[0].s} км со скоростью ${segments[0].v} км/ч, затем ${segments[1].s} км со скоростью ${segments[1].v} км/ч и ${segments[2].s} км со скоростью ${segments[2].v} км/ч. Найдите среднюю скорость туриста.`,
                answer: `Sₒбщ = ${totalS} км, tₒбщ = ${segments[0].s}/${segments[0].v} + ${segments[1].s}/${segments[1].v} + ${segments[2].s}/${segments[2].v} = ${Math.round(totalT * 100) / 100} ч. vₛᵣ = ${totalS} / ${Math.round(totalT * 100) / 100} ≈ ${Math.round((totalS / totalT) * 10) / 10} км/ч`
            };
        }
    ];
    const relativeTemplates = [
        () => {
            const v1 = rand([12, 15, 18]);
            const v2 = rand([20, 24, 30]);
            const distance = rand([120, 150, 180]);
            const vrel = v1 + v2;
            const time = distance / vrel;
            return {
                problem: `Два велосипедиста выехали навстречу из пунктов, расстояние между которыми ${distance} км. Скорости: ${v1} км/ч и ${v2} км/ч. Через сколько часов они встретятся?`,
                answer: `vₛᵦл = ${v1} + ${v2} = ${vrel} км/ч, t = ${distance} / ${vrel} = ${Math.round(time * 100) / 100} ч`
            };
        },
        () => {
            const v1 = rand([70, 80, 90]);
            const v2 = rand([50, 55, 60, 65]);
            const vrel = Math.abs(v1 - v2);
            const time = rand([1, 1.5, 2, 2.5]);
            return {
                problem: `Два автомобиля движутся в одном направлении: первый со скоростью ${v1} км/ч, второй — ${v2} км/ч. На сколько километров увеличится расстояние между ними за ${time} ч?`,
                answer: `vᵣᵃᶻн = |${v1} - ${v2}| = ${vrel} км/ч, S = ${vrel} · ${time} = ${Math.round(vrel * time * 10) / 10} км`
            };
        },
        () => {
            const vBoat = rand([18, 20, 24]);
            const vStream = rand([2, 3, 4]);
            return {
                problem: `Катер движется по течению со скоростью ${vBoat + vStream} км/ч, а против течения — ${vBoat - vStream} км/ч. Найдите собственную скорость катера и скорость течения.`,
                answer: `vₖ = (${vBoat + vStream} + ${vBoat - vStream}) / 2 = ${vBoat} км/ч, vₜ = (${vBoat + vStream} - (${vBoat - vStream})) / 2 = ${vStream} км/ч`
            };
        }
    ];
    let selected;
    if (type === 'basic') {
        selected = rand(basicTemplates)();
    } else if (type === 'average') {
        selected = rand(averageTemplates)();
    } else {
        selected = rand(relativeTemplates)();
    }
    container.innerHTML = `
        <div class="problem-box">
            <h3>Задача:</h3>
            <p class="problem-text">${selected.problem}</p>
            <details>
                <summary class="answer-toggle">Показать решение</summary>
                <div class="answer-content">${selected.answer}</div>
            </details>
        </div>
    `;
}

function loadIntervalsTheory(section, topicName) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Теория: ${topicName}
        </h2>
        <h3>Что такое интервал?</h3>
        <p><strong>Интервал</strong> — это множество чисел, расположенных между двумя числами на числовой прямой.</p>
        
        <h4>1. Открытый интервал (a; b)</h4>
        <p>Числа от a до b, не включая сами числа a и b.</p>
        <div class="example-box">
            <p>Пример: (2; 5) — все числа больше 2 и меньше 5.</p>
            <p>На числовой прямой: <span class="formula">○——○</span>, где кружки показывают, что 2 и 5 не входят в интервал.</p>
        </div>
        
        <h4>2. Закрытый интервал [a; b]</h4>
        <p>Числа от a до b, включая сами числа a и b.</p>
        <div class="example-box">
            <p>Пример: [1; 4] — все числа от 1 до 4 включительно.</p>
            <p>На числовой прямой: <span class="formula">●——●</span>, где точки показывают, что 1 и 4 входят в интервал.</p>
        </div>
        
        <h4>3. Полуоткрытые интервалы</h4>
        <p><strong>[a; b)</strong> — включает a, но не включает b.</p>
        <p><strong>(a; b]</strong> — не включает a, но включает b.</p>
        <div class="example-box">
            <p>Пример: [3; 7) — числа от 3 (включительно) до 7 (не включительно).</p>
            <p>Пример: (0; 5] — числа от 0 (не включительно) до 5 (включительно).</p>
        </div>
        
        <h4>4. Бесконечные интервалы</h4>
        <p><strong>(-∞; a)</strong> — все числа меньше a.</p>
        <p><strong>(-∞; a]</strong> — все числа меньше или равные a.</p>
        <p><strong>(a; +∞)</strong> — все числа больше a.</p>
        <p><strong>[a; +∞)</strong> — все числа больше или равные a.</p>
        <div class="example-box">
            <p>Пример: (-∞; 3) — все числа меньше 3.</p>
            <p>Пример: [0; +∞) — все неотрицательные числа (0 и больше).</p>
        </div>
        
        <h4>5. Как записывать ответы</h4>
        <ul>
            <li>Круглая скобка ( или ) означает, что число <strong>не входит</strong> в интервал</li>
            <li>Квадратная скобка [ или ] означает, что число <strong>входит</strong> в интервал</li>
            <li>Всегда записывайте интервал от меньшего числа к большему</li>
        </ul>
        
        <div class="example-box">
            <h4>Примеры записи:</h4>
            <ul>
                <li>Числа от -2 до 5 (не включая -2 и 5): <span class="formula">(-2; 5)</span></li>
                <li>Числа от 0 до 10 (включая оба): <span class="formula">[0; 10]</span></li>
                <li>Числа больше 3: <span class="formula">(3; +∞)</span></li>
                <li>Числа меньше или равные -1: <span class="formula">(-∞; -1]</span></li>
            </ul>
        </div>
    `;
}

function loadIntervalsProblems(section) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Генератор задач
        </h2>
        <p>Нажмите кнопку ниже, чтобы сгенерировать задачу по интервалам:</p>
        <button class="generate-btn" onclick="generateIntervalProblem()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 20px; height: 20px;">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 1 1 10-10"></path>
            </svg>
            Сгенерировать задачу
        </button>
        <div id="intervalProblemContainer"></div>
    `;
}

function generateIntervalProblem() {
    const container = document.getElementById('intervalProblemContainer');
    const problems = [
        {
            problem: 'Запишите интервал: все числа от 2 до 7, включая оба конца.',
            answer: '[2; 7]'
        },
        {
            problem: 'Запишите интервал: все числа от -3 до 5, не включая -3 и 5.',
            answer: '(-3; 5)'
        },
        {
            problem: 'Запишите интервал: все числа от 0 до 10, включая 0, но не включая 10.',
            answer: '[0; 10)'
        },
        {
            problem: 'Запишите интервал: все числа от -5 до 3, не включая -5, но включая 3.',
            answer: '(-5; 3]'
        },
        {
            problem: 'Запишите интервал: все числа больше 4.',
            answer: '(4; +∞)'
        },
        {
            problem: 'Запишите интервал: все числа меньше или равные -2.',
            answer: '(-∞; -2]'
        },
        {
            problem: 'Запишите интервал: все числа от 1 до 8, включая оба конца.',
            answer: '[1; 8]'
        },
        {
            problem: 'Запишите интервал: все числа больше или равные 0.',
            answer: '[0; +∞)'
        },
        {
            problem: 'Запишите интервал: все числа от -4 до 6, не включая оба конца.',
            answer: '(-4; 6)'
        },
        {
            problem: 'Запишите интервал: все числа меньше 9.',
            answer: '(-∞; 9)'
        }
    ];
    const random = problems[Math.floor(Math.random() * problems.length)];
    container.innerHTML = `
        <div class="problem-box">
            <h3>Задача:</h3>
            <p class="problem-text">${random.problem}</p>
            <details>
                <summary class="answer-toggle">Показать ответ</summary>
                <div class="answer-content">${random.answer}</div>
            </details>
        </div>
    `;
}

function loadFunctionValuesTheory(section, topicName) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Теория: ${topicName}
        </h2>
        <h3>Что такое функция?</h3>
        <p><strong>Функция</strong> — это правило, по которому каждому значению x ставится в соответствие единственное значение y.</p>
        <p>Обычно функцию записывают как <span class="formula">y = f(x)</span> или просто формулу, например <span class="formula">y = 2x + 3</span>.</p>
        
        <h4>1. Как вычислить значение функции</h4>
        <p>Чтобы найти значение функции при заданном x, нужно подставить это значение вместо x в формулу и вычислить результат.</p>
        <div class="example-box">
            <h4>Пример:</h4>
            <p>Дана функция <span class="formula">y = 3x - 5</span>. Найти y при x = 4.</p>
            <p>Подставляем: <span class="formula">y = 3 · 4 - 5 = 12 - 5 = 7</span></p>
            <p>Ответ: при x = 4 значение функции y = 7.</p>
        </div>
        
        <h4>2. Вычисление для нескольких значений</h4>
        <p>Часто нужно найти значения функции для нескольких x. Подставляем каждое значение по очереди.</p>
        <div class="example-box">
            <h4>Пример:</h4>
            <p>Функция <span class="formula">y = 2x + 1</span>. Найти значения при x = 0, x = 2, x = -1.</p>
            <ul>
                <li>При x = 0: <span class="formula">y = 2 · 0 + 1 = 1</span></li>
                <li>При x = 2: <span class="formula">y = 2 · 2 + 1 = 5</span></li>
                <li>При x = -1: <span class="formula">y = 2 · (-1) + 1 = -2 + 1 = -1</span></li>
            </ul>
        </div>
        
        <h4>3. Функции с дробными коэффициентами</h4>
        <p>Если в формуле есть дроби, аккуратно выполняем действия с дробями.</p>
        <div class="example-box">
            <h4>Пример:</h4>
            <p>Функция <span class="formula">y = (1/2)x + 3</span>. Найти y при x = 4.</p>
            <p><span class="formula">y = (1/2) · 4 + 3 = 2 + 3 = 5</span></p>
        </div>
        
        <h4>4. Функции со скобками</h4>
        <p>Сначала выполняем действия в скобках, затем остальные операции.</p>
        <div class="example-box">
            <h4>Пример:</h4>
            <p>Функция <span class="formula">y = 2(x - 3) + 5</span>. Найти y при x = 7.</p>
            <p><span class="formula">y = 2(7 - 3) + 5 = 2 · 4 + 5 = 8 + 5 = 13</span></p>
        </div>
        
        <h4>5. Алгоритм вычисления</h4>
        <ol>
            <li>Запишите формулу функции</li>
            <li>Подставьте значение x вместо переменной</li>
            <li>Выполните вычисления по порядку (сначала скобки, затем умножение/деление, потом сложение/вычитание)</li>
            <li>Запишите ответ</li>
        </ol>
        
        <h4>6. Таблица значений</h4>
        <p>Иногда удобно составить таблицу значений функции:</p>
        <div class="example-box">
            <p>Для функции <span class="formula">y = x + 2</span>:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="border-bottom: 1px solid var(--gold);">
                    <th style="padding: 8px; text-align: center;">x</th>
                    <th style="padding: 8px; text-align: center;">y</th>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: center;">-1</td>
                    <td style="padding: 8px; text-align: center;">1</td>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: center;">0</td>
                    <td style="padding: 8px; text-align: center;">2</td>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: center;">1</td>
                    <td style="padding: 8px; text-align: center;">3</td>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: center;">2</td>
                    <td style="padding: 8px; text-align: center;">4</td>
                </tr>
            </table>
        </div>
        
        <h4>Важно помнить</h4>
        <ul>
            <li>Внимательно подставляйте отрицательные числа (используйте скобки)</li>
            <li>Следите за порядком действий</li>
            <li>Проверяйте вычисления</li>
        </ul>
    `;
}

function loadFunctionValuesProblems(section) {
    section.innerHTML = `
        <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Генератор задач
        </h2>
        <p>Нажмите кнопку ниже, чтобы сгенерировать задачу по вычислению значений функции:</p>
        <button class="generate-btn" onclick="generateFunctionValueProblem()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 20px; height: 20px;">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 1 1 10-10"></path>
            </svg>
            Сгенерировать задачу
        </button>
        <div id="functionValueProblemContainer"></div>
    `;
}

function generateFunctionValueProblem() {
    const container = document.getElementById('functionValueProblemContainer');
    const problems = [
        {
            problem: 'Дана функция y = 2x + 3. Найдите значение функции при x = 5.',
            answer: 'y = 2 · 5 + 3 = 10 + 3 = 13'
        },
        {
            problem: 'Дана функция y = 3x - 4. Найдите значение функции при x = 2.',
            answer: 'y = 3 · 2 - 4 = 6 - 4 = 2'
        },
        {
            problem: 'Дана функция y = x + 7. Найдите значение функции при x = -3.',
            answer: 'y = (-3) + 7 = 4'
        },
        {
            problem: 'Дана функция y = 4x - 1. Найдите значение функции при x = 0.',
            answer: 'y = 4 · 0 - 1 = -1'
        },
        {
            problem: 'Дана функция y = 2(x - 3) + 5. Найдите значение функции при x = 6.',
            answer: 'y = 2(6 - 3) + 5 = 2 · 3 + 5 = 6 + 5 = 11'
        },
        {
            problem: 'Дана функция y = (1/2)x + 4. Найдите значение функции при x = 6.',
            answer: 'y = (1/2) · 6 + 4 = 3 + 4 = 7'
        },
        {
            problem: 'Дана функция y = 5x + 2. Найдите значение функции при x = -1.',
            answer: 'y = 5 · (-1) + 2 = -5 + 2 = -3'
        },
        {
            problem: 'Дана функция y = 3(x + 2) - 1. Найдите значение функции при x = 1.',
            answer: 'y = 3(1 + 2) - 1 = 3 · 3 - 1 = 9 - 1 = 8'
        },
        {
            problem: 'Дана функция y = 2x - 5. Найдите значение функции при x = 4.',
            answer: 'y = 2 · 4 - 5 = 8 - 5 = 3'
        },
        {
            problem: 'Дана функция y = (1/3)x + 6. Найдите значение функции при x = 9.',
            answer: 'y = (1/3) · 9 + 6 = 3 + 6 = 9'
        }
    ];
    const random = problems[Math.floor(Math.random() * problems.length)];
    container.innerHTML = `
        <div class="problem-box">
            <h3>Задача:</h3>
            <p class="problem-text">${random.problem}</p>
            <details>
                <summary class="answer-toggle">Показать решение</summary>
                <div class="answer-content">${random.answer}</div>
            </details>
        </div>
    `;
}

function goBack(sectionId) {
    document.getElementById('lessonContent').classList.add('hidden');
    document.getElementById('topicSelection').classList.add('hidden');
    document.getElementById('gradeSelection').classList.add('hidden');
    document.getElementById('subjectSelection').classList.add('hidden');
    
    if (sectionId === 'subjectSelection') {
        currentSubject = null;
    } else if (sectionId === 'gradeSelection') {
        currentGrade = null;
        document.getElementById('subjectSelection').classList.remove('hidden');
    } else if (sectionId === 'topicSelection') {
        currentTopic = null;
        document.getElementById('gradeSelection').classList.remove('hidden');
    }
}

// Lesson Board Logic
let lessonCanvas = null;
let lessonCtx = null;
let lessonIsDrawing = false;
let lessonCurrentTool = 'pencil';
let lessonCurrentColor = '#ffffff';
let lessonCurrentLineWidth = 3;

function initLessonBoard() {
    lessonCanvas = document.getElementById('lessonCanvas');
    if (!lessonCanvas) return;
    
    lessonCtx = lessonCanvas.getContext('2d');
    if (!lessonCtx) return;
    
    function resizeLessonCanvas() {
        const container = lessonCanvas.parentElement;
        lessonCanvas.width = container.offsetWidth;
        lessonCanvas.height = container.offsetHeight;
        lessonCtx.lineCap = 'round';
        lessonCtx.lineJoin = 'round';
        lessonCtx.strokeStyle = lessonCurrentColor;
        lessonCtx.lineWidth = lessonCurrentLineWidth;
    }
    
    resizeLessonCanvas();
    
    // Mouse events
    lessonCanvas.addEventListener('mousedown', startLessonDrawing);
    lessonCanvas.addEventListener('mousemove', drawLesson);
    lessonCanvas.addEventListener('mouseup', stopLessonDrawing);
    lessonCanvas.addEventListener('mouseleave', stopLessonDrawing);
    
    // Touch events
    lessonCanvas.addEventListener('touchstart', handleLessonTouch);
    lessonCanvas.addEventListener('touchmove', handleLessonTouch);
    lessonCanvas.addEventListener('touchend', stopLessonDrawing);
    
    // Set initial color
    setLessonColor('#ffffff');
}

function startLessonDrawing(e) {
    if (!lessonCtx) return;
    lessonIsDrawing = true;
    const rect = lessonCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    lessonCtx.beginPath();
    lessonCtx.moveTo(x, y);
}

function drawLesson(e) {
    if (!lessonIsDrawing || !lessonCtx) return;
    
    const rect = lessonCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    lessonCtx.lineTo(x, y);
    lessonCtx.stroke();
}

function handleLessonTouch(e) {
    if (!lessonCtx) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = lessonCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (e.type === 'touchstart') {
        lessonIsDrawing = true;
        lessonCtx.beginPath();
        lessonCtx.moveTo(x, y);
    } else if (e.type === 'touchmove' && lessonIsDrawing) {
        lessonCtx.lineTo(x, y);
        lessonCtx.stroke();
    }
}

function stopLessonDrawing() {
    lessonIsDrawing = false;
}

function setLessonTool(tool) {
    lessonCurrentTool = tool;
    
    if (!lessonCtx) return;
    
    document.getElementById('lessonPencilBtn').classList.remove('active');
    document.getElementById('lessonEraserBtn').classList.remove('active');
    
    if (tool === 'pencil') {
        document.getElementById('lessonPencilBtn').classList.add('active');
        lessonCtx.globalCompositeOperation = 'source-over';
        lessonCtx.strokeStyle = lessonCurrentColor;
    } else {
        document.getElementById('lessonEraserBtn').classList.add('active');
        lessonCtx.globalCompositeOperation = 'destination-out';
    }
}

function setLessonColor(color) {
    lessonCurrentColor = color;
    if (lessonCtx) {
        lessonCtx.strokeStyle = color;
        lessonCtx.globalCompositeOperation = 'source-over';
    }
    
    // Update active color button
    document.querySelectorAll('.lesson-board-toolbar .color-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnColor = btn.style.backgroundColor;
        // Convert rgb to hex for comparison
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

function setLessonLineWidth(width) {
    lessonCurrentLineWidth = parseInt(width);
    if (lessonCtx) {
        lessonCtx.lineWidth = lessonCurrentLineWidth;
    }
    const widthValueEl = document.getElementById('lessonLineWidthValue');
    if (widthValueEl) {
        widthValueEl.textContent = width;
    }
}

function clearLessonBoard() {
    if (!lessonCanvas || !lessonCtx) return;
    if (confirm('Вы уверены, что хотите очистить доску?')) {
        lessonCtx.clearRect(0, 0, lessonCanvas.width, lessonCanvas.height);
    }
}


