import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import 'reflect-metadata';
import * as swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';
import * as WebSocket from 'ws';
import routes from './routes';
// Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    const swaggerJsdoc = require('swagger-jsdoc');

    const options = {
      apis: ['./routes/**/*.js'],
      swaggerDefinition: {
        info: {
          description: 'Test Express API with autogenerated swagger doc',
          title: 'Test API',
          version: '1.0.0',
        },
      },
    };

    const specs = swaggerJsdoc(options);

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
    // Set all routes from routes folder
    app.use('/', routes);

    const server = http.createServer(app);

    // initialize the WebSocket server instance
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws: WebSocket) => {
      // connection is up, let's add a simple simple event
      ws.on('message', (message: string) => {
        // log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
      });

      // send immediatly a feedback to the incoming connection
      ws.send('Hi there, I am a WebSocket server');
    });

    // start our server
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server started on port ${server.address().port} :)`);
    });
  })
  .catch(error => console.log(error));
