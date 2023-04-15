const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, default: 0.0 },
    image: { type: [String], required: true },
    category: { type: String, required: true, enum: ["מוצרי חשמל", "סלולרי", "ריהוט", "עסקים למכירה/מסירה", "מזרונים", "ספורט", "לתינוק ולילד", "מחשבים וציוד נלווה", " ריהוט לגינה"] },
    residence: String, //מגורים
    advertiser: String, //מפרסם
    subcategory: String,
    manufacturer: String,
    type: String,
    status: {
      type: String,
      enum: ["עטוף באריזה", "כמו חדש", "משומש", "לא רלונטי"],
    },
    isActive: { type: Boolean, default: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);



module.exports = new mongoose.model("products", ProductSchema);
