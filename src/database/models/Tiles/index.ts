import { Schema, Document } from 'mongoose';

const tilesSchema = new Schema({
  cols: {
    type: Number,
    required: true
  },
  img: {
    type: String
  },
  video: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  names: {
    type: Schema.Types.Mixed,
    required: true
  },
  descriptions: {
    type: Schema.Types.Mixed,
    required: true
  }
});

export interface ITiles extends Document {
  cols: number;
  img: string;
  video: string;
  position: number;
  names: {
    enUs: string;
    ptBr: string;
  };
  descriptions: {
    enUs: string;
    ptBr: string;
  };
}

export default tilesSchema;