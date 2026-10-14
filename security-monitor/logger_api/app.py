from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)


# store security events
events = []


#Endpoint to get all security events
@app.route("/api/security-events", methods=["GET"])
def get_security_events():
    return jsonify(events)

#Endpoint to create a new security event
@app.route("/api/security-events", methods=["POST"])


#Function to create a new security event
def create_security_event():

    data = request.get_json()

    new_event = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "feature": data["feature"],
        "event": data["event"],
        "outcome": data["outcome"],
        "severity": data["severity"],
        "ip_address": data.get("ip_address")
    }

    events.append(new_event)


    return jsonify(new_event), 201


# run Flask app
if __name__ == "__main__":
    app.run(port=5001, debug=True)