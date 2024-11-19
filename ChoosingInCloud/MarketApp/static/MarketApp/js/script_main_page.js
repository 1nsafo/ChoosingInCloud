document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const phone = document.getElementById('phone').value;

    // Отправка данных на бэкенд
    fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Здесь можно добавить логику для обработки успешной регистрации
    })
    .catch((error) => {
        console.error('Error:', error);
        // Здесь можно добавить логику для обработки ошибок
    });
});

const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href');
        const targetElement = document.querySelector(blockID);
        
        // Функция для плавной прокрутки
        smoothScroll(targetElement, 1000); // 1000 мс = 1 секунда
    });
}

// Функция для плавной прокрутки
function smoothScroll(target, duration) {
    const start = window.scrollY; // Начальная позиция
    const end = target.getBoundingClientRect().top + start; // Конечная позиция
    const distance = end - start; // Расстояние для прокрутки
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Прогресс от 0 до 1

        // Применяем easing (плавность)
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, start + distance * ease); // Прокрутка
        if (timeElapsed < duration) requestAnimationFrame(animation); // Продолжаем анимацию
    }

    requestAnimationFrame(animation);
}

// Функция easing
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const button = document.getElementById('into');
    const popup = document.getElementById('myPopup');
    const overlay = document.getElementById('overlay');

    button.onclick = function() {
        // Показываем выплывающее окно и затемняющий фон
        popup.style.display = "block";
        overlay.style.display = "block";
    };

    // Закрытие окна при клике на затемняющий фон
    overlay.onclick = function() {
        popup.style.display = "none";
        overlay.style.display = "none";
    };