from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import hashlib
from models import db, User, Car, Booking, Payment, Feedback

app = Flask(__name__)
CORS(app)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

import os
basedir = os.path.abspath(os.path.dirname(__file__))

# Database Configuration
# Switched to SQLite to ensure it runs out-of-the-box without password issues
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'car_showroom.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# --- AUTH ROUTES ---

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Missing username or password"}), 400
        
    hashed_password = hash_password(data['password'])
    new_user = User(username=data['username'], password=hashed_password, role=data.get('role', 'user'))
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == hash_password(data['password']):
        return jsonify({
            "message": "Login successful",
            "user": {
                "user_id": user.user_id,
                "username": user.username,
                "role": user.role
            }
        }), 200
    return jsonify({"error": "Invalid credentials"}), 401

# --- CAR ROUTES ---

@app.route('/cars', methods=['GET'])
def get_cars():
    cars = Car.query.all()
    output = []
    for car in cars:
        output.append({
            "car_id": car.car_id,
            "brand": car.brand,
            "model": car.model,
            "year": car.year,
            "price": float(car.price),
            "availability": car.availability,
            "image_url": car.image_url
        })
    return jsonify(output)

@app.route('/cars', methods=['POST'])
def add_car():
    data = request.json
    new_car = Car(
        brand=data['brand'],
        model=data['model'],
        year=data['year'],
        price=data['price'],
        availability=data.get('availability', True),
        image_url=data.get('image_url', '')
    )
    db.session.add(new_car)
    db.session.commit()
    return jsonify({"message": "Car added successfully"}), 201

@app.route('/cars/<int:id>', methods=['PUT', 'DELETE'])
def manage_car(id):
    car = Car.query.get_or_404(id)
    if request.method == 'DELETE':
        db.session.delete(car)
        db.session.commit()
        return jsonify({"message": "Car deleted successfully"})
    
    data = request.json
    car.brand = data.get('brand', car.brand)
    car.model = data.get('model', car.model)
    car.year = data.get('year', car.year)
    car.price = data.get('price', car.price)
    car.availability = data.get('availability', car.availability)
    car.image_url = data.get('image_url', car.image_url)
    db.session.commit()
    return jsonify({"message": "Car updated successfully"})

# --- BOOKING ROUTES ---

@app.route('/book', methods=['POST'])
def book_car():
    data = request.json
    new_booking = Booking(
        user_id=data['user_id'],
        car_id=data['car_id'],
        status='pending'
    )
    # Update car availability
    car = Car.query.get(data['car_id'])
    if car:
        car.availability = False
        
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({
        "message": "Booking successful",
        "booking_id": new_booking.booking_id
    }), 201

@app.route('/bookings', methods=['GET'])
def get_bookings():
    bookings = db.session.query(Booking, User, Car).join(User).join(Car).all()
    output = []
    for b, u, c in bookings:
        output.append({
            "booking_id": b.booking_id,
            "username": u.username,
            "car": f"{c.brand} {c.model}",
            "date": b.booking_date.strftime("%Y-%m-%d %H:%M:%S"),
            "status": b.status,
            "image_url": c.image_url,
            "price": float(c.price)
        })
    return jsonify(output)

@app.route('/my-bookings/<int:user_id>', methods=['GET'])
def get_user_bookings(user_id):
    bookings = db.session.query(Booking, Car).join(Car).filter(Booking.user_id == user_id).all()
    output = []
    for b, c in bookings:
        output.append({
            "booking_id": b.booking_id,
            "car_name": f"{c.brand} {c.model}",
            "date": b.booking_date.strftime("%Y-%m-%d %H:%M:%S"),
            "status": b.status,
            "image_url": c.image_url,
            "price": float(c.price)
        })
    return jsonify(output)

@app.route('/bookings/<int:booking_id>/cancel', methods=['PUT'])
def cancel_booking(booking_id):
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({"error": "Booking not found"}), 404
        
    booking.status = 'cancelled'
    
    # Make car available again
    car = Car.query.get(booking.car_id)
    if car:
        car.availability = True
        
    db.session.commit()
    return jsonify({"message": "Booking cancelled successfully"})

# --- PAYMENT ROUTES ---

@app.route('/payment', methods=['POST'])
def process_payment():
    data = request.json
    new_payment = Payment(
        booking_id=data['booking_id'],
        amount=data['amount'],
        method=data['method']
    )
    # Update booking status
    booking = Booking.query.get(data['booking_id'])
    if booking:
        booking.status = 'confirmed'
        
    db.session.add(new_payment)
    db.session.commit()
    return jsonify({"message": "Payment successful"}), 201

@app.route('/payments', methods=['GET'])
def get_payments():
    payments = db.session.query(Payment, Booking).join(Booking).all()
    output = []
    for p, b in payments:
        output.append({
            "payment_id": p.payment_id,
            "booking_id": p.booking_id,
            "amount": float(p.amount),
            "method": p.method,
            "date": p.payment_date.strftime("%Y-%m-%d %H:%M:%S")
        })
    return jsonify(output)

# --- FEEDBACK ROUTES ---

@app.route('/feedback', methods=['POST'])
def add_feedback():
    data = request.json
    new_feedback = Feedback(
        user_id=data['user_id'],
        text=data['text']
    )
    db.session.add(new_feedback)
    db.session.commit()
    return jsonify({"message": "Feedback submitted"}), 201

@app.route('/feedback', methods=['GET'])
def get_feedback():
    feedbacks = db.session.query(Feedback, User).join(User).all()
    output = []
    for f, u in feedbacks:
        output.append({
            "username": u.username,
            "text": f.text,
            "date": f.date.strftime("%Y-%m-%d %H:%M:%S")
        })
    return jsonify(output)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
