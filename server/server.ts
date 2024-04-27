import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import formRoutes from './formRoutes';
import formFillRoutes from './formFillRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

const MONGODB_URI = 'mongodb+srv://YeshwA:L0R0doUUqK3FJUxW@todolist.aaceqzp.mongodb.net/';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error: any) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/', formRoutes);
app.use('/', formFillRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});