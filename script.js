 document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Остановим форму для проверки

    let valid = true;

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const authError = document.getElementById('authError'); // Элемент для общей ошибки

    // Базовая проверка
    if (username === '') {
        usernameError.style.display = 'block';
        valid = false;
    } else {
        usernameError.style.display = 'none';
    }

    if (password.length < 6) {
        passwordError.style.display = 'block';
        valid = false;
    } else {
        passwordError.style.display = 'none';
    }

    if (!valid) return;

    // Авторизация
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.login === username && user.password === password);

    if (foundUser) {
        authError.style.display = 'none';
        console.log("Успешный вход как", foundUser.roleName);
        // Можешь здесь перенаправить: window.location.href = "dashboard.html";
    } else {
        authError.style.display = 'block';
        authError.textContent = 'Неверный логин или пароль';
    }
});