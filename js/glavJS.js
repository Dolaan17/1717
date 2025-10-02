// Данные студентов
const students = [
    { id: 1, name: "Оюн Арина", avatar: "ИА" },
    { id: 2, name: "Петрова Мария", avatar: "ПМ" },
    { id: 3, name: "Сидоров Дмитрий", avatar: "СД" },
    { id: 4, name: "Кузнецова Анна", avatar: "КА" },
    { id: 5, name: "Смирнов Иван", avatar: "СИ" },
    { id: 6, name: "Федорова Елена", avatar: "ФЕ" },
    { id: 7, name: "Николаев Павел", avatar: "НП" },
    { id: 8, name: "Алексеева Ольга", avatar: "АО" },
    { id: 9, name: "Дмитриев Сергей", avatar: "ДС" },
    { id: 10, name: "Орлова Татьяна", avatar: "ОТ" }
];

// Данные оценок
const grades = [
    { studentId: 1, programming: 5, databases: 4, webdev: 5, networking: 4, math: 5 },
    { studentId: 2, programming: 4, databases: 5, webdev: 4, networking: 5, math: 4 },
    { studentId: 3, programming: 3, databases: 4, webdev: 3, networking: 4, math: 4 },
    { studentId: 4, programming: 5, databases: 5, webdev: 5, networking: 5, math: 5 },
    { studentId: 5, programming: 4, databases: 3, webdev: 4, networking: 3, math: 4 },
    { studentId: 6, programming: 5, databases: 4, webdev: 5, networking: 4, math: 5 },
    { studentId: 7, programming: 4, databases: 4, webdev: 4, networking: 4, math: 4 },
    { studentId: 8, programming: 3, databases: 3, webdev: 3, networking: 3, math: 3 },
    { studentId: 9, programming: 5, databases: 5, webdev: 4, networking: 5, math: 4 },
    { studentId: 10, programming: 4, databases: 4, webdev: 5, networking: 4, math: 5 }
];

// Данные домашних заданий
let homeworks = [
    { 
        id: 1, 
        subject: "Программирование", 
        task: "Написать программу для вычисления факториала числа", 
        deadline: "2023-11-15", 
        author: "Иванов Алексей",
        date: "2023-11-10"
    },
    { 
        id: 2, 
        subject: "Базы данных", 
        task: "Создать ER-диаграмму для системы учета студентов", 
        deadline: "2023-11-20", 
        author: "Петрова Мария",
        date: "2023-11-12"
    }
];

// Функция для отображения списка студентов
function renderStudents() {
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = '';
    
    students.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.innerHTML = `
            <div class="student-avatar">${student.avatar}</div>
            <h3>${student.name}</h3>
        `;
        studentsList.appendChild(studentCard);
    });
}

// Функция для отображения журнала оценок
function renderGrades() {
    const gradesTable = document.getElementById('grades-table');
    gradesTable.innerHTML = '';
    
    students.forEach(student => {
        const studentGrades = grades.find(g => g.studentId === student.id);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td><span class="subject-grade grade-${studentGrades.programming}">${studentGrades.programming}</span></td>
            <td><span class="subject-grade grade-${studentGrades.databases}">${studentGrades.databases}</span></td>
            <td><span class="subject-grade grade-${studentGrades.webdev}">${studentGrades.webdev}</span></td>
            <td><span class="subject-grade grade-${studentGrades.networking}">${studentGrades.networking}</span></td>
            <td><span class="subject-grade grade-${studentGrades.math}">${studentGrades.math}</span></td>
        `;
        
        gradesTable.appendChild(row);
    });
}

// Функция для отображения домашних заданий
function renderHomeworks() {
    const homeworkList = document.getElementById('homework-list');
    homeworkList.innerHTML = '';
    
    if (homeworks.length === 0) {
        homeworkList.innerHTML = '<p>Нет активных домашних заданий</p>';
        return;
    }
    
    homeworks.forEach(homework => {
        const homeworkItem = document.createElement('div');
        homeworkItem.className = 'homework-item';
        homeworkItem.innerHTML = `
            <div class="homework-header">
                <span class="homework-subject">${homework.subject}</span>
                <span class="homework-date">Срок: ${formatDate(homework.deadline)}</span>
            </div>
            <div class="homework-description">${homework.task}</div>
            <div class="homework-author">Добавил(а): ${homework.author} | ${formatDate(homework.date)}</div>
        `;
        homeworkList.appendChild(homeworkItem);
    });
}

// Функция для форматирования даты
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

// Функция для переключения между вкладками
function setupTabs() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Убираем активный класс у всех ссылок и вкладок
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Добавляем активный класс к текущей ссылке и вкладке
            link.classList.add('active');
            const tabId = link.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Функция для обработки формы добавления домашнего задания
function setupHomeworkForm() {
    const form = document.getElementById('homework-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const subject = document.getElementById('subject').value;
        const task = document.getElementById('task').value;
        const deadline = document.getElementById('deadline').value;
        
        // Случайный автор из списка студентов
        const randomStudent = students[Math.floor(Math.random() * students.length)];
        
        // Создаем новое домашнее задание
        const newHomework = {
            id: homeworks.length + 1,
            subject,
            task,
            deadline,
            author: randomStudent.name,
            date: new Date().toISOString().split('T')[0]
        };
        
        // Добавляем в массив
        homeworks.push(newHomework);
        
        // Обновляем отображение
        renderHomeworks();
        
        // Сбрасываем форму
        form.reset();
        
        // Показываем уведомление
        alert('Домашнее задание успешно добавлено!');
    });
}

// Функция для инициализации приложения
function initApp() {
    renderStudents();
    renderGrades();
    renderHomeworks();
    setupTabs();
    setupHomeworkForm();
    
    // Устанавливаем минимальную дату для дедлайна (сегодня)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('deadline').min = today;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);