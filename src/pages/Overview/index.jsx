import ProjectList from '../../components/ProjectList';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { projectQuery } from '../../utils/projectQuery.js';
import { getAllProjects } from '../../api/projectsService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TablePagination from '../../components/TablePagination';



export const allProjectsLoader = (queryClient) =>
    async () => {
        const query = await queryClient.ensureQueryData(projectQuery(getAllProjects, 1));

        return query
    };


export default function Overview() {
    const [page, setPage] = useState(1);

    const { isFetching, isError, data } = useQuery({
        queryKey: ['project', page],
        queryFn: async () => {
            try {
                const data = await getAllProjects(page);
                return data;
            } catch (error) {
                const data = {
                    error: error,
                };
                return data;
            }
        },
        placeholderData: keepPreviousData
    })
    const navigate = useNavigate();

    function onPageChange(newPage) {
        setPage(newPage);
    }

    return (
        <div>
            <Box
                sx={{
                    marginBlock: '1em',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{ width: '50%', marginInline: 'auto', textAlign: 'center' }}>
                    <p>Crear un nuevo proyecto</p>
                </Box>
                <Button
                    onClick={() => navigate('/create')}
                    variant='contained'
                    sx={{ width: 'fit-content', marginInline: 'auto', fontSize: '1.2rem' }}
                    size='large'
                >
                    Crear
                </Button>
            </Box>
            {isError || !!data.error ? <>Server error: {data.error.toString()}</> :
                data.totalItems === 0 ? <>No hay proyectos para mostrar</> :
                    data.projects.length !== 0 ?
                        <>
                            <ProjectList projects={data.projects} isFetching={isFetching} />
                            <TablePagination
                                count={data.totalItems}
                                page={page}
                                totalPages={data.totalPages}
                                onPageChange={onPageChange}
                            />
                        </> : <>
                            <h2>No hay proyectos en esta pagina.</h2>
                            <TablePagination
                                count={data.totalItems}
                                page={page}
                                totalPages={data.totalPages}
                                onPageChange={onPageChange}
                            />
                        </>
            }

        </div>
    )
}
