
import click
from api.models import db, User, Professional
import random
from api.models import StateEnum

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
            last_name = "User" + str(x)
            email = "test_user" + str(x) + "@test.com"
            password = "12345678"
            state = random.choice(StateEnum._member_names_)
            
            new_user = User(first_name=first_name, last_name=last_name, email=email, password=password, state=state, is_active=True)

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
            state = random.choice(StateEnum._member_names_)
            birth_date = "1990-01-01"
            telephone = "099876543"
            title = "Licenciado en Psicología"
            url_calendly = "https://calendly.com/test" + str(x)    
            
            new_professional = Professional(first_name=first_name, last_name=last_name, email=email, password=password, state=state, birth_date=birth_date, telephone=telephone, title=title, url_calendly=url_calendly, is_active=True)

            db.session.add(new_professional)
            db.session.commit()
            print("Professional: ", new_professional.email, " created.")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        insert_test_users(5)
        insert_test_professionals(5)
        print("All test data created")