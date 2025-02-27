import os

from flask import (
    Flask, 
)
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address



def get_app():
    app = Flask(__name__)
    app.secret_key = os.getenv("SECRET_KEY", "secret")
    configure_app(app)
    return app


def configure_app(app):
    limiter_ = Limiter(
        get_remote_address,
        app=app,
        default_limits=["180 per day", "60 per hour", "20 per minute"],
        storage_uri="memory://",
    )
