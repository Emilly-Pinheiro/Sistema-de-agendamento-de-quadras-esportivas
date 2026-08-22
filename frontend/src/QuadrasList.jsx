import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Typography, Container, InputAdornment } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "./components/Header";

export function QuadrasList() {
    const [quadras, setQuadras] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [quadraParaExcluir, setQuadraParaExcluir] = useState(null);

    const buscarQuadras = async (busca) => {
        try {
            const query = busca ? `?busca=${encodeURIComponent(busca)}` : "";
            const response = await axios.get(`http://localhost:3000/quadras${query}`);
            setQuadras(response.data);
        } catch (error) {
            console.error("Erro ao buscar quadras", error);
        }
    };

    useEffect(() => {
        buscarQuadras();
    }, []);

    const handleBuscar = (event) => {
        event.preventDefault();
        buscarQuadras(search);
    };

    const confirmarExclusao = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/quadras/${id}`);
            setQuadraParaExcluir(null);
            buscarQuadras(search);
        } catch (error) {
            console.error("Erro ao excluir quadra", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 4 }}>

            <Header />

            <Container maxWidth="lg" sx={{ mt: 5 }}>

                <Box
                    component="form"
                    onSubmit={handleBuscar}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, flexWrap: 'wrap', gap: 2 }}
                >

                    <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif' }}>
                        Gerenciar Quadras
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, maxWidth: 500 }}>
                        <TextField
                            placeholder="Pesquisar..."
                            value={search}
                            fullWidth
                            size="small"
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 50,
                                '& .MuiOutlinedInput-root': { borderRadius: 50 }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type="submit" size="small">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#5D2D6F',
                            borderRadius: 50,
                            textTransform: 'none',
                            px: 4,
                            py: 1,
                            fontSize: '1rem',
                            boxShadow: '0px 4px 10px rgba(94, 42, 132, 0.4)',
                            '&:hover': { backgroundColor: '#4a148c' }
                        }}
                        onClick={() => navigate('/nova-quadra')}
                    >
                        Adicionar Quadra
                    </Button>
                </Box>

                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                    {quadras.map(quadra => (
                        <Grid item key={quadra.id} xs={12} sm={6} md={4}>
                            <Card sx={{
                                border: '2px solid #5D2D6F',
                                borderRadius: 3,
                                position: 'relative',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'visible',
                                backgroundColor: 'white'
                            }}>

                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        top: -20,
                                        right: -20,
                                        backgroundColor: '#5D2D6F',
                                        color: 'white',
                                        width: 45,
                                        height: 45,
                                        '&:hover': { backgroundColor: '#4a148c' }
                                    }}
                                    onClick={() => navigate(`/editar-quadra/${quadra.id}`)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>

                                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <Typography variant="h6" fontWeight="bold" align="center" gutterBottom sx={{ fontFamily: 'serif', mb: 3 }}>
                                        {quadra.nome}
                                    </Typography>

                                    <Box sx={{ backgroundColor: '#e0e0e0', p: 1.5, borderRadius: 2, mb: 1.5 }}>
                                        <Typography variant="body2"><strong>Modalidade:</strong> {quadra.modalidade}</Typography>
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e0e0e0', p: 1.5, borderRadius: 2, mb: 3 }}>
                                        <Typography variant="body2"><strong>Localização:</strong> {quadra.localizacao}</Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        startIcon={<DeleteIcon />}
                                        sx={{ borderRadius: 50, textTransform: 'none', backgroundColor: '#b71c1c', fontWeight: 'bold', mt: 'auto', '&:hover': { backgroundColor: '#7f0000' } }}
                                        onClick={() => setQuadraParaExcluir(quadra)}
                                    >
                                        Excluir Quadra
                                    </Button>
                                </CardContent>
                                {quadraParaExcluir?.id === quadra.id && (
                                    <Box sx={{
                                        position: 'fixed',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: 'white',
                                        border: '2px solid #5e2a84',
                                        borderRadius: 2,
                                        p: 4,
                                        width: { xs: '90%', sm: '400px' },
                                        boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        zIndex: 9999
                                    }}>
                                        <WarningAmberIcon sx={{ color: '#c62828', fontSize: 45, mb: 1 }} />

                                        <Typography textAlign="center" sx={{ mb: 3, fontSize: '1.1rem' }}>
                                            Tem certeza de que deseja excluir a quadra <Box component="span" sx={{ color: '#c62828', fontWeight: 'bold' }}>{quadra.nome}</Box>?
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
                                            <Button
                                                onClick={() => setQuadraParaExcluir(null)}
                                                sx={{
                                                    backgroundColor: '#e0e0e0',
                                                    color: 'black',
                                                    borderRadius: 50,
                                                    px: 4,
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    '&:hover': { backgroundColor: '#bdbdbd' }
                                                }}
                                            >
                                                Não
                                            </Button>
                                            <Button
                                                onClick={() => confirmarExclusao(quadra.id)}
                                                variant="outlined"
                                                sx={{
                                                    borderColor: 'black',
                                                    color: 'black',
                                                    borderRadius: 50,
                                                    px: 4,
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    '&:hover': { backgroundColor: '#f5f5f5', borderColor: 'black' }
                                                }}
                                            >
                                                Sim
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Card>
                        </Grid>
                    ))}
                    {quadras.length === 0 && (
                        <Typography sx={{ mt: 4, color: '#666' }}>Nenhuma quadra cadastrada.</Typography>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
