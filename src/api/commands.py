
import click
from api.models import State, db, User, Professional
import random

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
            name = f"Test User {x}"
            email = "test_user" + str(x) + "@test.com"
            password = "12345678"
            
            new_user = User(name=name, email=email, password=password, is_active=True)

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
            last_name = "Professional" + str(x)
            email = "test_professional" + str(x) + "@test.com"
            password = "12345678"  
            
            new_professional = Professional(first_name=first_name, last_name=last_name, email=email, password=password, is_active=True)

            db.session.add(new_professional)
            db.session.commit()
            print("Professional: ", new_professional.email, " created.")

    @app.cli.command("insert-test-states")
    def insert_test_states():
        print("Creating test states")

        new_state = State(name="Artigas")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Canelones")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Cerro Largo")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Colonia")
        db.session.add(new_state)
        db.session.commit()
        
        new_state = State(name="Durazno")
        db.session.add(new_state)
        db.session.commit()
        
        new_state = State(name="Flores")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Florida")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Lavalleja")
        db.session.add(new_state)
        db.session.commit()
        
        new_state = State(name="Maldonado")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Montevideo")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Paysandú")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Río Negro")
        db.session.add(new_state)
        db.session.commit()
        
        new_state = State(name="Rivera")
        db.session.add(new_state)
        db.session.commit()
        
        new_state = State(name="Rocha")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Salto")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="San José")
        db.session.add(new_state)
        db.session.commit()

        new_state = State(name="Soriano")
        db.session.add(new_state)
        db.session.commit()
        
        new_state = State(name="Tacuarembó")
        db.session.add(new_state)
        db.session.commit()
        
        new_state = State(name="Treinta y Tres")
        db.session.add(new_state)
        db.session.commit()
        
        print("All states created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        insert_test_users(5)
        insert_test_professionals(5)
        print("All test data created")