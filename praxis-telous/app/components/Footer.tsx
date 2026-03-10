'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/surrealisticrabbit/Praxis-Telous">
            Ducky
          </Link>{' '}
          {new Date().getFullYear()}
          {''}
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Licensed under the MIT License.
        </Typography>
      </Container>
    </Box>
  );
}