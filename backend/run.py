from src.app import create_app, db

# from models import *

if __name__ == "__main__":
    # Upon app context, db is created if not currently created
    app = create_app()

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.run(debug=True)
