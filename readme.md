# 🍽️ Food Sharing Website - Server  

The **server-side** backend for the 🌟 **Food Sharing Website** project. This backend handles authentication, food item management, and order tracking seamlessly.

---

## ✨ Features  
- 🔐 **Secure User Authentication**  
  Handle user registration and login securely using JWT.  

- 🍕 **Food Item Management**  
  Add, view, update, and delete food items effortlessly.  

- 📦 **Order Management**  
  Create, track, and manage orders for a smooth user experience.  

- 💾 **Database Integration**  
  Powered by **MongoDB** for dynamic and scalable data handling.

---

## 📚 API Endpoints  

### 👤 **User Routes**  
| Endpoint                | Method | Description                |
|-------------------------|--------|----------------------------|
| `/api/users/register`   | POST   | Register a new user        |
| `/api/users/login`      | POST   | Login existing user        |
| `/api/users/:id`        | GET    | Fetch user details         |

### 🍔 **Food Routes**  
| Endpoint                | Method | Description                |
|-------------------------|--------|----------------------------|
| `/api/foods`            | GET    | Fetch all food items       |
| `/api/foods`            | POST   | Add a new food item        |
| `/api/foods/:id`        | DELETE | Delete a food item         |

### 📋 **Order Routes**  
| Endpoint                | Method | Description                |
|-------------------------|--------|----------------------------|
| `/api/orders`           | POST   | Create a new order         |
| `/api/orders/:userId`   | GET    | Fetch user-specific orders |

---

## 🛠️ Technologies Used  
- 🟩 **Node.js** - For server-side JavaScript execution.  
- 🚀 **Express.js** - Backend framework for building REST APIs.  
- 🍃 **MongoDB** - Database for storing application data.  
- 🔐 **JWT Authentication** - For secure user sessions.  

---

## 🤝 Contributing  
We 💖 contributions! Feel free to fork the repository, open an issue, or submit a pull request.  

---

## 📜 License  
Licensed under the [MIT License](LICENSE).  

---
