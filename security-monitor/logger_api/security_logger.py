import requests

# url of security logger api
LOGGER_URL = "http://127.0.0.1:5001/api/security-events"


# Function to log security events to the logger
def log_security_event(feature, event, outcome, severity="INFO", ip_address=None):
    try:
        response = requests.post(
            LOGGER_URL,
            json={
                "feature": feature,
                "event": event,
                "outcome": outcome,
                "severity": severity,
                "ip_address": ip_address
            },
            timeout=1
        )
        response.raise_for_status()

    except requests.RequestException as error:
        print(f"Security logger unavailable: {error}")