// Модалка
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const openBtn = document.getElementById('openBtn');
    const body = document.body;
    
    // Блокируем скролл при открытии модального окна
    body.classList.add('no-scroll');
    
    function closeModal() {
        // Запускаем анимацию скрытия
        modal.classList.add('modal-hidden');
        
        // Разблокируем скролл после небольшой задержки
        setTimeout(() => {
            body.classList.remove('no-scroll');
        }, 100);
        
        // Полностью удаляем модальное окно после завершения анимации
        setTimeout(() => {
            modal.remove();
        }, 2000);
    }

    // Закрытие по кнопке
    openBtn.addEventListener('click', closeModal);
    
    /* Закрытие по клику на фон (оверлей)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });*/
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.parentNode) {
            closeModal();
        }
    });
});


// Обратный отсчет
const weddingDate = new Date("2025-09-15T15:00:00");

function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Обработка формы
document.getElementById('alcoholForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const selectedOptions = Array.from(document.querySelectorAll('input[name="alcohol"]:checked'))
                            .map(el => el.parentElement.textContent.trim());
    
    alert(`Спасибо, ${name}!\nВаши предпочтения: ${selectedOptions.join(', ') || 'не указаны'}`);
    this.reset();
});

// Анимация элементов
document.querySelectorAll('.timeline-content').forEach((item, index) => {
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 300 * index);
});

// Статичный календарь только для месяца свадьбы
function generateWeddingCalendar() {
    const weddingDay = 15;
    const weddingMonth = 8; // Сентябрь (0-11)
    const weddingYear = 2025;
    
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // Определяем первый день месяца
    const firstDay = new Date(weddingYear, weddingMonth, 1).getDay();
    // Количество дней в месяце
    const daysInMonth = new Date(weddingYear, weddingMonth + 1, 0).getDate();
    
    // Корректировка для понедельника (1) как первого дня недели
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    
    // Пустые ячейки перед первым днем
    for (let i = 0; i < startOffset; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('empty-day');
        calendarDays.appendChild(emptyDay);
    }
    
    // Создаем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        
        // Выделяем день свадьбы
        if (day === weddingDay) {
            dayElement.classList.add('wedding-day');
        }
        
        // Выделяем выходные дни
        const dayOfWeek = new Date(weddingYear, weddingMonth, day).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayElement.classList.add('weekend');
        }
        
        calendarDays.appendChild(dayElement);
    }
    
    // Добавляем пустые ячейки в конце, если нужно
    const totalCells = 42; // 6 строк по 7 дней
    const remainingCells = totalCells - (startOffset + daysInMonth);
    for (let i = 0; i < remainingCells; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('empty-day');
        calendarDays.appendChild(emptyDay);
    }
}

// Инициализация календаря при загрузке
document.addEventListener('DOMContentLoaded', function() {
    generateWeddingCalendar();
    
    // Анимация сердца-маркера
    setTimeout(() => {
        const heartMarker = document.querySelector('.heart-marker i');
        heartMarker.style.animation = 'float 3s ease-in-out infinite';
    }, 1000);
});