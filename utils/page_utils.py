import base58
import re

from flask_wtf import FlaskForm
from wtforms import (
    StringField, 
    SubmitField, 
    HiddenField
)
from wtforms.validators import ValidationError
from wtforms.fields import Field

from settings import C


class EmailCheck:
    def __init__(self) -> None:
        self.invalid_message: str = "Invalid email"
        self.regex: str = C.EMAIL_REGEX

    def __call__(self, form: FlaskForm, field: Field) -> None:
        if not field.data:
            raise ValidationError(self.invalid_message)
        if not re.match(self.regex, field.data):
            raise ValidationError(self.invalid_message)


class WalletCheck:
    def __init__(self) -> None:
        self.invalid_message: str = "Invalid wallet"
        self.regex: str = C.WALLET_REGEX
    
    def is_valid(self, address):
        if len(address) != 44 or not re.match(self.regex, address):
            return False
        try:
            decoded = base58.b58decode(address)
            return len(decoded) == 32 
        except ValueError:
            return False

    def __call__(self, form: FlaskForm, field: Field) -> None:
        if not field.data:
            raise ValidationError(self.invalid_message)
        if not self.is_valid(field.data):
            raise ValidationError(self.invalid_message)


class RegisterForm(FlaskForm):
    email = StringField(
        label="Email",
        render_kw={"placeholder": "Email"},
        validators=[
            EmailCheck(),
        ]
    )
    wallet = StringField(
        label="Wallet",
        render_kw={"placeholder": "Wallet"},
        validators=[
            WalletCheck(),
        ]
    )
    form_type = HiddenField(default="register")
    submit = SubmitField(
        label="Register"
    )

