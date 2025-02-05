let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let isDarkMode = localStorage.getItem('darkMode') === 'true';

        // Inicialização
        function init() {
            document.body.classList.toggle('dark-mode', isDarkMode);
            renderTasks();
        }

        // Renderizar tarefas
        function renderTasks() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <span ondblclick="editTask(${index})">${task.text}</span>
                    <div class="actions">
                        <button onclick="toggleComplete(${index})">✓</button>
                        <button onclick="deleteTask(${index})">✕</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }

        // Adicionar tarefa
        function addTask() {
            const input = document.getElementById('taskInput');
            const text = input.value.trim();
            
            if (text) {
                tasks.push({ text, completed: false });
                input.value = '';
                saveData();
                renderTasks();
            }
        }

        // Alternar conclusão
        function toggleComplete(index) {
            tasks[index].completed = !tasks[index].completed;
            saveData();
            renderTasks();
        }

        // Excluir tarefa
        function deleteTask(index) {
            tasks.splice(index, 1);
            saveData();
            renderTasks();
        }

        // Editar tarefa
        function editTask(index) {
            const newText = prompt('Editar tarefa:', tasks[index].text);
            if (newText !== null) {
                tasks[index].text = newText.trim();
                saveData();
                renderTasks();
            }
        }

        // Tema escuro/claro
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode', isDarkMode);
            localStorage.setItem('darkMode', isDarkMode);
        }

        // Salvar no localStorage
        function saveData() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Evento de tecla para input
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        init();