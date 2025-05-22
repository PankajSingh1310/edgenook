const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  avatar: {
    type: String, 
  },
  
  title: {
    type: String,
    required: true,
    trim: true
  },
<<<<<<< HEAD
=======

  description: {
    type: String,  // Clear description of what's included
    required: true,
  },

>>>>>>> 460addc35ae1239e90f4e745c568730664fc198f
  modules: [
    {
      title: String,  // Module title, e.g. "Introduction", "Advanced Topics"
      content: String // Description or summary of the module
    }
  ],

  duration: String,  // e.g. "3 weeks", "1 month"

  studentsGet: {
    description: String,   // Explanation of what students get
    samples: [String]      // URLs or file paths to sample files/previews (PDF, images, etc.)
  },

  users:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
