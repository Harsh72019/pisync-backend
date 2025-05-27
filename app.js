const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const syncRoutes = require("./routes/sync.route");
const startWorker = require("./workers/syncWorker"); 
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const syncQueue = require('./queues/syncQueue');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const errorHandler = require('./middlewares/errorHandler');



const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());

createBullBoard({
    queues: [new BullMQAdapter(syncQueue)],
  serverAdapter: serverAdapter,
});



require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
startWorker(); 
// Just checking the health
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'PiSync backend is running',
    timestamp: new Date().toISOString()
  });
});
app.use("/api", syncRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);
module.exports = app;
