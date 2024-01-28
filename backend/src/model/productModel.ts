import { Schema, Document, model, Types } from "mongoose";

interface Image {
  public_id: string;
  url: string;
}

interface Review {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  ratings: number;
  images: Image[];
  category: string;
  stock: number;
  numOfReviews: number;
  reviews: Review[];
  user: Types.ObjectId;
  createdAt: Date;
}

const productSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the product price"],
    max: [99999999, "Price cannot exceed 8 figures"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product stock"],
    max: [9999, "Stock cannot exceed 4 figures"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
},
{
    timestamps:true
});

const Product = model<ProductDocument>("Product", productSchema);

export default Product;
