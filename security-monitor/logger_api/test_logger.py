from security_logger import log_security_event

log_security_event(
    feature="SQL Injection Protection",
    event="Malicious input detected",
    outcome="BLOCKED",
    severity="HIGH",
    ip_address="111.222.333.444"
)