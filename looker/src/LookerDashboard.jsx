import React, { useEffect, useRef } from 'react';
import { LookerEmbedSDK } from '@looker/embed-sdk';

const LookerDashboard = ({ dashboardId, embedUrl, accessToken }) => {
  const embedContainer = useRef(null);

  useEffect(() => {
    // Configurar Looker Embed SDK
    LookerEmbedSDK.init('https://beyondmediaagency.cloud.looker.com', `http://localhost:3000/auth`); // Cambia la URL por la de tu instancia Looker

    const embedDashboard = async () => {
      if (embedContainer.current) {
        LookerEmbedSDK.createDashboardWithId(dashboardId)
          .withNext() // Usa la experiencia "Next" si está habilitada
          .withParams({
            embed_domain: window.location.origin, // Dominios permitidos
            // Otros parámetros opcionales como filtros predeterminados
          })
          .appendTo(embedContainer.current) // Contenedor para insertar
          .on('dashboard:loaded', () => {
            console.log('Dashboard cargado');
          })
          .on('dashboard:run:start', () => {
            console.log('Dashboard ejecutándose');
          })
          .on('dashboard:run:complete', () => {
            console.log('Ejecución completa');
          })
          .build()
          .connect()
          .then((dashboard) => dashboard.send('dashboard:run'))
          .catch((error) => {
            console.error('Error al cargar el dashboard:', error);
          });
      }
    };

    embedDashboard();

    return () => {
      // Limpiar si es necesario
      if (embedContainer.current) {
        embedContainer.current.innerHTML = '';
      }
    };
  }, [dashboardId]);

  return <div ref={embedContainer} style={{ width: '100%', height: '100%' }} />;
};

export default LookerDashboard;
