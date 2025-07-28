 async function initializeDataFromGitHub() {
    if (!localStorage.getItem('educationSystemInitialized')) {
        try {
            //const response = await fetch(');
            if (!response.ok) throw new Error("Ошибка загрузки JSON");
            
            const users = await response.json();
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('educationSystemInitialized', 'true');
        } catch (error) {
            console.error('Ошибка при получении данных с Server:', error);
        }
    }
}
        
        // Переключение темы
        const themeIcon = document.getElementById('themeToggle');
        const themeText = document.getElementById('themeText');
        themeIcon.onclick = () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Переключить светлую тему';
                themeIcon.setAttribute('title', 'Переключить светлую тему');
            } else {
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Переключить тёмную тему';
                themeIcon.setAttribute('title', 'Переключить тёмную тему');
            }
        };
        
        // Показать/скрыть пароль
        const togglePassword = document.getElementById('togglePassword');
        const password = document.getElementById('password');
        togglePassword.onclick = () => {
            if (password.type === 'password') {
                password.type = 'text';
                togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                password.type = 'password';
                togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
            }
        };
        
        // Обработка формы входа
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const login = document.getElementById('username').value.trim();
            const pass = document.getElementById('password').value.trim();
            
            // Очистка ошибок
            document.getElementById('usernameError').style.display = 'none';
            document.getElementById('passwordError').style.display = 'none';
            document.getElementById('serverError').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
            
            // Проверка на заполненность
            if (!login) {
                document.getElementById('usernameError').textContent = 'Введите логин';
                document.getElementById('usernameError').style.display = 'block';
                return;
            }
if (!pass) {
                document.getElementById('passwordError').textContent = 'Введите пароль';
                document.getElementById('passwordError').style.display = 'block';
                return;
            }
            
            // Поиск пользователя
            const users = getUsers();
            const user = users.find(u => u.login === login && u.password === pass);
            
            if (user) {
                // Успешный вход
                document.getElementById('successMessage').style.display = 'block';
                
                // Показываем панель управления через 1 секунду
                setTimeout(() => {
                    showDashboard(user);
                }, 1500);
            } else {
                // Ошибка входа
                document.getElementById('serverError').textContent = 'Неверный логин или пароль';
                document.getElementById('serverError').style.display = 'block';
            }
        });
        
        // Выход из системы
        document.getElementById('logoutBtn').addEventListener('click', function() {
            document.getElementById('dashboardContainer').style.display = 'none';
            document.getElementById('loginContainer').style.display = 'block';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('successMessage').style.display = 'none';
        });
        
        // Показать панель управления
        function showDashboard(user) {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('dashboardContainer').style.display = 'block';
            
            // Обновление информации о пользователе
document.getElementById('userName').innerHTML = user.name + 
    ` <span class="role-tag ${user.role}-tag">${user.roleName}</span>`;

// Обновление дополнительной информации
let roleDetails = '';
switch(user.role) {
    case 'student':
        roleDetails = `${user.school}, ${user.className}, г. ${user.city}`;
        document.getElementById('userClass').textContent = user.className;
        document.getElementById('userPosition').textContent = "Ученик";
        document.getElementById('userSchool').textContent = user.school;
        document.getElementById('userRolePosition').textContent = "Учебное заведение";
        break;
    case 'teacher':
        roleDetails = `${user.school}, ${user.subject}, г. ${user.city}`;
        document.getElementById('userClass').textContent = user.subject;
        document.getElementById('userPosition').textContent = "Учитель";
        document.getElementById('userSchool').textContent = user.school;
        document.getElementById('userRolePosition').textContent = "Учебное заведение";
        break;
    case 'school':
        roleDetails = `${user.students} учеников, ${user.teachers} учителей, г. ${user.city}`;
        document.getElementById('userClass').textContent = "Администрация";
        document.getElementById('userPosition').textContent = "Администрация школы";
        document.getElementById('userSchool').textContent = user.name;
        document.getElementById('userRolePosition').textContent = "Учебное заведение";
        break;
    case 'ministry':
        roleDetails = `${user.region}, ${user.schools} школ`;
        document.getElementById('userClass').textContent = "Департамент";
        document.getElementById('userPosition').textContent = "Министерство";
        document.getElementById('userSchool').textContent = "Региональный уровень";
        document.getElementById('userRolePosition').textContent = "Региональный уровень";
        break;
    case 'admin':
        roleDetails = "Системный администратор";
        document.getElementById('userClass').textContent = "Все уровни";
        document.getElementById('userPosition').textContent = "Администратор";
        document.getElementById('userSchool').textContent = "Вся система";
        document.getElementById('userRolePosition').textContent = "Все уровни";
        break;
    case 'super_admin':
        roleDetails = "Супер администратор с полными правами";
        document.getElementById('userClass').textContent = "Все уровни";
        document.getElementById('userPosition').textContent = "Супер Администратор";
        document.getElementById('userSchool').textContent = "Вся система";
        document.getElementById('userRolePosition').textContent = "Все уровни";
        break;
}
            document.getElementById('userRoleDetails').textContent = roleDetails;
            
            // Обновление статистики
            const users = getUsers();
            document.getElementById('statStudents').textContent = 
                users.filter(u => u.role === 'student').length;
            document.getElementById('statTeachers').textContent = 
                users.filter(u => u.role === 'teacher').length;
            document.getElementById('statSchools').textContent = 
                users.filter(u => u.role === 'school').length;
            document.getElementById('statRating').textContent = 
                user.rating || 4.2;
            
            // Отображение специфичного контента для роли
            const roleContent = document.getElementById('roleSpecificContent');
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDataFromGitHub();

    console.log("Инициализация началась");

const users = await response.json();
console.log("Загруженные пользователи:", users);
});