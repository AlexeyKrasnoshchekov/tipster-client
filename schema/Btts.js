import mongoose from 'mongoose';
const { Schema } = mongoose;

const bttsSchema = new Schema(
  {
    source: { type: String, required: true },
    action: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Btts =
  mongoose.models?.Btts || mongoose.model('Btts', bttsSchema);

export default Btts;





