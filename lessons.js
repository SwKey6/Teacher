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
            { id: 'fractions', name: 'Сложение и вычитание дробей. Неправильные дроби и целая часть' }
        ],
        '7': [
            { id: 'fractions', name: 'Сложение и вычитание дробей. Неправильные дроби и целая часть' }
        ]
    },
    physics: {
        '7': [
            { id: 'mechanics', name: 'Механика' }
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
    } else {
        theorySection.innerHTML = '<p>Теория будет добавлена позже.</p>';
        problemsSection.innerHTML = '<p>Задачи будут добавлены позже.</p>';
    }
    
    // Initialize board after content is loaded
    setTimeout(() => {
        initLessonBoard();
    }, 100);
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


