from src.app import create_app
from src.extensions import db

# from models import *

if __name__ == "__main__":

    app = create_app()
    db.init_app(app)

    # Upon app context, db is created if not currently created
    with app.app_context():
        db.create_all()

    # CORS(app)

    app.run(debug=True)
