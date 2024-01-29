import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISearch extends Document {
  url: string;
  userId: string;
}

const searchSchema = new Schema({
  url: { type: String, required: true },
  userId: { type: String, required: true },
  searchKeywords:{ type: [String] }
},{ timestamps: true });

const Search: Model<ISearch> = mongoose.model<ISearch>('Search', searchSchema);

export default Search;
