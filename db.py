import sqlite3

DB_NAME = "rental.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        name TEXT,
        role TEXT DEFAULT 'customer',
        license_number TEXT,
        balance REAL DEFAULT 0
    )
    """)

    # Vehicles Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        brand TEXT,
        model TEXT,
        fuel_type TEXT,
        seating_capacity INTEGER,
        price_per_hour REAL,
        price_per_day REAL,
        availability_status TEXT DEFAULT 'active',
        registration_details TEXT,
        fitness_expiry TEXT,
        insurance_expiry TEXT,
        photo_path TEXT
    )
    """)

    # Bookings Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        vehicle_id INTEGER,
        start_time TEXT,
        end_time TEXT,
        total_cost REAL,
        payment_mode TEXT,
        payment_status TEXT DEFAULT 'pending',
        status TEXT DEFAULT 'booked',
        FOREIGN KEY (customer_id) REFERENCES users (id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
    )
    """)

    # Maintenance Logs Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS maintenance_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_id INTEGER,
        type TEXT,
        description TEXT,
        cost REAL,
        next_due_date TEXT,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
    )
    """)

    # Pricing Rules Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS pricing_rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        multiplier REAL,
        fixed_fee REAL,
        description TEXT
    )
    """)

    conn.commit()
    conn.close()

# Dependency for FastAPI
def get_db():
    db = get_connection()
    try:
        yield db
    finally:
        db.close()