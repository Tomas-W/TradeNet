import os

from flask import (
    render_template, 
    request, 
    session, 
    flash, 
    redirect,
    url_for,
    jsonify
)

from app import get_app
from settings import C
from utils.page_utils import RegisterForm
from utils.tracker import UserTracker


app = get_app()
tracker = UserTracker()

@app.route("/health")
def health_check():
    """Health check endpoint for Railway deployment"""
    return jsonify({"status": "healthy"}), 200

@app.route("/", methods=["GET", "POST"])
def index():
    tracker.track_user()    
    register_form = RegisterForm()

    if request.method == "POST":
        if register_form.validate_on_submit():
            flash("Request submitted")
            return redirect(url_for("index"))
        else:
            session["form_errors"] = register_form.errors

    form_errors = session.pop("form_errors", None)
    return render_template(
        "base.html",
        C=C,
        register_form=register_form,
        form_errors=form_errors
    )


@app.route("/track/memory", methods=["GET"])
def track_memory():
    tracking_data = tracker.get_tracking_data()
    return render_template(
        "base.html",
        title="Local Tracking",
        tracking_data=tracking_data,
        C=C,
        admin=True
    )


if __name__ == "__main__":
    debug = os.getenv("DEBUG", "False").lower() == "true"
    port = int(os.getenv("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=debug
    )
    