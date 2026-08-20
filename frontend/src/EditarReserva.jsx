import { Box, Button, Container, MenuItem, Select, TextField, Typography, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./components/Header";
import axios from "axios";

export function EditarReserva() {
    const navigate = useNavigate();
    
    const { id } = useParams(); 

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

                const resReserva = await axios.get(`http://localhost:3000/reservas/${id}`);
                const reserva = resReserva.data;

                const dataFormatada = reserva.data.split('T')[0];
                const horarioInicio = new Date(reserva.horario_inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const horarioFim = new Date(reserva.horario_fim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

                setForm({
                    quadra_id: reserva.quadra_id,
                    jogador_id: reserva.jogador_id,
                    data: dataFormatada,
                    horario_inicio: horarioInicio,
                    horario_fim: horarioFim
                });
            } catch (error) {
                console.error("Erro ao carregar a reserva", error);
            }
        };
        
        carregarDados();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const dadosParaEnviar = {
                quadra_id: form.quadra_id,
                jogador_id: form.jogador_id,
                data: new Date(`${form.data}T00:00:00`).toISOString(),
                horario_inicio: new Date(`${form.data}T${form.horario_inicio}:00`).toISOString(),
                horario_fim: new Date(`${form.data}T${form.horario_fim}:00`).toISOString()
            };

            await axios.put(`http://localhost:3000/reservas/${id}`, dadosParaEnviar);
            navigate("/"); 
        } catch (error) {
            console.error("Erro ao editar reserva", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 4 }}>
            <Header />

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 5 }}> 
                    Editar Reserva 
                </Typography>

                <Box sx={{ backgroundColor: '#a38ca8', borderRadius: 3, p: 5, maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

                    <FormControl fullWidth sx={{ backgroundColor: '#cfc9ce', borderRadius: 1 }}>
                        <Select displayEmpty value={form.quadra_id} disabled>
                            <MenuItem value="" disabled>Selecione uma Quadra</MenuItem>
                            {quadras.map((quadra) => (
                                <MenuItem key={quadra.id} value={quadra.id}>
                                    {quadra.nome} 
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ backgroundColor: '#cfc9ce', borderRadius: 1 }}>
                        <Select displayEmpty value={form.jogador_id} disabled>
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
                            sx={{ backgroundColor: '#5e2a84', borderRadius: 50, px: 5, textTransform: 'none', '&:hover': { backgroundColor: '#4a148c' } }}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit}
                            sx={{ backgroundColor: '#5e2a84', borderRadius: 50, px: 5, textTransform: 'none', '&:hover': { backgroundColor: '#4a148c' } }}
                        >
                            Salvar Alterações
                        </Button>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}