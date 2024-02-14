const User = require('../models/User');
const bcrypt = require('bcrypt');


const userController = {
    authenticateUser: async (req,res) => {
        try{
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            const result = bcrypt.compareSync(password,user.password);
            console.log(result);
            if(!result){
                return res.status(401).json({ error: 'Invalid username or password' });
            }else{
                console.log("logged");
                return res.status(200).json({ message: 'Authentication successful' , userId: user._id, role:user.role});
            }
        }catch (error) {
            console.error('Authentication error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    registerUser: async(req,res) =>{
        try {
            // Extract user data from the request body
            const { username, email, password } = req.body;
            // Check if the username or email already exists in the database
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user object with hashed password
            const newUser = new User({
                username:username,
                email:email,
                password: hashedPassword
            });

            // Save the new user to the database
            const savedUser = await newUser.save();

            // Respond with a success message and the saved user data
            res.status(200).json({ message: 'User registered successfully', user: savedUser });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    activateDeactivateUser:async(req,res)=>{
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            user.isActive = !user.isActive;
            await user.save();
            res.status(200).json({ message: 'User activity status updated successfully' });
        } catch (error) {
            console.error('Error updating user activity status:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    },
    getAllUsers: async (req,res)=>{
        try {
            const users = await User.find({ role: 'user' });
            res.status(200).json(users);
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    addUser: async (req, res) => {
        try {
            // Extract user data from the request body
            const { username, email, password } = req.body;

            const hashedPw =await bcrypt.hash(password,10);

            // Create a new user object
            const newUser = new User({
                username,
                email,
                password: hashedPw,
                role: 'user',
                isActive: true
            });

            // Save the new user to the database
            const savedUser = await newUser.save();

            // Respond with a success message and the saved user data
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


module.exports = userController;