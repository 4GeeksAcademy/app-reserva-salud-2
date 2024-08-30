
import click
from api.models import City, Speciality, State, db, User, Professional
import random
import json

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            first_name = "Test"
            last_name = "User " + str(x)
            email = "test_user" + str(x) + "@test.com"
            password = "12345678"
            birth_date = "1990-05-01"
            state_id = random.randint(1, 19)
            # Obtengo todas las ciudades del departamento pasado
            cities = City.query.filter_by(state_id=state_id).all()
            # Elijo una ciudad al azar, obtengo su id y la asigno al city_id
            city_id = random.choice(cities).id
                        
            new_user = User(
                first_name=first_name, 
                last_name=last_name, 
                email=email, 
                password=password, 
                birth_date=birth_date, 
                state_id=state_id, 
                city_id=city_id, 
                is_active=True
            )

            db.session.add(new_user)
            db.session.commit()
            print("User: ", new_user.email, " created.")
        print("All test users created")

    @app.cli.command("insert-test-professionals")
    @click.argument("count")
    def insert_test_professionals(count):
        print("Creating test professionals")
        for x in range(1, int(count) + 1):
            first_name = "Test"
            last_name = "Professional " + str(x)
            email = "test_professional" + str(x) + "@test.com"
            password = "12345678"
            birth_date = "1990-05-01"
            gender = random.choice(["MALE", "FEMALE"])
            certificate = "https://marketplace.canva.com/EAFQNGff-B8/1/0/400w/canva-certificado-de-reconocimiento-simple-azul-y-amarillo-E3DUzxgk4yM.jpg"
            profile_picture = f"https://avatar.iran.liara.run/public/job/doctor/{gender.lower()}"
            state_id = random.randint(1, 19)
            # Obtengo todas las ciudades del departamento pasado
            cities = City.query.filter_by(state_id=state_id).all()
            # Elijo una ciudad al azar, obtengo su id y la asigno al city_id
            city_id = random.choice(cities).id
            telephone = "099" + str(random.randint(100000, 999999))
            
            new_professional = Professional(
                first_name=first_name, 
                last_name=last_name, 
                email=email, 
                password=password, 
                birth_date=birth_date,
                gender=gender,
                certificate=certificate,
                profile_picture=profile_picture,
                state_id=state_id,
                city_id=city_id,
                telephone=telephone,
                is_validated=True,
                is_active=True
            )
            
            # Asigno una especialidad al profesional
            specialities = Speciality.query.all()
            new_professional.specialities.append(random.choice(specialities))

            db.session.add(new_professional)
            db.session.commit()
            print("Professional: ", new_professional.email, " created.")

    @app.cli.command("insert-test-states")
    def insert_test_states():
        print("Creating test states")

        with open("src/api/states_and_cities.json", 'r') as file:
            data = json.load(file)
            for state in data:
                new_state = State(name=state["name"])
                
                for city in state["cities"]:
                    new_city = City(name=city["name"], state_id=new_state.id)
                    new_state.cities.append(new_city)
                    db.session.add(new_city)
                    
                db.session.add(new_state)
                db.session.commit()
                print("State: ", new_state.name, " created.")
            
        
        print("All states created")

    @app.cli.command("insert-test-specialities")
    def insert_test_specialities():
        psicologo = Speciality(name="Psicólogo")
        db.session.add(psicologo)
        db.session.commit()
        
        dermatologo = Speciality(name="Dermatólogo")
        db.session.add(dermatologo)
        db.session.commit()
        
        nutricionista = Speciality(name="Nutricionista")
        db.session.add(nutricionista)
        db.session.commit()
        
        odontologo = Speciality(name="Odontólogo")
        db.session.add(odontologo)
        db.session.commit()
        
        kinesiologo = Speciality(name="Kinesiólogo")
        db.session.add(kinesiologo)
        db.session.commit()
        
        fisioterapeuta = Speciality(name="Fisioterapeuta")
        db.session.add(fisioterapeuta)
        db.session.commit()
        print("All specialities created")

    @app.cli.command("insert-test-data")
    @click.argument("count")
    def insert_test_data(count):
        insert_test_users(count)
        insert_test_professionals(count)
        print("All test data created")