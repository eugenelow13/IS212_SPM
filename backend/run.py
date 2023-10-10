from src.app import app, db
from flask_cors import CORS

if __name__ == "__main__":
    # Upon app context, db is created if not currently created
    with app.app_context():
        db.create_all()

    # CORS(app)
    CORS(app)

    app.run(debug=True)
