const express = require('express');


const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
app.use(cors());

const jwt = require('jsonwebtoken');

app.get('/auth', async (req, res) => {

    // console.log(req.query.src.split('?')[0]);

    const embedPath = req.query.src.split('?')[0]; // Ruta del dashboard que se desea firmar

    if (!embedPath) {
        return res.status(400).json({ error: 'embed_path es requerido' });
    }

    const payload = {
        user: {
            external_user_id: '2', // Usuario único
            permissions: [
                "access_data",
                "clear_cache_refresh",
                "download_without_limit",
                "mobile_app_access",
                "schedule_look_emails",
                "see_drill_overlay",
                "see_lookml_dashboards",
                "see_looks",
                "see_user_dashboards",
            ],
            models: ['aira_project'],
            embed_url: embedPath, // Ruta del dashboard que se firmará
            session_length: 3600, // Duración de la sesión en segundos
        }

    };

    // Generar token firmado
    const token = jwt.sign(payload, "CAMBIAR POR LOOKER SECRET");

    // Construir la URL firmada
    const url = `https://beyondmediaagency.cloud.looker.com${embedPath}?access_token=${token}`;

    res.send({ url });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
