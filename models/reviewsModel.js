const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            minlength:[5,"Name should be at least 5 characters long"],
            maxLength:[30,"Name cannot exceed more than 29 character"]
        },
        emailAddress: {
            type: String,
            required: true,
            trim:true,
            validate:{
                validator:(email)=> /^[^\s@]+@[^\s@]+\.[^\s@]+/
                .test(String(email).toLowerCase()),
                message:"Please enter a valid Email Address"
                }
        },
        phoneNumber: {
            type: String,
            required: true,
            trim:true,
            // validate:{
            //     validator:(phoneNo)=>{
            //         const regex=/^[1-9]\d{10}$/;
            //         return (regex.test(phoneNo));},
            //         message:'Phone number must contain exactly 10 digits'
            // }
        },
        location: {
            type: String,
            required: true,
            maxLength: [100]
        },
        touristCenterVisited: {
            type: String,
            required: true,
            // maxLength: [80]
        },
        review: {
            type: String,
            required: true,
            maxLength: [400]
        }
    },
    { timestamps : true} // adds createdAt and updatedAt fields to the schema
);

const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = Reviews