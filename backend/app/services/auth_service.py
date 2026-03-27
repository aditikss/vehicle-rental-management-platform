from sqlalchemy.orm import Session
from app.models.user_model import User
from app.utils.auth import hash_password, verify_password, create_token

def create_user(db: Session, name, email, password):
    hashed = hash_password(password)

    user = User(
        name=name,
        email=email,
        password=hashed,
        role="customer"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login_user(db: Session, email, password):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    token = create_token({"user_id": user.id})

    return token
