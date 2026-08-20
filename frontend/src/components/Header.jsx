import { Box, Typography, IconButton } from "@mui/material";
import logo from "../assets/logo.png"; 
import PersonIcon from "@mui/icons-material/Person";

export function Header() {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 4,
            py: 2,
            borderTop: '2px solid #0288d1', 
            borderBottom: '2px solid #0288d1', 
            backgroundColor: 'white',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                
                <img 
                    src={logo} 
                    alt="Logo Curtesporte" 
                    style={{ width: 40, height: 40, objectFit: 'contain' }} 
                />
                
                <Typography variant="h6" fontWeight="bold" sx={{ 
                    display: 'inline-block', 
                    borderBottom: '4px solid #00acc1',
                    paddingBottom: '2px'
                }}>
                    Curtesporte - Sistema De Reserva De Quadras
                </Typography>
            </Box>
            
            <IconButton>
                <PersonIcon sx={{ color: 'black', fontSize: 32 }} />
            </IconButton>
        </Box>
    );
}