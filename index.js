console.log("JS FUNCIONANDO");

let editingTaskId = null;
function handleFormSubmit(event) {

	event.preventDefault();

	const titleInput = document.getElementById("task-title");
	const descriptionInput = document.getElementById("task-description");

	const titleError = document.getElementById("title-error");
	const descriptionError = document.getElementById("description-error");

	titleError.textContent = "";
	descriptionError.textContent = "";

	const formData = new FormData(event.target);

	const task = Object.fromEntries(formData);

	// VALIDACIONES

	let hasError = false;

	// titulo vacio

	if(task.title.trim() === ""){

		titleError.textContent =
		"El título es obligatorio";

		hasError = true;
	}

	// minimo caracteres

	if(task.title.trim().length < 3){

		titleError.textContent =
		"El título debe tener mínimo 3 caracteres";

		hasError = true;
	}

	// max descripcion

	if(task.description.length > 40){

		descriptionError.textContent =
		"La descripción no puede superar 40 caracteres";

		hasError = true;
	}

	// duplicados

	const duplicatedTask = document.querySelectorAll(".task-content h3");

	for(let taskTitle of duplicatedTask){

		if(taskTitle.textContent.toLowerCase()
		=== task.title.toLowerCase()){

			titleError.textContent =
			"Ya existe una tarea con ese título";

			hasError = true;
		}
	}

	if(hasError) return;

	if(editingTaskId){

	task.id = editingTaskId;

	const oldTask =
	document.getElementById(editingTaskId);

	oldTask.remove();

	editingTaskId = null;

}else{

	task.id = Date.now();
}

	const taskElement = createTaskElement(task);

	const ulContainer =
	document.getElementById("task-list-container");

	if (!ulContainer) return;

	ulContainer.appendChild(taskElement);

	event.target.reset();
}

function createTaskElement (task) {
	const divTaskContent = document.createElement("div");
	divTaskContent.classList.add("task-content");

	const h3Title = document.createElement("h3");
	h3Title.textContent = task.title;
	const pDescription = document.createElement("p");
	pDescription.textContent = task.description;

	divTaskContent.appendChild(h3Title);
	divTaskContent.appendChild(pDescription);

	const divTaskAction = document.createElement("div");
	divTaskAction.classList.add("task-actions");
	const editButton = document.createElement("button");
	editButton.type = "button"
	editButton.textContent = "Editar";
	editButton.addEventListener("click", () => {

	console.log("EDITANDO");

	const titleInput =
	document.getElementById("task-title");

	const descriptionInput =
	document.getElementById("task-description");

	titleInput.value = task.title;

	descriptionInput.value = task.description;

	editingTaskId = task.id;
});
	const deleteButton = document.createElement("button");
	deleteButton.type = "button"
	deleteButton.textContent = "Eliminar";
	deleteButton.addEventListener("click", () => deleteTaskElement(task.id));

	
	divTaskAction.appendChild(editButton);
	divTaskAction.appendChild(deleteButton);

	const li = document.createElement("li");
	li.classList.add("task-item");
	li.id = task.id;

	li.appendChild(divTaskContent);
	li.appendChild(divTaskAction);

	return li;
}

function deleteTaskElement(taskId) {
	const li = document.getElementById(taskId);
	li.remove();
}