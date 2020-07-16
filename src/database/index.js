import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
    this.connection = {};
  }

  async mongo() {
    this.connection = await mongoose.connect(
      process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI_PRODUCTION
        : process.env.MONGO_URI_DEVELOPMENT,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    if (this.connection) {
      console.log('MONGO => OK');
    }
  }
}

export default new Database();
