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
const weddingDate = new Date("2025-09-21T13:00:00");

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

// Анимация элементов
document.querySelectorAll('.timeline-content').forEach((item, index) => {
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 300 * index);
});

// Статичный календарь только для месяца свадьбы
function generateWeddingCalendar() {
    const weddingDay = 21;
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

// Карусель
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 0;
let autoplayInterval;

// Создание индикаторов
function createDots() {
    slides.forEach(function(_, index) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
}

// Переход к слайду
function goToSlide(index) {
    currentIndex = index;
    carousel.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    
    // Обновление активной точки
    var dots = document.querySelectorAll('.dot');
    dots.forEach(function(dot, i) {
        if (i === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Следующий слайд
function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    goToSlide(currentIndex);
}

// Предыдущий слайд
function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1;
    }
    goToSlide(currentIndex);
}

// Автопрокрутка
function startAutoplay() {
    autoplayInterval = setInterval(function() {
        nextSlide();
    }, 5000);
}

// Остановка автопрокрутки
function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Функция для скрытия/показа стрелок
function toggleArrows() {
    // Скрываем стрелки на экранах меньше 768px
    if (window.innerWidth < 768) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

// Инициализация карусели
function initCarousel() {
    createDots();
    
    // Управление видимостью стрелок
    toggleArrows(); // Первоначальная настройка
    window.addEventListener('resize', toggleArrows); // Обновление при изменении размера
    
    // Навигация
    prevBtn.addEventListener('click', function() {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });
    
    nextBtn.addEventListener('click', function() {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });
    
    // Пауза при наведении
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Свайпы для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            stopAutoplay();
            startAutoplay();
        }
    }
    
    // Запуск автопрокрутки
    startAutoplay();
}

// Инициализация
initCarousel();




//Дресс-код
document.addEventListener('DOMContentLoaded', function () {
  const pageWrapper = document.getElementById('pageWrapper'); // может быть null
  let overlay = null;
  let zoomedImg = null;
  let isOpen = false;

  function createOverlayIfNeeded() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'zoom-overlay';
      overlay.style.opacity = '0';
      document.body.appendChild(overlay);
      // плавно показываем
      requestAnimationFrame(() => { overlay.style.opacity = '1'; });
      overlay.addEventListener('click', closeZoom);
    }
  }

  function removeOverlay() {
    if (overlay) {
      overlay.style.opacity = '0';
      // удалить после завершения анимации
      const handler = () => {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        overlay = null;
      };
      overlay.addEventListener('transitionend', handler, { once: true });
    }
  }

  function openZoom(originalImg) {
    // Если уже открыт — сначала закрыть текущий
    if (isOpen) closeZoom();

    // Если есть pageWrapper — применим к нему blur, иначе создадим overlay с backdrop-filter
    if (pageWrapper) {
      pageWrapper.classList.add('blur-bg');
    } else {
      createOverlayIfNeeded();
    }

    // Создаём клонированное изображение (чтобы не трогать миниатюру)
    zoomedImg = originalImg.cloneNode(false);
    zoomedImg.className = 'zoomed-image';
    zoomedImg.alt = originalImg.alt || '';
    // Для корректной работы размеров
    zoomedImg.style.maxWidth = '92vw';
    zoomedImg.style.maxHeight = '90vh';
    // Добавляем в DOM
    document.body.appendChild(zoomedImg);

    // Блокируем прокрутку страницы
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Небольшая хитрость для анимации: сначала вставляем с начальными стилями, затем добавляем класс open
    // чтобы запустить transition
    requestAnimationFrame(() => {
      zoomedImg.classList.add('open');
    });

    // Закрыть по клику на само изображение
    zoomedImg.addEventListener('click', closeZoom);
    // Закрыть по ESC
    document.addEventListener('keydown', escHandler);

    isOpen = true;
  }

  function closeZoom() {
    if (!isOpen) return;

    // Убираем размыв/overlay
    if (pageWrapper) {
      pageWrapper.classList.remove('blur-bg');
    } else {
      removeOverlay();
    }

    // Убираем клонированное изображение плавно
    if (zoomedImg) {
      zoomedImg.classList.remove('open');
      // удалить после завершения transition
      zoomedImg.addEventListener('transitionend', () => {
        if (zoomedImg && zoomedImg.parentNode) zoomedImg.parentNode.removeChild(zoomedImg);
        zoomedImg = null;
      }, { once: true });
    }

    // Восстановим прокрутку
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    document.removeEventListener('keydown', escHandler);
    isOpen = false;
  }

  function escHandler(e) {
    if (e.key === 'Escape') closeZoom();
  }

  // Навешиваем обработчики на миниатюры
  document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      openZoom(this);
    });
  });

  // Клик везде вне зума закрывает (защитный механизм)
  document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('zoomable') && isOpen) {
      closeZoom();
    }
  });

  // На телефонах иногда полезно закрывать по свайпу вниз — необязательно, можно добавить позже.
});

// Плавное появление секций при прокрутке
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // чтобы не анимировать снова
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-in").forEach(section => {
        observer.observe(section);
    });
});