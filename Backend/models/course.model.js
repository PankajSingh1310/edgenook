const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  plans: [
    {
      name: {       // Example: "₹499 Plan", "₹999 Plan"
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,  // Clear description of what's included
        required: true,
      },
      features: [String],  // List of features like certificate, offer letter, etc.
      enrollUrl: {
        type: String,  // Link or endpoint for enrolling
      }
    }
  ],
  modules: [
    {
      title: String,  // Module title, e.g. "Introduction", "Advanced Topics"
      content: String // Description or summary of the module
    }
  ],
  format: {
    type: String,  // e.g. 'self-paced', 'live', 'duration-based'
    required: true,
  },
  duration: String,  // e.g. "3 weeks", "1 month"
  studentsGet: {
    description: String,   // Explanation of what students get
    samples: [String]      // URLs or file paths to sample files/previews (PDF, images, etc.)
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
