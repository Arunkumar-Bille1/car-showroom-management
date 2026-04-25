from app import app, db
from models import User, Car
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

with app.app_context():
    db.create_all()

    # Check if data already exists
    if User.query.first() is None:
        # Insert Users
        admin = User(username='admin', password=hash_password('admin'), role='admin')
        user1 = User(username='user1', password=hash_password('user123'), role='user')
        db.session.add_all([admin, user1])

        # Insert Cars
        cars = [
            Car(brand='Tesla', model='Model S', year=2023, price=89990.00, availability=True, image_url='https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='BMW', model='M4 Competition', year=2024, price=78100.00, availability=True, image_url='https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='Audi', model='R8 V10', year=2023, price=158600.00, availability=True, image_url='https://images.unsplash.com/photo-1603584173870-7f30df455c6d?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='Porsche', model='911 Carrera', year=2024, price=114400.00, availability=True, image_url='https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='Mercedes-Benz', model='G-Wagon', year=2023, price=139900.00, availability=True, image_url='https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='Lamborghini', model='Huracan Evo', year=2023, price=208500.00, availability=True, image_url='https://images.unsplash.com/photo-1544636331-e268592033c2?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='Ferrari', model='F8 Tributo', year=2024, price=280000.00, availability=True, image_url='https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='Rolls-Royce', model='Ghost', year=2023, price=311000.00, availability=True, image_url='https://images.unsplash.com/photo-1631214503951-3751003f9e60?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='Aston Martin', model='Vantage', year=2024, price=143900.00, availability=True, image_url='https://images.unsplash.com/photo-1603584173870-7f30df455c6d?auto=format&fit=crop&q=80&w=1000'),
            Car(brand='McLaren', model='720S', year=2023, price=299000.00, availability=True, image_url='https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000')
        ]
        db.session.add_all(cars)
        db.session.commit()
        print("Database initialized successfully with sample data!")
    else:
        print("Database already contains data.")
