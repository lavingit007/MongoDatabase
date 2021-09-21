// Create database
mongo
use shop;

// Create new collection named purchase_orders and insert the values
db.purchase_orders.insertMany(
     [
          {product: "toothbrush", total: 4.75, customer: "Mike"},
          {product: "guitar", total: 19.99, customer: "Tom"},
          {product: "guitar", total: 29.99, customer: "Mike"},
          {product: "milk", total: 11.33, customer: "Mike"},
          {product: "pizza", total: 8.50, customer: "Karen"},
          {product: "toothbrush", total: 4.75, customer: "Karen"},
          {product: "pizza", total: 4.75, customer: "Dave"},
          {product: "toothbrush", total: 4.75, customer: "Mike"},
          {product: "guitar", total: 24.99, customer: "Dave"},
     ]
);

// Count

// 1: Count the number of toothbrush in collection
db.purchase_orders.count({"product":"toothbrush"})

// Find all the orders by mike
db.purchase_orders.find({"customer":"mike"})

// count all orders by mike
db.purchase_orders.find({"customer":"mike"})

// Show only product and customer name in the results from purchase order
db.purchase_orders.find({},{_id: 0, customer: 1, product:1})

// Find the prducts which have price less than $10
db.purchase_orders.find({ "total":{$lt :10}},{_id: 0, product:1, total:1})

// Distinct

// 2. Find all customers without repeating (only uqnique users)
db.purchase_orders.distinct("customer")


// Aggregation 

// 3. Find the total amount of money spent by each customer
db.purchase_orders.aggregate(
  [
    // {} means it will match everything in the collection
    {$match: {} },
    // group will group the stuff together
    {$group: {_id: "$customer"}, final: {$sum:"$total" }}
  ]
)

db.purchase_orders.aggregate(
  [
    {$match: {} },
    {$group: {_id: "$customer", total: {$sum:"$total" }}}
  ]
);

// Find the total value of each product
db.purchase_orders.aggregate([
  {$match: {}},
  {$group:{_id: "$product" , total: { $sum: "$total" }}} 
])

// Find the total value of each product sorted by the total value
db.purchase_orders.aggregate([
  {$match: {}},
  {$group:{_id: "$product" , total: { $sum: "$total" }}},
  {$sort:{total:-1}}
])

// Find the total price of all gruitars
db.purchase_orders.aggregate([
  {$match: {"product": "guitar"}},
  {$group:{ _id: null, total: {$sum: "$total" }}}
])

// Find the total value of all products 
db.purchase_orders.aggregate([
  {$group: {_id: null, final_price:{ $sum: "$total"}}}
])
