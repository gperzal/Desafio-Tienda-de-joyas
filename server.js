import express from 'express';
import joyasRoutes from './src/routes/joyasRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));



// Rutas para la API de joyas
app.use('/joyas', joyasRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default app;