// @ts-nocheck
require("dotenv").config();
require("../start/db")();
require("colors");

import users from "./users";
import products from "./products";

import Order from "../models/order";
import Product from "../models/product";
import User from "../models/user";

const importData = async () => {
  try {
    // await Order.deleteMany();
    // await Product.deleteMany();
    // await User.deleteMany();

    // Insert new users into the database
    const createdUsers = await User.insertMany(users);

    // Get the ID of the first created user, assumed to be the admin
    const adminUserId = createdUsers[0]._id;

    // Assign admin user ID to each product and create sample products
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUserId,
    }));

    // Insert sample products into the database
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Order.deleteMany();
    // await Product.deleteMany();
    // await User.deleteMany();

    console.log("Data Destroyed!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

// Check command-line arguments to determine which function to run
const command = process.argv[2];
if (command === "-i") importData();
if (command === "-d") destroyData();
