import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./components/Header";
import axios from "axios";

export function EditarQuadra() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        nome: "",
        modalidade: "",
        localizacao: ""
    });

    const [erro, setErro] = useState("");

    useEffect(() => {
        const carregarQuadra = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/quadras/${id}`);
                setForm({
                    nome: response.data.nome,
                    modalidade: response.data.modalidade,
                    localizacao: response.data.localizacao
                });
            } catch (error) {
                console.error("Erro ao carregar a quadra", error);
            }
        };

        carregarQuadra();
    }, [id]);

    const handleSubmit = async () => {
        try {
            setErro("");
            await axios.put(`http://localhost:3000/quadras/${id}`, form);
            navigate("/quadras");
        } catch (error) {
            setErro(error.response?.data?.erro || "Erro ao salvar alterações");
            console.error("Erro ao editar quadra", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 4 }}>
            <Header />

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 5 }}>
                    Editar Quadra
                </Typography>

                <Box sx={{ backgroundColor: '#a38ca8', borderRadius: 3, p: 5, maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

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
