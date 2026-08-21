import { Box, Button, Container, MenuItem, Select, TextField, Typography, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import axios from "axios";

export function NovaReserva() {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        quadra_id: "",
        jogador_id: "",
        data: "",
        horario_inicio: "",
        horario_fim: ""
    });

    const [quadras, setQuadras] = useState([]);
    const [jogadores, setJogadores] = useState([]);

    const horariosDisponiveis = [
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
        "18:00", "19:00", "20:00", "21:00", "22:00"
    ];

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const resQuadras = await axios.get("http://localhost:3000/quadras");
                const resJogadores = await axios.get("http://localhost:3000/jogadores");
                
                setQuadras(resQuadras.data);
                setJogadores(resJogadores.data);
            } catch (error) {
                console.error("Erro ao carregar dados", error);
            }
        };
        
        carregarDados();
    }, []);

    const handleSubmit = async () => {
        try {
            const dadosParaEnviar = {
                quadra_id: form.quadra_id,
                jogador_id: form.jogador_id,
                data: new Date(`${form.data}T00:00:00`).toISOString(),
                horario_inicio: new Date(`${form.data}T${form.horario_inicio}:00`).toISOString(),
                horario_fim: new Date(`${form.data}T${form.horario_fim}:00`).toISOString()
            };

            await axios.post("http://localhost:3000/reservas", dadosParaEnviar);
            navigate("/");
        } catch (error) {
            console.error("Erro ao salvar reserva", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 4 }}>
            <Header />

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 5 }}> 
                    Criar Reserva 
                </Typography>

                <Box sx={{ 
                    backgroundColor: '#a38ca8', 
                    borderRadius: 3, 
                    p: 5, 
                    maxWidth: 600, 
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}>
                    
                    <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                        <Select
                            displayEmpty
                            value={form.quadra_id}
                            onChange={(e) => setForm({...form, quadra_id: e.target.value})}
                        >
                            <MenuItem value="" disabled>Selecione uma Quadra</MenuItem>
                            {quadras.map((quadra) => (
                                <MenuItem key={quadra.id} value={quadra.id}>
                                    {quadra.nome} 
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                        <Select
                            displayEmpty
                            value={form.jogador_id}
                            onChange={(e) => setForm({...form, jogador_id: e.target.value})}
                        >
                            <MenuItem value="" disabled>Jogador responsável</MenuItem>
                            {jogadores.map((jogador) => (
                                <MenuItem key={jogador.id} value={jogador.id}>
                                    {jogador.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <TextField 
                            type="date" 
                            size="small"
                            sx={{ backgroundColor: 'white', borderRadius: 1, flexGrow: 1 }}
                            value={form.data}
                            onChange={(e) => setForm({...form, data: e.target.value})}
                        />
                        
                        <Typography sx={{ color: '#333' }}>Entrada:</Typography>
                        <Select 
                            size="small" 
                            displayEmpty 
                            value={form.horario_inicio}
                            sx={{ backgroundColor: 'white', borderRadius: 1, minWidth: 100 }}
                            onChange={(e) => setForm({...form, horario_inicio: e.target.value})}
                        >
                            <MenuItem value="" disabled>00:00 h</MenuItem>
                            {horariosDisponiveis.map(hora => (
                                <MenuItem key={hora} value={hora}>{hora} h</MenuItem>
                            ))}
                        </Select>

                        <Typography sx={{ color: '#333' }}>Saída:</Typography>
                        <Select 
                            size="small" 
                            displayEmpty 
                            value={form.horario_fim}
                            sx={{ backgroundColor: 'white', borderRadius: 1, minWidth: 100 }}
                            onChange={(e) => setForm({...form, horario_fim: e.target.value})}
                        >
                            <MenuItem value="" disabled>00:00 h</MenuItem>
                            {horariosDisponiveis.map(hora => (
                                <MenuItem key={hora} value={hora}>{hora} h</MenuItem>
                            ))}
                        </Select>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, px: 2 }}>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate("/")}
                            sx={{ backgroundColor: '#5D2D6F', borderRadius: 50, px: 5, textTransform: 'none', '&:hover': { backgroundColor: '#4a148c' } }}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit}
                            sx={{ backgroundColor: '#5D2D6F', borderRadius: 50, px: 5, textTransform: 'none', '&:hover': { backgroundColor: '#4a148c' } }}
                        >
                            Reservar
                        </Button>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}