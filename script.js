/* =========================================
   СКРИПТ 1: Текущее время на странице
   ========================================= */
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU'); // Формат ЧЧ:ММ:СС
    const timeEl = document.getElementById('currentTime');
    if (timeEl) {
        timeEl.textContent = timeString;
    }
}
setInterval(updateTime, 1000);
updateTime();

/* =========================================
   СКРИПТ 2: Слайдер галереи
   ========================================= */
const galleryGrid = document.querySelector('.gallery-grid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (galleryGrid && prevBtn && nextBtn) {
    // Простая логика: перекидываем последнюю картинку в начало и наоборот
    prevBtn.addEventListener('click', () => {
        const items = document.querySelectorAll('.gallery-item');
        galleryGrid.insertBefore(items[items.length - 1], items[0]);
    });

    nextBtn.addEventListener('click', () => {
        const items = document.querySelectorAll('.gallery-item');
        galleryGrid.appendChild(items[0]);
    });
}

/* =========================================
   СКРИПТ 3: Валидация формы обратной связи
   ========================================= */
const form = document.getElementById('inquiryForm');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Останавливаем стандартную отправку

        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');

        let isValid = true;
        let errorMessage = "Пожалуйста, исправьте следующие ошибки:\n";

        // Проверка имени
        if (nameInput.value.trim().length < 2) {
            isValid = false;
            errorMessage += "- Имя должно содержать минимум 2 символа.\n";
            nameInput.style.borderColor = "red";
        } else {
            nameInput.style.borderColor = "var(--border)";
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            errorMessage += "- Введите корректный адрес электронной почты.\n";
            emailInput.style.borderColor = "red";
        } else {
            emailInput.style.borderColor = "var(--border)";
        }

        // Проверка сообщения
        if (messageInput.value.trim().length < 10) {
            isValid = false;
            errorMessage += "- Сообщение должно быть не короче 10 символов.\n";
            messageInput.style.borderColor = "red";
        } else {
            messageInput.style.borderColor = "var(--border)";
        }

        // Итог валидации
        if (isValid) {
            alert("Успех! Ваш запрос успешно валидирован скриптом и отправлен.");
            form.reset(); // Очищаем форму
        } else {
            alert(errorMessage);
        }
    });
}

/* =========================================
   СКРИПТ БОНУС: Плавный скролл к секциям
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});




/* =========================================
   ФАНОВЫЕ ФУНКЦИИ ДЛЯ КНОПОК (Пасхалки)
   ========================================= */

// 1. Ленивая кнопка "Начать работу"
const startBtn = document.querySelector('.header-action .btn-primary');
if (startBtn) {
    const phrases = [
        "Может лучше завтра?",
        "Ушел за кофе ☕",
        "Имитирую бурную деятельность...",
        "Система устала 🥱",
        "Ладно, уговорили. Начать работу" 
    ];
    let clickCount = 0;
    
    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        startBtn.textContent = phrases[clickCount % phrases.length];
        
        // Немного меняем цвет для комичности
        if (clickCount % phrases.length !== 4) {
            startBtn.style.backgroundColor = "#5b5f61"; 
        } else {
            startBtn.style.backgroundColor = "var(--primary)"; // Возвращаем родной цвет
        }
        clickCount++;
    });
}

// 2. Кнопка "Портфолио" делает "Бочку" (Do a barrel roll)
const portfolioBtn = document.querySelector('.hero-content .btn-accent');
if (portfolioBtn) {
    portfolioBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Крутим всю страницу
        document.body.style.transition = "transform 2s ease-in-out";
        document.body.style.transform = "rotate(360deg)";
        
        // Возвращаем как было, чтобы не сломать сайт навсегда
        setTimeout(() => {
            document.body.style.transition = "none";
            document.body.style.transform = "rotate(0deg)";
            alert("Вжух! Архитектурная стабильность временно нарушена 🌪️");
        }, 2000);
    });
}

// 3. Честные соцсети в подвале
const socials = document.querySelectorAll('.socials a');
const socialMessages = [
    "Вы попытались поделиться ссылкой, но вспомнили, что вы интроверт. Отмена.",
    "Выход в глобальную сеть временно заблокирован вашим котом 🐈",
    "Связь с астралом установлена. Ожидайте загрузки чертежей пирамид 👽"
];

socials.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Блокируем переход
        alert(socialMessages[index % socialMessages.length]);
    });
});