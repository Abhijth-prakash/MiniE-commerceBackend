# UrbanNest Backend

UrbanNest Backend is a RESTful API built with Node.js, Express.js, and MongoDB. It powers the UrbanNest e-commerce platform by handling authentication, product management, cart operations, pagination, filtering, image uploads, and secure API communication.

## Features

### Authentication & Authorization

- User Registration
- User Login & Logout
- JWT Authentication
- HTTP-Only Cookie Based Authentication
- Protected Routes
- Role-Based Authorization (User/Admin)

### Product Management

- Add Products
- Edit Products
- Delete Products
- Get Product Details
- Product Search
- Product Filtering
- Product Sorting
- Product Pagination
- Product Ratings

### Cart Management

- Add to Cart
- Update Cart Quantity
- Remove from Cart
- Get User Cart

### Image Handling

- Cloudinary Image Upload
- Image Storage and Optimization

### Database Management

- MongoDB Atlas Integration
- Mongoose ODM
- Schema Validation
- Relationships using Populate

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Cloudinary
- Multer
- Cookie Parser
- CORS
- dotenv



### JWT Authentication

The backend uses JSON Web Tokens stored in HTTP-only cookies to provide secure authentication and protect sensitive routes.

### Password Security

User passwords are hashed using bcrypt before being stored in the database.

### Role-Based Access Control

Admin-only routes are protected through middleware to ensure that only authorized users can perform product management operations.

### Product Search

MongoDB Regular Expressions are used to perform case-insensitive product searches.

```javascript
if (search) {
  query.name = { $regex: search, $options: "i" };
}
```

### Pagination

Pagination is implemented to efficiently handle large product collections and improve API performance.

### Filtering & Sorting

Products can be filtered and sorted dynamically through query parameters.

### Mongoose Populate

Populate is used to fetch related data across collections, similar to SQL joins.

### Cloudinary Integration

Product images are uploaded and managed through Cloudinary for efficient storage and delivery.

### Error Handling

Centralized error handling is implemented to provide consistent API responses and prevent application crashes.

## Security Features

- JWT Authentication
- HTTP-Only Cookies
- Password Hashing with bcrypt
- Protected Routes
- Role-Based Authorization
- Environment Variables
- CORS Configuration

## Database Models

### User

- Username
- Email
- Password
- Role

### Product

- Name
- Description
- Price
- Category
- Rating
- Image

### Cart

- User Reference
- Product Reference
- Quantity

## Future Improvements

- Order Management
- Payment Gateway Integration
- Wishlist API
- Product Reviews API
- Order History
- Email Notifications
- Inventory Management
