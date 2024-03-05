export const projectQuery = (apiCall, projectKey = 'all') => {
	return {
		queryKey: ['project', projectKey],
		queryFn: async () => {
			try {
				const data = await apiCall(projectKey);
				return data;
			} catch (error) {
				const data = {
					error: 'Error: ' + error,
				};
				return data;
			}
		},
	};
};
