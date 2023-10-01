from src.app import app, db

if __name__ == "__main__":
    # Upon app context, db is created if not currently created
    with app.app_context():
        db.create_all()

    app.run(debug=True)
