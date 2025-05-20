require('dotenv').config();
const mongoose = require('mongoose');
const adminModel = require('../models/admin.model');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = process.env.DEFAULT_ADMIN_EMAIL;
        const password = process.env.DEFAULT_ADMIN_PASSWORD;
        const name = process.env.DEFAULT_ADMIN_NAME;

        const existingAdmin = await adminModel.findOne({ email });

        if(existingAdmin) {
            console.log('Admin already exists');
            return;
        }
        const hashedPassword = await adminModel.hashpassword(password);
        const admin = new adminModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: 'admin',
            users : []
          });
          await admin.save();
          console.log('🎉 Default admin created:', email);

    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
    } finally{
        mongoose.disconnect()
    }
}

createAdmin();