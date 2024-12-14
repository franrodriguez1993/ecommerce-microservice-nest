import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ProductDocument = Product & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ default: 0 })
  price: number;
  @Prop({ default: null })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
