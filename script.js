const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendar = document.querySelector(".calendar");
const monthElement = document.querySelector(".current-month");
const prevMonthElement = document.querySelector(".prev-month");
const nextMonthElement = document.querySelector(".next-month");
const daysElement = document.querySelector(".days");

prevMonthElement.addEventListener("click", () =>
{
	currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
	currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
	renderCalendar();
});

nextMonthElement.addEventListener("click", () =>
{
	currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
	currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
	renderCalendar();
});

function renderCalendar()
{
	monthElement.textContent = `${months[currentMonth]} ${currentYear}`;

	const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();

	const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

	daysElement.innerHTML = "";

	for (let i = 0; i < weekdays.length; i++)
	{
		const weekday = document.createElement("div");
		weekday.textContent = weekdays[i];
		daysElement.appendChild(weekday);
	}

	for (let i = 1; i <= numDays; i++)
	{
		const day = document.createElement("div");
		day.textContent = i;
		day.addEventListener("click", () => { openTodoModal(i); });
		if (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && i === currentDate.getDate())
		{
			day.classList.add("today");
		}
		if (i === 1)
		{
			day.style.gridColumnStart = firstDayIndex + 1;
		}
		daysElement.appendChild(day);
	}
}

function openTodoModal(day)
{
	const modal = document.createElement("div");
	modal.classList.add("modal");
	modal.innerHTML = `
		<div class="modal-content">
			<span class="close-modal">&times;</span>
			<h2>${months[currentMonth]} ${day}, ${currentYear}</h2>
			<div class="todo-container">
				<form>
					<label for="todo-input">Add todo:</label>
					<input type="text" id="todo-input" />
					<button type="submit">Add</button>
				</form>
				<ul class="todo-list"></ul>
			</div>
		</div>
	`;
	document.body.appendChild(modal);
	const closeModalButton = modal.querySelector(".close-modal");
	closeModalButton.addEventListener("click", () =>
	{
		document.body.removeChild(modal);
	});
	const todoForm = modal.querySelector("form");
	const todoList = modal.querySelector(".todo-list");
	todoForm.addEventListener("submit", (event) =>
	{
		event.preventDefault();
		const todoInput = todoForm.querySelector("input[type=text]");
		const todoText = todoInput.value.trim();
		if (todoText)
		{
			const todoItem = document.createElement("li");
			todoItem.innerHTML = `
				<span>${todoText}</span>
				<button class="delete-todo">Delete</button>
			`;
			todoList.appendChild(todoItem);
			todoInput.value = "";
			const deleteButton = todoItem.querySelector(".delete-todo");
			deleteButton.addEventListener("click", () =>
			{
				todoList.removeChild(todoItem);
			});
		}
	});
}

renderCalendar();
