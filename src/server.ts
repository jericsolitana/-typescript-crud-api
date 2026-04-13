import 'rootpath';
import express, { Application } from 'express';
import cors from 'cors';
import { initialize } from './_helpers/db';
import { errorHandler } from './_middleware/errorHandlers';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
// We use require here to match the specific structure in your instruction image
app.use('/users', require('./users/users.controller').default);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) || 80) : 4000;

initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to initialize database:', err);
        process.exit(1);
    });