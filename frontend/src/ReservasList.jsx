import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Typography, Container, InputAdornment } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "./components/Header";

export function ReservasList() {
    const [reservas, setReservas] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [reservaParaCancelar, setReservaParaCancelar] = useState(null);

    const buscarReservas = async () => {
        try {
            const response = await axios.get("http://localhost:3000/reservas");
            setReservas(response.data);
        } catch (error) {
            console.error("Erro ao buscar reservas", error);
        }
    };

    useEffect(() => {
        buscarReservas();
    }, []);

    const confirmarCancelamento = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/reservas/${id}`);
            setReservaParaCancelar(null);
            buscarReservas();
        } catch (error) {
            console.error("Erro ao cancelar agendamento", error);
        }
    };

    const reservasFiltradas = reservas.filter((reserva) =>
        [reserva.quadra_id, reserva.jogador_id].some((field) =>
            field?.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 4 }}>
            
            <Header />

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, flexWrap: 'wrap', gap: 2 }}>
                    
                    <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif' }}> 
                        Gerenciar Reservas 
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
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton>
                            <FilterAltOutlinedIcon sx={{ color: 'black' }} />
                        </IconButton>
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
                        onClick={() => navigate('/nova-reserva')}
                    >
                        Criar Reserva
                    </Button>
                </Box>

                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                    {reservasFiltradas.map(reserva => (
                        <Grid item key={reserva.id} xs={12} sm={6} md={4}>
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
                                    onClick={() => navigate(`/editar-reserva/${reserva.id}`)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>

                                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <Typography variant="h6" fontWeight="bold" align="center" gutterBottom sx={{ fontFamily: 'serif', mb: 3 }}>
                                        Quadra {reserva.quadra?.nome}
                                    </Typography>
                                
                                    <Box sx={{ backgroundColor: '#e0e0e0', p: 1.5, borderRadius: 2, mb: 1.5 }}>
                                        <Typography variant="body2"><strong>Data:</strong> {reserva.data.substring(0, 10).split('-').reverse().join('/')}</Typography>
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e0e0e0', p: 1.5, borderRadius: 2, mb: 1.5 }}>
                                        <Typography variant="body2"><strong>Responsável:</strong> {reserva.jogador?.nome}</Typography>
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e0e0e0', p: 1.5, borderRadius: 2, mb: 1.5 }}>
                                        <Typography variant="body2"><strong>Horário de Entrada:</strong> {new Date(reserva.horario_inicio).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})} h</Typography>
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e0e0e0', p: 1.5, borderRadius: 2, mb: 3 }}>
                                        <Typography variant="body2"><strong>Horário de Saída:</strong> {new Date(reserva.horario_fim).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})} h</Typography>
                                    </Box>

                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        sx={{ borderRadius: 50, textTransform: 'none', backgroundColor: '#b71c1c', fontWeight: 'bold', mt: 'auto', '&:hover': { backgroundColor: '#7f0000' } }}
                                        onClick={() => setReservaParaCancelar(reserva.id)}
                                    >
                                        Cancelar Agendamento
                                    </Button>
                                </CardContent>
                                {reservaParaCancelar === reserva.id && (
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
                                            Tem certeza de que deseja cancelar a reserva na <Box component="span" sx={{ color: '#c62828', fontWeight: 'bold' }}>{reserva.quadra?.nome}</Box>?
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
                                            <Button 
                                                onClick={() => setReservaParaCancelar(null)}
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
                                                onClick={() => confirmarCancelamento(reserva.id)}
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
                </Grid>
            </Container>
        </Box>
    );
}