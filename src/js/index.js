let data = JSON.parse(localStorage.getItem('data')) || [];

		const renderData = () => {
			const dataTable = document.getElementById('dataTable');
			dataTable.innerHTML = '';

			data.forEach((item, index) => {
				const { nombres, dni, telefono, totalPagado, estado } = item;

				const row = document.createElement('tr');
				row.innerHTML = `
					<td>${nombres}</td>
					<td>${dni}</td>
					<td>${telefono}</td>
					<td>${totalPagado}</td>
					<td>${estado}</td>
					<td>
						<button type="button" class="btn btn-sm btn-danger deleteBtn" data-index="${index}">Borrar <i class="fas fa-exclamation"></i> </button>
						<button type="button" class="btn btn-sm btn-primary editBtn" data-index="${index}"> Editar <i class="fas fa-edit"></i> </button>
					</td>
				`;

				dataTable.appendChild(row);
			});
		};

		const saveData = () => {
			localStorage.setItem('data', JSON.stringify(data));
			renderData();
		};

		const addData = (event) => {
			event.preventDefault();

			const formData = new FormData(event.target);
			const newData = {
				nombres: formData.get('nombres'),
				dni: formData.get('dni'),
				telefono: formData.get('telefono'),
				totalPagado: formData.get('totalPagado'),
				estado: formData.get('estado'),
			};

			data.push(newData);
			saveData();

			event.target.reset();
			event.target.querySelector('[name=nombres]').focus();
		};

		const deleteAllData = () => {
			data = [];
			saveData();
		};

		const deleteData = (event) => {
			const index = event.target.dataset.index;
			data.splice(index, 1);
			saveData();
		};

		const editData = (event) => {
			const index = event.target.dataset.index;
			const item = data[index];

			document.getElementById('nombres').value = item.nombres;
			document.getElementById('dni').value = item.dni;
			document.getElementById('telefono').value = item.telefono;
			document.getElementById('totalPagado').value = item.totalPagado;
			document.getElementById('estado').value = item.estado;
			

			data.splice(index, 1);
			saveData();
		};

		const dataForm = document.getElementById('dataForm');
		dataForm.addEventListener('submit', addData);

		const deleteAllBtn = document.getElementById('deleteAllBtn');
		deleteAllBtn.addEventListener('click', deleteAllData);

		document.addEventListener('click', (event) => {
			if (event.target.classList.contains('deleteBtn')) {
				deleteData(event);
			}
      if (event.target.classList.contains('editBtn')) {
				editData(event);
			}
		});

		renderData();