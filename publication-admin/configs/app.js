'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js'; 
import { dbConnection } from './db.configuration.js';

// Rutas para Posts y Comments
import postRoutes from '../src/posts/post.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';

const BASE_PATH = '/api/v1';

const routes = (app) => {
    // Rutas principales
    app.use(`${BASE_PATH}/posts`, postRoutes);
    app.use(`${BASE_PATH}/comments`, commentRoutes);

    // Healthcheck
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            status: 'Healthy',
            timeStamp: new Date().toISOString(),
            service: 'Posts & Comments API',
        });
    });

    // 404 para endpoints no encontrados
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Endpoint no encontrado',
        });
    });
}

const middlewares = (app) => {
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(helmet(helmetOptions));
    app.use(morgan('dev'));
}

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;
    app.set('trust proxy', 1);

    try {
        middlewares(app);
        await dbConnection();
        routes(app);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Health check available at: http://localhost:${PORT}${BASE_PATH}/health`);
        });
    } catch (err) {
        console.error(`Error al iniciar el servidor: ${err.message}`);
        process.exit(1);
    }
}