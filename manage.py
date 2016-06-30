#!/usr/bin/env python
from datetime import datetime
from getpass import getpass
from flask.ext.script import Manager, Command
from flask.ext.migrate import Migrate, MigrateCommand
from app import create_app_from_env
from app.users.models import User
from app.extensions import db


app = create_app_from_env()
manager = Manager(app)
migrate = Migrate(app, db)


# ========
# Commands
# ========

class CreateSuperUser(Command):
    def run(self):
        email = input('Enter user email: ')
        firstname = input('Enter user\'s firstname: ')
        lastname = input('Enter user\'s last name: ')
        password = getpass('Enter user\'s password: ')
        password_check = getpass('Enter user\'s password again: ')

        assert(password == password_check)

        with app.app_context():
            user = User(
                firstname=firstname, lastname=lastname,
                email=email, password=password, confirmed=True,
                confirmed_on=datetime.now()
            )
            db.session.add(user)
            db.session.commit()


# Register commands
manager.add_command('db', MigrateCommand)
manager.add_command('createsuperuser', CreateSuperUser)


if __name__ == "__main__":
    manager.run()
