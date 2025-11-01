// Interactive board logic
let canvas = null;
let ctx = null;
let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#ffffff';
let currentLineWidth = 3;

document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Set initial color
    setColor('#ffffff');
});

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (e.type === 'touchstart') {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (e.type === 'touchmove' && isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopDrawing() {
    isDrawing = false;
}

function setTool(tool) {
    currentTool = tool;
    
    document.getElementById('pencilBtn').classList.remove('active');
    document.getElementById('eraserBtn').classList.remove('active');
    
    if (tool === 'pencil') {
        document.getElementById('pencilBtn').classList.add('active');
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentColor;
    } else {
        document.getElementById('eraserBtn').classList.add('active');
        ctx.globalCompositeOperation = 'destination-out';
    }
}

function setColor(color) {
    currentColor = color;
    ctx.strokeStyle = color;
    ctx.globalCompositeOperation = 'source-over';
    
    // Update active color button
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.style.backgroundColor === color) {
            btn.classList.add('active');
        }
    });
}

function setLineWidth(width) {
    currentLineWidth = parseInt(width);
    ctx.lineWidth = currentLineWidth;
    document.getElementById('lineWidthValue').textContent = width;
}

function clearBoard() {
    if (confirm('Вы уверены, что хотите очистить доску?')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}

