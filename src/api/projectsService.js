const projectsUrl = import.meta.env.VITE_PROJECTS_URL;

export async function getAllProjects(page = 1) {
	const result = await fetch(projectsUrl + '/?page=' + page)
		.then(res => res.json())
		.catch(err => {
			throw new Error(err);
		});
	return result;
}

export async function getProjectById(id) {
	const result = await fetch(projectsUrl + '/' + id)
		.then(res => res.json())
		.catch(err => {
			throw new Error(err);
		});
	return result;
}

export async function createNewProject(data) {
	const result = await fetch(projectsUrl + '/add', {
		method: 'POST',
		body: data,
	})
		.then(res => res.json())
		.catch(err => {
			throw new Error(err);
		});
	return result;
}

export async function updateProject(data, id) {
	const result = await fetch(projectsUrl + '/update/' + id, {
		method: 'POST',
		body: data,
	})
		.then(res => res.json())
		.catch(err => {
			throw new Error(err);
		});
	return result;
}

export async function deleteProject(id) {
	const result = await fetch(projectsUrl + '/delete/' + id, {
		method: 'DELETE',
	})
		.then(res => res.json())
		.catch(err => {
			throw new Error(err);
		});
	return result;
}
