import pizza from "../assets/pizza-image2.jpeg";
import spaghettiBolognese from "../assets/bolognese-spaghetti.jpeg";
import classicBurger from "../assets/classic-burger.jpeg";
import caeserSalad from "../assets/Caeser-Salad.jpeg";
import chickenTikka from "../assets/chicken-tikka-masala.jpeg";
import vegSushiRoll from "../assets/veg-sushi-roll.jpeg";
import hamSandwich from "../assets/ham-sandwich.jpeg";
import mushroomRisotto from "../assets/Mushroom-Risotto.jpeg";
import chocolateBrownieSundae from "../assets/Chocolate-Brownie-Sundae.jpeg";
import greekGyroWrap from "../assets/Greek-Gyro-Wrap.jpg";


export const foods = [
    {id: 1, foodName: 'Margherita Pizza', image: pizza, foodPrice: 12.99, restaurant: "Nepolitan", category: ["Italian", "Pizza"], rating: 4.5 },
    {id: 2, foodName: 'Classic Burger', image: classicBurger, foodPrice: 8.49, restaurant: "Beefer Club", category: ["American", "Burger"], rating: 5 },
    {id: 3, foodName: 'Spaghetti Bolognese', image: spaghettiBolognese, foodPrice: 10.99, restaurant: "Nepolitan", category: [ "Italian", "Pasta"], rating: 4 },
    {id: 4, foodName: 'Caesar Salad', image: caeserSalad, foodPrice: 6.99, restaurant: "Deep Cafe", category: ["Salads"], rating: 2.5 },
    {id: 5, foodName: 'Chicken Tikka Masala', image: chickenTikka, foodPrice: 14.99, restaurant: "Vegasa", category: [ "North Indian", "Indian"], rating: 4 },
    {id: 6, foodName: 'Vegetarian Sushi Roll', image: vegSushiRoll, foodPrice: 9.99, restaurant: "Vegan Cafe", category: ["Japanese", "Sushi"], rating: 3 },
    {id: 7, foodName: 'Ham Sandwich', image: hamSandwich, foodPrice: 11.49, restaurant: "Cafeteria", category: ["American", "Sandwich"], rating: 3.5 },
    {id: 8, foodName: 'Mushroom Risotto', image: mushroomRisotto, foodPrice: 12.99, restaurant: "Nepolitan", category: ["Italian", "Pasta"], rating: 4 },
    {id: 9, foodName: 'Chocolate Brownie Sundae', image: chocolateBrownieSundae, foodPrice: 7.99, restaurant: "Starbucks", category: ["Dessert"], rating: 5 },
    {id: 10, foodName: 'Greek Gyro Wrap', image: greekGyroWrap, foodPrice: 10.49, restaurant: "Cafeteria", category: ["American", "Burrito"], rating: 2.5 },
  ];
  