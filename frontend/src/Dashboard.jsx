import { Box, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";

export function Dashboard() {
    const navigate = useNavigate();

    const cardStyle = {
        backgroundColor: '#5e2a84',
        color: 'white',
        width: 240,
        height: 240,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        boxShadow: '0px 10px 25px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 15px 35px rgba(0,0,0,0.3)',
        }
    };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Header />

            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                mt: 12,
                px: 2
            }}>
                
                <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif', mb: 8, textAlign: 'center' }}>
                    O que deseja fazer agora?
                </Typography>

                <Box sx={{ 
                    display: 'flex', 
                    gap: 6, 
                    flexWrap: 'wrap', 
                    justifyContent: 'center' 
                }}>
                    
                    <Box sx={cardStyle} onClick={() => navigate('/reservas')}>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 70 }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'serif', textAlign: 'center' }}>
                            Gerenciar Reservas
                        </Typography>
                    </Box>

                    <Box sx={cardStyle} onClick={() => navigate('/quadras')}>
                        <HomeOutlinedIcon sx={{ fontSize: 70 }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'serif', textAlign: 'center' }}>
                            Gerenciar Quadras
                        </Typography>
                    </Box>

                    <Box sx={cardStyle} onClick={() => navigate('/jogadores')}>
                        <EmojiPeopleOutlinedIcon sx={{ fontSize: 70 }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'serif', textAlign: 'center' }}>
                            Gerenciar Jogadores
                        </Typography>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}