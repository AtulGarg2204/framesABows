const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  priceRange: {
    min: {
      type: Number,
      required: [true, 'Minimum price is required'],
      min: 0
    },
    max: {
      type: Number,
      required: [true, 'Maximum price is required'],
      min: 0
    }
  },
  images: [{
    type: String, // Base64 encoded image strings
    trim: true
  }],
  whatsappUrl: {
    type: String,
    required: [true, 'WhatsApp URL is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Validate that max price is greater than or equal to min price
productSchema.pre('validate', function(next) {
  if (this.priceRange.max < this.priceRange.min) {
    this.invalidate('priceRange.max', 'Maximum price must be greater than or equal to minimum price');
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;