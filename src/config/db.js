import mongoose from 'mongoose';

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected:');
    } catch (error) {
        console.error('connection error:', error);
    }
}
