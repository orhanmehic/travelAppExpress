const Travel = require('../models/Travel');
const Booking = require('../models/Booking')

const travelController = {
    getAllTravels: async (req,res)=> {
        try {
            const travels = await Travel.find({});
            res.json(travels);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
    getActiveTravels: async (req,res) =>{
        try{
            const today = new Date();
            const activeTravels = await Travel.find({startDate:{$gt:today}});
            res.json(activeTravels)
        }catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
    getMyTravels: async (req,res) => {
        try{
            const { userId } = req.params;
            const today = new Date();

            // Find bookings for the user
            const userBookings = await Booking.find({ user:userId }).populate('travel');

            // Filter out the travels from bookings that have ended
            const endedTravels = userBookings
                .filter(booking => {
                    const travel = booking.travel;
                    return travel.returnDate && travel.returnDate < today;
                })
                .map(booking => booking.travelId);

            if (endedTravels.length === 0) {
                return res.json({ error: 'No ended travels found' });
            }

            res.json(endedTravels);
        }catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
    getTravelById: async(req,res) =>{
        try{
            const {travelId} = req.params;
            console.log(travelId);
            const travel = await Travel.findOne({_id:travelId});
            res.json(travel);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
    travelSignUp: async(req,res) =>{
        try {
            const {travelId} = req.params;
            const {userId} = req.body;
            if (!travelId || !userId) {
                res.status(400).json({error: 'Internal server error'});
            }
            const newBooking = new Booking({
                user: userId,
                travel: travelId,
                bookingDate: Date.now()
            })
            const savedBooking = await newBooking.save();
            return res.status(200).json({savedBooking});
        }catch (error) {
            console.log(error);
            res.status(400).json({error: 'Internal server error'});
        }
    },
    checkSignUp: async(req,res)=>{
        try {
            const { travelId } = req.params;
            const bookings = await Booking.find({ travel: travelId });
            const signedUpUsers = bookings.map(booking => booking.user);
            res.json(signedUpUsers);
        } catch (error) {
            console.error("Error fetching signed-up users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    addTravel: async (req,res)=>{
        try {
            const { destination, startDate, returnDate, description } = req.body;
            const newTravel = new Travel({
                destination,
                startDate,
                returnDate,
                description
            });
            const savedTravel = await newTravel.save();
            res.status(201).json(savedTravel);
        } catch (error) {
            console.error('Error creating travel:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteTravel: async(req,res)=>{
        try {
            const { travelId } = req.params;
            await Travel.findByIdAndDelete(travelId);
            res.json({ message: 'Travel deleted successfully' });
        } catch (error) {
            console.error('Error deleting travel:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
module.exports=travelController;
