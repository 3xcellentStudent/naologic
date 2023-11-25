import mongoose, {Schema} from 'mongoose'

const productSchema = new Schema({
  SiteSource: String,
  ItemID: Number,
  ManufacturerID: Number,
  ManufacturerCode: Number,
  ManufacturerName: String,
  ProductID: Number,
  ProductName: String,
  ProductDescription: String,
  ManufacturerItemCode: String,
  ItemDescription: String,
  ImageFileName: String,
  ItemImageURL: String,
  NDCItemCode: String,
  PKG: String,
  UnitPrice: Number,
  QuantityOnHand: Number,
  PriceDescription: String,
  Availability: String,
  PrimaryCategoryID: Number,
  PrimaryCategoryName: String,
  SecondaryCategoryID: Number,
  SecondaryCategoryName: String,
  CategoryID: Number,
  CategoryName: String,
  IsRX: String,
  IsTBD: String,
})

const Product = mongoose.model('Product', productSchema)

export default Product