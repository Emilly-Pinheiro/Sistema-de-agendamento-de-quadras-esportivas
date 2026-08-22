import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import axios from "axios";

export function NovaQuadra() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: "",
        modalidade: "",
        localizacao: ""
    });

    const [erro, setErro] = useState("");

    const handleSubmit = async () => {
        try {
            setErro("");
            await axios.post("http://localhost:3000/quadras", form);
            navigate("/quadras");
        } catch (error) {
            setErro(error.response?.data?.erro || "Erro ao salvar quadra");
            console.error("Erro ao salvar quadra", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 4 }}>
            <Header />

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 5 }}>
                    Cadastrar Quadra
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

                    <TextField
                        placeholder="Nome da quadra"
                        fullWidth
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />

                    <TextField
                        placeholder="Modalidade"
                        fullWidth
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        value={form.modalidade}
                        onChange={(e) => setForm({ ...form, modalidade: e.target.value })}
                    />

                    <TextField
                        placeholder="Localização"
                        fullWidth
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        value={form.localizacao}
                        onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
                    />

                    {erro && (
                        <Typography sx={{ color: '#c62828', fontWeight: 'bold' }}>
                            {erro}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, px: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/quadras")}
                            sx={{ backgroundColor: '#5D2D6F', borderRadius: 50, px: 5, textTransform: 'none', '&:hover': { backgroundColor: '#4a148c' } }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ backgroundColor: '#5D2D6F', borderRadius: 50, px: 5, textTransform: 'none', '&:hover': { backgroundColor: '#4a148c' } }}
                        >
                            Cadastrar
                        </Button>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}
