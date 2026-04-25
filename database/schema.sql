CREATE DATABASE IF NOT EXISTS car_showroom_db;
USE car_showroom_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
    car_id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    availability BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(500)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    car_id INT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(car_id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    method ENUM('UPI', 'Card', 'Cash') NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    text TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insert Sample Data
INSERT INTO users (username, password, role) VALUES 
('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin'), -- password: admin
('user1', '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb', 'user'); -- password: user123

INSERT INTO cars (brand, model, year, price, availability, image_url) VALUES 
('Tesla', 'Model S', 2023, 89990.00, TRUE, 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000'),
('BMW', 'M4 Competition', 2024, 78100.00, TRUE, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000'),
('Audi', 'R8 V10', 2023, 158600.00, TRUE, 'https://images.unsplash.com/photo-1603584173870-7f30df455c6d?auto=format&fit=crop&q=80&w=1000'),
('Porsche', '911 Carrera', 2024, 114400.00, TRUE, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000'),
('Mercedes-Benz', 'G-Wagon', 2023, 139900.00, TRUE, 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000'),
('Lamborghini', 'Huracan Evo', 2023, 208500.00, TRUE, 'https://images.unsplash.com/photo-1544636331-e268592033c2?auto=format&fit=crop&q=80&w=1000'),
('Ferrari', 'F8 Tributo', 2024, 280000.00, TRUE, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000'),
('Rolls-Royce', 'Ghost', 2023, 311000.00, TRUE, 'https://images.unsplash.com/photo-1631214503951-3751003f9e60?auto=format&fit=crop&q=80&w=1000'),
('Aston Martin', 'Vantage', 2024, 143900.00, TRUE, 'https://images.unsplash.com/photo-1603584173870-7f30df455c6d?auto=format&fit=crop&q=80&w=1000'),
('McLaren', '720S', 2023, 299000.00, TRUE, 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000');
